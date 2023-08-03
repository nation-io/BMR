/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @next/next/no-img-element */
/* eslint-disable  @typescript-eslint/no-non-null-assertion */
/* eslint-disable  jsx-a11y/alt-text */
import {
  bundlrStorage,
  Metaplex,
  toMetaplexFileFromBrowser,
  walletAdapterIdentity,
} from '@metaplex-foundation/js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey } from '@solana/web3.js';
import { useCallback, useEffect, useState } from 'react';

import Button from '@/components/buttons/Button';
import Input from '@/components/Input';
import Layout from '@/components/layout/Layout';

import { searchViewers } from '@/utils/apiCalls';

const CreateNewMasterEdition = ({
  metaplex,
  refreshNfts,
}: {
  metaplex: any;
  refreshNfts: () => void;
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState('');
  const [file, setFile] = useState<any>(null);
  const [supply, setSupply] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  }, [file]);

  const handleCreateNft = async () => {
    const { uri } = await metaplex
      .nfts()
      .uploadMetadata({
        name: name,
        description: description,
        image: await toMetaplexFileFromBrowser(file),
        properties: { files: [] },
      })
      .run();
    const nftData = {
      name,
      uri: uri,
    } as any;
    if (supply) {
      nftData['maxSupply'] = Number.parseInt(supply);
    }
    await metaplex
      .nfts()
      .create({
        ...nftData,
        sellerFeeBasisPoints: 500, // Represents 5.00%.
      })
      .run();
    refreshNfts();
  };

  return (
    <div>
      <div className='grid w-full grid-flow-row grid-cols-2 gap-2'>
        <Input name='Name' value={name} onChange={setName} />
        <Input
          name='Description'
          value={description}
          onChange={setDescription}
        />
        <Input
          name='Features (Json string)'
          value={features}
          onChange={setFeatures}
        />
        <Input
          name='Supply (Empty for unlimited)'
          value={supply}
          onChange={setSupply}
          type='number'
        />
        <div>
          <input
            type='file'
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                const image: File = (e.target.files as FileList)[0];
                setFile(image);
              }
            }}
          />
          {imageUrl && <img className='h-[500px]' src={imageUrl} />}
        </div>
        <div>
          <Button onClick={handleCreateNft}>Create nft</Button>
        </div>
      </div>
    </div>
  );
};

const Live = () => {
  const { publicKey, connected, wallet } = useWallet();
  const [metaplex, setMetaplex] = useState<any>();
  const [viewersAmount, setViewersAmount] = useState<number>(0);
  const [nfts, setNfts] = useState<any>([]);
  const [randomViewers, setRandomViewers] = useState<any>([]);
  const connection = useConnection();
  const refreshNfts = useCallback(async () => {
    const nfts = await metaplex
      .nfts()
      .findAllByOwner({ owner: publicKey! })
      .run();
    const response = await Promise.all(
      nfts.map((collectible: any) =>
        metaplex
          .nfts()
          .findByMint({
            mintAddress: collectible.mintAddress,
            loadJsonMetadata: true,
          })
          .run()
      )
    );
    setNfts(
      response.filter(
        (e: any) => e.edition?.maxSupply?.toNumber() > 0
      ) as Array<any>
    );
  }, [metaplex, setNfts, publicKey]);
  const [selectedNft, setSelectedNft] = useState<any>(null);
  const notifyUser = async (nft: any, token: string) => {
    const myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'key=AAAAHoaATSY:APA91bE3AMWj618-21-bIOJ7m1ktVqI1svcYBTMse0hZ6-1jzEcsQP6sqeGCHCYZO3EWH4P2KoRzO3vJZJi0euDpaG2qPfHlQOiaFVZzKEcqPJvIJP9dskDK5NzCzPTlYNZj1Dsb_teh'
    );
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      data: {
        title: `You have received a new NFT as gift. ${nft.name}`,
        image: nft.json.image,
        body: 'Check your wallet to know more',
      },
      to: token,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    const response = await fetch(
      'https://fcm.googleapis.com/fcm/send',
      requestOptions
    );
    await response.json();
  };
  const mintEditions = async () => {
    for (let index = 0; index < randomViewers.length; index++) {
      const publicKey = new PublicKey(randomViewers[index].wallet);
      await metaplex
        .nfts()
        .printNewEdition({
          originalMint: selectedNft.mint.address,
          newOwner: publicKey,
        })
        .run();
      await notifyUser(selectedNft, randomViewers[index].token);
    }
  };

  useEffect(() => {
    if (metaplex) {
      refreshNfts();
    }
  }, [metaplex, refreshNfts]);
  useEffect(() => {
    if (connected && wallet) {
      const metaplex = Metaplex.make(connection.connection)
        .use(walletAdapterIdentity(wallet?.adapter))
        .use(bundlrStorage());
      setMetaplex(metaplex);
    }
  }, [connected, wallet, connection]);

  const handleSearchViewers = async () => {
    const viewers = await searchViewers({ amount: viewersAmount });
    setRandomViewers(viewers);
  };
  const [openTab, setOpenTab] = useState(1);
  return (
    <Layout>
      <main className='relative flex w-full flex-col items-center antialiased'>
        {connected ? (
          <div className='w-[80%]'>
            <ul
              className='mb-0 flex list-none flex-row flex-wrap pt-3 pb-4'
              role='tablist'
            >
              <li className='-mb-px mr-2 flex-auto text-center last:mr-0'>
                <a
                  className={
                    'block rounded px-5 py-3 text-xs font-bold uppercase leading-normal shadow-lg ' +
                    (openTab === 1 ? 'text-black' : 'bg-white text-gray-300')
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle='tab'
                  href='#link1'
                  role='tablist'
                >
                  Airdrop existing NFT
                </a>
              </li>
              <li className='-mb-px mr-2 flex-auto text-center last:mr-0'>
                <a
                  className={
                    'block rounded px-5 py-3 text-xs font-bold uppercase leading-normal shadow-lg ' +
                    (openTab === 2 ? 'text-black' : 'bg-white text-gray-300')
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle='tab'
                  href='#link2'
                  role='tablist'
                >
                  Create new master edition
                </a>
              </li>
            </ul>
            <div className='relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-white shadow-lg'>
              <div className='flex-auto px-4 py-5 text-black'>
                <div className='tab-content tab-space w-full'>
                  <div
                    className={openTab === 1 ? 'block' : 'hidden'}
                    id='link1'
                  >
                    {selectedNft ? (
                      <div className='flex w-full p-5'>
                        <div className='w-1/3 '>
                          <img
                            className='h-auto w-full'
                            src={selectedNft.json.image}
                          />
                          <div className='my-10 text-black'>
                            <p>
                              <b>Name</b>:{selectedNft.name}{' '}
                            </p>
                            <p>
                              <b>Description</b>:{selectedNft.description}{' '}
                            </p>
                            <p>
                              <b>Current supply</b>:
                              {selectedNft.edition.supply.toNumber()}
                            </p>
                            <p>
                              <b>Max supply</b>:
                              {selectedNft.edition.maxSupply.toNumber()}
                            </p>
                          </div>
                        </div>
                        <div className='flex w-2/3 justify-center'>
                          <div>
                            <h1>Amount of mints to send </h1>
                            <div className='mt-4'>
                              <input
                                type='number'
                                onChange={(e) => {
                                  setViewersAmount(
                                    Number.parseInt(e.target.value)
                                  );
                                }}
                                value={viewersAmount}
                              />
                              <Button
                                onClick={handleSearchViewers}
                                className='mx-5'
                              >
                                Search viewers
                              </Button>
                            </div>
                            <div className='mt-4'>
                              {randomViewers.map((e: any, index: number) => (
                                <p key={index}>
                                  <b>Wallet:</b> {e.wallet} <b>Email: </b>{' '}
                                  {e.email}
                                </p>
                              ))}
                              <Button onClick={mintEditions}>
                                Mint editions
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className='p-5'>
                        <h1 className='text-black'>
                          Select the NFT to airdrop
                        </h1>
                        <div className='grid w-full grid-flow-row grid-cols-5 gap-5 '>
                          {nfts
                            .filter((e: any) => e.json.image)
                            .map((e: any, index: number) => (
                              <div
                                key={index}
                                onClick={() => setSelectedNft(e)}
                                className='flex h-[500px] cursor-pointer flex-col items-center justify-center p-5 hover:border hover:border-black/0 hover:shadow-xl'
                              >
                                <div className='w-full'>
                                  <img
                                    className='h-auto w-full'
                                    src={e.json.image}
                                  />
                                </div>
                                <span>{e.name}</span>
                                <small>
                                  {e.edition.maxSupply.toNumber()} /{' '}
                                  {e.edition.supply.toNumber()}
                                </small>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className={openTab === 2 ? 'block' : 'hidden'}
                    id='link2'
                  >
                    <h1>Create new master edition</h1>
                    <CreateNewMasterEdition
                      metaplex={metaplex}
                      refreshNfts={() => {
                        setOpenTab(1);
                        refreshNfts();
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='text-black'>
            <WalletMultiButton className='!bg-black'>
              Connect your wallet to airdrop stream
            </WalletMultiButton>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default Live;

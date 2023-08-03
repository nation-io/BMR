import * as spl from "@solana/spl-token";
import { Connection, PublicKey, Signer, Transaction } from "@solana/web3.js";
import { LivestreamViewer } from "../../schema";

export async function airdropLivestreamViewer(
  { connection, livestreamViewer, rewardsAuthority, reward, onSuccess }: {
    connection: Connection;
    livestreamViewer: LivestreamViewer;
    rewardsAuthority: Signer;
    reward: () => Promise<PublicKey | Error>;
    onSuccess: () => Promise<any>;
  },
): Promise<string | null | Error> {
  const streamViewerWallet = new PublicKey(livestreamViewer.wallet);
  const rewardMint = await reward();
  if (rewardMint instanceof Error) {
    return rewardMint;
  }

  const rewardsAuthorityAta = await spl.getAssociatedTokenAddress(
    rewardMint,
    rewardsAuthority.publicKey,
  );
  const streamViewerAta = await spl.getAssociatedTokenAddress(
    rewardMint,
    streamViewerWallet,
  );

  const instructions = [];
  const streamViwerAtaExists = await (async () => {
    const account = await connection.getAccountInfo(streamViewerAta);
    if (!account || account.data.length === 0) {
      return false;
    }
    return true;
  })();
  if (!streamViwerAtaExists) {
    const createAtaIx = spl.createAssociatedTokenAccountInstruction(
      rewardsAuthority.publicKey,
      streamViewerAta,
      streamViewerWallet,
      rewardMint,
    );
    instructions.push(createAtaIx);
  }

  const transferIx = spl.createTransferInstruction(
    rewardsAuthorityAta,
    streamViewerAta,
    rewardsAuthority.publicKey,
    1,
  );
  instructions.push(transferIx);

  const transaction = new Transaction().add(...instructions);
  transaction.recentBlockhash = await (async () => {
    const hash = await connection.getLatestBlockhash();
    return hash.blockhash;
  })();
  transaction.sign(rewardsAuthority);

  try {
    const transactionSignature = await connection.sendRawTransaction(
      transaction.serialize(),
    );

    await onSuccess();

    return transactionSignature;
  } catch (e) {
    return null;
  }
}

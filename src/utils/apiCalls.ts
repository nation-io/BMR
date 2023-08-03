//mintData: MintCandyMachineOutput
/*

 */
import { MintCandyMachineOutput } from "@metaplex-foundation/js";
import { PublicKey } from "@solana/web3.js";

export const registerTransaction = async ({
  mintData,
  candyMachineId,
  wallet,
  referralCode,
}: {
  mintData: MintCandyMachineOutput;
  candyMachineId: string;
  wallet: PublicKey | undefined;
  referralCode: string | undefined;
}) => {
  const data = {
    wallet: wallet ? wallet.toString() : "",
    mint: mintData.nft.mint.address.toString(),
    candyMachineId: candyMachineId,
    referral: referralCode,
  };
  const response = await fetch("/api/transactions", {
    method: "POST", // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const updateUser = async ({
  wallet,
  email,
}: {
  wallet: string;
  email: string;
}) => {
  const data = {
    wallet: wallet,
    email: email,
  };
  const response = await fetch("/api/update", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const connectLive = async ({
  wallet,
  token,
}: {
  wallet: string;
  token: string;
}) => {
  const response = await fetch("/api/live", {
    method: "POST",
    body: JSON.stringify({ wallet, token }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const searchViewers = async ({ amount }: { amount: number }) => {
  const response = await fetch("/api/searchViewers", {
    method: "POST",
    body: JSON.stringify({ amount }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export type OnStreamLoadResponse = {
  status: string;
  signature: string | null;
};
export const onStreamLoad = async ({ wallet }: { wallet: string }) => {
  const response = await fetch("/api/onStreamLoad", {
    method: "POST",
    body: JSON.stringify({ wallet }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json() as OnStreamLoadResponse;
};

export type GetPollResponse = {
  status: string;
  poll: {
    id: number;
    name: string;
    description: string;
    voting_polls_choices: {
      id: number;
      choice: string;
      voting_polls_voters: { count: number }[];
    }[];
    voting_polls_voters: { count: number };
  } | null;
};
export const getPoll = async ({ wallet }: { wallet: string }) => {
  const response = await fetch(`/api/polls?wallet=${wallet}`, {
    method: "GET",
  });
  return await response.json() as GetPollResponse;
};

export const votePoll = async (
  { wallet, pollId, choiceId }: {
    wallet: string;
    pollId: number;
    choiceId: number;
  },
) => {
  const response = await fetch(`/api/polls`, {
    method: "POST",
    body: JSON.stringify({ wallet, pollId, choiceId }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json() as GetPollResponse;
};

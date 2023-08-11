# BMR Repo

This repo contains tools to build interactive, gamified livestream experiences with NFTs on the Solana blockchain. With the SDKs in this repo, you’re able to: 

1. Mint tickets with standard Metaplex tooling
2. Directly airdrop NFTs to livestream viewers
3. Poll NFT holders that are watching a livestream
4. Issue referral codes to NFT purchasers to reward them.

## Architecture

The project is using a Next.js frontend with helper backends for referrals, minting, and polls.

- Homepage with Candy Machine Mints and [Twitch.tv](http://Twitch.tv) Component: [https://github.com/nation-io/BMR/blob/main/src/pages/index.tsx](https://github.com/nation-io/BMR/blob/main/src/pages/index.tsx)
- SDK for live polling + airdropping of NFTs: [https://github.com/nation-io/BMR/tree/main/libs/live](https://github.com/nation-io/BMR/tree/main/libs/live)
- Firebase API to track referrals: [https://github.com/nation-io/BMR/blob/main/src/utils/firebase.ts](https://github.com/nation-io/BMR/blob/main/src/utils/firebase.ts)

## Get started

First, you must clone the repo by running `git clone [git@github.com](mailto:git@github.com):nation-io/BMR.git` in your terminal.

Use `yarn dev` to start the development server, `yarn build` to generate static pages, and/or `yarn start` to start a production server.

You can also lint project-wide using `yarn lint` and/or prettify/format project-wide using `yarn format` too.

### Candy Machines

You will set up two Candy Machine V2 instances - one for tickets and another for companion passes. See the [Metaplex documentation](https://docs.metaplex.com/deprecated/candy-machine-js-cli/getting-started) on doing so. You must then add those Candy Machine ID’s to the `.env` file like so:

```bash
NEXT_PUBLIC_CM_TICKET="BZCyb2zejK2k3hgYA2VFCpTfeFNSvSJdQ18otaub93U4"
NEXT_PUBLIC_CM_COMPANION_PASS="6UTxtc2MP6uhauWGLp3KDCAcm3gXjawbXtKVjNPuHrJQ"
```

### Firebase

You will additionally configure the `.env` file with your own corresponding values:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
NEXT_PUBLIC_FIREBASE_APP_ID=""
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=""
```

### Airdrops + Voting

These two features have been configured to use Supabase and require `.env` to contain - see [Supabase documentation](https://supabase.com/docs/guides/cli/local-development#start-supabase-services) on setting up a local environment:

```bash
NEXT_SUPABASE_ENDPOINT="http://localhost:54321"
NEXT_SUPABASE_SVC_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU"
```

`NEXT_SUPABASE_ENDPOINT` refers to your Supabase API url.

`NEXT_SUPABASE_SVC_TOKEN` refers to your `service_role` key.

Viewers upon first connecting to the stream will be airdropped an NFT thus requiring `.env` to contain the following:

```bash
NEXT_STREAM_VIEWER_NFT_TREASURY="[250,222,205,42,61,212,112,183,225,114,117,234,31,84,201,110,66,155,162,230,11,167,133,16,134,174,195,241,145,226,208,83,59,50,51,133,245,17,15,69,247,217,46,222,184,155,76,28,88,35,58,178,55,36,142,128,227,250,65,20,16,90,21,199]"
NEXT_STREAM_VIEWER_NFT_TREASURY_HASH_LIST='["Gs3HXkWKQ2nNPyjQJWMRUmgoJxbrS1YoKqMY2qgRjiJ"]'
```

`NEXT_STREAM_VIEWER_NFT_TREASURY` is the byte-array representation of the authority possessing the NFT mints declared in `NEXT_STREAM_VIEWER_NFT_TREASURY_HASH_LIST`.

Voting will require no additional `.env` variables however to configure a voting poll is done manually in Supabase Studio. Beginning with opening the `voting_polls` table, you will add a new row with a `name` and `description`. Then you will open the `voting_polls_choices` table to add the the corresponding choices to the previously created poll.
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Livestream, LivestreamPropsBase } from "./provider";
import { SupabaseProvider } from "../../provider";
import { LivestreamViewer } from "../../schema";

export interface SupabaseLivestreamProps extends LivestreamPropsBase {
  url?: string;
  token?: string;
  _client?: SupabaseClient;
}

export class SupabaseLivestream extends SupabaseProvider
  implements Livestream<SupabaseClient> {
  _provider: SupabaseLivestreamProps["provider"] = "supabase";

  constructor({ url, token, _platform, _client }: SupabaseLivestreamProps) {
    super({
      _client,
      url,
      token,
      _platform: "Livestream",
      provider: "supabase",
    });
    this._platform = _platform;
    if (url && token) {
      this._client = createClient(url, token);
    } else if (_client) {
      this._client = _client;
    } else {
      this._client = createClient(
        process.env.PROVIDER_SUPABASE_URL!,
        process.env.PROVIDER_SUPABASE_TOKEN!,
      );
    }
  }

  // no-op return this
  into() {
    return this;
  }

  async getLivestreamUser(
    { wallet }: { wallet: string },
  ): Promise<LivestreamViewer | null | Error> {
    return this.getUser({
      wallet,
    });
  }

  async newLivestreamUser(
    { wallet }: { wallet: string },
  ): Promise<LivestreamViewer | Error> {
    return this.newUser({
      wallet,
      user: <LivestreamViewer> {
        airdropped: false,
      },
    });
  }

  async getLivestreamUsersAirdroppedTotal(): Promise<number | Error> {
    return this.getUser<LivestreamViewer, number>(
      undefined,
      (_client) => async (livestreamUsersTable) => {
        const airdropped = await _client.from(livestreamUsersTable)
          .select(
            `airdropped`,
          ).eq("airdropped", true);
        if (airdropped.error) {
          return 0;
        }
        return airdropped.data.length;
      },
    );
  }

  async airdroppedLivestreamUser(
    { viewer }: { viewer: LivestreamViewer },
  ): Promise<undefined | Error> {
    return this.updateUser(viewer, { airdropped: true });
  }
}

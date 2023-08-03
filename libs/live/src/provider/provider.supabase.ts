import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Provider, ProviderPropsBase } from "./provider";
import { Platform, User } from "../schema";
import { newUser, seekUser, updateUser } from "./supabase";

export interface SupabaseProviderProps extends ProviderPropsBase {
  url?: string;
  token?: string;
  _platform: Platform;
  _client?: SupabaseClient;
}

export class SupabaseProvider implements Provider<SupabaseClient> {
  _provider: SupabaseProviderProps["provider"] = "supabase";
  _platform: Platform;
  _client: SupabaseClient;

  constructor({ url, token, _platform, _client }: SupabaseProviderProps) {
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

  async getUser<
    U extends User<Platform>,
    Q = U | null | Error,
  >(
    query?: { wallet: string },
    raw?: (supabase: SupabaseClient) => (
      platformTable: string,
    ) => Promise<Q>,
  ): Promise<Q> {
    let select: ((platformTable: string) => any) | null = null;

    if (raw) {
      select = raw(this._client);
    }
    if (query) {
      const { wallet } = query;

      select = async (platformTable: string) => {
        const { data, error } = await this._client.from(platformTable).select<
          `*`,
          U
        >(
          `*`,
        ).eq("wallet", wallet);

        if (error) {
          return new Error(error.message);
        }
        if (data.length === 0) {
          return null;
        }

        return data[0];
      };
    }
    if (!select) {
      return null as Q;
    }
    return await seekUser({ platform: this._platform, select });
  }

  async newUser<U extends User<Platform>>(
    { wallet, user }: { wallet: string; user: Partial<U> },
  ): Promise<U | Error> {
    const insert = async (platformTable: string) => {
      const { data, error } = await this._client.from(platformTable).insert(
        { ...user, wallet },
      ).select<"*", U>("*");

      if (error) {
        return new Error(error.message);
      }
      if (!data) {
        return new Error(`could not create new viewer in ${platformTable}`);
      }

      return data[0];
    };

    return await newUser({ platform: this._platform, insert });
  }

  async updateUser<U extends User<Platform>>(
    viewer: U,
    fields: Partial<U>,
  ): Promise<undefined | Error> {
    const update = async (platformTable: string) => {
      const { error } = await this._client.from(platformTable).update({
        ...fields,
      }).eq("wallet", viewer.wallet);

      if (error) {
        return new Error(error.message);
      }
    };

    return await updateUser({ platform: this._platform, update });
  }
}

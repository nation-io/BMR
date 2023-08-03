import { Platform, User } from "../schema";
import { SupabaseProvider, SupabaseProviderProps } from "./provider.supabase";

export type ProviderPropsBase = {
  _platform: Platform;
  provider: "supabase";
};

export type ProviderProps = SupabaseProviderProps;
export type ProviderClients = SupabaseProvider["_client"];

export class Provider<C extends ProviderClients> {
  _platform: Platform;
  _provider: ProviderPropsBase["provider"];
  _client: C;

  constructor(props: ProviderProps) {
    this._platform = props._platform;
    switch (props.provider) {
      case "supabase": {
        this._provider = "supabase";
        const supabase = new SupabaseProvider({
          provider: props.provider,
          url: props.url,
          token: props.token,
          _platform: props._platform,
        });
        this._client = supabase._client as C;
      }
    }
  }

  // return respective provider
  into() {
    const _client = this._client as ProviderProps["_client"];

    switch (this._provider) {
      case "supabase": {
        return new SupabaseProvider({
          _platform: this._platform,
          provider: "supabase",
          _client,
        });
      }
    }
  }

  async getUser<U extends User<Platform>, Q = U | null | Error>(
    query?: { wallet: string },
    raw?: (client: ProviderClients) => (
      platformTable: string,
    ) => Promise<Q>,
  ): Promise<Q> {
    return this.into().getUser(query, raw) as Q;
  }

  async newUser<U extends User<Platform>>(
    { wallet, user }: { wallet: string; user: Partial<U> },
  ): Promise<U | Error> {
    return this.into().newUser({ wallet, user });
  }

  async updateUser<U extends User<Platform>>(
    user: U,
    fields: Partial<U>,
  ): Promise<undefined | Error> {
    return this.into().updateUser(user, fields);
  }
}

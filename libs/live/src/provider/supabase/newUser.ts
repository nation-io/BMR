import { Platform, PlatformUser, User } from "../../schema";
import { userTables } from "./constants";

export async function newUser<P extends Platform, U extends User<P>>(
  {
    platform,
    insert,
  }: {
    platform: P;
    insert: (tableName: string) => Promise<PlatformUser | Error>;
  },
): Promise<U | Error> {
  const user = await insert(userTables[platform]);
  if (user instanceof Error) return user;

  return user as U;
}

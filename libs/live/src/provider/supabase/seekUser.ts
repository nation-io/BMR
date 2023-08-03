import { Platform } from "../../schema";
import { userTables } from "./constants";

export async function seekUser<
  P extends Platform,
  Q,
>(
  {
    platform,
    select,
  }: {
    platform: P;
    select: (tableName: string) => Promise<Q>;
  },
): Promise<Q> {
  const user = await select(userTables[platform]);
  if (user instanceof Error) return user;
  if (user === null) return user;

  return user as Q;
}

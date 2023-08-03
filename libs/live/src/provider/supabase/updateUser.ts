import { Platform } from "../../schema";
import { userTables } from "./constants";

export async function updateUser<P extends Platform>(
  {
    platform,
    update,
  }: {
    platform: P;
    update: (tableName: string) => Promise<undefined | Error>;
  },
): Promise<undefined | Error> {
  const user = await update(userTables[platform]);
  if (user instanceof Error) return user;

  return;
}

import { Client, Account, Databases } from "node-appwrite";

// This runs only on the server
export function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
    .setKey(process.env.APPWRITE_API_KEY as string); // server key only

  return {
    account: new Account(client),
    databases: new Databases(client),
  };
}

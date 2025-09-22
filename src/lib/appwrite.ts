// lib/appwrite.js
import { Client, Account, Databases, ID } from "appwrite";

export interface Env {
  NEXT_PUBLIC_APPWRITE_ENDPOINT: string;
  NEXT_PUBLIC_APPWRITE_PROJECT_ID: string;
  NEXT_PUBLIC_APPWRITE_API_KEY: string;
}

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

export { ID } from "appwrite";
export const account = new Account(client);
export const databases = new Databases(client);
export const uniqueID = ID.unique();

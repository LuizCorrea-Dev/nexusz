import NextAuth from "next-auth";
import Steam from "next-auth-steam";
import { authOptions } from "@/lib/auth";

export default async function handler(req, res) {
  return await NextAuth(req, res, authOptions(req));
}

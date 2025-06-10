import NextAuth from "next-auth";
import { authOptionsWithRequest } from "@/lib/auth";

export default async (req, res) => {
  return await NextAuth(req, res, authOptionsWithRequest(req));
};

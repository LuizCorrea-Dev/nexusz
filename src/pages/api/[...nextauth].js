// src/pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // seu authOptions deve ser uma função

export default async function auth(req, res) {
  return await NextAuth(req, res, authOptions(req));
}

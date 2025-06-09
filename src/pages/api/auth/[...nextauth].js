import NextAuth from "next-auth";
import { authOptions } from "../../../lib/auth"; // Corrigir o caminho!

export default function auth(req, res) {
  return NextAuth(req, res, authOptions);
}

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();
  const posts = await prisma.post.findMany();
  console.log(posts);

  return NextResponse.json({ posts });
}

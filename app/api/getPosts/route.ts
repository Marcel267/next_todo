import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const posts = await prisma.post.findMany();
  console.log(posts);

  // const createMany = await prisma.post.createMany({
  //   data: [
  //     { content: "Bob", completed: false },
  //     { content: "Bobo", completed: false },
  //     { content: "Yewande", completed: false },
  //     { content: "Bob", completed: false },
  //     { content: "Bobo", completed: false },
  //     { content: "Yewande", completed: false },
  //     { content: "Bob", completed: false },
  //     { content: "Bobo", completed: false },
  //     { content: "Yewande", completed: false },
  //   ],
  // });

  return NextResponse.json({ posts });
}

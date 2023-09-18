import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Params = {
  content: string;
  id: number;
  completed: boolean;
};

export async function PUT(request: Request) {
  try {
    const params: Params = await request.json();

    const updatedPost = await prisma.post.update({
      where: {
        id: params.id,
      },
      data: {
        content: params.content,
        completed: params.completed,
      },
    });

    if (!updatedPost) {
      throw new Error("Post could not be edited");
    }

    return NextResponse.json(
      { message: `Post with id ${updatedPost.id} edited` },
      { status: 200 },
    );
    // return NextResponse.json({ message: `Post with id created` }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}

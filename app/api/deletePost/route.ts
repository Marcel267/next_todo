import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Params = {
  id: number;
};

export async function DELETE(request: Request) {
  try {
    const params: Params = await request.json();

    if (!params.id) {
      return new Error("Provided id is not valid");
    }

    const deletedPost = await prisma.post.delete({
      where: {
        id: params.id,
      },
    });

    if (!deletedPost) {
      throw new Error("Post not found");
    }

    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}

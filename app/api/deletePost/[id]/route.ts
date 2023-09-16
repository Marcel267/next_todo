import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function DELETE(request: Request) {
  try {
    const id = parseInt(request.url.slice(request.url.lastIndexOf("/") + 1));

    if (!id) {
      return new Error("Provided id is not valid");
    }

    const deletedPost = await prisma.post.delete({
      where: {
        id: id,
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

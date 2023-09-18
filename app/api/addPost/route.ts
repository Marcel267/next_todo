import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Params = {
    content: string;
};

export async function POST(request: Request) {
    try {
        const params: Params = await request.json();
        // console.log(params.content);
        const createdPost = await prisma.post.create({
            data: {
                content: params.content,
                completed: false,
            },
        });

        if (!createdPost) {
            throw new Error("Post could not be created");
        }

        return NextResponse.json(
            { message: `Post with id ${createdPost.id} created` },
            { status: 200 }
        );
        // return NextResponse.json({ message: `Post with id created` }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
}

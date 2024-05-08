import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Collection from "@/lib/models/Collection";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();
    const { title, description, image } = await req.json();

    if (!title || !description || !image) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const existingCollection = await Collection.findOne({ title });
    if (existingCollection) {
      return new NextResponse("Collection already exists", { status: 400 });
    }

    const newCollection = new Collection({
      title,
      description,
      image,
    });

    await newCollection.save();
    return new NextResponse(JSON.stringify(newCollection), { status: 200 });
  } catch (err) {
    console.error("[collections_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    const collections = await Collection.find().sort({ createdAt: 'desc' });
    return new NextResponse(JSON.stringify(collections), { status: 200 });
  } catch (err) {
    console.error("[collections_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

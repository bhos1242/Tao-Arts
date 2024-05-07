import { connectToDb } from "@/app/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Collection from '@/app/lib/models/Collection'
export const POST = async (req: NextRequest) => {
  try {
    const {userId} = auth()
    if(!userId){
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await connectToDb()
    const { title, description, image } = await req.json();
    const existingColllection = await Collection.findOne({title})
    if(existingColllection){
      return new NextResponse("Collection already exists", { status: 400 });
    }
   if(!title || !description || !image){
     return new NextResponse("Missing required fields", { status: 400 });
   }
   const newcollection = await Collection.create({
        title,
        description,
        image
    
   })
   await newcollection.save()  
   return new NextResponse(newcollection, { status: 200 });

  } catch (err) {
    console.log("[collections_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

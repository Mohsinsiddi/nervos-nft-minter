import { NextResponse } from "next/server";

// import prisma from "@/app/libs/prismadb";

export async function POST(request) {
  try {
    const body = await request.json();

    const { address, email } = body;
    console.log("Server data", email, "----", address);
    const txHash =
      "9876tfghjkljhgfyuoijhbvbhjiuxcfyychbcofhsdhiuuhhdgfcvdgfckjfgcvsgfkjscgkjsdfgckcfgkjfgc jkgf";
    return NextResponse.json({ status: true, txHash });
  } catch (error) {
    console.log(error, "ERROR_MESSAGES");
    return new NextResponse("Error", { status: 500 });
  }
}

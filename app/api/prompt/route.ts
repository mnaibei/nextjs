import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const dynamic = "force-dynamic";
export const GET = async (req: any) => {
  try {
    await connectToDatabase();
    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

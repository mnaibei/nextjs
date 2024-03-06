import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req: any) => {
  try {
    await connectToDatabase();
    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, max-age=0, must-revalidate, no-store",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, max-age=0, must-revalidate, no-store",
      },
    });
  }
};

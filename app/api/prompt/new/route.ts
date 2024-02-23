import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req: any, res: any) => {
  const { prompt, userId, tag } = await req.json();
  try {
    await connectToDatabase();
    const newPrompt = await Prompt.create({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

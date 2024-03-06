// import Feed from "@components/Feed";
import Feed from "./feed/Feed";

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center dark:text-white">
        Welcome to the prompt finder
        <br className="sm-md:hidden" />
        <span className="orange_gradient text-center">
          Find the right prompt for your search
        </span>
      </h1>
      <p className="desc text-center dark:text-white">
        This is a simple prompt finder to help you find the right prompt when
        using Chatgpt or any other AI tool. Users can create and share their own
        prompts as well.
      </p>
      <Feed />
    </section>
  );
}

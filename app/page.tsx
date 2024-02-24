import Feed from "@components/Feed";

export default function Home() {
  return (
    <section className="w-full flex-center flex-col border-2 border-blue-500">
      <h1 className="head_text text-center">
        Welcome to the prompt finder
        <br className="sm-md:hidden" />
        <span className="orange_gradient text-center">
          Find the right prompt for your search
        </span>
      </h1>
      <p className="desc text-center">
        This is a simple prompt finder to help you find the right prompt when
        using Chatgpt or any other AI tool. Users can create and share their own
        prompts as well.
      </p>
      <Feed />
    </section>
  );
}

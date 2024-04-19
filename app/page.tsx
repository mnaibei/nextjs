import Feed from "@components/Feed";

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center dark:text-white">
        Welcome to the Prompt Finder!
        <br className="sm-md:hidden" />
        <span className="orange_gradient text-center">
          Supercharge Your Workflow - Find the Perfect Prompt
        </span>
      </h1>
      <p className="desc text-center dark:text-white">
        Struggling to craft the perfect prompt for ChatGPT or other AI tools?
        Look no further! This simple platform empowers you to discover inspiring
        prompts that can streamline your AI-powered workflow and even contribute
        your own to the community.
      </p>
      <Feed />
    </section>
  );
}

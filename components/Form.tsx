import Link from "next/link";

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}: {
  type: string;
  post: any;
  setPost: any;
  submitting: any;
  handleSubmit: any;
}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">{type} Post</h1>
      <p className="desc text-left max-w-md">
        {type} a prompt to share with the community.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            className="form_textarea"
            placeholder="Add your prompt here"
            required
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag{" "}
            <span className="font-normal">
              eg:#product, #design, #development, #marketing
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            className="form_input"
            placeholder="#tag"
            required
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;

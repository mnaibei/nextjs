import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

const PromptCard = ({
  post,
  tag,
  handleTagClick,
  handleEdit,
  handleDelete,
}: {
  post: any;
  tag: any;
  handleTagClick: any;
  handleEdit: any;
  handleDelete: any;
}) => {
  const [copied, setCopied] = useState("");
  const [expanded, setExpanded] = useState(false); // State to track if card is expanded
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 2000);
  };

  const navigateToProfile = () => {
    router.push(`/profile/${post.creator._id}`);
  };

  const toggleExpand = () => {
    setExpanded((prevExpanded) => !prevExpanded); // Toggle expand state
  };

  return (
    <div
      className={`prompt_card cursor-pointer ${expanded ? "expanded" : ""}`}
      onClick={toggleExpand} // Toggle expand on click
    >
      <div className="flex justify-between items-5 gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={navigateToProfile}>
          <Image
            src={post.creator.image || "/assets/images/profile.svg"}
            alt="user_image"
            width={50}
            height={50}
            className="rounded-full bg-white"
          />
          <div className="flex flex-col w-full">
            <h2 className="font-satoshi text-gray-900 font-semibold dark:text-white">
              {post.creator.username}
            </h2>
            <p className="text-xs font-inter text-gray-500 dark:text-white">
              created: {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="copy_btn dark:bg-white" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy"
            width={20}
            height={20}
          />
        </div>
      </div>
      <p
        className={`prompt-text ${
          expanded ? "expanded" : ""
        } dark:text-white break-words mt-3`}>
        {post.prompt.length < 100
          ? post.prompt // Show full text if length is less than 100
          : expanded
          ? post.prompt
          : `${post.prompt.substring(0, 100)}...`}
      </p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer dark:text-blue-500 mt-3"
        onClick={() => handleTagClick && handleTagClick(post.tag)}>
        {post.tag}
      </p>
      {(session?.user as any)?.id === post.creator._id &&
        pathName === "/profile" && (
          <div className="mt-5 flex-end gap-4 border-t border-gray-500 dark:border-white pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}>
              Edit
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer "
              onClick={handleDelete}>
              Delete
            </p>
          </div>
        )}
    </div>
  );
};

export default PromptCard;

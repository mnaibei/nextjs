"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

const PromptCard = ({
  post,
  tag,
  handleTagClick,
}: {
  post: any;
  tag: any;
  handleTagClick: any;
}) => {
  console.log(post);
  const [copied, setCopied] = useState("");
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-5 gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <h3 className=" font-satoshi text-gray-900 font-semibold">
              {post.creator.username}
            </h3>
            <p className="text-xs font-inter text-gray-500 ">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={() => {}}>
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
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}>
        {post.tag}
      </p>
    </div>
  );
};
export default PromptCard;

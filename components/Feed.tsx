"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import useSWR from "swr"; // Import useSWR hook
import { Suspense } from "react";

const fetcher = (url: any) => fetch(url).then((res) => res.json()); // Define fetcher function

const PromptCardList = ({
  data,
  handleTagClick,
}: {
  data: any[];
  handleTagClick: (tag: string) => void;
}) => {
  console.log("data that should be showing on home page", data);
  return (
    <div className="mt-16 prompt_layout">
      {data.length > 0 ? (
        data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            tag={post.tag}
            handleTagClick={handleTagClick}
            handleEdit={() => {}}
            handleDelete={() => {}}
          />
        ))
      ) : (
        <p className="dark:text-white flex">Loading...</p>
      )}
    </div>
  );
};

export default function Feed() {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tag: string) => {
    setSearchText(tag);
  };

  // Fetch data using useSWR with Suspense support
  const { data: posts } = useSWR("/api/prompt", fetcher);

  const filteredPosts = posts
    ? posts.filter((post: any) => {
        return (
          post.tag.toLowerCase().includes(searchText.toLowerCase()) ||
          post.creator.username
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          post.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
      })
    : [];

  return (
    <section className="feed mb-6">
      <form className="relative w-full flex-center">
        <input
          type="text"
          className="search_input peer"
          placeholder="Search for a tag or user"
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>
      <Suspense fallback={<p className="dark:text-white flex">Loading...</p>}>
        <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
      </Suspense>
    </section>
  );
}

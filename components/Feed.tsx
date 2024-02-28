"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({
  data,
  handleTagClick,
}: {
  data: any[];
  handleTagClick: (tag: string) => void;
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        // @ts-ignore
        <PromptCard
          key={post._id}
          post={post}
          tag={post.tag}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
export default function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([] as any[]);
  const [filteredPosts, setFilteredPosts] = useState([] as any[]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tag: string) => {
    setSearchText(tag);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/prompt");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const filteredData = posts.filter((post) => {
      // Check if the search text matches the tag, username, or content
      return (
        post.tag.toLowerCase().includes(searchText.toLowerCase()) ||
        post.creator.username
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        post.prompt.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilteredPosts(filteredData);
  }, [posts, searchText]);

  return (
    <section className="feed">
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
      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
}

"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import Pagination from "./Pagination";

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
  const [posts, setPosts] = useState([] as any[]);
  const [filteredPosts, setFilteredPosts] = useState([] as any[]);
  const [loading, setLoading] = useState(false);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tag: string) => {
    setSearchText(tag);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/prompt", {
          cache: "no-store", // Prevent caching
        });
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch("/api/prompt", {
  //     cache: "no-store",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setPosts(data);
  //       setLoading(false);
  //       console.log(data);
  //     });
  // }, []);

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

  // Calculate the items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPosts.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the items for the current page
  // const handlePageChange = (pageNumber: number) => {
  //   setCurrentPage(pageNumber);
  // };

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
      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
      {/* <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredPosts.length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      /> */}
    </section>
  );
}

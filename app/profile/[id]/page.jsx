"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userName = userPosts[0]?.creator?.username;

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
      setLoading(false);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  if (loading) {
    return <div className="dark:text-white">Loading...</div>;
  }

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;
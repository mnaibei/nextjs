"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProfileComponent from "@components/Profile";

const Profile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState("");

  console.log((session?.user as any)?.id);
  //@ts-ignore
  console.log(session?.user?.id);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!(session?.user as any)?.id) {
        return;
      }

      try {
        const res = await fetch(
          `/api/users/${(session?.user as any)?.id}/posts`
        );
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [(session?.user as any)?.id]);

  console.log(posts);

  const handleEdit = () => {};

  const handleDelete = () => {};

  return (
    <div>
      <ProfileComponent
        name="user"
        desc="This is my profile"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Profile;

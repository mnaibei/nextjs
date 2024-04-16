"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProfileComponent from "@components/Profile";
import { Suspense } from "react";

const Profile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

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
  }, [session?.user]);

  console.log(posts);

  const handleEdit = (post: any) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: any) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p: any) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <ProfileComponent
          name="My"
          desc="This is my profile"
          data={posts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </Suspense>
    </div>
  );
};

export default Profile;

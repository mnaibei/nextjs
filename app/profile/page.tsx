"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProfileComponent from "@components/Profile";
import { Suspense } from "react";
import ConfirmationModal from "@components/ConfirmModal";

const Profile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

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

  const handleEdit = (post: any) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<any>(null);
  const handleDelete = async (post: any) => {
    setPostToDelete(post);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (postToDelete) {
      try {
        await fetch(`/api/prompt/${postToDelete._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter(
          (p: any) => p._id !== postToDelete._id
        );
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }

    // Close the modal
    setIsModalOpen(false);
  };

  const cancelDelete = () => {
    // Close the modal
    setIsModalOpen(false);
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
        {isModalOpen && (
          <ConfirmationModal
            title="Delete Post"
            message="Are you sure you want to delete this post?"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        )}
      </Suspense>
    </div>
  );
};

export default Profile;

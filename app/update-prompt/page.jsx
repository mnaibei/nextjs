"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import { Suspense } from "react";

const UpdatePrompt = () => {
  const router = useRouter();
  const [promptId, setPromptId] = useState(null);

  useEffect(() => {
    // Retrieve the query parameter after the component mounts
    const searchParams = new URLSearchParams(window.location.search);
    const queryId = searchParams.get('id');
    if (queryId) {
      setPromptId(queryId);
    }
  }, []);

  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });

      setIsLoading(false);
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </Suspense>
  );
};

export default UpdatePrompt;

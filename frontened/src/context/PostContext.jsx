import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../utils/api";
import { useAuth } from "./Auth_context";

const PostContext = createContext();

export default function PostProvider({ children }) {
  const { user } = useAuth();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all posts from backend
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await api.getPosts();
      setPosts(data);
    } catch (err) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  // Create new post
  const addPost = async (body, imageUrl) => {
    if (!user) return;

    try {
      await api.createPost({
        body,
        imageUrl,
        user_id: user.ID,
      });
      fetchPosts();
    } catch (err) {
      setError("Failed to add post");
    }
  };

  // Fetch comments for a post
  const getComments = async (postId) => {
    try {
      return await api.getComments(postId);
    } catch {
      return [];
    }
  };

  // Add comment
  const addComment = async (postId, text) => {
    if (!user) return;

    try {
      await api.addComment({
        comment_text: text,
        post_id: postId,
        user_id: user.ID,
      });
    } catch (err) {
      setError("Failed to add comment");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        addPost,
        fetchPosts,
        getComments,
        addComment,
        loading,
        error,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export const usePosts = () => useContext(PostContext);

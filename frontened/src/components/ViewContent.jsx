import React, { useState } from "react";
import { usePosts } from "../context/PostContext";
import { useAuth } from "../context/Auth_context";

function ViewContent() {
  const { posts, getComments, addComment } = usePosts();
  const { user } = useAuth();

  const [activePost, setActivePost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  if (!posts || posts.length === 0) {
    return (
      <div className="text-white text-center mt-10 text-xl">
        No content available.
      </div>
    );
  }

  const loadComments = async (postId) => {
    const data = await getComments(postId);
    setComments(data);
    setActivePost(postId);
  };

  const handleAddComment = async (postId) => {
    if (!commentText.trim()) return;

    await addComment(postId, commentText);
    setCommentText("");
    loadComments(postId);
  };

  return (
    <div className="text-white flex flex-col items-center mt-10">
      <h2 className="text-3xl font-bold mb-6">Posts</h2>

      <div className="flex flex-col gap-10 w-full items-center">
        {posts.map((item) => (
          <div key={item.id} className="w-[500px]">
            <div className="border border-gray-600 p-5 rounded-lg bg-gray-800 shadow-lg">
              <div className="text-[11px] text-gray-400">
                {item.created_at}
              </div>

              <h3 className="text-xl font-bold text-yellow-300">
                {item.author}
              </h3>

              <p className="mt-2 text-gray-300">{item.body}</p>

              {item.image_url && (
                <img
                  src={item.image_url}
                  alt=""
                  className="mt-3 w-full h-40 object-cover rounded-lg"
                />
              )}

              {/* <button
                onClick={() => loadComments(item.id)}
                className="mt-3 text-blue-400"
              >
                View Comments
              </button> */}

              {activePost === item.id && (
                <div className="mt-4">
                  <div className="space-y-2 text-sm">
                    {comments.map((c) => (
                      <div key={c.id}>
                        <strong>{c.author}</strong>: {c.commentText}
                      </div>
                    ))}
                  </div>

                  {user && (
                    <div className="mt-3 flex gap-2">
                      <input
                        className="flex-1 p-2 bg-gray-700 rounded"
                        placeholder="Write a comment"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                      <button
                        onClick={() => handleAddComment(item.id)}
                        className="bg-blue-600 px-3 rounded"
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewContent;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth_context";
import { usePosts } from "../context/PostContext";
import isNotEmpty from "../utils/validation";

function AddContent() {
  const { addPost } = usePosts();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [body, setBody] = useState("");
  const [imgurl, setImgurl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const draft = localStorage.getItem("contentDraft");
    if (draft) {
      try {
        const { body, imgurl } = JSON.parse(draft);
        setBody(body || "");
        setImgurl(imgurl || "");
      } catch {}
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isNotEmpty(body)) {
      setError("Body is required");
      return;
    }

    if (!user) {
      setError("Please login first");
      return;
    }

    await addPost(body, imgurl);

    setBody("");
    setImgurl("");
    setError("");
    localStorage.removeItem("contentDraft");

    navigate("/view");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-bold text-center mb-6">Add Content</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium mb-1">Enter Body:</label>
          <textarea
            className="w-full p-2 border border-gray-500 rounded-lg bg-gray-700 text-white h-28"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Body"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Enter Image URL:</label>
          <input
            className="w-full p-2 border border-gray-500 rounded-lg bg-gray-700 text-white"
            type="url"
            value={imgurl}
            onChange={(e) => setImgurl(e.target.value)}
            placeholder="Image URL"
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
          Post
        </button>
      </form>
    </div>
  );
}

export default AddContent;

// CHANGE THIS when backend is deployed
const API_BASE_URL = "";  

export const api = {
  // AUTH
  register: (data) =>
    fetch(`${API_BASE_URL}/api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  login: (data) =>
    fetch(`${API_BASE_URL}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(async res => {
      const json = await res.json();
      if (!res.ok) throw json;
      return json;
    }),

  // POSTS
  getPosts: () =>
    fetch(`${API_BASE_URL}/api/posts`)
      .then(res => res.json()),

  createPost: (data) =>
    fetch(`${API_BASE_URL}/api/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(res => res.json()),

  // COMMENTS
  getComments: (postId) =>
    fetch(`${API_BASE_URL}/api/comments/post/${postId}`)
      .then(res => res.json()),

  addComment: (data) =>
    fetch(`${API_BASE_URL}/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(res => res.json()),
};

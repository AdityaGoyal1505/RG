const API_URL = "http://localhost:5000/api/posts";

async function loadPosts() {
  const res = await fetch(API_URL);
  const posts = await res.json();
  const container = document.getElementById("posts-container");
  posts.forEach(post => {
    container.innerHTML += `
      <div>
        <h3><a href="post.html?id=${post._id}">${post.title}</a></h3>
        <p>${post.content.slice(0, 100)}...</p>
      </div>`;
  });
}

async function loadSinglePost() {
  const id = new URLSearchParams(window.location.search).get("id");
  const res = await fetch(`${API_URL}/${id}`);
  const post = await res.json();
  const detail = document.getElementById("post-detail");
  detail.innerHTML = `
    <h2>${post.title}</h2>
    <img src="${post.image}" width="300" />
    <p>${post.content}</p>
    <small>${post.tags.join(", ")}</small>`;
}

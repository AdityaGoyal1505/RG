const API_BASE = "http://localhost:5000/api/posts";
const user = document.getElementById("admin-username");
async function loadDashboard() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }
  const res = await fetch(API_BASE, {
    headers: { "Authorization": `Bearer ${token}` }
  });

  user.innerText = localStorage.getItem("username") || "Admin";
  const posts = await res.json();
  const list = document.getElementById("post-list");
  posts.forEach(post => {
    list.innerHTML += `
      <div id="post">
        <h3>${post.title}</h3>
        <button onclick="editPost('${post._id}')">Edit</button>
        <button onclick="deletePost('${post._id}')">Delete</button>
      </div>`;
  });
}

function editPost(id) {
  window.location.href = `edit-post.html?id=${id}`;
}

async function deletePost(id) {
  await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  alert("Deleted!");
  location.reload();
}

async function submitPost(e) {
  e.preventDefault();
  const post = {
    title: document.getElementById("title").value,
    image: document.getElementById("image").value,
    content: document.getElementById("content").value,
    tags: document.getElementById("tags").value.split(",").map(tag => tag.trim())
  };
  await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post)
  });
  alert("Post Created!");
  window.location.href = "dashboard.html";
}

async function loadPostForEdit() {
  const id = new URLSearchParams(window.location.search).get("id");
  const res = await fetch(`${API_BASE}/${id}`);
  const post = await res.json();
  document.getElementById("title").value = post.title;
  document.getElementById("image").value = post.image;
  document.getElementById("content").value = post.content;
  document.getElementById("tags").value = post.tags.join(", ");
}

async function updatePost(e) {
  e.preventDefault();
  const id = new URLSearchParams(window.location.search).get("id");
  const updated = {
    title: document.getElementById("title").value,
    image: document.getElementById("image").value,
    content: document.getElementById("content").value,
    tags: document.getElementById("tags").value.split(",").map(tag => tag.trim())
  };
  await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated)
  });
  alert("Updated!");
  window.location.href = "dashboard.html";
}

const API_URL = "http://localhost:5000/api/posts";

async function loadPosts() {
  const res = await fetch(API_URL);
  const posts = await res.json();
  const container = document.getElementById("posts-container");
  posts.forEach(post => {
    container.innerHTML += `
      <div id="post">
        <h3><a href="post.html?id=${post._id}">${post.title}</a></h3>
        <p>${post.content.slice(0, 100)}...</p>
      </div>`;
  });
};


async function loadSinglePost() {
  const id = new URLSearchParams(window.location.search).get("id");
  const res = await fetch(`${API_URL}/${id}`);
  const post = await res.json();
  console.log("Image URL:", post.imageUrl);
  console.log("Full path:", `http://localhost:5000${post.imageUrl}`);
  const detail = document.getElementById("post-detail");
  detail.innerHTML = `
    <h2>${post.title}</h2>
    <img src="http://localhost:5000${post.imageUrl}" width="300" />
    <p><strong>Author:</strong> ${post.author}</p>
    <p><strong>Affiliation:</strong> ${post.affiliation}</p>
    <p><strong>LinkedIn:</strong> <a href="${post.link}" target="_blank">${post.link}</a></p>
    <p>${post.content}</p>
    <small>${post.tags.join(", ")}</small>`;
}

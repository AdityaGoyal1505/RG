async function login(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (data.token) {
  localStorage.setItem("token", data.token);
  localStorage.setItem("username", username); // Add this line
  localStorage.setItem("name", data.name); // Store admin status
  window.location.href = "dashboard.html";
} else {
  alert(data.error || "Login failed");
}
}


async function register(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  const res = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, email, name, phone }),
  });

  let data;
  try {
    data = await res.json();
  } catch {
    alert("Invalid server response");
    return;
  }

  if (res.ok && data.message === "Admin registered") {
  alert("Registration successful! Please login.");
  window.location.href = "login.html";
  } else {
    alert(data.error || "Registration failed");
    console.log("Registration error:", data);
  }
}
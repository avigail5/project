export async function loginUser(credentials: any) {
  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  return response.json();
}

export function redirectToGoogleLogin() {
  window.location.href = "http://localhost:3000/auth/google";
}

export async function registerUser(data: {
  username: string;
  email: string;
  password: string;
}) {
  const res = await fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return await res.json();
}

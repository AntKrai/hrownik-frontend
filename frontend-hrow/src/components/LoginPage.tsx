import { useState } from "react";

interface LoginPageProps {
  onLogin: (role: "admin" | "worker") => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy authentication logic
    if (username === "admin" && password === "admin") {
      onLogin("admin");
    } else if (username === "worker" && password === "worker") {
      onLogin("worker");
    } else {
      alert("Invalid credentials");
    }
  };
  return (
    <div className="login-container">
      <h2 className="text-xl mb-4">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-2 w-64">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-field"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-field"
        />

        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
    </div>
  );
}

"use client";

import { FormEvent, useState } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ username, password }) });
      if (!response.ok) {
        const result = await response.json().catch(() => ({})) as { error?: string };
        setError(result.error ?? "Sign-in failed. Please try again.");
        return;
      }
      window.location.assign("/");
    } catch {
      setError("Unable to sign in right now. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="login-card" onSubmit={submit}>
      <div className="login-symbol">J</div>
      <p className="login-kicker">PRIVATE SPACE</p>
      <h1>Between Us</h1>
      <p className="login-copy">A quiet space just for mom and JJ</p>
      <label>Username<input autoCapitalize="none" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="mom or JJ" required /></label>
      <label>Password<input autoComplete="current-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" required /></label>
      {error && <p className="login-error" role="alert">{error}</p>}
      <button type="submit" disabled={loading}>{loading ? "Signing in…" : "Enter our space"}</button>
      <small>You will stay signed in on this device for 30 days</small>
    </form>
  );
}

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
        setError(result.error ?? "登录失败，请重试");
        return;
      }
      window.location.assign("/");
    } catch {
      setError("暂时无法登录，请稍后重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="login-card" onSubmit={submit}>
      <div className="login-symbol">J</div>
      <p className="login-kicker">PRIVATE SPACE</p>
      <h1>我们之间</h1>
      <p className="login-copy">只属于 mom 和 JJ 的安静角落</p>
      <label>用户名<input autoCapitalize="none" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="mom 或 JJ" required /></label>
      <label>密码<input autoComplete="current-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="请输入密码" required /></label>
      {error && <p className="login-error" role="alert">{error}</p>}
      <button type="submit" disabled={loading}>{loading ? "正在进入…" : "进入我们的空间"}</button>
      <small>登录状态会在这台设备上保留 30 天</small>
    </form>
  );
}

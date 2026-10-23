"use client";

import { useEffect, useRef, useState } from "react";
import { Image as ImageIcon, Mic, Paperclip, Play, Send, Square, Video, X } from "lucide-react";

type User = { id: string; name: string; email: string };
type Message = {
  id: number;
  authorId: string;
  authorName: string;
  content: string;
  type: "text" | "image" | "video" | "audio";
  mediaUrl?: string | null;
  createdAt: string;
  replyTo?: number | null;
  replyContent?: string | null;
  replyAuthor?: string | null;
};
type Peer = { id: string; name: string; isOnline?: boolean; lastSeenAt?: string | null };

function formatTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

function presenceText(peer: Peer | null, fallbackName: string) {
  if (!peer) return `${fallbackName} has not joined yet`;
  if (peer.isOnline) return "Online now";
  if (!peer.lastSeenAt) return "Has not been online yet";
  const date = new Date(peer.lastSeenAt);
  const sameDay = date.toDateString() === new Date().toDateString();
  return `Last seen ${sameDay ? "today at " : ""}${date.toLocaleString("en-US", sameDay
    ? { hour: "2-digit", minute: "2-digit" }
    : { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}`;
}

export default function ChatRoom({ currentUser }: { currentUser: User }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [peer, setPeer] = useState<Peer | null>(null);
  const [text, setText] = useState("");
  const [reply, setReply] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const endRef = useRef<HTMLDivElement>(null);
  const fallbackPeerName = currentUser.id.toLowerCase() === "jj" ? "mom" : "JJ";
  const canViewPeerActivity = currentUser.id === "mom";
  const peerName = peer?.name ?? fallbackPeerName;
  const status = canViewPeerActivity ? presenceText(peer, fallbackPeerName) : "Private member";

  async function load() {
    try {
      const res = await fetch("/api/messages", { cache: "no-store" });
      if (!res.ok) throw new Error();
      const data = await res.json() as { messages?: Message[]; peer?: Peer | null };
      setMessages(data.messages ?? []);
      setPeer(data.peer ?? null);
      setError("");
    } catch {
      setError("Unable to sync messages right now. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const initial = window.setTimeout(load, 0);
    const timer = window.setInterval(() => { if (document.visibilityState === "visible") load(); }, 4000);
    const refresh = () => { if (document.visibilityState === "visible") load(); };
    document.addEventListener("visibilitychange", refresh);
    return () => { window.clearTimeout(initial); window.clearInterval(timer); document.removeEventListener("visibilitychange", refresh); };
  }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages.length]);

  async function send(payload?: { type: Message["type"]; content: string; mediaUrl?: string }) {
    const body = payload ?? { type: "text" as const, content: text.trim() };
    if (!body.content && !body.mediaUrl) return;
    setText("");
    const res = await fetch("/api/messages", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...body, replyTo: reply?.id && reply.id > 0 ? reply.id : null }) });
    setReply(null);
    if (res.ok) await load(); else setError("Message failed to send. Please try again.");
  }

  async function removeMessage(message: Message) {
    if (!window.confirm("Delete this message? This cannot be undone.")) return;
    const res = await fetch(`/api/messages?id=${message.id}`, { method: "DELETE" });
    if (res.ok) {
      setMessages(current => current.filter(item => item.id !== message.id));
      if (reply?.id === message.id) setReply(null);
    } else setError("Message could not be deleted. Please try again.");
  }

  async function upload(file: File) {
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: form });
      if (!res.ok) throw new Error();
      const data = await res.json() as { url: string };
      const type = file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : "audio";
      await send({ type, content: file.name.replace(/\.[^.]+$/, ""), mediaUrl: data.url });
    } catch {
      setError("Upload failed. Check the file size and try again.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function toggleRecording() {
    if (recording) { recorderRef.current?.stop(); return; }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = event => chunksRef.current.push(event.data);
      recorder.onstop = async () => {
        stream.getTracks().forEach(track => track.stop());
        setRecording(false);
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        await upload(new File([blob], `voice-${Date.now()}.webm`, { type: blob.type }));
      };
      recorder.start();
      recorderRef.current = recorder;
      setRecording(true);
    } catch {
      setError("Microphone permission is required to record audio.");
    }
  }

  return <main className="shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">J</span><div><strong>Between Us</strong><small>Just for mom and JJ</small></div></div>
      <div className="today-card"><span>TODAY</span><strong>Leave what you want<br />to say right here.</strong><small>Your messages stay safely between you</small></div>
      <div className="members"><p>MEMBERS · 2</p>
        <div className="member"><span className="avatar peach">ME</span><div><b>{currentUser.name}</b><small>Online</small></div><i className="online" /></div>
        <div className="member"><span className="avatar blue">{peerName.slice(0, 2).toUpperCase()}</span><div><b>{peerName}</b><small>{status}</small></div>{canViewPeerActivity && <i className={peer?.isOnline ? "online" : "offline"} />}</div>
      </div>
      <a className="account" href="/api/auth/logout">Sign out</a>
    </aside>
    <section className="conversation">
      <header className="chat-header"><div><h1>{peerName}</h1><p>{canViewPeerActivity && <span className={peer?.isOnline ? "online" : "offline"} />} {canViewPeerActivity ? status : "Our private conversation"}</p></div><div className="day-pill">Today</div></header>
      <div className="messages" aria-live="polite">
        <div className="date-line"><span>Today</span></div>
        {!loading && !messages.length && <div className="welcome"><span>✦</span><h2>Start with the first hello</h2><p>This space is ready for your conversation.</p></div>}
        {messages.map(message => {
          const mine = message.authorId === currentUser.id || message.authorId === "me";
          return <article key={message.id} className={`message-row ${mine ? "mine" : "theirs"}`}>
            {!mine && <span className="avatar blue small">{peerName.slice(0, 2).toUpperCase()}</span>}
            <div className="message-wrap">
              <div className={`bubble ${message.type !== "text" ? "media-bubble" : ""}`}>
                {message.replyTo && <div className="reply-quote"><b>{message.replyAuthor}</b>{message.replyContent}</div>}
                {message.type === "image" && (message.mediaUrl ? <img src={message.mediaUrl} alt={message.content} /> : <div className="photo-placeholder"><ImageIcon size={28} /><span>Image message</span></div>)}
                {message.type === "video" && message.mediaUrl && <video controls src={message.mediaUrl} />}
                {message.type === "audio" && (message.mediaUrl ? <audio controls src={message.mediaUrl} /> : <div className="audio"><button aria-label="Play audio"><Play size={14} fill="currentColor" /></button><span className="wave">▂▄▅▃▆▄▂▅▃▆</span><small>0:08</small></div>)}
                {message.content && <p>{message.content}</p>}
              </div>
              <div className="meta">
                <time>{formatTime(message.createdAt)}</time>
                <button onClick={() => setReply(message)}>Reply</button>
                {mine && message.id > 0 && <button onClick={() => removeMessage(message)}>Delete</button>}
              </div>
            </div>
          </article>;
        })}
        <div ref={endRef} />
      </div>
      <footer className="composer-area">
        {error && <div className="error">{error}<button aria-label="Dismiss error" onClick={() => setError("")}><X size={14} /></button></div>}
        {reply && <div className="replying"><div><b>Replying to {reply.authorName}</b><span>{reply.content || `${reply.type} message`}</span></div><button aria-label="Cancel reply" onClick={() => setReply(null)}><X size={16} /></button></div>}
        <div className="composer"><textarea value={text} onChange={event => setText(event.target.value)} onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); send(); } }} placeholder={`Write something to ${peerName}…`} rows={1} />
          <div className="composer-actions"><div><input ref={fileRef} hidden type="file" accept="image/*,video/*,audio/*" onChange={event => event.target.files?.[0] && upload(event.target.files[0])} /><button aria-label="Attach a file" onClick={() => fileRef.current?.click()} disabled={uploading}><Paperclip size={19} /></button><button aria-label="Add an image" onClick={() => { if (fileRef.current) { fileRef.current.accept = "image/*"; fileRef.current.click(); } }}><ImageIcon size={19} /></button><button aria-label="Add a video" onClick={() => { if (fileRef.current) { fileRef.current.accept = "video/*"; fileRef.current.click(); } }}><Video size={19} /></button><button className={recording ? "recording" : ""} aria-label={recording ? "Stop recording" : "Record audio"} onClick={toggleRecording}>{recording ? <Square size={16} fill="currentColor" /> : <Mic size={19} />}</button></div><button className="send" onClick={() => send()} disabled={!text.trim() || uploading}><Send size={18} /><span>Send</span></button></div>
        </div><p className="hint">Enter to send · Shift + Enter for a new line · Images/videos up to 25 MB</p>
      </footer>
    </section>
  </main>;
}

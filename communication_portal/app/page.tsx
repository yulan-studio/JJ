import { requireCloudflareUser } from "./cloudflare-auth";
import ChatRoom from "./chat-room";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await requireCloudflareUser();
  return <ChatRoom currentUser={{ id: user.userId, name: user.displayName, email: user.email }} />;
}

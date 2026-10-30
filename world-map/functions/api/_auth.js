const enc = new TextEncoder();
const cookieName = 'jj_session';
async function sign(value, secret) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), {name:'HMAC',hash:'SHA-256'}, false, ['sign']);
  const bytes = new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(value)));
  return btoa(String.fromCharCode(...bytes)).replaceAll('+','-').replaceAll('/','_').replaceAll('=','');
}
export async function createSession(user, secret) { const payload=btoa(JSON.stringify({id:user.id,username:user.username,exp:Date.now()+604800000})); return `${payload}.${await sign(payload,secret)}`; }
export async function getSession(request, secret) {
  const raw=request.headers.get('Cookie')?.match(/jj_session=([^;]+)/)?.[1]; if(!raw)return null;
  const [payload,signature]=raw.split('.'); if(!payload||signature!==await sign(payload,secret))return null;
  try { const data=JSON.parse(atob(payload)); return data.exp>Date.now()?data:null; } catch { return null; }
}
export const setCookie=token=>`jj_session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`;
export const clearCookie='jj_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0';

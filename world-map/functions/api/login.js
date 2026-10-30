import {createSession,setCookie} from './_auth.js';
const keys={'dad':'FAMILY_DAD_PASSWORD','mom':'FAMILY_MOM_PASSWORD','jj':'FAMILY_JJ_PASSWORD','doudou':'FAMILY_DOUDOU_PASSWORD'};
export async function onRequestPost({request,env}) {
  const body=await request.json().catch(()=>({})), username=String(body.username||''), password=String(body.password||'');
  if(!keys[username]||!env[keys[username]]||password!==env[keys[username]])return Response.json({error:'用户名或密码不正确'},{status:401});
  let user=await env.DB.prepare('SELECT id,username FROM users WHERE username=?').bind(username).first();
  if(!user){await env.DB.prepare('INSERT INTO users(username,password_hash) VALUES(?,?)').bind(username,'managed-by-cloudflare-secret').run(); user=await env.DB.prepare('SELECT id,username FROM users WHERE username=?').bind(username).first();}
  return new Response(JSON.stringify({username}),{headers:{'Content-Type':'application/json','Set-Cookie':setCookie(await createSession(user,env.SESSION_SECRET))}});
}

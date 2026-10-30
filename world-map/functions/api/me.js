import {getSession} from './_auth.js';
export async function onRequestGet({request,env}) { const session=await getSession(request,env.SESSION_SECRET); return Response.json(session||{user:null},{status:session?200:401}); }

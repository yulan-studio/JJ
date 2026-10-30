import {clearCookie} from './_auth.js';
export async function onRequestPost(){return new Response('{}',{headers:{'Content-Type':'application/json','Set-Cookie':clearCookie}});}

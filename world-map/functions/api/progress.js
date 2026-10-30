import {getSession} from './_auth.js';
export async function onRequestPost({request,env}) {
  const session=await getSession(request,env.SESSION_SECRET); if(!session)return Response.json({error:'未登录'},{status:401});
  const body=await request.json(), correct=Boolean(body.correct), countryId=Number(body.countryId);
  await env.DB.prepare(`INSERT INTO country_progress(user_id,country_id,correct_count,wrong_count,last_result) VALUES(?,?,?,?,?) ON CONFLICT(user_id,country_id) DO UPDATE SET correct_count=correct_count+excluded.correct_count,wrong_count=wrong_count+excluded.wrong_count,last_result=excluded.last_result,last_played_at=CURRENT_TIMESTAMP`).bind(session.id,countryId,correct?1:0,correct?0:1,correct?'correct':'wrong').run();
  return Response.json({ok:true});
}

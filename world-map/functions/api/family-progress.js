import {getSession} from './_auth.js';
export async function onRequestGet({request,env}) {
  if(!await getSession(request,env.SESSION_SECRET))return Response.json({error:'未登录'},{status:401});
  const result=await env.DB.prepare(`SELECT u.username,COALESCE(SUM(p.correct_count),0) AS correct_answers,COALESCE(SUM(p.wrong_count),0) AS wrong_answers,COALESCE(SUM(CASE WHEN p.last_result='correct' THEN 1 ELSE 0 END),0) AS mastered_countries FROM users u LEFT JOIN country_progress p ON p.user_id=u.id GROUP BY u.id,u.username ORDER BY mastered_countries DESC`).all();
  return Response.json(result.results);
}

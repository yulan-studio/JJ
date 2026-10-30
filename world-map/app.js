const countryInfo = {
  4:['阿富汗','亚洲'],12:['阿尔及利亚','非洲'],24:['安哥拉','非洲'],32:['阿根廷','南美洲'],36:['澳大利亚','大洋洲'],40:['奥地利','欧洲'],50:['孟加拉国','亚洲'],56:['比利时','欧洲'],68:['玻利维亚','南美洲'],76:['巴西','南美洲'],100:['保加利亚','欧洲'],116:['柬埔寨','亚洲'],120:['喀麦隆','非洲'],124:['加拿大','北美洲'],152:['智利','南美洲'],156:['中国','亚洲'],170:['哥伦比亚','南美洲'],180:['刚果（金）','非洲'],192:['古巴','北美洲'],203:['捷克','欧洲'],208:['丹麦','欧洲'],218:['厄瓜多尔','南美洲'],818:['埃及','非洲'],231:['埃塞俄比亚','非洲'],246:['芬兰','欧洲'],250:['法国','欧洲'],276:['德国','欧洲'],288:['加纳','非洲'],300:['希腊','欧洲'],304:['格陵兰','北美洲'],356:['印度','亚洲'],360:['印度尼西亚','亚洲'],364:['伊朗','亚洲'],368:['伊拉克','亚洲'],372:['爱尔兰','欧洲'],376:['以色列','亚洲'],380:['意大利','欧洲'],392:['日本','亚洲'],398:['哈萨克斯坦','亚洲'],404:['肯尼亚','非洲'],410:['韩国','亚洲'],458:['马来西亚','亚洲'],484:['墨西哥','北美洲'],496:['蒙古','亚洲'],504:['摩洛哥','非洲'],508:['莫桑比克','非洲'],524:['尼泊尔','亚洲'],528:['荷兰','欧洲'],554:['新西兰','大洋洲'],566:['尼日利亚','非洲'],578:['挪威','欧洲'],586:['巴基斯坦','亚洲'],591:['巴拿马','北美洲'],604:['秘鲁','南美洲'],608:['菲律宾','亚洲'],616:['波兰','欧洲'],620:['葡萄牙','欧洲'],642:['罗马尼亚','欧洲'],643:['俄罗斯','欧洲和亚洲'],682:['沙特阿拉伯','亚洲'],710:['南非','非洲'],724:['西班牙','欧洲'],752:['瑞典','欧洲'],756:['瑞士','欧洲'],764:['泰国','亚洲'],792:['土耳其','欧洲和亚洲'],804:['乌克兰','欧洲'],826:['英国','欧洲'],834:['坦桑尼亚','非洲'],840:['美国','北美洲'],858:['乌拉圭','南美洲'],862:['委内瑞拉','南美洲'],704:['越南','亚洲'],894:['赞比亚','非洲'],716:['津巴布韦','非洲']
};

const continentEn={'亚洲':'Asia','非洲':'Africa','南美洲':'South America','北美洲':'North America','欧洲':'Europe','大洋洲':'Oceania','欧洲和亚洲':'Europe and Asia'};
const ui={
  zh:{eyebrow:'地理小挑战',title:'世界在哪里？',subtitle:'看题目，在地图上找到正确的国家。',restart:'重新开始',logout:'退出登录',loginTitle:'家庭登录',loginHint:'请选择名字并输入密码开始游戏',password:'密码',login:'登录',loginFailed:'用户名或密码不正确',score:'得分',question:'题目',streak:'连对',timer:'本题剩余',instruction:'请在地图上找到：',hint:'提示：位于',choose:'点击地图上的国家开始答题',correct:'答对了！',inWord:'在',points:'分',wrong:'差一点！你选择了',answer:'，正确答案是',next:'下一题',complete:'挑战完成',finalPrefix:'你的得分是',playAgain:'再玩一次',loading:'正在加载详细世界地图…',loadError:'地图加载失败，请检查网络连接后刷新页面。',great:'太棒了，你是地图高手！',good:'不错！再玩一次，你会记住更多国家。',practice:'继续练习，很快就能环游世界啦！',select:'选择',learn:'国家小知识',founded:'成立/独立',population:'人口（约）',special:'特别之处',famous:'著名地点',speak:'🔊 朗读',stopSpeak:'⏹ 停止朗读',family:'家庭进度',familyCorrect:'已掌握',familyRight:'答对',familyWrong:'答错',timeout:'时间到！',stats:(correct,total,best)=>`答对 ${correct}/${total} 题 · 正确率 ${Math.round(correct/total*100)}% · 最高连对 ${best}`},
  en:{eyebrow:'GEOGRAPHY CHALLENGE',title:'Where in the World?',subtitle:'Read the question and find the correct country on the map.',restart:'Restart',logout:'Log out',loginTitle:'Family login',loginHint:'Choose a name and enter a password to play',password:'Password',login:'Log in',loginFailed:'Incorrect username or password',score:'Score',question:'Question',streak:'Streak',timer:'Time left',instruction:'Find this country on the map:',hint:'Hint: Located in ',choose:'Click a country on the map to answer',correct:'Correct! ',inWord:' is in ',points:'points',wrong:'Not quite! You selected ',answer:'. The correct answer is ',next:'Next question',complete:'Challenge complete',finalPrefix:'Your score is',playAgain:'Play again',loading:'Loading the detailed world map…',loadError:'The map could not load. Check your connection and refresh the page.',great:'Excellent — you are a map master!',good:'Nice work! Play again to learn even more countries.',practice:'Keep practising — you will know the world in no time!',select:'Select',learn:'Country facts',founded:'Founded / independent',population:'Population (approx.)',special:'What makes it special',famous:'Famous places',speak:'🔊 Read aloud',stopSpeak:'⏹ Stop reading',family:'Family progress',familyCorrect:'Mastered',familyRight:'Correct',familyWrong:'Wrong',timeout:'Time’s up!',correctList:'Correct countries',wrongList:'Missed countries',stats:(correct,total,best)=>`${correct}/${total} correct · ${Math.round(correct/total*100)}% accuracy · Best streak ${best}`}
};

const scoreEl=document.querySelector('#score'), streakEl=document.querySelector('#streak');
const questionNumberEl=document.querySelector('#questionNumber'), promptEl=document.querySelector('#countryPrompt');
const hintEl=document.querySelector('#hint'), feedbackEl=document.querySelector('#feedback');
const nextBtn=document.querySelector('#nextBtn'), gameOver=document.querySelector('#gameOver');
const mapCard=document.querySelector('.map-card'), countryLayer=d3.select('#countryLayer');
const timerEl=document.querySelector('#timer'), timerBox=document.querySelector('.timer-box'), learningCard=document.querySelector('#learningCard'), learningContent=document.querySelector('#learningContent'), speakBtn=document.querySelector('#speakBtn');
let availableCountries=[],questions=[],current=0,score=0,streak=0,bestStreak=0,correctAnswers=0,answered=false,language='zh',lastAnswer=null,timeLeft=20,timerId=null,liveFacts={},correctCountries=[],wrongCountries=[],userProgress={};

const countryFacts={124:{capital:'渥太华',year:'1867',population:'约 4,000 万',special:'海岸线非常长，湖泊数量也很多。',famous:'班夫国家公园、尼亚加拉瀑布'},156:{capital:'北京',year:'1949',population:'约 14.1 亿',special:'拥有长城和悠久的文明历史。',famous:'长城、故宫、兵马俑'},840:{capital:'华盛顿特区',year:'1776',population:'约 3.4 亿',special:'由 50 个州组成，科技和文化影响力很大。',famous:'纽约、黄石国家公园、大峡谷'},392:{capital:'东京',year:'660 BCE（传统纪年）',population:'约 1.2 亿',special:'由数千个岛屿组成，地震和火山活动较多。',famous:'富士山、京都、东京'},250:{capital:'巴黎',year:'843',population:'约 6,800 万',special:'以艺术、美食、时尚和历史建筑闻名。',famous:'埃菲尔铁塔、卢浮宫、凡尔赛宫'},276:{capital:'柏林',year:'1871',population:'约 8,400 万',special:'位于欧洲中心，是重要的工业和文化国家。',famous:'柏林墙遗址、新天鹅堡、科隆大教堂'},36:{capital:'堪培拉',year:'1901',population:'约 2,700 万',special:'一个国家同时也是一块大陆，拥有独特的动物。',famous:'大堡礁、悉尼歌剧院、乌鲁鲁'},76:{capital:'巴西利亚',year:'1822',population:'约 2.2 亿',special:'是南美洲面积最大的国家，亚马孙雨林位于这里。',famous:'里约热内卢、亚马孙雨林、伊瓜苏瀑布'},710:{capital:'比勒陀利亚',year:'1910',population:'约 6,200 万',special:'拥有三个首都，也是多种生态环境的交汇处。',famous:'克鲁格国家公园、桌山、好望角'},643:{capital:'莫斯科',year:'1991（现代俄罗斯）',population:'约 1.4 亿',special:'横跨欧洲和亚洲，是世界面积最大的国家。',famous:'红场、贝加尔湖、冬宫'},356:{capital:'新德里',year:'1947',population:'约 14.5 亿',special:'拥有多种语言、宗教和文化传统。',famous:'泰姬陵、瓦拉纳西、喜马拉雅山'},826:{capital:'伦敦',year:'1707（大不列颠王国）',population:'约 6,900 万',special:'现代议会制度和工业革命的重要发源地。',famous:'大本钟、伦敦塔桥、巨石阵'},724:{capital:'马德里',year:'1479',population:'约 4,800 万',special:'拥有丰富的建筑、音乐和足球文化。',famous:'圣家堂、阿尔罕布拉宫、马德里'},380:{capital:'罗马',year:'1861',population:'约 5,900 万',special:'古罗马文明对欧洲历史影响深远。',famous:'斗兽场、威尼斯、比萨斜塔'},528:{capital:'阿姆斯特丹',year:'1815',population:'约 1,800 万',special:'以运河、自行车和低地景观闻名。',famous:'阿姆斯特丹运河、风车村、库肯霍夫'} };
const countryFactsEn={124:{capital:'Ottawa',year:'1867',population:'about 40 million',special:'It has the world’s longest coastline and many lakes.',famous:'Banff National Park and Niagara Falls'},156:{capital:'Beijing',year:'1949',population:'about 1.41 billion',special:'It is home to the Great Wall and a very long recorded history.',famous:'The Great Wall, the Forbidden City and the Terracotta Army'},840:{capital:'Washington, D.C.',year:'1776',population:'about 340 million',special:'It is made up of 50 states and has major global influence in science and culture.',famous:'New York, Yellowstone National Park and the Grand Canyon'},392:{capital:'Tokyo',year:'660 BCE (traditional date)',population:'about 120 million',special:'It is made up of thousands of islands and has many volcanoes and earthquakes.',famous:'Mount Fuji, Kyoto and Tokyo'},250:{capital:'Paris',year:'843',population:'about 68 million',special:'It is famous for art, food, fashion and historic architecture.',famous:'The Eiffel Tower, the Louvre and Versailles'},276:{capital:'Berlin',year:'1871',population:'about 84 million',special:'It sits in the heart of Europe and is an important industrial and cultural country.',famous:'The Berlin Wall Memorial, Neuschwanstein Castle and Cologne Cathedral'},36:{capital:'Canberra',year:'1901',population:'about 27 million',special:'It is both a country and a continent, with unique wildlife.',famous:'The Great Barrier Reef, the Sydney Opera House and Uluru'},76:{capital:'Brasília',year:'1822',population:'about 220 million',special:'It is South America’s largest country and contains much of the Amazon rainforest.',famous:'Rio de Janeiro, the Amazon rainforest and Iguazu Falls'},710:{capital:'Pretoria',year:'1910',population:'about 62 million',special:'It has three capital cities and a remarkable range of ecosystems.',famous:'Kruger National Park, Table Mountain and the Cape of Good Hope'},643:{capital:'Moscow',year:'1991 (modern Russia)',population:'about 140 million',special:'It spans Europe and Asia and is the world’s largest country by area.',famous:'Red Square, Lake Baikal and the Hermitage Museum'},356:{capital:'New Delhi',year:'1947',population:'about 1.45 billion',special:'It has a rich mix of languages, religions and cultural traditions.',famous:'The Taj Mahal, Varanasi and the Himalayas'},826:{capital:'London',year:'1707 (Kingdom of Great Britain)',population:'about 69 million',special:'It played an important role in the development of parliamentary government and the Industrial Revolution.',famous:'Big Ben, Tower Bridge and Stonehenge'},724:{capital:'Madrid',year:'1479',population:'about 48 million',special:'It is known for its architecture, music, food and football culture.',famous:'The Sagrada Família, the Alhambra and Madrid'},380:{capital:'Rome',year:'1861',population:'about 59 million',special:'Ancient Roman civilisation had a lasting influence on European history.',famous:'The Colosseum, Venice and the Leaning Tower of Pisa'},528:{capital:'Amsterdam',year:'1815',population:'about 18 million',special:'It is famous for canals, bicycles and low-lying landscapes.',famous:'Amsterdam’s canals, windmills and Keukenhof'} };

function getCountryFact(country){
  const custom=language==='zh'?countryFacts[country.id]:countryFactsEn[country.id];
  const live=liveFacts[country.id]||{};
  const liveSpecial=language==='zh'?`${live.landlocked?'内陆国家':'拥有海岸线'}，位于${country.continent}。`:`${live.landlocked?'A landlocked country':'A country with a coastline'} in ${continentName(country)}.`;
  return {special:custom?.special||liveSpecial,overview:live[language==='zh'?'overviewZh':'overviewEn']||''};
}

async function loadLiveFacts(){
  try{
    const response=await fetch('https://restcountries.com/v3.1/all?fields=name,capital,population,region,landlocked,borders');
    if(!response.ok)throw new Error('country data unavailable');
    const countries=await response.json();
    const byName=new Map(countries.map(item=>[String(item.name?.common||'').toLowerCase(),item]));
    availableCountries.forEach(country=>{
      const item=byName.get(String(country.nameEn||'').toLowerCase());
      if(!item)return;
      liveFacts[country.id]={capital:item.capital?.[0]||'—',landlocked:Boolean(item.landlocked),neighbors:item.borders?.length||0};
    });
  }catch(error){
    console.warn('Live country facts could not be loaded; using built-in facts.',error);
  }
}

async function loadWikipediaOverview(country){
  const live=liveFacts[country.id]||{};
  const key=language==='zh'?'overviewZh':'overviewEn';
  if(live[key]||live[`${key}Loading`])return;
  live[`${key}Loading`]=true;liveFacts[country.id]=live;
  const title=encodeURIComponent(language==='zh'?country.name:country.nameEn);
  try{
    const url=language==='zh'
      ?`https://zh.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=1&explaintext=1&format=json&formatversion=2&origin=*&variant=zh-cn&titles=${title}`
      :`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`;
    const response=await fetch(url);
    if(response.ok){
      const data=await response.json();
      live[key]=language==='zh'?(data.query?.pages?.[0]?.extract||''):(data.extract||'');
    }
  }catch(error){console.warn('Wikipedia overview could not be loaded.',error);}
  live[`${key}Loading`]=false;liveFacts[country.id]=live;
  if(questions[current]?.id===country.id)renderLearningCard(country);
}

function countryName(country){return language==='zh'?country.name:country.nameEn;}
function continentName(country){return language==='zh'?country.continent:continentEn[country.continent];}

function updateLanguage(){
  const t=ui[language];document.documentElement.lang=language==='zh'?'zh-CN':'en';document.title=t.title;
  document.querySelector('h1').textContent=t.title;document.querySelector('.subtitle').textContent=t.subtitle;
  document.querySelector('#eyebrowLabel').textContent=t.eyebrow;
  document.querySelector('#restartBtn').textContent=t.restart;document.querySelector('#scoreLabel').textContent=t.score;
  document.querySelector('#questionLabel').textContent=t.question;document.querySelector('#streakLabel').textContent=t.streak;
  document.querySelector('#timerLabel').textContent=t.timer;
  document.querySelector('#loginTitle').textContent=t.loginTitle;
  document.querySelector('#loginHint').textContent=t.loginHint;
  passwordInput.placeholder=t.password;
  loginBtn.textContent=t.login;
  familyBtn.textContent=t.family;
  logoutBtn.textContent=t.logout;
  document.querySelector('#correctListTitle').textContent=language==='zh'?'答对的国家':t.correctList;
  document.querySelector('#wrongListTitle').textContent=language==='zh'?'答错的国家':t.wrongList;
  speakBtn.textContent=t.speak;
  document.querySelector('#instruction').textContent=t.instruction;nextBtn.textContent=t.next;
  document.querySelector('#completeLabel').textContent=t.complete;document.querySelector('#finalPrefix').textContent=t.finalPrefix;
  document.querySelector('#pointsLabel').textContent=t.points;document.querySelector('#playAgainBtn').textContent=t.playAgain;
  document.querySelector('#zhBtn').classList.toggle('active',language==='zh');document.querySelector('#enBtn').classList.toggle('active',language==='en');
  countryLayer.selectAll('.country').attr('aria-label',d=>countryInfo[Number(d.id)]?`${t.select} ${language==='zh'?countryInfo[Number(d.id)][0]:d.properties.name}`:'');
  if(questions.length&&current<questions.length)renderQuestionText();
  if(questions.length&&current<questions.length&&!learningCard.hidden)renderLearningCard(questions[current]);
  if(!familyPanel.hidden&&familyRows.length)renderFamilyProgress();
  if(!gameOver.hidden){renderFinalMessage();document.querySelector('#finalStats').textContent=ui[language].stats(correctAnswers,questions.length,bestStreak);renderAnswerLists();}
}

function renderQuestionText(){
  const t=ui[language],target=questions[current];promptEl.textContent=countryName(target);hintEl.textContent=`${t.hint}${continentName(target)}`;
  if(!lastAnswer){feedbackEl.textContent=t.choose;return;}
  if(lastAnswer.correct){const earned=lastAnswer.points||10;feedbackEl.textContent=language==='zh'?`${t.correct}${countryName(target)}${t.inWord}${continentName(target)}。 +${earned} 分`:`${t.correct}${countryName(target)}${t.inWord}${continentName(target)}. +${earned} points`;}
  else{feedbackEl.textContent=language==='zh'?`${t.wrong}${countryName(lastAnswer.selected)}${t.answer}${countryName(target)}。 -5 分`:`${t.wrong}${countryName(lastAnswer.selected)}${t.answer}${countryName(target)}. -5 points`;}
}

function renderLearningCard(country){
  const t=ui[language], fact=getCountryFact(country);
  learningCard.hidden=false;
  const name=countryName(country);
  learningContent.innerHTML=`<strong>${t.learn} · ${name}</strong>${fact.special?`<p>✨ ${t.special}：${fact.special}</p>`:''}${fact.overview?`<p>📖 ${language==='zh'?'Wikipedia 国家简介':'Wikipedia overview'}：${fact.overview}</p>`:`<p class="fact-loading">📖 ${language==='zh'?'正在加载 Wikipedia 国家简介…':'Loading Wikipedia overview…'}</p>`}`;
  speakBtn.setAttribute('aria-label',`${t.speak} ${name}`);
  loadWikipediaOverview(country);
}

function speakCurrentCountry(){
  if(!('speechSynthesis' in window)||!questions[current])return;
  const country=questions[current],data=getCountryFact(country),t=ui[language];
  const text=`${countryName(country)}。${t.special}：${data.special}。${language==='zh'?'Wikipedia 国家简介':'Wikipedia overview'}：${data.overview||''}`;
  window.speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang=language==='zh'?'zh-CN':'en-US';window.speechSynthesis.speak(utterance);
  speakBtn.textContent=t.stopSpeak;setTimeout(()=>{speakBtn.textContent=t.speak;},2500);
}

function updateTimer(){
  timerEl.textContent=timeLeft;timerBox.classList.toggle('urgent',timeLeft<=5);
}
function stopTimer(){if(timerId){clearInterval(timerId);timerId=null;}}
function getTimeLimit(country){const progress=userProgress[country.id];if(!progress)return 60;if(progress.wrong_count>progress.correct_count||progress.last_result==='wrong')return 30;if(progress.correct_count>progress.wrong_count&&progress.last_result==='correct')return 15;return 30;}
function startTimer(){stopTimer();timeLeft=getTimeLimit(questions[current]);updateTimer();timerId=setInterval(()=>{if(answered)return;timeLeft-=1;updateTimer();if(timeLeft<=0){stopTimer();chooseCountry({id:-1},null,true);}},1000);}

function renderFinalMessage(){const t=ui[language];document.querySelector('#finalMessage').textContent=score>=80?t.great:score>=40?t.good:t.practice;}
function renderAnswerLists(){
  document.querySelector('#correctList').innerHTML=correctCountries.length?correctCountries.map(country=>`<li>${countryName(country)}</li>`).join(''):`<li>${language==='zh'?'暂无':'None'}</li>`;
  document.querySelector('#wrongList').innerHTML=wrongCountries.length?wrongCountries.map(item=>`<li>${countryName(item.selected)} → ${language==='zh'?'正确答案':'correct'}：${countryName(item.target)}</li>`).join(''):`<li>${language==='zh'?'暂无':'None'}</li>`;
}

function shuffle(items){const result=[...items];for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;}

function chooseCountry(feature,element,isTimeout=false){
  const info=countryInfo[Number(feature.id)];
  if(answered||(!info&&!isTimeout))return;
  answered=true;
  stopTimer();
  const target=questions[current];
  if(Number(feature.id)===target.id){
    correctAnswers+=1;correctCountries.push(target);streak+=1;bestStreak=Math.max(bestStreak,streak);const earned=10+Math.min(streak-1,5)*2;lastAnswer={correct:true,selected:target,points:earned};score+=earned;d3.select(element).classed('correct',true);
    feedbackEl.className='feedback good';
  }else{
    const selected=availableCountries.find(country=>country.id===Number(feature.id));wrongCountries.push({selected:selected||target,target});lastAnswer={correct:false,selected: selected||target};
    score=Math.max(0,score-5);streak=0;if(element)d3.select(element).classed('wrong',true);
    countryLayer.select(`[data-id="${target.id}"]`).classed('correct is-target',true);
    feedbackEl.className='feedback bad';
  }
  renderQuestionText();if(isTimeout)feedbackEl.textContent=ui[language].timeout;
  scoreEl.textContent=score;streakEl.textContent=streak;nextBtn.hidden=false;
  renderLearningCard(target);
  fetch('/api/progress',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({countryId:target.id,correct:lastAnswer.correct})}).catch(()=>{});
}

function drawMap(world){
  const features=topojson.feature(world,world.objects.countries).features;
  const projection=d3.geoNaturalEarth1().fitExtent([[18,18],[982,492]],{type:'FeatureCollection',features});
  const path=d3.geoPath(projection);
  countryLayer.selectAll('path').data(features).join('path')
    .attr('class','country').attr('d',path).attr('data-id',d=>Number(d.id))
    .attr('role',d=>countryInfo[Number(d.id)]?'button':null)
    .attr('tabindex',d=>countryInfo[Number(d.id)]?0:null)
    .attr('aria-label',d=>countryInfo[Number(d.id)]?`选择 ${countryInfo[Number(d.id)][0]}`:'')
    .on('click',function(event,d){chooseCountry(d,this);})
    .on('keydown',function(event,d){if(event.key==='Enter'||event.key===' '){event.preventDefault();chooseCountry(d,this);}});
  availableCountries=features.filter(f=>countryInfo[Number(f.id)]).map(f=>({id:Number(f.id),name:countryInfo[Number(f.id)][0],nameEn:f.properties.name,continent:countryInfo[Number(f.id)][1]}));
  loadLiveFacts().finally(startGame);
}

function showQuestion(){
  answered=false;lastAnswer=null;window.speechSynthesis?.cancel();countryLayer.selectAll('.country').classed('correct wrong is-target',false);
  learningCard.hidden=true;questionNumberEl.textContent=current+1;renderQuestionText();
  feedbackEl.className='feedback';nextBtn.hidden=true;startTimer();
}

function finishGame(){
  stopTimer();
  mapCard.hidden=true;document.querySelector('.question-card').hidden=true;gameOver.hidden=false;
  document.querySelector('#finalScore').textContent=score;
  document.querySelector('#finalStats').textContent=ui[language].stats(correctAnswers,questions.length,bestStreak);
  renderAnswerLists();
  renderFinalMessage();
}

function startGame(){
  if(!availableCountries.length)return;
  questions=shuffle(availableCountries).slice(0,10);current=0;score=0;streak=0;bestStreak=0;correctAnswers=0;correctCountries=[];wrongCountries=[];
  scoreEl.textContent='0';streakEl.textContent='0';mapCard.hidden=false;
  document.querySelector('.question-card').hidden=false;gameOver.hidden=true;showQuestion();
}

async function loadUserProgress(){
  const response=await fetch('/api/progress');if(!response.ok)return;
  const rows=await response.json();userProgress=Object.fromEntries(rows.map(row=>[row.country_id,row]));
}

nextBtn.addEventListener('click',()=>{current+=1;if(current>=questions.length)finishGame();else showQuestion();});
document.querySelector('#restartBtn').addEventListener('click',startGame);
document.querySelector('#playAgainBtn').addEventListener('click',startGame);
document.querySelector('#zhBtn').addEventListener('click',()=>{language='zh';updateLanguage();});
document.querySelector('#enBtn').addEventListener('click',()=>{language='en';updateLanguage();});
speakBtn.addEventListener('click',speakCurrentCountry);
const loginPanel=document.querySelector('#loginPanel'),gameArea=document.querySelector('#gameArea'),loginBtn=document.querySelector('#loginBtn'),usernameSelect=document.querySelector('#usernameSelect'),passwordInput=document.querySelector('#passwordInput'),loginError=document.querySelector('#loginError'),logoutBtn=document.querySelector('#logoutBtn');
const familyBtn=document.querySelector('#familyBtn'),familyPanel=document.querySelector('#familyPanel'),familyProgress=document.querySelector('#familyProgress');
let familyRows=[];
function renderFamilyProgress(){const t=ui[language];document.querySelector('#familyTitle').textContent=t.family;familyBtn.textContent=t.family;familyProgress.innerHTML=`<ul>${familyRows.map(row=>`<li>${row.username}: ${t.familyCorrect} ${row.mastered_countries} · ${t.familyRight} ${row.correct_answers} · ${t.familyWrong} ${row.wrong_answers}</li>`).join('')}</ul>`;}
async function enterGame(){loginPanel.hidden=true;gameArea.hidden=false;logoutBtn.hidden=false;await loadUserProgress();if(availableCountries.length)startGame();}
async function checkLogin(){const response=await fetch('/api/me');if(response.ok)enterGame();}
loginBtn.addEventListener('click',async()=>{loginError.hidden=true;loginBtn.disabled=true;const response=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:usernameSelect.value,password:passwordInput.value})});loginBtn.disabled=false;if(response.ok){passwordInput.value='';enterGame();}else{loginError.textContent=ui[language].loginFailed;loginError.hidden=false;}});
passwordInput.addEventListener('keydown',event=>{if(event.key==='Enter')loginBtn.click();});
logoutBtn.addEventListener('click',async()=>{await fetch('/api/logout',{method:'POST'});window.location.reload();});
checkLogin();
familyBtn.addEventListener('click',async()=>{if(!familyRows.length){const response=await fetch('/api/family-progress');if(!response.ok)return;familyRows=await response.json();}familyPanel.hidden=!familyPanel.hidden;if(!familyPanel.hidden)renderFamilyProgress();});
feedbackEl.textContent='正在加载详细世界地图…';
d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json').then(drawMap).catch(()=>{
  feedbackEl.textContent='地图加载失败，请检查网络连接后刷新页面。';feedbackEl.className='feedback bad';
});
updateLanguage();

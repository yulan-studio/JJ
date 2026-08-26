const countryInfo = {
  4:['阿富汗','亚洲'],12:['阿尔及利亚','非洲'],24:['安哥拉','非洲'],32:['阿根廷','南美洲'],36:['澳大利亚','大洋洲'],40:['奥地利','欧洲'],50:['孟加拉国','亚洲'],56:['比利时','欧洲'],68:['玻利维亚','南美洲'],76:['巴西','南美洲'],100:['保加利亚','欧洲'],116:['柬埔寨','亚洲'],120:['喀麦隆','非洲'],124:['加拿大','北美洲'],152:['智利','南美洲'],156:['中国','亚洲'],170:['哥伦比亚','南美洲'],180:['刚果（金）','非洲'],192:['古巴','北美洲'],203:['捷克','欧洲'],208:['丹麦','欧洲'],218:['厄瓜多尔','南美洲'],818:['埃及','非洲'],231:['埃塞俄比亚','非洲'],246:['芬兰','欧洲'],250:['法国','欧洲'],276:['德国','欧洲'],288:['加纳','非洲'],300:['希腊','欧洲'],304:['格陵兰','北美洲'],356:['印度','亚洲'],360:['印度尼西亚','亚洲'],364:['伊朗','亚洲'],368:['伊拉克','亚洲'],372:['爱尔兰','欧洲'],376:['以色列','亚洲'],380:['意大利','欧洲'],392:['日本','亚洲'],398:['哈萨克斯坦','亚洲'],404:['肯尼亚','非洲'],410:['韩国','亚洲'],458:['马来西亚','亚洲'],484:['墨西哥','北美洲'],496:['蒙古','亚洲'],504:['摩洛哥','非洲'],508:['莫桑比克','非洲'],524:['尼泊尔','亚洲'],528:['荷兰','欧洲'],554:['新西兰','大洋洲'],566:['尼日利亚','非洲'],578:['挪威','欧洲'],586:['巴基斯坦','亚洲'],591:['巴拿马','北美洲'],604:['秘鲁','南美洲'],608:['菲律宾','亚洲'],616:['波兰','欧洲'],620:['葡萄牙','欧洲'],642:['罗马尼亚','欧洲'],643:['俄罗斯','欧洲和亚洲'],682:['沙特阿拉伯','亚洲'],710:['南非','非洲'],724:['西班牙','欧洲'],752:['瑞典','欧洲'],756:['瑞士','欧洲'],764:['泰国','亚洲'],792:['土耳其','欧洲和亚洲'],804:['乌克兰','欧洲'],826:['英国','欧洲'],834:['坦桑尼亚','非洲'],840:['美国','北美洲'],858:['乌拉圭','南美洲'],862:['委内瑞拉','南美洲'],704:['越南','亚洲'],894:['赞比亚','非洲'],716:['津巴布韦','非洲']
};

const continentEn={'亚洲':'Asia','非洲':'Africa','南美洲':'South America','北美洲':'North America','欧洲':'Europe','大洋洲':'Oceania','欧洲和亚洲':'Europe and Asia'};
const ui={
  zh:{title:'世界在哪里？',subtitle:'看题目，在地图上找到正确的国家。',restart:'重新开始',score:'得分',question:'题目',streak:'连对',instruction:'请在地图上找到：',hint:'提示：位于',choose:'点击地图上的国家开始答题',correct:'答对了！',inWord:'在',points:'分',wrong:'差一点！你选择了',answer:'，正确答案是',next:'下一题',complete:'挑战完成',finalPrefix:'你的得分是',playAgain:'再玩一次',loading:'正在加载详细世界地图…',loadError:'地图加载失败，请检查网络连接后刷新页面。',great:'太棒了，你是地图高手！',good:'不错！再玩一次，你会记住更多国家。',practice:'继续练习，很快就能环游世界啦！',select:'选择'},
  en:{title:'Where in the World?',subtitle:'Read the question and find the correct country on the map.',restart:'Restart',score:'Score',question:'Question',streak:'Streak',instruction:'Find this country on the map:',hint:'Hint: Located in ',choose:'Click a country on the map to answer',correct:'Correct! ',inWord:' is in ',points:'points',wrong:'Not quite! You selected ',answer:'. The correct answer is ',next:'Next question',complete:'Challenge complete',finalPrefix:'Your score is',playAgain:'Play again',loading:'Loading the detailed world map…',loadError:'The map could not load. Check your connection and refresh the page.',great:'Excellent — you are a map master!',good:'Nice work! Play again to learn even more countries.',practice:'Keep practising — you will know the world in no time!',select:'Select'}
};

const scoreEl=document.querySelector('#score'), streakEl=document.querySelector('#streak');
const questionNumberEl=document.querySelector('#questionNumber'), promptEl=document.querySelector('#countryPrompt');
const hintEl=document.querySelector('#hint'), feedbackEl=document.querySelector('#feedback');
const nextBtn=document.querySelector('#nextBtn'), gameOver=document.querySelector('#gameOver');
const mapCard=document.querySelector('.map-card'), countryLayer=d3.select('#countryLayer');
let availableCountries=[],questions=[],current=0,score=0,streak=0,answered=false,language='zh',lastAnswer=null;

function countryName(country){return language==='zh'?country.name:country.nameEn;}
function continentName(country){return language==='zh'?country.continent:continentEn[country.continent];}

function updateLanguage(){
  const t=ui[language];document.documentElement.lang=language==='zh'?'zh-CN':'en';document.title=t.title;
  document.querySelector('h1').textContent=t.title;document.querySelector('.subtitle').textContent=t.subtitle;
  document.querySelector('#restartBtn').textContent=t.restart;document.querySelector('#scoreLabel').textContent=t.score;
  document.querySelector('#questionLabel').textContent=t.question;document.querySelector('#streakLabel').textContent=t.streak;
  document.querySelector('#instruction').textContent=t.instruction;nextBtn.textContent=t.next;
  document.querySelector('#completeLabel').textContent=t.complete;document.querySelector('#finalPrefix').textContent=t.finalPrefix;
  document.querySelector('#pointsLabel').textContent=t.points;document.querySelector('#playAgainBtn').textContent=t.playAgain;
  document.querySelector('#zhBtn').classList.toggle('active',language==='zh');document.querySelector('#enBtn').classList.toggle('active',language==='en');
  countryLayer.selectAll('.country').attr('aria-label',d=>countryInfo[Number(d.id)]?`${t.select} ${language==='zh'?countryInfo[Number(d.id)][0]:d.properties.name}`:'');
  if(questions.length&&current<questions.length)renderQuestionText();
  if(!gameOver.hidden)renderFinalMessage();
}

function renderQuestionText(){
  const t=ui[language],target=questions[current];promptEl.textContent=countryName(target);hintEl.textContent=`${t.hint}${continentName(target)}`;
  if(!lastAnswer){feedbackEl.textContent=t.choose;return;}
  if(lastAnswer.correct){feedbackEl.textContent=language==='zh'?`${t.correct}${countryName(target)}${t.inWord}${continentName(target)}。 +10 分`:`${t.correct}${countryName(target)}${t.inWord}${continentName(target)}. +10 points`;}
  else{feedbackEl.textContent=language==='zh'?`${t.wrong}${countryName(lastAnswer.selected)}${t.answer}${countryName(target)}。 -5 分`:`${t.wrong}${countryName(lastAnswer.selected)}${t.answer}${countryName(target)}. -5 points`;}
}

function renderFinalMessage(){const t=ui[language];document.querySelector('#finalMessage').textContent=score>=80?t.great:score>=40?t.good:t.practice;}

function shuffle(items){const result=[...items];for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;}

function chooseCountry(feature,element){
  const info=countryInfo[Number(feature.id)];
  if(answered||!info)return;
  answered=true;
  const target=questions[current];
  if(Number(feature.id)===target.id){
    lastAnswer={correct:true,selected:target};
    score+=10;streak+=1;d3.select(element).classed('correct',true);
    feedbackEl.className='feedback good';
  }else{
    const selected=availableCountries.find(country=>country.id===Number(feature.id));lastAnswer={correct:false,selected};
    score-=5;streak=0;d3.select(element).classed('wrong',true);
    countryLayer.select(`[data-id="${target.id}"]`).classed('correct is-target',true);
    feedbackEl.className='feedback bad';
  }
  renderQuestionText();scoreEl.textContent=score;streakEl.textContent=streak;nextBtn.hidden=false;
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
  startGame();
}

function showQuestion(){
  answered=false;lastAnswer=null;countryLayer.selectAll('.country').classed('correct wrong is-target',false);
  questionNumberEl.textContent=current+1;renderQuestionText();
  feedbackEl.className='feedback';nextBtn.hidden=true;
}

function finishGame(){
  mapCard.hidden=true;document.querySelector('.question-card').hidden=true;gameOver.hidden=false;
  document.querySelector('#finalScore').textContent=score;
  renderFinalMessage();
}

function startGame(){
  if(!availableCountries.length)return;
  questions=shuffle(availableCountries).slice(0,10);current=0;score=0;streak=0;
  scoreEl.textContent='0';streakEl.textContent='0';mapCard.hidden=false;
  document.querySelector('.question-card').hidden=false;gameOver.hidden=true;showQuestion();
}

nextBtn.addEventListener('click',()=>{current+=1;if(current>=questions.length)finishGame();else showQuestion();});
document.querySelector('#restartBtn').addEventListener('click',startGame);
document.querySelector('#playAgainBtn').addEventListener('click',startGame);
document.querySelector('#zhBtn').addEventListener('click',()=>{language='zh';updateLanguage();});
document.querySelector('#enBtn').addEventListener('click',()=>{language='en';updateLanguage();});
feedbackEl.textContent='正在加载详细世界地图…';
d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json').then(drawMap).catch(()=>{
  feedbackEl.textContent='地图加载失败，请检查网络连接后刷新页面。';feedbackEl.className='feedback bad';
});
updateLanguage();

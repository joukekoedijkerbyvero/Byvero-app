
const $ = s => document.querySelector(s);
const state = JSON.parse(localStorage.getItem('byvero_state')||'{}');
state.lang = state.lang || localStorage.getItem('byvero_lang') || (navigator.language.startsWith('nl')?'nl':'en');
state.step = state.step || 'welcome';
state.answers = state.answers || {};
state.selected = state.selected || {};
state.account = state.account || null;

const T = {
  nl:{
    start_title:"Vind het Spaanse huis dat écht bij je past.",
    start_sub:"byVERO helpt je ontdekken waar je het beste past, wat je werkelijk kunt kopen en welke woningen echt bij je profiel aansluiten.",
    start_btn:"Start mijn byVERO Match",
    start_meta:"Gratis · circa 3 minuten · vrijblijvend",
    q1:"Waarvoor zoek je een woning in Spanje?",
    q1a:["Permanent wonen","Tweede woning","Investering","Eigen gebruik + verhuur"],
    q1d:[
      "We geven extra gewicht aan voorzieningen, zorg en leven buiten het hoogseizoen.",
      "We geven extra gewicht aan sfeer, zee en gebruiksgemak.",
      "We kijken sterker naar verhuurbaarheid, bereikbaarheid en vraag.",
      "We zoeken een balans tussen eigen woonplezier en verhuurpotentie."
    ],
    q2:"Wanneer zou je idealiter willen kopen?",
    q2a:["Binnen 3 maanden","3–6 maanden","6–12 maanden","1–2 jaar","Ik oriënteer me nog"],
    q3:"Wat moet jouw omgeving je geven?",
    q3sub:"Kies maximaal 6. Daarna bepalen we wat voor jou het zwaarst telt.",
    pref:["Zee dichtbij","Restaurants & cafés","Spaanse sfeer","Rust & natuur","Levendig buiten het seizoen","Luchthaven goed bereikbaar","Zorg dichtbij","Gezinsvriendelijk","Internationale scholen","Golf","Wandelen & bergen","Winkels dichtbij","Internationale gemeenschap","Veel privacy","Veel te voet kunnen doen"],
    q4:"Wat wil je juist vermijden?",
    q4sub:"Kies maximaal 4 dealbreakers.",
    deals:["Te toeristisch","Doods in de winter","Te afgelegen","Veel verkeer","Te weinig privacy","Te ver van zee","Te ver van luchthaven","Te weinig voorzieningen","Te veel expats","Te weinig internationale gemeenschap","Te stedelijk","Te rustig"],
    q5:"Wat voelt voor jou als thuis?",
    q5types:["Vrijstaande villa","Townhouse / geschakeld","Appartement","Finca / landhuis","Nieuwbouw","Bestaande bouw","Geen sterke voorkeur"],
    q5feat:"Wat is écht belangrijk?",
    feat:["Privézwembad","Tuin","Zeezicht","Open uitzicht","Privacy","Zuidoriëntatie","Loopafstand centrum","Loopafstand zee","Gelijkvloers","Garage","Gastenruimte","Weinig onderhoud","Karakter","Modern","Renovatiemogelijkheid"],
    q6:"Wat heb je minimaal nodig?",
    bedrooms:"Slaapkamers", bathrooms:"Badkamers", living:"Min. woonoppervlak (m²)", plot:"Min. perceel (m², optioneel)",
    q7:"Laten we berekenen wat je comfortabel kunt kopen.",
    ownfunds:"Beschikbare eigen middelen (€)", mortgage:"Hypotheek nodig?", income:"Bruto huishoudinkomen per jaar (€)", totalbudget:"Maximaal totaalbudget (€)",
    yes:"Ja", maybe:"Misschien", no:"Nee",
    budget_hint:"We rekenen met circa 14% aankoopkosten en houden een kleine veiligheidsbuffer aan. Dit is een indicatie, geen financieel advies.",
    q8:"Hoe belangrijk is bereikbaarheid?",
    airport:"Maximale reistijd naar luchthaven", car:"Auto-afhankelijkheid",
    airportA:["30 min","45 min","60 min","90 min","Maakt niet uit"],
    carA:["Ik wil veel te voet kunnen doen","Auto is prima","Ik woon liever rustig en afgelegen"],
    next:"Volgende", back:"Terug", calculate:"Bereken mijn match",
    building:"We bouwen je byVERO-profiel…",
    result_title:"Jouw sterkste matches",
    result_sub:"Dit is je eerste byVERO Location Match op basis van je woonwensen, woningvoorkeuren, budget en praktische eisen.",
    why:"Waarom dit bij je past", consider:"Om rekening mee te houden",
    lifestyle:"Lifestyle", property:"Woningfit", budget:"Budgetfit", practical:"Praktisch",
    save_title:"Bewaar je persoonlijke byVERO-profiel",
    save_sub:"Maak gratis een account aan om je resultaten te bewaren en later woningen toe te voegen en vergelijken.",
    firstname:"Voornaam", email:"E-mail", password:"Wachtwoord",
    save:"Bewaar mijn profiel",
    hi:"Hoi", journey:"Jouw byVERO journey",
    location_match:"Location Match", buying_budget:"Werkelijk aankoopbudget", my_homes:"My Homes", compare:"Compare",
    nohomes:"Nog geen woningen toegevoegd", addhome:"+ Voeg een woning toe", complete:"Profiel compleet",
    coming:"Binnenkort: plak een advertentielink van bijvoorbeeld Idealista en laat byVERO de woning vergelijken met jouw profiel.",
    disclaimer:"De scores zijn een eerste indicatie en geen juridisch, financieel of bouwkundig advies."
  },
  en:{
    start_title:"Find the Spanish home that actually fits you.",
    start_sub:"byVERO helps you discover where you fit best, what you can really afford and which homes truly match your profile.",
    start_btn:"Start my byVERO Match",
    start_meta:"Free · about 3 minutes · no obligation",
    q1:"What are you looking for in Spain?",
    q1a:["My permanent home","A second home","Investment","Own use + rental"],
    q1d:[
      "We'll give extra weight to amenities, healthcare and year-round life.",
      "We'll give extra weight to atmosphere, the sea and ease of ownership.",
      "We'll look more strongly at rental appeal, accessibility and demand.",
      "We'll balance personal enjoyment with rental potential."
    ],
    q2:"When would you ideally like to buy?",
    q2a:["Within 3 months","3–6 months","6–12 months","1–2 years","Just exploring"],
    q3:"What should your surroundings offer you?",
    q3sub:"Choose up to 6. We'll then work out what matters most.",
    pref:["Close to the sea","Restaurants & cafés","Spanish atmosphere","Peace & nature","Alive outside high season","Easy airport access","Healthcare nearby","Family friendly","International schools","Golf","Walking & mountains","Shops nearby","International community","Lots of privacy","Walkable lifestyle"],
    q4:"What would you like to avoid?",
    q4sub:"Choose up to 4 dealbreakers.",
    deals:["Too touristy","Dead in winter","Too remote","Heavy traffic","Too little privacy","Too far from sea","Too far from airport","Too few amenities","Too many expats","Too little international community","Too urban","Too quiet"],
    q5:"What feels like home?",
    q5types:["Detached villa","Townhouse / semi-detached","Apartment","Finca / country house","New build","Resale property","No strong preference"],
    q5feat:"What really matters?",
    feat:["Private pool","Garden","Sea view","Open view","Privacy","South orientation","Walk to town","Walk to sea","Single level","Garage","Guest space","Low maintenance","Character","Modern","Renovation potential"],
    q6:"What do you need at minimum?",
    bedrooms:"Bedrooms", bathrooms:"Bathrooms", living:"Min. living area (m²)", plot:"Min. plot size (m², optional)",
    q7:"Let's calculate what you can comfortably buy.",
    ownfunds:"Available own funds (€)", mortgage:"Need a mortgage?", income:"Gross household income per year (€)", totalbudget:"Maximum total budget (€)",
    yes:"Yes", maybe:"Maybe", no:"No",
    budget_hint:"We use about 14% purchase costs and keep a small safety buffer. This is an indication, not financial advice.",
    q8:"How important is accessibility?",
    airport:"Maximum airport travel time", car:"Car dependence",
    airportA:["30 min","45 min","60 min","90 min","Doesn't matter"],
    carA:["I want to do a lot on foot","A car is fine","I'd rather live quietly and remotely"],
    next:"Next", back:"Back", calculate:"Calculate my match",
    building:"Building your byVERO profile…",
    result_title:"Your strongest matches",
    result_sub:"This is your first byVERO Location Match based on lifestyle, property preferences, budget and practical needs.",
    why:"Why it fits", consider:"Things to consider",
    lifestyle:"Lifestyle", property:"Property fit", budget:"Budget fit", practical:"Practical",
    save_title:"Save your personal byVERO profile",
    save_sub:"Create a free account to save your results and later add and compare properties.",
    firstname:"First name", email:"Email", password:"Password",
    save:"Save my profile",
    hi:"Hi", journey:"Your byVERO journey",
    location_match:"Location Match", buying_budget:"Real Buying Budget", my_homes:"My Homes", compare:"Compare",
    nohomes:"No homes added yet", addhome:"+ Add a property", complete:"Profile complete",
    coming:"Soon: paste a property listing from Idealista or another agent and let byVERO compare it with your profile.",
    disclaimer:"Scores are an initial indication and are not legal, financial or building advice."
  }
};

const prefKeys = ['sea','restaurants','spanish','nature','winter','airport','healthcare','family','schools','golf','mountains','shops','international','privacy','walkable'];
const dealKeys = ['touristy','winterdead','remote','traffic','privacy','far_sea','far_airport','amenities','too_many_expats','too_little_international','urban','quiet'];
const featKeys = ['pool','garden','seaview','openview','privacy','south','walktown','walksea','single','garage','guest','lowmaintenance','character','modern','renovation'];
const locations = [
  {name:'Altea', attrs:{sea:9,restaurants:9,spanish:9,nature:8,winter:8,airport:8,healthcare:9,family:8,schools:7,golf:7,mountains:8,shops:9,international:8,privacy:7,walkable:8}, property:8, affordability:5, practical:9},
  {name:'Jávea / Xàbia', attrs:{sea:10,restaurants:9,spanish:8,nature:10,winter:8,airport:6,healthcare:8,family:9,schools:9,golf:8,mountains:9,shops:8,international:9,privacy:8,walkable:6}, property:9, affordability:5, practical:8},
  {name:'Calpe', attrs:{sea:10,restaurants:9,spanish:7,nature:8,winter:9,airport:8,healthcare:9,family:8,schools:7,golf:6,mountains:8,shops:10,international:9,privacy:6,walkable:9}, property:9, affordability:7, practical:9},
  {name:'Moraira', attrs:{sea:9,restaurants:8,spanish:7,nature:8,winter:6,airport:7,healthcare:7,family:8,schools:7,golf:8,mountains:7,shops:7,international:9,privacy:9,walkable:6}, property:9, affordability:4, practical:7},
  {name:'Dénia', attrs:{sea:10,restaurants:9,spanish:9,nature:9,winter:9,airport:5,healthcare:9,family:9,schools:7,golf:8,mountains:9,shops:9,international:8,privacy:7,walkable:8}, property:9, affordability:7, practical:8},
  {name:'Benissa', attrs:{sea:7,restaurants:6,spanish:9,nature:9,winter:7,airport:7,healthcare:7,family:8,schools:6,golf:7,mountains:9,shops:7,international:7,privacy:9,walkable:4}, property:8, affordability:7, practical:7},
  {name:'Albir', attrs:{sea:9,restaurants:9,spanish:6,nature:8,winter:9,airport:9,healthcare:9,family:9,schools:8,golf:7,mountains:8,shops:9,international:9,privacy:6,walkable:10}, property:7, affordability:6, practical:10},
  {name:'Finestrat', attrs:{sea:7,restaurants:7,spanish:7,nature:9,winter:8,airport:9,healthcare:8,family:8,schools:7,golf:9,mountains:9,shops:9,international:7,privacy:8,walkable:4}, property:9, affordability:6, practical:8}
];

function save(){ localStorage.setItem('byvero_state', JSON.stringify(state)); localStorage.setItem('byvero_lang',state.lang); }
function tr(k){ return T[state.lang][k] || k; }
function setLang(l){ state.lang=l; save(); render(); }
function shell(content){
  return `<div class="shell"><div class="topbar"><div class="brand">byVERO</div><div class="lang">
    <button class="${state.lang==='nl'?'active':''}" onclick="setLang('nl')">NL</button>
    <button class="${state.lang==='en'?'active':''}" onclick="setLang('en')">EN</button>
  </div></div>${content}</div>`;
}
function progress(n){ return `<div class="progress"><span style="width:${(n/8)*100}%"></span></div>`}
function go(step){ state.step=step; save(); render(); window.scrollTo(0,0); }
function chooseOne(key,val,next){ state.answers[key]=val; save(); if(next) setTimeout(()=>go(next),180); }
function toggleMulti(key,val,max){
  const arr = state.selected[key] || [];
  const i = arr.indexOf(val);
  if(i>=0) arr.splice(i,1); else if(arr.length<max) arr.push(val);
  state.selected[key]=arr; save(); render();
}
function nav(back,next,disabled=false,label){
  return `<div class="navrow"><button class="secondary" onclick="go('${back}')">${tr('back')}</button><button class="primary" ${disabled?'disabled':''} onclick="go('${next}')">${label||tr('next')}</button></div>`;
}

function render(){
  let html='';
  if(state.step==='welcome'){
    html = shell(`<section class="card hero"><div class="kicker">byVERO · Spain</div><h1>${tr('start_title')}</h1><p>${tr('start_sub')}</p><button class="primary" onclick="go('q1')">${tr('start_btn')}</button><div class="meta">${tr('start_meta')}</div></section>`);
  }
  if(state.step==='q1'){
    html = shell(`${progress(1)}<section class="card"><div class="kicker">1 / 8</div><h2>${tr('q1')}</h2><div class="options">${
      tr('q1a').map((x,i)=>`<button class="option ${state.answers.purpose===i?'selected':''}" onclick="chooseOne('purpose',${i},'q2')"><div class="title">${x}</div><div class="desc">${tr('q1d')[i]}</div></button>`).join('')
    }</div></section>`);
  }
  if(state.step==='q2'){
    html = shell(`${progress(2)}<section class="card"><div class="kicker">2 / 8</div><h2>${tr('q2')}</h2><div class="options">${
      tr('q2a').map((x,i)=>`<button class="option ${state.answers.timeline===i?'selected':''}" onclick="chooseOne('timeline',${i},'q3')"><div class="title">${x}</div></button>`).join('')
    }</div></section>`);
  }
  if(state.step==='q3'){
    const sel=state.selected.prefs||[];
    html = shell(`${progress(3)}<section class="card"><div class="kicker">3 / 8</div><h2>${tr('q3')}</h2><p>${tr('q3sub')}</p><div class="chips">${
      tr('pref').map((x,i)=>`<button class="chip ${sel.includes(prefKeys[i])?'selected':''}" onclick="toggleMulti('prefs','${prefKeys[i]}',6)">${x}</button>`).join('')
    }</div><div class="feedback">${sel.length}/6</div>${nav('q2','q4',sel.length===0)}</section>`);
  }
  if(state.step==='q4'){
    const sel=state.selected.deals||[];
    html = shell(`${progress(4)}<section class="card"><div class="kicker">4 / 8</div><h2>${tr('q4')}</h2><p>${tr('q4sub')}</p><div class="chips">${
      tr('deals').map((x,i)=>`<button class="chip ${sel.includes(dealKeys[i])?'selected':''}" onclick="toggleMulti('deals','${dealKeys[i]}',4)">${x}</button>`).join('')
    }</div>${nav('q3','q5',false)}</section>`);
  }
  if(state.step==='q5'){
    const types=state.selected.types||[], feats=state.selected.feats||[];
    html = shell(`${progress(5)}<section class="card"><div class="kicker">5 / 8</div><h2>${tr('q5')}</h2><div class="chips">${
      tr('q5types').map((x,i)=>`<button class="chip ${types.includes(i)?'selected':''}" onclick="toggleMulti('types',${i},3)">${x}</button>`).join('')
    }</div><h2 style="font-size:20px">${tr('q5feat')}</h2><div class="chips">${
      tr('feat').map((x,i)=>`<button class="chip ${feats.includes(featKeys[i])?'selected':''}" onclick="toggleMulti('feats','${featKeys[i]}',5)">${x}</button>`).join('')
    }</div>${nav('q4','q6',types.length===0)}</section>`);
  }
  if(state.step==='q6'){
    html = shell(`${progress(6)}<section class="card"><div class="kicker">6 / 8</div><h2>${tr('q6')}</h2>
      <div class="grid2">
        <div class="field"><label>${tr('bedrooms')}</label><select id="bedrooms">${[1,2,3,4,5].map(v=>`<option ${state.answers.bedrooms==v?'selected':''} value="${v}">${v}${v===5?'+':''}</option>`).join('')}</select></div>
        <div class="field"><label>${tr('bathrooms')}</label><select id="bathrooms">${[1,2,3].map(v=>`<option ${state.answers.bathrooms==v?'selected':''} value="${v}">${v}${v===3?'+':''}</option>`).join('')}</select></div>
      </div>
      <div class="field"><label>${tr('living')}</label><input id="living" type="number" inputmode="numeric" value="${state.answers.living||''}" placeholder="120"></div>
      <div class="field"><label>${tr('plot')}</label><input id="plot" type="number" inputmode="numeric" value="${state.answers.plot||''}" placeholder="500"></div>
      <div class="navrow"><button class="secondary" onclick="go('q5')">${tr('back')}</button><button class="primary" onclick="saveQ6()">${tr('next')}</button></div>
    </section>`);
  }
  if(state.step==='q7'){
    html = shell(`${progress(7)}<section class="card"><div class="kicker">7 / 8</div><h2>${tr('q7')}</h2>
      <div class="field"><label>${tr('ownfunds')}</label><input id="ownfunds" type="number" inputmode="decimal" value="${state.answers.ownfunds||''}" placeholder="250000"></div>
      <div class="field"><label>${tr('mortgage')}</label><select id="mortgage"><option value="yes">${tr('yes')}</option><option value="maybe">${tr('maybe')}</option><option value="no">${tr('no')}</option></select></div>
      <div class="field"><label>${tr('income')}</label><input id="income" type="number" inputmode="decimal" value="${state.answers.income||''}" placeholder="90000"></div>
      <div class="field"><label>${tr('totalbudget')}</label><input id="totalbudget" type="number" inputmode="decimal" value="${state.answers.totalbudget||''}" placeholder="650000"></div>
      <div class="feedback">${tr('budget_hint')}</div>
      <div class="navrow"><button class="secondary" onclick="go('q6')">${tr('back')}</button><button class="primary" onclick="saveQ7()">${tr('next')}</button></div>
    </section>`);
  }
  if(state.step==='q8'){
    html = shell(`${progress(8)}<section class="card"><div class="kicker">8 / 8</div><h2>${tr('q8')}</h2>
      <div class="field"><label>${tr('airport')}</label><select id="airport">${tr('airportA').map((x,i)=>`<option value="${i}">${x}</option>`).join('')}</select></div>
      <div class="field"><label>${tr('car')}</label><select id="car">${tr('carA').map((x,i)=>`<option value="${i}">${x}</option>`).join('')}</select></div>
      <div class="navrow"><button class="secondary" onclick="go('q7')">${tr('back')}</button><button class="primary" onclick="finishQ8()">${tr('calculate')}</button></div>
    </section>`);
  }
  if(state.step==='results'){
    const results = calculateMatches();
    state.results = results; save();
    html = shell(`<section class="card"><div class="kicker">${tr('building')}</div><h1>${tr('result_title')}</h1><p>${tr('result_sub')}</p><div class="resultlist">${
      results.slice(0,3).map((r,i)=>`<div class="result">
        <div class="rank">#${i+1}</div><h2>${r.name}</h2><div class="score">${r.total}%</div>
        <div class="metrics">
          <div class="metric">${tr('lifestyle')}: <b>${r.lifestyle}%</b></div>
          <div class="metric">${tr('property')}: <b>${r.property}%</b></div>
          <div class="metric">${tr('budget')}: <b>${r.budget}%</b></div>
          <div class="metric">${tr('practical')}: <b>${r.practical}%</b></div>
        </div>
        <h3>${tr('why')}</h3><ul class="bullets">${r.why.map(x=>`<li>${x}</li>`).join('')}</ul>
        <h3>${tr('consider')}</h3><ul class="bullets">${r.consider.map(x=>`<li>${x}</li>`).join('')}</ul>
      </div>`).join('')
    }</div><div class="meta">${tr('disclaimer')}</div><button class="primary" onclick="go('signup')">${tr('save_title')}</button></section>`);
  }
  if(state.step==='signup'){
    html = shell(`<section class="card"><div class="kicker">byVERO</div><h1>${tr('save_title')}</h1><p>${tr('save_sub')}</p>
      <div class="field"><label>${tr('firstname')}</label><input id="firstname" value="${state.account?.firstname||''}"></div>
      <div class="field"><label>${tr('email')}</label><input id="email" type="email" value="${state.account?.email||''}"></div>
      <div class="field"><label>${tr('password')}</label><input id="password" type="password"></div>
      <button class="primary" onclick="saveAccount()">${tr('save')}</button>
    </section>`);
  }
  if(state.step==='dashboard'){
    const top = state.results?.[0] || calculateMatches()[0];
    const budget = recommendedBudget();
    const name = state.account?.firstname || '';
    html = shell(`<section class="card"><div class="kicker">${tr('journey')}</div><h1>${tr('hi')} ${name || '👋'}</h1>
      <div class="dashboard-grid">
        <div class="dash-card"><div class="small">${tr('location_match')}</div><div class="big">${top.name} · ${top.total}%</div></div>
        <div class="dash-card"><div class="small">${tr('buying_budget')}</div><div class="big">€${budget.toLocaleString(state.lang==='nl'?'nl-NL':'en-GB')}</div></div>
        <div class="dash-card"><div class="small">${tr('my_homes')}</div><div class="big">0</div><div class="small">${tr('nohomes')}</div><br><button class="secondary" onclick="alert('${tr('coming').replaceAll("'","\\'")}')">${tr('addhome')}</button></div>
        <div class="dash-card"><div class="small">${tr('compare')}</div><div class="big">—</div><div class="small">${tr('coming')}</div></div>
        <div class="dash-card"><div class="small">${tr('complete')}</div><div class="big">${profileCompletion()}%</div></div>
      </div>
    </section>`);
  }
  $('#app').innerHTML=html;
  if(state.step==='q7' && state.answers.mortgage){
    $('#mortgage').value=state.answers.mortgage;
  }
  if(state.step==='q8'){
    if(state.answers.airport!=null) $('#airport').value=state.answers.airport;
    if(state.answers.car!=null) $('#car').value=state.answers.car;
  }
}

function saveQ6(){
  state.answers.bedrooms=+$('#bedrooms').value;
  state.answers.bathrooms=+$('#bathrooms').value;
  state.answers.living=+($('#living').value||0);
  state.answers.plot=+($('#plot').value||0);
  save(); go('q7');
}
function saveQ7(){
  state.answers.ownfunds=+($('#ownfunds').value||0);
  state.answers.mortgage=$('#mortgage').value;
  state.answers.income=+($('#income').value||0);
  state.answers.totalbudget=+($('#totalbudget').value||0);
  save(); go('q8');
}
function finishQ8(){
  state.answers.airport=+$('#airport').value;
  state.answers.car=+$('#car').value;
  save(); go('results');
}
function saveAccount(){
  state.account={firstname:$('#firstname').value.trim(), email:$('#email').value.trim()};
  save(); go('dashboard');
}
function recommendedBudget(){
  const t=state.answers.totalbudget||0, own=state.answers.ownfunds||0;
  let total=t;
  if(!total){
    if(state.answers.mortgage==='no') total=own;
    else total=own*2.3;
  }
  return Math.max(0, Math.round((total/1.14)*0.97/1000)*1000);
}
function profileCompletion(){
  const checks=[
    state.answers.purpose!=null,state.answers.timeline!=null,(state.selected.prefs||[]).length>0,
    (state.selected.types||[]).length>0,state.answers.bedrooms!=null,state.answers.totalbudget>0||state.answers.ownfunds>0,
    state.answers.airport!=null,!!state.account
  ];
  return Math.round(checks.filter(Boolean).length/checks.length*100);
}
function calculateMatches(){
  const prefs=state.selected.prefs||[];
  const deals=state.selected.deals||[];
  const target=recommendedBudget();
  return locations.map(loc=>{
    let lifestyle=0;
    if(prefs.length){
      const weights=[3,2.5,2,1.4,1.2,1];
      let got=0,max=0;
      prefs.forEach((k,idx)=>{const w=weights[idx]||1;got+=(loc.attrs[k]||5)*w;max+=10*w;});
      lifestyle=Math.round(got/max*100);
    } else lifestyle=75;
    let property=Math.round(loc.property*10);
    const affordabilityNeed = target>=800000?4:target>=600000?5:target>=450000?6:7;
    let budget=Math.max(45, Math.min(98, Math.round(65 + (loc.affordability-affordabilityNeed)*8)));
    let practical=Math.round(loc.practical*10);
    const airportIdx=state.answers.airport ?? 4;
    if(airportIdx===0 && loc.attrs.airport<9) practical-=12;
    if(airportIdx===1 && loc.attrs.airport<8) practical-=8;
    if(airportIdx===2 && loc.attrs.airport<6) practical-=5;
    if(state.answers.car===0 && loc.attrs.walkable<7) practical-=10;
    if(state.answers.car===2 && loc.attrs.privacy>7) practical+=4;
    let penalty=0;
    deals.forEach(d=>{
      if(d==='winterdead' && loc.attrs.winter<7) penalty+=12;
      if(d==='touristy' && ['Calpe','Albir'].includes(loc.name)) penalty+=6;
      if(d==='remote' && loc.attrs.walkable<5) penalty+=7;
      if(d==='privacy' && loc.attrs.privacy<7) penalty+=7;
      if(d==='far_airport' && loc.attrs.airport<7) penalty+=8;
      if(d==='far_sea' && loc.attrs.sea<8) penalty+=8;
      if(d==='amenities' && loc.attrs.shops<7) penalty+=8;
      if(d==='quiet' && loc.attrs.winter<7) penalty+=4;
      if(d==='urban' && loc.attrs.walkable>9) penalty+=4;
    });
    const raw=lifestyle*.35+property*.25+budget*.25+practical*.15-penalty;
    const total=Math.max(45,Math.min(98,Math.round(raw)));
    const pSorted=prefs.map(k=>[k,loc.attrs[k]||0]).sort((a,b)=>b[1]-a[1]).slice(0,2);
    const labelsNL={sea:"zee",restaurants:"restaurants",spanish:"Spaanse sfeer",nature:"rust en natuur",winter:"leven buiten het seizoen",airport:"bereikbaarheid",healthcare:"zorg",family:"gezinsvriendelijkheid",schools:"internationale scholen",golf:"golf",mountains:"bergen en wandelen",shops:"voorzieningen",international:"internationale gemeenschap",privacy:"privacy",walkable:"veel te voet kunnen doen"};
    const labelsEN={sea:"sea access",restaurants:"restaurants",spanish:"Spanish atmosphere",nature:"peace and nature",winter:"year-round life",airport:"accessibility",healthcare:"healthcare",family:"family friendliness",schools:"international schools",golf:"golf",mountains:"walking and mountains",shops:"amenities",international:"international community",privacy:"privacy",walkable:"walkability"};
    const L=state.lang==='nl'?labelsNL:labelsEN;
    const why=pSorted.length?pSorted.map(([k])=> state.lang==='nl'?`Sterke match op ${L[k]}.`:`Strong match on ${L[k]}.`):[state.lang==='nl'?'Gebalanceerde lifestyle-match.':'Balanced lifestyle match.'];
    const consider=[];
    if(budget<70) consider.push(state.lang==='nl'?'Je gewenste woningtype kan hier relatief veel van je budget vragen.':'Your preferred property type may stretch your budget here.');
    if(practical<78) consider.push(state.lang==='nl'?'Bereikbaarheid of auto-afhankelijkheid verdient extra aandacht.':'Accessibility or car dependence deserves extra attention.');
    if(!consider.length) consider.push(state.lang==='nl'?'Geen grote aandachtspunten op basis van je huidige profiel.':'No major concerns based on your current profile.');
    return {name:loc.name,lifestyle,property,budget,practical,total,why,consider};
  }).sort((a,b)=>b.total-a.total);
}
render();

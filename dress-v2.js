/* Mission 2 — Adventure Wardrobe. */
(() => {
  const clothes = [
    ['T-shirt','his','tee','sky blue'],['shirt','her','shirt','coral'],['hoodie','their','hoodie','leaf green'],['sweater','its','sweater','sunny yellow'],
    ['jacket','his','jacket','ocean blue'],['coat','her','coat','berry red'],['jeans','their','jeans','denim blue'],['trousers','its','trousers','violet'],
    ['shorts','his','shorts','orange'],['skirt','her','skirt','pink'],['dress','their','dress','lavender'],['cap','its','cap','teal'],
    ['hat','his','hat','gold'],['socks','her','socks','mint'],['shoes','their','shoes','red'],['trainers','its','trainers','purple'],
    ['boots','his','boots','brown'],['scarf','her','scarf','aqua'],['gloves','their','gloves','green'],['backpack','its','backpack','blue'],['bag','her','bag','rose']
  ].map((item,index)=>[...item,index%7,Math.floor(index/7)]);
  const owners = [
    {id:'his',name:'he',cls:'boy',pos:'0 0'}, {id:'her',name:'she',cls:'girl',pos:'100% 0'},
    {id:'their',name:'they',cls:'family',pos:'0 100%',portrait:'they'}, {id:'its',name:'it',cls:'monster',pos:'100% 100%'}
  ];
  let order=[],step=0,locked=false,musicTimer=null;
  const sayInstructions=()=>speak('Look at the clothes. Read the word. Tap the correct owner. Earn stars!');
  function softMusic(){ if(musicTimer)return; let beat=0; musicTimer=setInterval(()=>{if(state.mission!=='dress'){clearInterval(musicTimer);musicTimer=null;return}try{const c=new AudioContext(),o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.type='sine';o.frequency.value=[262,330,392,330][beat++%4];g.gain.setValueAtTime(.018,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.42);o.start();o.stop(c.currentTime+.45)}catch(e){}},650)}
  function showInstructions(){document.getElementById('modalContent').innerHTML='<h2>Instructions</h2><p>Look at the clothes.<br>Read the word.<br>Tap the correct owner.<br>Earn stars!</p><button class="listen-btn" id="dressReadInstruction">Listen to instructions</button>';document.getElementById('modal').hidden=false;document.getElementById('dressReadInstruction').onclick=sayInstructions}
  function render(){
    const item=order[step];
    common('Dress the Character!','The clothes show who it belongs to. Tap the right person or character!',`<div class="wardrobe-status"><button class="wardrobe-instructions">Instructions</button><span class="wardrobe-stars" aria-label="stars"><i class="${state.roundStars>0?'on':''}">★</i><i class="${state.roundStars>1?'on':''}">★</i><i class="${state.roundStars>2?'on':''}">★</i></span><b>${step+1} / 15</b></div><div class="wardrobe-game"><div class="wardrobe-item" data-word="${item[1]}" aria-label="${item[1]}"><span class="clothing-illustration" style="--col:${item[4]};--row:${item[5]}"></span><strong>${item[1]}</strong></div><div class="wardrobe-sparkles"><i></i><i></i><i></i></div><div class="owner-row">${owners.map(o=>`<button class="owner-card ${o.cls}" data-owner="${o.id}"><span class="owner-portrait ${o.portrait||''}" style="${o.portrait?'':`background-position:${o.pos}`}"></span><b>${o.name}</b></button>`).join('')}</div></div>`);
    document.querySelector('.wardrobe-instructions').onclick=showInstructions;
    document.querySelector('.speaker').onclick=()=>speak(item[1]);
    document.querySelectorAll('.owner-card').forEach(card=>card.onclick=()=>choose(card,item));
    softMusic();
  }
  function choose(card,item){
    if(locked)return;
    if(card.dataset.owner!==item[1]){card.classList.add('wrong-owner');sound('bad');setTimeout(()=>card.classList.remove('wrong-owner'),480);return}
    locked=true;sound('good');state.roundStars=Math.min(3,state.roundStars+1);document.getElementById('roundStars').textContent=state.roundStars;
    const apparel=document.querySelector('.wardrobe-item'), target=card.getBoundingClientRect(), source=apparel.getBoundingClientRect();
    apparel.style.setProperty('--fly-x',(target.left+target.width/2-source.left-source.width/2)+'px');apparel.style.setProperty('--fly-y',(target.top+42-source.top-source.height/2)+'px');
    apparel.classList.add('fly-to-owner');card.classList.add('right-owner');
    setTimeout(()=>{step++;if(step>=15){state.round=3;finish();return}locked=false;render()},850);
  }
  renderDress=()=>{order=clothes.slice().sort(()=>Math.random()-.5);const shoes=order.findIndex(item=>item[0]==='shoes');[order[0],order[shoes]]=[order[shoes],order[0]];order=order.slice(0,15);step=0;locked=false;render()};
  games.dress.title='Dress the Character';
  document.getElementById('helpBtn').onclick=()=>state.mission==='dress'&&showInstructions();
})();

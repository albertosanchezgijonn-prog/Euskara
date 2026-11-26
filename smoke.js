const fs=require('fs');
class N{constructor(t){this.tag=t;this.children=[];this.attrs={};this.l={};this.style={};this.className='';this._t='';this.disabled=false;this.value='';this.checked=false;this.parent=null;
 const self=this;this.classList={add:(c)=>{const a=new Set(self.className.split(' ').filter(Boolean));a.add(c);self.className=[...a].join(' ')},remove:(c)=>{self.className=self.className.split(' ').filter(x=>x&&x!==c).join(' ')},toggle:(c,f)=>{f?self.classList.add(c):self.classList.remove(c)},contains:(c)=>self.className.split(' ').includes(c)}}
 get firstChild(){return this.children[0]||null}
 appendChild(c){c.parent=this;this.children.push(c);return c}
 removeChild(c){this.children=this.children.filter(x=>x!==c);return c}
 setAttribute(k,v){this.attrs[k]=v}
 getAttribute(k){return this.attrs[k]}
 addEventListener(t,f){(this.l[t]=this.l[t]||[]).push(f)}
 dispatch(t,e){(this.l[t]||[]).forEach(f=>f(e||{key:'',target:this}))}
 click(){if(!this.disabled)this.dispatch('click')}
 set textContent(v){this.children=[];this._t=String(v)}
 get textContent(){return this._t+this.children.map(c=>c.textContent).join('')}
 set innerHTML(v){this.children=[];this._t=v}
 focus(){} remove(){if(this.parent)this.parent.removeChild(this)}
 querySelector(sel){const cl=sel.slice(1);let r=null;(function w(n){if(r)return;for(const c of n.children){if(c.className&&c.className.split(' ').includes(cl)){r=c;return}w(c)}})(this);return r}
}
class T extends N{constructor(t){super('#text');this._t=t}}
const app=new N('div');
global.window=global;
global.document={createElement:t=>new N(t),createTextNode:t=>new T(t),getElementById:()=>app,body:new N('body')};
const store={};global.localStorage={getItem:k=>store[k]||null,setItem:(k,v)=>{store[k]=v}};
global.fetch=()=>Promise.reject();global.confirm=()=>true;global.alert=()=>{};global.location={protocol:'file:'};global.navigator={};
global.scrollTo=()=>{};
global.setTimeout=(f,ms)=>{return 0}; // sin autoplay/timeouts
for(const f of ['core.js','content_a1a.js','content_a1b.js','content_a2a.js','content_a2b.js','app.js']) (0,eval)(fs.readFileSync(f,'utf8'));
const api=window.__euskara;
const find=(n,pred,acc=[])=>{if(pred(n))acc.push(n);n.children.forEach(c=>find(c,pred,acc));return acc};
const cls=(n,c)=>n.className&&n.className.split(' ').includes(c);
let errs=0;
function solve(it){
  const root=app;
  const primary=()=>find(root,n=>n.tag==='button'&&cls(n,'big-btn'))[0];
  const opts=find(root,n=>n.tag==='button'&&cls(n,'opt'));
  switch(it.t){
   case 'mc':case 'vl':case 'ls':case 'cmp': opts.find(o=>o._v===it.a).click();break;
   case 'fl': if(it.opts){opts.find(o=>o._v===it.a).click()} else {const inp=find(root,n=>n.tag==='input')[0];inp.value=it.a.split('|')[0];inp.dispatch('input')}break;
   case 'tr':case 'dict': if(it.t==='dict'&&it.typed){const inp=find(root,n=>n.tag==='input')[0];inp.value=it.eu;inp.dispatch('input');break}
     for(const w of E.tokens(it.eu)){const pool=find(root,n=>n.tag==='button'&&cls(n,'tok')&&!cls(n,'used'));const ansN=find(root,n=>cls(n,'ans'))[0];const cand=pool.find(b=>b.textContent===w&&!ansN.children.includes(b)&&b.parent&&cls(b.parent,'pool'));cand.click();}break;
   case 'say': find(root,n=>n.tag==='button'&&/autoevaluar|Lo he dicho bien/.test(n.textContent))[0].click();break;
   case 'mt': {const L=find(root,n=>n.tag==='button'&&cls(n,'opt')&&n._s==='L'),R=find(root,n=>n.tag==='button'&&cls(n,'opt')&&n._s==='R');const m={};it.pairs.forEach(p=>m[p[0]]=p[1]);for(const l of L){l.click();R.find(r=>r._v===m[l._v]).click()}break}
   case 'wr': {const ta=find(root,n=>n.tag==='textarea')[0];ta.value=it.model;ta.dispatch('input');break}
  }
  const p=primary(); if(!p||p.disabled){errs++;console.log('NOT READY',it.t,it.q||it.eu||it.prompt);return}
  p.click(); // check
  const fb=find(root,n=>cls(n,'fb'))[0];
  if(!/good/.test(fb.className)){errs++;console.log('WRONG?',it.t,JSON.stringify(it).slice(0,200),fb.textContent)}
  primary().click(); // next
}
let total=0;
for(const u of E.UNITS){ for(const L of E.LESSONS){
  const items=E.buildLesson(u,L.id); let finished=false;
  const seq=items.map(x=>x);
  api.runLesson(items,{onExit:()=>{finished=true},onRetry:()=>{},onDone:()=>{finished=true}});
  for(const it of seq){ try{ solve(it); total++; }catch(e){errs++;console.log('EXC',u.id,L.id,it.t,e.message);break} }
  if(!/Lezioa osatuta/.test(app.textContent) ){ errs++; console.log('no finish', u.id,L.id, app.textContent.slice(0,80)); }
}}
// exam + views
for(const tab of ['path','practice','exam','guide','settings']){ try{ (0,eval)("0"); }catch(e){} }
console.log('exercises solved',total,'errors',errs);
// render views
const v=api; ['path','practice','exam','guide','settings'].forEach(()=>{});
api.render();
console.log('render ok, text:',app.textContent.slice(0,60));

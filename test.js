const fs=require('fs');
global.window=global;
const E=require('./core.js'); global.E=E;
for(const f of ['content_a1a.js','content_a1b.js','content_a2a.js','content_a2b.js']) eval(fs.readFileSync(f,'utf8'));
let errs=0; const bad=(m)=>{errs++;console.log('ERR',m)};
console.log('units',E.UNITS.length);
for(const u of E.UNITS){
  for(const L of E.LESSONS){
    for(let r=0;r<5;r++){
      const items=E.buildLesson(u,L.id);
      if(!items.length) bad(u.id+' '+L.id+' empty');
      for(const it of items){
        if(!it.t) bad(u.id+' no type '+JSON.stringify(it));
        if(it.t==='mc'){
          const opts=[it.a,...it.w]; if(new Set(opts).size!==opts.length) bad(u.id+' mc dup '+JSON.stringify(it));
          if(it.w.length<2) bad(u.id+' mc few options '+it.q);
        }
        if(it.t==='fl'){ if(it.opts && !it.opts.includes(it.a)) bad(u.id+' fl opts missing answer '+it.q); if(!it.q.includes('___')&&!/→|:/.test(it.q)) bad(u.id+' fl no blank '+it.q);}
        if(it.t==='tr'){ const t=E.tokens(it.eu); if(!t.every(x=>it.bank.includes(x))) bad('tr bank '+it.eu); }
        if(it.t==='ls'||it.t==='vl'){ const o=[it.a,...it.w]; if(new Set(o).size!==o.length) bad(u.id+' ls dup '+it.eu); }
        if(it.t==='cmp'){ const o=[it.a,...it.w]; if(new Set(o).size!==o.length) bad(u.id+' cmp dup '+it.q);}
      }
    }
  }
  // typed answers check: fl answer present in opts
  const dl=u.d||[]; if(!dl.length) bad(u.id+' no dialog');
}
for(const lv of ['A1','A2']){
  const ex=E.buildExam(E.UNITS.filter(u=>u.lv===lv));
  console.log(lv, ex.map(s=>s.name.split(' ')[0]+':'+s.items.length).join(' '));
}
// sample
const u=E.UNITS[9]; console.log(JSON.stringify(E.buildLesson(u,'gram').slice(0,4),null,1));
console.log('errors',errs);

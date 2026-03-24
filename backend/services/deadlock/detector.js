function detectDeadlock(processes,resources,allocation,request){
  const wfg={},log=[];processes.forEach(p=>(wfg[p]=[]));
  processes.forEach(p=>{resources.forEach((r,ri)=>{if((request[p]?.[ri]??0)>0){processes.forEach(q=>{if(q!==p&&(allocation[q]?.[ri]??0)>0){wfg[p].push(q);log.push({type:'info',msg:`${p} waits for ${q} (${r})`});}});}});});
  const v=new Set(),rec=new Set();let cycle=null;
  function dfs(n,path){v.add(n);rec.add(n);for(const nb of wfg[n]??[]){if(!v.has(nb)){if(dfs(nb,[...path,nb]))return true;}else if(rec.has(nb)){cycle=[...path,nb];return true;}}rec.delete(n);return false;}
  processes.forEach(p=>{if(!v.has(p))dfs(p,[p]);});
  if(cycle)log.push({type:'err',msg:`Cycle: ${cycle.join(' → ')}`});else log.push({type:'ok',msg:'System is safe'});
  return{deadlock:!!cycle,cycle,wfg,log};
}
module.exports = { detectDeadlock }

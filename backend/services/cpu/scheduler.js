/*function runScheduler(algorithm, processes, quantum = 2) {
  const runners = { FCFS: fcfs, SJF: sjf, RR: p => roundRobin(p, quantum), Priority: priority }
  const timeline = (runners[algorithm] ?? fcfs)(processes)
  const results  = buildResults(processes, timeline)
  return { timeline, results, avgTAT: +(results.reduce((s,r)=>s+r.tat,0)/results.length).toFixed(2), avgWT: +(results.reduce((s,r)=>s+r.wt,0)/results.length).toFixed(2) }
}
function fcfs(p){const s=[...p].sort((a,b)=>a.at-b.at);let t=0;const tl=[];for(const x of s){if(t<x.at)t=x.at;for(let i=t;i<t+x.bt;i++)tl.push({time:i,process:x.id});t+=x.bt;}return tl;}
function sjf(p){let t=0;const tl=[],d=new Set();while(d.size<p.length){const a=p.filter(x=>!d.has(x.id)&&x.at<=t).sort((a,b)=>a.bt-b.bt);if(!a.length){t++;continue;}const x=a[0];for(let i=t;i<t+x.bt;i++)tl.push({time:i,process:x.id});t+=x.bt;d.add(x.id);}return tl;}
function roundRobin(p,q){const r=p.map(x=>({...x,rem:x.bt}));let t=0;const tl=[],ar=new Set(),rdy=[];r.sort((a,b)=>a.at-b.at);if(r.length){rdy.push(r.shift());ar.add(rdy[0].id);}while(rdy.length||r.length){if(!rdy.length){t=r[0].at;rdy.push(r.shift());ar.add(rdy[0].id);}const x=rdy.shift(),run=Math.min(q,x.rem);for(let i=t;i<t+run;i++)tl.push({time:i,process:x.id});t+=run;x.rem-=run;r.filter(y=>y.at<=t&&!ar.has(y.id)).forEach(y=>{rdy.push(y);ar.add(y.id);r.splice(r.indexOf(y),1);});if(x.rem>0)rdy.push(x);}return tl;}
function priority(p){let t=0;const tl=[],d=new Set();while(d.size<p.length){const a=p.filter(x=>!d.has(x.id)&&x.at<=t).sort((a,b)=>a.priority-b.priority);if(!a.length){t++;continue;}const x=a[0];for(let i=t;i<t+x.bt;i++)tl.push({time:i,process:x.id});t+=x.bt;d.add(x.id);}return tl;}
function buildResults(p,tl){return p.map(x=>{const ts=tl.filter(t=>t.process===x.id).map(t=>t.time);const ct=ts.length?Math.max(...ts)+1:0,tat=ct-x.at,wt=tat-x.bt;return{id:x.id,at:x.at,bt:x.bt,priority:x.priority??1,ct,tat,wt};});}
module.exports = { runScheduler }
*/


/**
 * Main Scheduler Controller
 */
function runScheduler(algorithm, processes, quantum = 2) {
  const runners = {
    FCFS: fcfs,
    SJF: sjf,
    RR: (p) => roundRobin(p, quantum),
    Priority: priority,
  };

  const timeline = (runners[algorithm] ?? fcfs)(processes);
  const results = buildResults(processes, timeline);

  return {
    timeline,
    results,
    avgTAT: +(results.reduce((s, r) => s + r.tat, 0) / results.length).toFixed(2),
    avgWT: +(results.reduce((s, r) => s + r.wt, 0) / results.length).toFixed(2),
  };
}

/**
 * First Come First Served (FCFS)
 */
function fcfs(p) {
  const s = [...p].sort((a, b) => a.at - b.at);
  let t = 0;
  const tl = [];

  for (const x of s) {
    if (t < x.at) t = x.at;
    for (let i = t; i < t + x.bt; i++) {
      tl.push({ time: i, process: x.id });
    }
    t += x.bt;
  }
  return tl;
}

/**
 * Shortest Job First (SJF) - Non-preemptive
 */
function sjf(p) {
  let t = 0;
  const tl = [];
  const d = new Set();

  while (d.size < p.length) {
    const a = p
      .filter((x) => !d.has(x.id) && x.at <= t)
      .sort((a, b) => a.bt - b.bt);

    if (!a.length) {
      t++;
      continue;
    }

    const x = a[0];
    for (let i = t; i < t + x.bt; i++) {
      tl.push({ time: i, process: x.id });
    }
    t += x.bt;
    d.add(x.id);
  }
  return tl;
}

/**
 * Round Robin (RR)
 */
function roundRobin(p, q) {
  const r = p.map((x) => ({ ...x, rem: x.bt }));
  let t = 0;
  const tl = [];
  const ar = new Set();
  const rdy = [];

  r.sort((a, b) => a.at - b.at);

  if (r.length) {
    rdy.push(r.shift());
    ar.add(rdy[0].id);
  }

  while (rdy.length || r.length) {
    if (!rdy.length) {
      t = r[0].at;
      rdy.push(r.shift());
      ar.add(rdy[0].id);
    }

    const x = rdy.shift();
    const run = Math.min(q, x.rem);

    for (let i = t; i < t + run; i++) {
      tl.push({ time: i, process: x.id });
    }

    t += run;
    x.rem -= run;

    r.filter((y) => y.at <= t && !ar.has(y.id)).forEach((y) => {
      rdy.push(y);
      ar.add(y.id);
      r.splice(r.indexOf(y), 1);
    });

    if (x.rem > 0) rdy.push(x);
  }
  return tl;
}

/**
 * Priority Scheduling
 */
function priority(p) {
  let t = 0;
  const tl = [];
  const d = new Set();

  while (d.size < p.length) {
    const a = p
      .filter((x) => !d.has(x.id) && x.at <= t)
      .sort((a, b) => a.priority - b.priority);

    if (!a.length) {
      t++;
      continue;
    }

    const x = a[0];
    for (let i = t; i < t + x.bt; i++) {
      tl.push({ time: i, process: x.id });
    }
    t += x.bt;
    d.add(x.id);
  }
  return tl;
}

/**
 * Metrics Builder
 */
function buildResults(p, tl) {
  return p.map((x) => {
    const ts = tl.filter((t) => t.process === x.id).map((t) => t.time);
    const ct = ts.length ? Math.max(...ts) + 1 : 0;
    const tat = ct - x.at;
    const wt = tat - x.bt;

    return {
      id: x.id,
      at: x.at,
      bt: x.bt,
      priority: x.priority ?? 1,
      ct,
      tat,
      wt,
    };
  });
}

module.exports = { runScheduler };
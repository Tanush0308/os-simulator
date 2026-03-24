function schedule(algo,head,requests,max=199){const r=[...requests];if(algo==='FCFS')return fcfs(head,r);if(algo==='SSTF')return sstf(head,r);if(algo==='SCAN')return scan(head,r,max);return cscan(head,r,max);}
function fcfs(h,r){let s=0,c=h;r.forEach(x=>{s+=Math.abs(x-c);c=x;});return{sequence:r,totalSeek:s,algorithm:'FCFS'};}
function sstf(h,r){const rem=[...r],seq=[];let c=h,s=0;while(rem.length){const i=rem.reduce((b,x,i,a)=>Math.abs(x-c)<Math.abs(a[b]-c)?i:b,0);s+=Math.abs(rem[i]-c);c=rem[i];seq.push(rem.splice(i,1)[0]);}return{sequence:seq,totalSeek:s,algorithm:'SSTF'};}
function scan(h,r,max){const s=[...r].sort((a,b)=>a-b);const seq=[...s.filter(x=>x>=h),max,...s.filter(x=>x<h).reverse()];let c=h,sk=0;seq.forEach(x=>{sk+=Math.abs(x-c);c=x;});return{sequence:seq.filter(x=>x!==max),totalSeek:sk,algorithm:'SCAN'};}
function cscan(h,r,max){const s=[...r].sort((a,b)=>a-b);const seq=[...s.filter(x=>x>=h),max,0,...s.filter(x=>x<h)];let c=h,sk=0;seq.forEach(x=>{sk+=Math.abs(x-c);c=x;});return{sequence:seq.filter(x=>x!==max&&x!==0||r.includes(x)),totalSeek:sk,algorithm:'C-SCAN'};}
module.exports = { schedule }

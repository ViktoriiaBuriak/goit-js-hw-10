import"./assets/reset-3ace95da.js";import{i as o}from"./assets/vendor-651d7991.js";const c=document.querySelector("button");c.addEventListener("click",function(s){s.preventDefault();const n=document.getElementById("delay"),e=parseFloat(n.value);if(isNaN(e)||e<=0){o.error({title:"Error",message:"Please enter a valid delay",position:"topCenter"});return}const t=document.querySelector('input[name="state"]:checked').value,l=new Promise((r,a)=>{t==="fulfilled"?r(t):t==="rejected"&&a(t)}),i=setInterval(()=>{l.then(r=>{o.success({title:"OK",message:`Fulfilled promise in ${e}ms`,position:"topCenter"})}).catch(r=>{o.error({title:"Error",message:`Rejected promise in ${e}ms`,position:"topCenter"})}).finally(()=>{n.value="",clearInterval(i)})},e)});
//# sourceMappingURL=commonHelpers2.js.map
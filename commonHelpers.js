import"./assets/reset-3ace95da.js";import{f as p,i as u}from"./assets/vendor-651d7991.js";const t=document.querySelector("[data-start]"),D=document.querySelector("[data-days]"),b=document.querySelector("[data-hours]"),C=document.querySelector("[data-minutes]"),E=document.querySelector("[data-seconds]");t.disabled=!0;let o,f;const l=new Date,S={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){o=e[0],o<l?(t.disabled=!0,u.error({title:"Error",message:"Please choose a date in the future",position:"topCenter"})):t.disabled=!1},onChange(e){new Date(e[0])<l?(t.disabled=!0,u.error({title:"Error",message:"Please choose a date in the future",position:"topCenter"})):t.disabled=!1}};p("#datetime-picker",S);function n(e){return e.toString().padStart(2,"0")}function m(e){const s=Date.now(),r=e-s;if(r<=0)clearInterval(f),updateTimerElements({days:0,hours:0,minutes:0,seconds:0});else{const{days:d,hours:i,minutes:a,seconds:c}=q(r);D.textContent=n(d),b.textContent=n(i),C.textContent=n(a),E.textContent=n(c)}}function g(e){m(e),f=setInterval(()=>{m(e)},1e3),t.disabled=!0}t.addEventListener("click",function(){o&&g(o)});function q(e){const a=Math.floor(e/864e5),c=Math.floor(e%864e5/36e5),h=Math.floor(e%864e5%36e5/6e4),y=Math.floor(e%864e5%36e5%6e4/1e3);return{days:a,hours:c,minutes:h,seconds:y}}
//# sourceMappingURL=commonHelpers.js.map

(function(){
var b=document.getElementById("burger"),n=document.getElementById("mnav"),h=document.querySelector("header.top");
if(!b||!n||!h)return;
function set(o){b.setAttribute("aria-expanded",o?"true":"false");b.setAttribute("aria-label",o?"Fermer le menu":"Ouvrir le menu");n.classList.toggle("open",o);h.classList.toggle("menu-open",o);document.documentElement.classList.toggle("menu-open",o)}
b.addEventListener("click",function(){set(b.getAttribute("aria-expanded")!=="true")});
n.addEventListener("click",function(e){if(e.target.closest("a"))set(false)});
addEventListener("keydown",function(e){if(e.key==="Escape")set(false)});
var mq=matchMedia("(max-width:820px)");
if(mq.addEventListener)mq.addEventListener("change",function(){set(false)});
})();

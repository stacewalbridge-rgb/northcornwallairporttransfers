
(function(){
 const c=window.SITE_CONFIG||{};
 const set=(sel,val,attr)=>document.querySelectorAll(sel).forEach(el=>attr?el.setAttribute(attr,val):el.textContent=val);
 set("[data-business]",c.businessName); set("[data-phone]",c.phoneDisplay); set("[data-email]",c.email);
 set("[data-phone-link]","tel:+"+String(c.phoneLink||"").replace(/\D/g,""),"href");
 set("[data-email-link]","mailto:"+c.email,"href"); set("[data-facebook]",c.facebookUrl,"href");
 set("[data-domain]",c.domain); set("[data-licence]",c.operatorLicence);
 const nav=document.querySelector(".nav-toggle"), menu=document.querySelector(".menu");
 if(nav&&menu) nav.addEventListener("click",()=>menu.classList.toggle("open"));
 document.querySelectorAll("[data-year]").forEach(x=>x.textContent=new Date().getFullYear());
 const form=document.querySelector("#quote-form");
 if(form){
   form.addEventListener("submit", async (e)=>{
     e.preventDefault();
     const status=form.querySelector(".form-status");
     const data=Object.fromEntries(new FormData(form).entries());
     data.subject="Airport transfer quote request: "+(data.pickup||"")+" to "+(data.destination||"");
     if(c.formEndpoint){
       status.textContent="Sending your request…";
       try{
         const r=await fetch(c.formEndpoint,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(data)});
         if(!r.ok) throw new Error("send failed");
         status.textContent="Thank you. Your quote request has been sent.";
         form.reset();
       }catch(err){status.textContent="The form could not send. Please call or email us directly."}
     }else{
       const body=Object.entries(data).filter(([k])=>k!=="subject").map(([k,v])=>`${k}: ${v}`).join("\n");
       window.location.href=`mailto:${c.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
       status.textContent="Your email app should now open. Please send the prepared message.";
     }
   });
 }
})();

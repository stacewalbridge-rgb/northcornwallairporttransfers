(()=>{
  const C=window.SITE_CONFIG||{};
  const phone=(C.phoneLink||'447356070904').replace(/\D/g,'');
  const display=C.phoneDisplay||'07356 070904';
  const email=C.email||'info@northcornwallairporttransfers.co.uk';

  document.querySelectorAll('[data-phone-link]').forEach(a=>{
    a.href='tel:+'+phone;
    if(!a.textContent.trim() || !a.textContent.includes('Call')) a.textContent=display;
  });
  document.querySelectorAll('[data-whatsapp]').forEach(a=>{
    a.href='https://wa.me/'+phone+'?text='+encodeURIComponent('Hello, I would like a transfer quotation.');
  });
  document.querySelectorAll('[data-email-link]').forEach(a=>{
    a.href='mailto:'+email;
    a.textContent=email;
  });
  document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());

  const button=document.querySelector('.nav-toggle');
  const menu=document.querySelector('.menu');
  if(button&&menu){
    button.setAttribute('aria-expanded','false');
    button.addEventListener('click',()=>{
      const open=menu.classList.toggle('open');
      button.setAttribute('aria-expanded',String(open));
      button.textContent=open?'Close':'Menu';
      document.body.classList.toggle('menu-open',open);
    });
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      menu.classList.remove('open');
      button.setAttribute('aria-expanded','false');
      button.textContent='Menu';
      document.body.classList.remove('menu-open');
    }));
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape'){
        menu.classList.remove('open');
        button.setAttribute('aria-expanded','false');
        button.textContent='Menu';
        document.body.classList.remove('menu-open');
      }
    });
  }

  document.querySelectorAll('.tab').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(x=>x.hidden=true);
    btn.classList.add('active');
    const panel=document.getElementById(btn.dataset.tab);
    if(panel) panel.hidden=false;
  }));

  const form=document.querySelector('#quote-form');
  if(form){
    const date=form.querySelector('input[type="date"]');
    if(date) date.min=new Date().toISOString().split('T')[0];

    form.addEventListener('submit',async e=>{
      e.preventDefault();
      const d=new FormData(form);
      const o=Object.fromEntries(d.entries());
      const subject='Transfer quote request: '+(o.pickup||'Pickup')+' to '+(o.destination||'Destination');
      const lines=[
        'NEW TRANSFER QUOTE REQUEST',
        '',
        'Pickup: '+(o.pickup||''),
        'Destination: '+(o.destination||''),
        'Collection date: '+(o.date||''),
        'Collection time: '+(o.time||''),
        'Passengers: '+(o.passengers||''),
        'Luggage: '+(o.luggage||''),
        'Journey type: '+(o.journey_type||o.journey||''),
        'Name: '+(o.name||''),
        'Telephone: '+(o.phone||''),
        'Customer email: '+(o.email||''),
        '',
        'Travel details / special requirements:',
        o.details||''
      ];
      const endpoint=C.quoteFormEndpoint||C.formEndpoint||'';
      const status=form.querySelector('.form-status');
      try{
        if(endpoint){
          const r=await fetch(endpoint,{method:'POST',body:d,headers:{Accept:'application/json'}});
          if(!r.ok) throw Error();
          if(status) status.textContent='Thank you. Your quotation request has been sent.';
          form.reset();
        }else{
          window.location.href='mailto:'+email+
            '?subject='+encodeURIComponent(subject)+
            '&body='+encodeURIComponent(lines.join('\n'));
          if(status) status.textContent='Your email app should now open with the quotation details ready to send.';
        }
      }catch{
        if(status) status.textContent='The form could not open. Please email '+email+', call or WhatsApp us.';
      }
    });
  }

  let deferred;
  const box=document.querySelector('#install-app');
  const installButton=document.querySelector('#install-button');
  window.addEventListener('beforeinstallprompt',e=>{
    e.preventDefault();
    deferred=e;
    if(box) box.classList.add('show');
  });
  if(installButton) installButton.addEventListener('click',async()=>{
    if(!deferred)return;
    deferred.prompt();
    await deferred.userChoice;
    deferred=null;
    if(box) box.classList.remove('show');
  });

  if('serviceWorker' in navigator){
    window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js?v=10').catch(()=>{}));
  }
})();
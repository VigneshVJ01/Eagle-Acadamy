 (function(){
  // ----- Config (static knowledge + intents) -----
  const config = {
    botName: "EagleBot",
    brand: {
      primaryColor:"#004080", secondaryColor:"#0077CC", accentColor:"#FFCC00",
      font:"Poppins, sans-serif"
    },
    quickButtons: ["About Us", "Courses & Fees", "Admissions", "Contact", "Events"],
    announcements: [
      "✨ New branch opened in Bangalore! Admissions open now.",
      "📢 Upcoming Workshop: Resume Building on 10-Oct-2025 — Register Now!"
    ],
    contact: {
      phones: ["+91 8105831142","+91 9980273688"],
      address: "Eagle Academy, 18, 20th Main, Mahakavi Kuvempu Rd, Bengaluru, 560010, KA, IN"
    },
    brochureUrl: "#", // TODO: replace with actual brochure URL
    paymentLink: "#", // TODO: replace with payment URL (if online payment is integrated)
    intents: {
      greet: {
        utterances: ["hi","hello","hey","good morning","good evening"],
        response: () => greeting()
      },
      about_academy: {
        utterances: ["about eagle academy","who are you","tell me about eagle academy","about academy","about us"],
        response: () => KB.ABOUT
      },
      courses: {
        utterances: ["courses","what courses do you offer","banking coaching details","soft skills course","courses & fees"],
        response: () => KB.COURSES_SHORT
      },
      fees: {
        utterances: ["fees","banking fee","how much is the banking course","soft skills fee","course fees"],
        response: () => feesFlowPrompt()
      },
      admissions: {
        utterances: ["register","apply","admission form","how to register","admissions","i want to register"],
        response: () => startRegistration()
      },
      founder: {
        utterances: ["founder","founder vinod lamani","cofounder manjunath","who started the academy"],
        response: () => KB.FOUNDER
      },
      location: {
        utterances: ["address","where are you located","bagalkot","bengaluru address","bangalore address","location"],
        response: () => KB.LOCATION
      },
      contact: {
        utterances: ["contact","phone number","email","need to talk to someone"],
        response: () => contactFlow()
      },
      events: {
        utterances: ["events","upcoming workshops","seminars","workshops","show events"],
        response: () => KB.EVENTS
      },
      placements: {
        utterances: ["placement assistance","placements","companies"],
        response: () => KB.PLACEMENTS
      },
      gallery: {
        utterances: ["photos","gallery","class photos"],
        response: () => "Please visit our Gallery page to see class photos and activities."
      },
      brochure: {
        utterances: ["send brochure","download brochure","brochure pdf"],
        response: () => `You can download our brochure here: ${link(config.brochureUrl, "Download Brochure")}`
      },
      demo_class: {
        utterances: ["demo class","trial class","free demo","demo"],
        response: () => "Yes, we offer demo sessions for new batches. Would you like me to note your interest for a callback?"
      },
      payment: {
        utterances: ["pay","payment","course payment","pay online"],
        response: () => paymentOptions()
      },
      faq_operational: {
        utterances: ["hours","timings","open","class timing","operating hours"],
        response: () => KB.FAQ_HOURS
      }
    },
    fallback: {
      first: "Sorry, I didn’t understand that. You can try: About Us, Courses & Fees, Admissions, Events, or Contact. Which would you like?",
      second: "I’m still not getting it. Would you like to speak to our admissions team? Call +91 8105831142 or type \"callback\"."
    }
  };

  // ----- Knowledge Base (verbatim copy) -----
  const KB = {
    ABOUT:
`Eagle Academy — About Us
Founded in 2023 at Bagalkot, Eagle Academy has rapidly emerged as a premier destination for Banking and KPSC coaching. With a vision to transform aspirations into achievements, the academy guides students with unmatched dedication and proven strategies. In a short span, Eagle Academy has established itself as a trusted hub of excellence known for its results-driven approach, expert faculty, and student-centric learning environment.
Our programs prepare students for competitive exams while instilling confidence, discipline, and a winning mindset. We believe success is not accidental — it results from consistent effort, the right guidance, and unwavering determination. Eagle Academy is committed to empowering learners with knowledge and skills to reach career goals and secure a brighter future.
We operate both online and offline classes, available on weekdays and weekends, and now have a branch in Bengaluru.`,
    COURSES:
`Courses we provide:
Soft Skills Training with IT & Non-IT Placements
- Personality development & confidence building
- Communication, presentation, and corporate etiquette
- Resume building & interview preparation
- Placement assistance in both IT and Non-IT sectors
Fee: ₹6,999/-

Banking Coaching
- Complete guidance for IBPS, SBI, RBI, and other banking exams
- Concept-based learning with shortcuts & tricks
- Regular mock tests, doubt-solving sessions, and progress tracking
Fee: ₹9,999/-

Mode: ONLINE & OFFLINE (both weekday & weekend batches available).
If you want a downloadable brochure, say “Send brochure” or click Download Brochure.`,
    COURSES_SHORT:
"Courses: Banking Coaching (₹9,999), Soft Skills & Placements (₹6,999). Online & Offline batches available.",
    ADMISSIONS:
`Admissions / Online Registration
To register, we need: Full Name, Email, Phone Number, Course selection, and (optional) documents like ID or educational certificates. You can register online here or visit the center to enroll offline. We accept both online and offline payments (payment gateway optional).
Quick steps:
1) Choose the course you want (Banking / Soft Skills & Placements).
2) Fill the registration form (Name, Email, Phone, Course, Upload documents).
3) Pay the course fee (if paying online) or choose offline payment at the center.
4) Receive confirmation and batch details by SMS/WhatsApp/Email.
Would you like to register now?`,
    FOUNDER:
`Founder — Mr. Vinod Lamani
Mr. Vinod Lamani founded Eagle Academy in 2023 at Bagalkot with a mission to empower students and turn aspirations into achievements. Under his leadership, Eagle Academy has become a premier center for Banking and KPSC coaching as well as Soft Skills & Placements. He’s known for his results-driven approach and focus on confidence, professionalism, and career readiness.

Co-founder — Mr. Manjunath M N
Mr. Manjunath has over 10 years of experience in IT placements. He shapes placement programs, mentors students, and bridges academic learning with corporate expectations. His strategic guidance helps aspirants secure positions in leading IT organizations.`,
    LOCATION:
`Locations:
- Bagalkot (Original Branch) — (Established 2023)
- Bengaluru (New Branch) — Eagle Academy, 18, 20th Main, Mahakavi Kuvempu Rd, Bengaluru, 560010, KA, IN
Contact numbers: +91 8105831142, +91 9980273688`,
    PLACEMENTS:
`Placements & Services
We provide placement assistance in IT and Non-IT sectors for students enrolled in Soft Skills Training.
Our placement program includes resume polishing, mock interviews, soft skills, and technical readiness.
Services available: Online coaching, Offline coaching (weekday & weekend batches).
We showcase placement success stories and industry tie-ups on the website’s Placements page.`,
    EVENTS:
`Events & Workshops
We run seminars, workshops, and guest lectures. Upcoming events will be posted on the Events page. You can register online for workshops or contact us to be notified.`,
    FAQ_HOURS:
`For admissions and visits, please contact us at +91 8105831142 / +91 9980273688 to confirm batch timings. Offline classes are available on weekdays and weekends; online class schedules vary by batch.`,
    PRIVACY:
`Privacy & Consent for Chat / Registration:
By submitting your details through this chat, you consent to receive communications from Eagle Academy for admissions, batch updates, and placements. Your data will be stored securely and used solely for admission and placement-related communication. We will not share your personal data with external parties without your consent. For questions, call +91 8105831142.`
  };

  // ----- State -----
  let fallbackCount = 0;
  const state = {
    flow: null, // 'register' | 'callback' | null
    reg: {
      step: 0,
      name: "", phone: "", email: "", course: "", paymentPreference: "", consent: false
      // documents: handled via page upload link if needed
    },
    callback: { phone:"", time:"" }
  };

  // ----- UI helpers -----
  const qs = s => document.querySelector(s);
  const body = qs("#eaBody");
  const input = qs("#eaInput");

  function link(href, label){ return `<a class="ea-link" href="${href}" target="_blank" rel="noopener">${label}</a>`; }
  function button(label, payload=null, classes="ea-btn"){
    const id = "btn_"+Math.random().toString(36).slice(2,9);
    return `<button class="${classes}" data-payload='${payload?JSON.stringify(payload):""}' id="${id}">${label}</button>`;
  }
  function row(html, who="bot"){
    const div = document.createElement("div");
    div.className = "ea-row";
    const msg = document.createElement("div");
    msg.className = `ea-msg ${who==="bot"?"ea-bot":"ea-user"}`;
    msg.innerHTML = html;
    div.appendChild(msg);
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }
  function systemNote(text){
    const d = document.createElement("div");
    d.className = "ea-system";
    d.textContent = text;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
  }
  function showButtons(labels){
    const wrap = document.createElement("div");
    wrap.className = "ea-buttons";
    labels.forEach(l=>{
      const b = document.createElement("button");
      b.className = "ea-btn";
      b.textContent = l;
      b.onclick = ()=> handleUserText(l);
      wrap.appendChild(b);
    });
    body.appendChild(wrap);
    body.scrollTop = body.scrollHeight;
  }

  // ----- Greeting -----
  function greeting(){
    const lines = [
      "👋 Hello! I’m EagleBot, the virtual assistant for Eagle Academy.",
      "I can help you with information about our courses, fees, admissions, upcoming workshops, placements, our founders, location, and how to register.",
      "How can I help you today?",
      "You can say things like: “About Eagle Academy”, “Banking course fee”, “How to apply”, “Contact details”, or “Show events”."
    ];
    row(lines.join("<br>"));
    const btns = ["About Us","Courses & Fees","Admissions","Contact","Events"];
    const wrap = document.createElement("div"); wrap.className="ea-buttons";
    btns.forEach(l=>{
      const b=document.createElement("button"); b.className="ea-btn"; b.textContent=l;
      b.onclick=()=> handleUserText(l);
      wrap.appendChild(b);
    });
    body.appendChild(wrap);

    // Announcements
    if (config.announcements?.length){
      row("Announcements:", "bot");
      config.announcements.forEach(a=> row("• "+a, "bot"));
    }
  }

  // ----- Contact / Callback -----
  function contactFlow(){
    const c = config.contact;
    const msg = [
      `You can call admissions at ${c.phones.join(" or ")}.`,
      `Address: ${c.address}`,
      "Would you like me to request a callback?"
    ].join("<br>");
    return msg + `<div class="ea-buttons">
      ${button("Request Callback", {action:"start_callback"})}
      ${button("Call Admissions", {action:"call"}, "ea-cta")}
    </div>`;
  }

  function startCallbackFlow(){
    state.flow = "callback";
    state.callback = { phone:"", time:"" };
    row("Sure — please provide a callback number (10 digits or +91XXXXXXXXXX).");
  }

  function finalizeCallback(){
    row(`✅ Callback request recorded! Phone: ${state.callback.phone}${state.callback.time? " | Preferred time: "+state.callback.time:""}. Our team will reach out shortly.`, "bot");
    state.flow = null;
  }

  // ----- Payments -----
  function paymentOptions(){
    return `Choose a payment option:
    <div class="ea-buttons">
      ${button("Pay Online", {action:"pay_online"}, "ea-cta")}
      ${button("Pay at Center", {action:"pay_center"})}
    </div>`;
  }

  // ----- Fees flow -----
  function feesFlowPrompt(){
    return `Our Banking Coaching fee is ₹9,999. It includes concept-based learning, shortcuts, regular mocks, and progress tracking.
Would you like to register or see batch schedules?
<div class="ea-buttons">
  ${button("Register Now",{action:"start_register"},"ea-cta")}
  ${button("View Batches",{action:"view_batches"})}
  ${button("Contact Admissions",{action:"contact"})}
</div>`;
  }

  // ----- Registration flow -----
  function startRegistration(){
    state.flow = "register";
    state.reg = { step:0, name:"", phone:"", email:"", course:"", paymentPreference:"", consent:false };
    row("Great! I’ll help with that. What is your full name?");
  }
  function registrationNext(){
    const s = state.reg.step;
    if (s===0){
      row("Enter your phone number (e.g. +91XXXXXXXXXX):");
    } else if (s===1){
      row("Enter your email address:");
    } else if (s===2){
      row(`Which course would you like?`, "bot");
      const wrap=document.createElement("div"); wrap.className="ea-buttons";
      [["Banking (₹9,999)","Banking"],["Soft Skills & Placements (₹6,999)","Soft Skills & Placements"]]
        .forEach(([label,value])=>{
          const b=document.createElement("button"); b.className="ea-btn";
          b.textContent=label; b.onclick=()=>{ state.reg.course=value; row(label,"user"); state.reg.step++; registrationNext(); };
          wrap.appendChild(b);
        });
      body.appendChild(wrap);
      body.scrollTop=body.scrollHeight;
      return;
    } else if (s===3){
      row(`Would you like to upload documents? (Optional) — Use "Upload" on the registration page if needed.`);
      row(`Would you like to pay now online or pay at center?`);
      const wrap=document.createElement("div"); wrap.className="ea-buttons";
      ["Pay Online","Pay at Center"].forEach(label=>{
        const b=document.createElement("button"); b.className= label==="Pay Online"?"ea-cta ea-btn":"ea-btn";
        b.textContent=label; b.onclick=()=>{ state.reg.paymentPreference=label; row(label,"user"); state.reg.step++; registrationNext(); };
        wrap.appendChild(b);
      });
      body.appendChild(wrap); body.scrollTop=body.scrollHeight;
      return;
    } else if (s===4){
      // Consent
      const consentHtml = `
        <div class="ea-consent">
          <strong>Consent Required</strong><br>
          By registering you agree to be contacted by Eagle Academy regarding admissions, batches, and placement opportunities. We will not share your personal information with third parties without consent.
        </div>
        <div class="ea-buttons" style="margin-top:8px">
          ${button("I Agree",{action:"consent_yes"},"ea-cta")}
          ${button("Cancel",{action:"consent_no"})}
        </div>
      `;
      row(consentHtml);
      return;
    } else {
      const phone = state.reg.phone;
      row(`✅ Registration received! Name: ${state.reg.name} | Course: ${state.reg.course} | Phone: ${phone}. Our team will contact you within 24 hours with batch details. For urgent queries call +91 8105831142 or +91 9980273688.`, "bot");
      state.flow = null;
      return;
    }
    state.reg.step++;
  }

  // ----- Validation -----
  function validPhone(s){
    return /^\+91\d{10}$/.test(s) || /^\d{10}$/.test(s);
  }
  function validEmail(s){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
  }

  // ----- Routing / NLP (simple) -----
  function routeIntent(text){
    const t = text.trim().toLowerCase();
    // hard triggers
    if (t==="callback"||t.includes("speak to human")||t.includes("talk to human")) return {name:"contact", res:contactFlow()};
    // lookup
    for (const [name, intent] of Object.entries(config.intents)){
      if (intent.utterances.some(u=> t.includes(u))) {
        return {name, res: typeof intent.response==="function"? intent.response(): intent.response};
      }
    }
    // Fees special
    if (t.includes("fee")||t.includes("fees")) return {name:"fees", res: feesFlowPrompt()};
    return null;
  }

  // ----- Event handling -----
  function handleUserText(raw){
    const text = raw.trim();
    if (!text) return;
    row(text, "user");

    // If in flows
    if (state.flow==="register"){
      const s = state.reg.step;
      if (s===1){ // expecting phone
        if (!validPhone(text)){ row("Please enter a valid phone (10 digits or +91XXXXXXXXXX)."); return; }
        state.reg.phone = text; registrationNext(); return;
      }
      if (s===0){ // name
        if (text.length<2){ row("Name must be at least 2 characters."); return; }
        state.reg.name = text; registrationNext(); return;
      }
      if (s===2){ // expecting email
        if (!validEmail(text)){ row("Please enter a valid email address."); return; }
        state.reg.email = text; registrationNext(); return;
      }
      // steps 3-4 handled by buttons
      return;
    }

    if (state.flow==="callback"){
      if (!state.callback.phone){
        if (!validPhone(text)){ row("Please provide a valid phone number (10 digits or +91XXXXXXXXXX)."); return; }
        state.callback.phone = text;
        row("Thanks. Please share a preferred time (e.g., Today 4-6 PM) or type 'skip'.");
        return;
      } else if (!state.callback.time){
        if (text.toLowerCase()!=="skip") state.callback.time = text;
        finalizeCallback();
        return;
      }
    }

    const match = routeIntent(text);
    if (match){
      fallbackCount = 0;
      if (typeof match.res === "string") {
        row(match.res, "bot");
      } else {
        row(String(match.res), "bot");
      }
      return;
    }

    // Fallbacks
    fallbackCount++;
    if (fallbackCount===1){
      row(config.fallback.first, "bot");
    } else {
      row(config.fallback.second, "bot");
      const wrap=document.createElement("div"); wrap.className="ea-buttons";
      const call=document.createElement("button"); call.className="ea-cta ea-btn"; call.textContent="Call Admissions";
      call.onclick=()=> handleUserText("contact");
      const cb=document.createElement("button"); cb.className="ea-btn"; cb.textContent="Request Callback";
      cb.onclick=()=> startCallbackFlow();
      wrap.appendChild(call); wrap.appendChild(cb);
      body.appendChild(wrap); body.scrollTop=body.scrollHeight;
    }
  }

  // ----- Click/Key handlers -----
  document.addEventListener("click", (e)=>{
    const target = e.target;
    if (target.matches(".ea-btn, .ea-cta")){
      const payload = target.getAttribute("data-payload");
      if (payload){
        try {
          const data = JSON.parse(payload);
          if (data.action==="start_register"){ startRegistration(); return; }
          if (data.action==="view_batches"){ row("Please contact admissions for current batch schedules."); return; }
          if (data.action==="contact"){ row(contactFlow(),"bot"); return; }
          if (data.action==="start_callback"){ startCallbackFlow(); return; }
          if (data.action==="call"){ row(`Please call ${config.contact.phones.join(" or ")} for immediate assistance.`); return; }
          if (data.action==="pay_online"){
            if (config.paymentLink && config.paymentLink!="#"){
              row(`You can pay online here: ${link(config.paymentLink,"Pay Now")}`);
            } else {
              row("Online payment link not configured yet. We will share payment instructions via SMS/Email.");
            }
            return;
          }
          if (data.action==="pay_center"){ row("You can pay at the center during office hours. Our team will guide you."); return; }
          if (data.action==="consent_yes"){
            state.reg.consent=true; state.reg.step++; registrationNext(); return;
          }
          if (data.action==="consent_no"){ row("Registration cancelled. You can start again anytime by typing 'register'."); state.flow=null; return; }
        } catch(e){}
      }
    }
  });

  const sendBtn = document.getElementById("eaSend");
  if (sendBtn) {
    sendBtn.addEventListener("click", ()=>{
      const t = input.value; input.value=""; handleUserText(t);
    });
  }
  if (input) {
    input.addEventListener("keydown", (e)=>{
      if (e.key==="Enter"){ const t = input.value; input.value=""; handleUserText(t); }
    });
  }

  // ----- Widget open/close -----
  const launcher = document.getElementById("eaLauncher");
  const widget = document.getElementById("eaWidget");
  const closeBtn = document.getElementById("eaClose");
  if (launcher) {
    launcher.onclick = ()=>{
      widget.style.display = "flex";
      body.innerHTML = "";
      greeting();
      // Quick actions row under greeting
      const wrap=document.createElement("div"); wrap.className="ea-buttons";
      config.quickButtons.forEach(q=>{
        const b=document.createElement("button");
        b.className="ea-btn"; b.textContent=q; b.onclick=()=> handleUserText(q);
        wrap.appendChild(b);
      });
      body.appendChild(wrap);
      systemNote("Use Tab to move focus; Enter to send.");
      input && input.focus();
    };
  }
  if (closeBtn) {
    closeBtn.onclick = ()=> widget.style.display="none";
  }

  // Accessibility: focus into body when opened
  if (widget) {
    widget.addEventListener("transitionend", ()=> body.focus(), {once:true});
  }

  // ----- Preload brand theme -----
  document.documentElement.style.setProperty("--ea-primary", config.brand.primaryColor);
  document.documentElement.style.setProperty("--ea-secondary", config.brand.secondaryColor);
  document.documentElement.style.setProperty("--ea-accent", config.brand.accentColor);
  document.body.style.fontFamily = config.brand.font;
})();


(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".mobile-nav");
  if (!toggle || !nav) return;

  var scrim = document.createElement("div");
  scrim.className = "nav-scrim";
  scrim.setAttribute("aria-hidden", "true");
  document.body.appendChild(scrim);

  function setOpen(open) {
    nav.classList.toggle("open", open);
    scrim.classList.toggle("show", open);
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("open"));
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });
  scrim.addEventListener("click", function () {
    setOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) setOpen(false);
  });
})();

(function () {
  // Contact form wiring. Paste Sarah Beth's email below when she's ready;
  // until then the form shows a "not connected yet" note on submit.
  var CONTACT_EMAIL = "";

  var toggle = document.getElementById("contact-toggle");
  var wrap = document.getElementById("contact-form-wrap");
  if (toggle && wrap) {
    toggle.addEventListener("click", function () {
      var opening = wrap.hasAttribute("hidden");
      if (opening) {
        wrap.removeAttribute("hidden");
      } else {
        wrap.setAttribute("hidden", "");
      }
      toggle.setAttribute("aria-expanded", opening ? "true" : "false");
      toggle.textContent = opening ? "Close" : "Contact us";
    });
  }

  var form = document.getElementById("contact-form");
  if (!form) return;
  var note = form.querySelector(".form-note");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    var typeEl = form.querySelector('input[name="customer_type"]:checked');
    var customerType = typeEl ? typeEl.value : "";
    if (!CONTACT_EMAIL) {
      note.textContent =
        "Thanks for reaching out! Our inbox is being connected \u2014 please message us on Facebook for now.";
      note.classList.remove("ok");
      return;
    }
    var btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.textContent = "Sending\u2026";
    var payload = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      phone: form.elements.phone.value.trim(),
      customer_type: customerType,
      message: form.elements.message.value.trim(),
      _subject: "New website inquiry (" + customerType + ")"
    };
    fetch("https://formsubmit.co/ajax/" + encodeURIComponent(CONTACT_EMAIL), {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (r) { return r.json(); })
      .then(function () {
        note.textContent = "Thanks \u2014 your message is on its way! We\u2019ll be in touch soon.";
        note.classList.add("ok");
        form.reset();
      })
      .catch(function () {
        note.textContent =
          "Something went wrong sending that \u2014 please message us on Facebook instead.";
        note.classList.remove("ok");
      })
      .then(function () {
        btn.disabled = false;
        btn.textContent = "Send message";
      });
  });
})();

/* Partner marquee — replace the placeholders with Sarah Beth's real partner business names */
const PARTNERS = [
  { name: "Grit & Grace", town: "Glennville" },
  { name: "The Farmhouse", town: "Glennville" },
  { name: "The Studio House", town: "Reidsville" },
  { name: "Salt & Light Bakery", town: "Vidalia, GA" },
  { name: "The Market by Dent Farms", town: "Jesup, GA" }
];
(function buildPartnerMarquee() {
  const track = document.getElementById("partnerTrack");
  if (!track || !PARTNERS.length) return;
  const units = PARTNERS.map((p) => {
    const u = document.createElement("span");
    u.className = "mq-unit";
    const place = document.createElement("span");
    place.className = "mq-place";
    const name = document.createElement("span");
    name.className = "mq-name";
    name.textContent = p.name;
    const town = document.createElement("span");
    town.className = "mq-town";
    town.textContent = p.town;
    place.append(name, town);
    const dot = document.createElement("span");
    dot.className = "mq-dot";
    dot.textContent = "\u2022";
    u.append(place, dot);
    return u;
  });
  track.append(...units, ...units.map((u) => u.cloneNode(true)));
})();

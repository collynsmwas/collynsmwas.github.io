(function () {
  const S = window.SITE;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ext = (href, text) => `<a href="${esc(href)}" target="_blank" rel="noopener">${text}</a>`;

  const ICONS = {
    github: '<path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.2 4.1 18.2 4.4 18.2 4.4c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"/>',
    linkedin: '<path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.5V9h3.6v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z"/>',
    group: '<path d="M12 2 1 7l11 5 9-4.1V15h2V7L12 2zM5 13.2V17c0 1.7 3.1 3 7 3s7-1.3 7-3v-3.8l-7 3.2-7-3.2z"/>',
    scholar: '<path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.8 3.9A9 9 0 0 1 12 10a9 9 0 0 1 7.2 3.4L24 9.5 12 0z"/>',
    orcid: '<path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zM8.1 17.5H6.6V7.1h1.5v10.4zM7.4 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm10.4 6.3c0 3-1.9 5.2-5.3 5.2H9.6V7.1h2.9c3.5 0 5.3 2.3 5.3 5.2zm-1.6 0c0-2-1.2-3.8-4-3.8h-1.2v7.6h1.2c2.8 0 4-2 4-3.8z"/>',
    email: '<path d="M2 4h20a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm10 8.5L2.5 6.5v1.8l9.5 6 9.5-6V6.5L12 12.5z"/>',
  };
  const LABELS = { github: "GitHub", linkedin: "LinkedIn", group: "SE@UHD group page", scholar: "Google Scholar", orcid: "ORCID", email: "Email" };

  // ---------- Header / hero ----------
  document.title = S.name;
  $("handle").textContent = S.handle;
  $("name").textContent = S.name;
  $("role").textContent = S.role;
  $("group").innerHTML = `${ext(S.group.url, esc(S.group.name))}, ${esc(S.group.university)} · group of ${esc(S.group.head)}`;
  $("avatar").src = `https://github.com/${S.githubUser}.png?size=280`;
  $("avatar").alt = S.name;
  $("social").innerHTML = Object.entries(S.links).filter(([, u]) => u)
    .map(([k, u]) => `<a href="${esc(u)}" ${u.startsWith("mailto:") ? "" : 'target="_blank" rel="noopener"'} aria-label="${LABELS[k]}" title="${LABELS[k]}"><svg viewBox="0 0 24 24">${ICONS[k]}</svg></a>`).join("");

  const nPubs = S.conference.length + S.journal.length + S.chapters.length + S.preprints.length;
  $("stats").textContent = `${nPubs} papers · ${S.teaching.length} courses · theses: open`;
  $("loc").textContent = S.location;
  $("contact").innerHTML = S.contact.map((c) => `<dt>${esc(c.key)}</dt><dd>${c.href
    ? `<a href="${esc(c.href)}" ${c.href.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>${esc(c.value)}</a>`
    : esc(c.value)}</dd>`).join("");

  $("colophon").innerHTML = S.colophon.map(([k, v, u]) => `<dt>${esc(k)}</dt><dd>${u ? ext(u, esc(v)) : esc(v)}</dd>`).join("");
  $("c-year").textContent = new Date().getFullYear();
  $("c-name").textContent = S.name;

  // ---------- Citations per year (Google Scholar snapshot) ----------
  const citations = Promise.resolve(S.citations);

  citations.then((c) => {
    const rows = Object.entries(c.byYear).map(([y, n]) => [y, n]);
    const max = Math.max(1, ...rows.map((r) => r[1]));
    $("cites-bars").innerHTML = rows.map(([y, n]) => `
      <div class="bar-row"><span class="yr">${y}</span>
        <span class="track"><span class="fill" style="--w:${(n / max) * 100}%"></span></span>
        <span class="n">${n}</span></div>`).join("");
    $("cites-stats").innerHTML =
      `<span><b>${c.total}</b> citations</span><span><b>${c.hIndex}</b> h-index</span><span><b>${c.i10}</b> i10</span>`;
    $("cites-src").innerHTML = `<a href="${esc(S.links.scholar)}" target="_blank" rel="noopener" aria-label="Open Google Scholar profile">↗</a>`;
    requestAnimationFrame(() => document.querySelector(".cites").classList.add("on"));
  });

  // ---------- Research diagram (README) ----------
  const fileBox = (y, name) => `<g class="d-file" transform="translate(40 ${y})"><rect width="150" height="30" rx="6"/><text x="12" y="20">${name}</text></g>`;
  const DIAGRAM = `
    <figure class="diagram">
      <svg viewBox="0 0 660 215" role="img" aria-labelledby="dg-t">
        <title id="dg-t">Instruction files such as AGENTS.md, CLAUDE.md, skills and settings feed into a coding agent, which changes the code. The files can drift from the code and contradict each other.</title>
        <defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="d-head"/></marker></defs>
        ${fileBox(20, "AGENTS.md")}${fileBox(70, "CLAUDE.md")}${fileBox(120, ".claude/skills/")}${fileBox(170, "settings.json")}
        <path class="d-conflict" d="M34 88 h-10 v50 h10"/>
        <text class="d-label d-bad" x="14" y="113" transform="rotate(-90 14 113)" text-anchor="middle">conflict</text>
        <path class="d-flow" d="M190 35 C 230 35, 240 108, 280 110" marker-end="url(#arr)"/>
        <path class="d-flow" d="M190 85 C 230 85, 240 110, 280 112" marker-end="url(#arr)"/>
        <path class="d-flow" d="M190 135 C 230 135, 240 114, 280 114" marker-end="url(#arr)"/>
        <path class="d-flow" d="M190 185 C 230 185, 240 116, 280 116" marker-end="url(#arr)"/>
        <g class="d-agent" transform="translate(282 88)"><rect width="128" height="52" rx="10"/><text x="64" y="23" text-anchor="middle">coding agent</text><text class="d-sub" x="64" y="40" text-anchor="middle">reads the files</text></g>
        <path class="d-flow" d="M410 114 H478" marker-end="url(#arr)"/>
        <g class="d-file d-code" transform="translate(480 88)"><rect width="160" height="52" rx="10"/><text x="80" y="23" text-anchor="middle">code &amp; pull requests</text><text class="d-sub" x="80" y="40" text-anchor="middle">src/, tests/</text></g>
        <path class="d-drift" d="M190 30 C 330 -6, 520 4, 560 86"/>
        <text class="d-label d-bad" x="375" y="46" text-anchor="middle">drift: stale reference to the code</text>
        <text class="d-label" x="460" y="182" text-anchor="middle">How are these files written, how do they change,</text>
        <text class="d-label" x="460" y="200" text-anchor="middle">and how can problems in them be detected?</text>
      </svg>
    </figure>`;

  // ---------- Sections, each shown as a file ----------
  const boldName = (authors) => {
    let out = esc(authors);
    for (const n of S.authorNames) out = out.replaceAll(esc(n), `<strong>${esc(n)}</strong>`);
    return out;
  };
  const pubs = (label, list) => !list.length ? "" : `<h3 class="mono">// ${label}</h3>` + list.map((p) => `
    <article class="pub">
      <span class="venue mono">${esc(p.venue)}${/\d{4}/.test(p.venue) ? "" : " " + p.year}</span>
      <div class="title">${ext("https://doi.org/" + p.doi, esc(p.title))}</div>
      <div class="authors">${boldName(p.authors)}</div>
      <div class="plinks mono">
        ${ext("https://doi.org/" + p.doi, "doi")}
        ${p.arxiv ? ext(`https://arxiv.org/pdf/${p.arxiv}`, "pdf") + ext(`https://arxiv.org/abs/${p.arxiv}`, "arXiv") : ""}
        ${BIB[p.doi] ? `<button class="bib-btn" data-doi="${esc(p.doi)}" aria-expanded="false">bib</button>` : ""}
      </div>
      ${BIB[p.doi] ? `<div class="bib" hidden><button class="bib-copy mono">copy</button><pre class="mono">${esc(BIB[p.doi])}</pre></div>` : ""}
    </article>`).join("");
  const entries = (label, list) => !list.length ? "" : `<h3 class="mono">// ${label}</h3>` + list.map((e) => `
    <div class="entry">
      <div><div class="title">${esc(e.title)}</div><div class="sub">${esc(e.org)}${e.note ? " · " + esc(e.note) : ""}</div></div>
      <div class="side mono">${esc(e.years)}<br>${esc(e.place)}</div>
    </div>`).join("");

  const BIB = window.BIBTEX || {};
  const T = S.theses;
  const sections = [
    { id: "about", path: "README.md", icon: "M↓", html: S.about.map((p) => `<p>${esc(p)}</p>`).join("") + DIAGRAM },
    { id: "news", path: "news/feed.log", icon: "≡", html: !S.news.length
      ? `<div class="feed-empty mono"><span class="t-prompt">$ tail -f news/feed.log</span><span>no news yet, check back later</span><span class="cursor"></span></div>`
      : `<ol class="log">${S.news.map((n, i) => `
      <li${i >= 5 ? ' class="old" hidden' : ""}><span class="when mono">${esc(n.date)}</span>
        <span class="what">${n.url ? ext(n.url, esc(n.text)) : esc(n.text)}</span></li>`).join("")}</ol>
      ${S.news.length > 5 ? `<button id="log-more" class="more mono">show ${S.news.length - 5} older</button>` : ""}` },
    { id: "publications", path: "research/publications.bib", icon: "{}", html:
      pubs("conference papers", S.conference) + pubs("journal articles", S.journal) +
      pubs("book chapters", S.chapters) + pubs("preprints", S.preprints) },
    { id: "teaching", path: "teaching/courses.yaml", icon: "Y", html: S.teaching.map((t) => `
      <div class="course">
        <div class="semester mono">${esc(t.term)}</div>
        <div>
          <div class="title">${ext(t.url, esc(t.title))}</div>
          <div class="sub"><span class="kind mono">${esc(t.kind)}</span>${t.level ? ` · ${esc(t.level)}` : ""} · ${esc(t.place)}</div>
          <div class="sub">${esc(t.role)}</div>
        </div>
      </div>`).join("") },
    { id: "experience", path: "experience.yaml", icon: "Y", html: entries("experience", S.experience) + entries("education", S.education) },
    { id: "theses", path: "theses/OPEN_POSITIONS.md", icon: "M↓", badge: "open", html: `
      <div class="banner"><span class="pulse"></span><strong>Looking for Bachelor's and Master's students</strong></div>
      <p>${esc(T.intro)}</p>
      <h3 class="mono">## Before you apply</h3>
      <ul class="checks mono-list">${T.requirements.map((t) => `<li><span class="box mono">[ ]</span>${esc(t)}</li>`).join("")}</ul>
      <p class="muted">${esc(T.note)}</p>
      <a class="cta mono" href="${esc(T.guidelines)}" target="_blank" rel="noopener">$ open thesis guidelines ↗</a>` },
  ].filter((s) => s.html.trim());

  $("human").innerHTML = sections.map((s) => `
    <section class="file" id="${s.id}">
      <div class="tab mono"><span class="ic">${s.icon}</span>${esc(s.path)}${s.badge ? `<span class="badge">${s.badge}</span>` : ""}</div>
      <div class="body">${s.html}</div>
    </section>`).join("");

  document.querySelectorAll(".bib-btn").forEach((b) => b.addEventListener("click", () => {
    const box = b.closest(".pub").querySelector(".bib");
    box.hidden = !box.hidden;
    b.setAttribute("aria-expanded", String(!box.hidden));
  }));
  const copyText = async (btn, text) => {
    try { await navigator.clipboard.writeText(text); btn.textContent = "copied"; }
    catch { btn.textContent = "copy failed"; }
    setTimeout(() => (btn.textContent = "copy"), 1500);
  };
  document.querySelectorAll(".bib-copy").forEach((b) => b.addEventListener("click", () => copyText(b, b.nextElementSibling.textContent)));
  $("log-more")?.addEventListener("click", (e) => {
    document.querySelectorAll(".log .old").forEach((li) => (li.hidden = false));
    e.target.remove();
  });

  const md = window.siteToMarkdown(S);

  // ---------- Explorer: collapsible file tree ----------
  const FILETYPE = { md: ["M↓", "ft-md"], bib: ["{}", "ft-bib"], yaml: ["Y", "ft-yaml"], log: ["≡", "ft-log"], txt: ["≡", "ft-txt"] };
  const textOf = (sel) => [...document.querySelectorAll(sel)].map((e) => e.textContent.trim());
  const files = [
    ...sections.map((s) => ({ ...s })),
    { id: "agent", path: "llms.txt", lines: md.split("\n").length },
  ];
  const info = {
    about: { peek: S.about[0].slice(0, 150) + "…" },
    news: { count: S.news.length || null, peek: S.news.length ? S.news.slice(0, 3).map((n) => `${n.date}  ${n.text}`).join("\n") : "no news yet" },
    publications: { count: nPubs, peek: textOf("#publications .pub .title").slice(0, 3).join("\n") },
    teaching: { count: S.teaching.length, peek: S.teaching.slice(0, 3).map((t) => `${t.term}  ${t.title}`).join("\n") },
    experience: { count: S.experience.length + S.education.length, peek: [...S.experience, ...S.education].map((e) => `${e.title}, ${e.org}`).join("\n") },
    theses: { peek: "open for Bachelor & Master students\n→ read the guidelines first" },
    agent: { peek: `plain-text version of this site for AI agents\n${md.split("\n").length} lines · click to open` },
  };
  let rows = `<div class="row folder" role="treeitem" aria-expanded="true" aria-level="1" data-dir="/" tabindex="0"><span class="chev">▸</span><span class="name">${esc(S.handle)}</span></div>`;
  let lastDir = "";
  for (const f of files) {
    const parts = f.path.split("/");
    const dir = parts.length > 1 ? parts[0] : "";
    if (dir && dir !== lastDir) rows += `<div class="row folder" role="treeitem" aria-expanded="true" aria-level="2" data-dir="${dir}" data-in="/" tabindex="-1"><span class="chev">▸</span><span class="name">${esc(dir)}</span></div>`;
    lastDir = dir;
    const name = parts[parts.length - 1];
    const [ic, cls] = FILETYPE[name.split(".").pop()] || ["·", ""];
    const meta = info[f.id] || {};
    rows += `<a class="row leaf${f.id === "agent" ? " llms" : ""}" role="treeitem" aria-level="${dir ? 3 : 2}" href="#${f.id}" data-id="${f.id}" data-in="${dir ? dir + " /" : "/"}" tabindex="-1">
      <span class="ic ${cls}">${ic}</span><span class="name">${esc(name)}</span>
      ${meta.count ? `<span class="count">${meta.count}</span>` : ""}${f.badge ? '<span class="dot" title="open"></span>' : ""}</a>`;
  }
  $("tree").innerHTML = rows;
  const treeRows = [...$("tree").querySelectorAll(".row")];
  const leaves = treeRows.filter((r) => r.classList.contains("leaf"));

  // Folders: click the row (or press ←/→) to collapse and expand
  const setFolder = (row, open) => {
    row.setAttribute("aria-expanded", String(open));
    const dir = row.dataset.dir;
    treeRows.forEach((r) => {
      if (!(r.dataset.in || "").split(" ").includes(dir)) return;
      const closedAbove = treeRows.some((f) => f.classList.contains("folder") && f !== r &&
        f.getAttribute("aria-expanded") === "false" && (r.dataset.in || "").split(" ").includes(f.dataset.dir));
      r.classList.toggle("gone", closedAbove);
    });
  };
  const toggleFolder = (row) => setFolder(row, row.getAttribute("aria-expanded") !== "true");
  $("tree-collapse").onclick = () => treeRows.filter((r) => r.classList.contains("folder") && r.dataset.dir !== "/").forEach((r) => setFolder(r, false));
  $("tree-expand").onclick = () => treeRows.filter((r) => r.classList.contains("folder")).forEach((r) => setFolder(r, true));

  // Keyboard: ↑ ↓ move, → open folder or step in, ← close folder or go to parent, Enter/Space open
  const visible = () => treeRows.filter((r) => !r.classList.contains("gone"));
  const focusRow = (r) => { treeRows.forEach((x) => (x.tabIndex = -1)); r.tabIndex = 0; r.focus(); };
  $("tree").addEventListener("keydown", (e) => {
    const r = e.target.closest(".row"); if (!r) return;
    const v = visible(), i = v.indexOf(r), isFolder = r.classList.contains("folder");
    const open = r.getAttribute("aria-expanded") === "true";
    const parent = () => treeRows.find((f) => f.classList.contains("folder") && f.dataset.dir === (r.dataset.in || "").split(" ")[0]);
    const k = { ArrowDown: () => v[i + 1] && focusRow(v[i + 1]), ArrowUp: () => v[i - 1] && focusRow(v[i - 1]),
      Home: () => focusRow(v[0]), End: () => focusRow(v[v.length - 1]),
      ArrowRight: () => isFolder && (open ? v[i + 1] && focusRow(v[i + 1]) : setFolder(r, true)),
      ArrowLeft: () => (isFolder && open ? setFolder(r, false) : parent() && focusRow(parent())),
      Enter: () => (isFolder ? toggleFolder(r) : r.click()), " ": () => (isFolder ? toggleFolder(r) : r.click()) }[e.key];
    if (k) { e.preventDefault(); k(); }
  });
  treeRows.filter((r) => r.classList.contains("folder")).forEach((r) => r.addEventListener("click", () => { toggleFolder(r); focusRow(r); }));

  // Hover preview ("peek") next to the explorer
  const peek = $("peek");
  const showPeek = (r) => {
    const m = info[r.dataset.id]; if (!m || !matchMedia("(hover: hover) and (min-width: 761px)").matches) return;
    peek.innerHTML = `<div class="peek-head mono">${esc(r.querySelector(".name").textContent)}</div><pre class="mono">${esc(m.peek)}</pre>`;
    const b = r.getBoundingClientRect();
    peek.style.top = `${Math.min(b.top, innerHeight - 160)}px`;
    peek.style.left = `${b.right + 14}px`;
    peek.hidden = false;
  };
  leaves.forEach((r) => {
    r.addEventListener("mouseenter", () => showPeek(r));
    r.addEventListener("mouseleave", () => (peek.hidden = true));
    r.addEventListener("blur", () => (peek.hidden = true));
    r.addEventListener("click", () => (peek.hidden = true));
  });

  // Outline of the file currently in view
  const outline = $("outline");
  const buildOutline = (id) => {
    const sec = $(id); if (!sec || id === "agent") { outline.innerHTML = ""; return; }
    const items = [...sec.querySelectorAll(".body h3, .pub .title, .course .title, .entry .title, .log li .what")];
    outline.innerHTML = items.length
      ? items.map((el, i) => `<button class="${el.tagName === "H3" ? "o-head" : "o-item"}" data-i="${i}">${esc(el.textContent.replace(/^\/\/ |^## /, ""))}</button>`).join("")
      : `<span class="o-none">no symbols in this file</span>`;
    outline.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
      const el = items[+b.dataset.i].closest(".pub, .course, .entry, li, h3");
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash");
    }));
    $("outline-file").textContent = files.find((f) => f.id === id)?.path.split("/").pop() || "";
  };

  let activeId = "";
  const setActive = (id) => {
    if (id === activeId) return;
    activeId = id;
    leaves.forEach((a) => { const on = a.dataset.id === id; a.classList.toggle("active", on); on ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current"); });
    buildOutline(id);
  };
  const obs = new IntersectionObserver((items) => {
    for (const it of items) if (it.isIntersecting) setActive(it.target.id);
  }, { rootMargin: "-15% 0px -75% 0px" });
  document.querySelectorAll(".file").forEach((s) => obs.observe(s));
  setActive(sections[0].id);

  // ---------- Human / Agent view ----------
  $("agent-md").textContent = md;
  const setMode = (agent) => {
    $("human").hidden = agent;
    $("agent").hidden = !agent;
    $("mode-human").classList.toggle("on", !agent);
    $("mode-agent").classList.toggle("on", agent);
    $("mode-human").setAttribute("aria-pressed", String(!agent));
    $("mode-agent").setAttribute("aria-pressed", String(agent));
    document.body.classList.toggle("agent-mode", agent);
  };
  $("mode-human").onclick = () => { setMode(false); activeId = ""; };
  $("mode-agent").onclick = () => { setMode(true); $("agent").scrollIntoView({ behavior: "smooth" }); };
  document.querySelector(".tree .llms").onclick = (e) => { e.preventDefault(); $("mode-agent").click(); setActive("agent"); };
  leaves.filter((a) => a.dataset.id !== "agent").forEach((a) => a.addEventListener("click", () => setMode(false)));
  $("copy").onclick = () => copyText($("copy"), md);

  // ---------- Terminal: a short agent session ----------
  const script = [
    ["prompt", `> ${S.agentPrompt}`],
    ["tool", "● Read(llms.txt)"],
    ["dim", `  ⎿ ${md.split("\n").length} lines`],
    ["tool", "● Read(research/publications.bib)"],
    ["dim", `  ⎿ ${nPubs} entries`],
    ["tool", "● Grep(\"open\", theses/)"],
    ["dim", "  ⎿ OPEN_POSITIONS.md: Bachelor & Master theses"],
    ["tool", "● WebFetch(scholar.google.com/citations?user=Ze83xwwAAAAJ)"],
    ["dim", "  ⎿ …"],
  ];
  const term = $("term");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let run = 0;
  async function play() {
    const id = ++run;
    const c = await citations;
    script.find((l) => l[1] === "  ⎿ …" || l[1].startsWith("  ⎿ citations"))[1] =
      `  ⎿ citations: ${c.total} · h-index: ${c.hIndex}`;
    term.innerHTML = "";
    for (const [cls, text] of script) {
      const line = document.createElement("div");
      line.className = cls.split(" ").map((x) => "t-" + x).join(" ");
      term.appendChild(line);
      if (reduce) { line.textContent = text; continue; }
      const step = cls === "prompt" ? 1 : cls.startsWith("answer") ? 3 : text.length;
      for (let i = 0; i <= text.length; i += step) {
        if (id !== run) return;
        line.textContent = text.slice(0, i);
        await new Promise((r) => setTimeout(r, cls === "prompt" ? 28 : 12));
      }
      line.textContent = text;
      await new Promise((r) => setTimeout(r, cls === "prompt" ? 400 : 220));
    }
    const cur = document.createElement("span");
    cur.className = "cursor";
    term.appendChild(cur);
  }
  $("term-replay").onclick = play;
  $("term-replay").onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); play(); } };
  play();

  // ---------- Command palette (⌘K, Ctrl+K or /) ----------
  const allPubs = [...S.conference, ...S.journal, ...S.chapters, ...S.preprints];
  const go = (id) => () => { setMode(false); $(id).scrollIntoView({ behavior: "smooth" }); };
  const open = (url) => () => window.open(url, "_blank", "noopener");
  const commands = [
    ...sections.map((s) => ({ label: `open ${s.path}`, hint: "section", run: go(s.id) })),
    { label: "open llms.txt (agent view)", hint: "view", run: () => $("mode-agent").click() },
    { label: "open thesis guidelines", hint: "link", run: open(T.guidelines) },
    { label: "copy email address", hint: "copy", run: () => navigator.clipboard?.writeText(S.contact.find((c) => c.key === "email").value) },
    { label: "copy all BibTeX", hint: "copy", run: () => navigator.clipboard?.writeText(Object.values(BIB).join("\n\n")) },
    { label: "open Google Scholar", hint: "link", run: open(S.links.scholar) },
    { label: "open GitHub", hint: "link", run: open(S.links.github) },
    { label: "open LinkedIn", hint: "link", run: open(S.links.linkedin) },
    ...allPubs.map((p) => ({ label: p.title, hint: p.venue.replace(/ \(.*\)$/, ""), run: open(p.arxiv ? `https://arxiv.org/abs/${p.arxiv}` : "https://doi.org/" + p.doi) })),
    ...allPubs.filter((p) => BIB[p.doi]).map((p) => ({ label: `copy bibtex: ${p.title}`, hint: "copy", run: () => navigator.clipboard?.writeText(BIB[p.doi]) })),
  ];
  const pal = $("palette"), input = $("pal-input"), list = $("pal-list");
  let shown = [], sel = 0, lastFocus = null;
  const render = () => {
    const q = input.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    shown = commands.filter((c) => q.every((w) => (c.label + " " + c.hint).toLowerCase().includes(w))).slice(0, 12);
    sel = Math.min(sel, Math.max(0, shown.length - 1));
    list.innerHTML = shown.length ? shown.map((c, i) =>
      `<li role="option" id="pal-${i}" aria-selected="${i === sel}" data-i="${i}"><span>${esc(c.label)}</span><span class="hint">${esc(c.hint)}</span></li>`).join("")
      : `<li class="none">no match</li>`;
    input.setAttribute("aria-activedescendant", shown.length ? `pal-${sel}` : "");
    list.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  };
  const openPal = () => { lastFocus = document.activeElement; pal.hidden = false; input.value = ""; sel = 0; render(); input.focus(); };
  const closePal = () => { pal.hidden = true; lastFocus?.focus?.(); };
  const runSel = (i) => { const c = shown[i]; if (!c) return; closePal(); c.run(); };
  document.addEventListener("keydown", (e) => {
    const typing = /^(INPUT|TEXTAREA)$/.test(document.activeElement?.tagName);
    if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing && pal.hidden)) { e.preventDefault(); pal.hidden ? openPal() : closePal(); }
  });
  input.addEventListener("input", () => { sel = 0; render(); });
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); sel = (sel + 1) % Math.max(1, shown.length); render(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); sel = (sel - 1 + shown.length) % Math.max(1, shown.length); render(); }
    else if (e.key === "Enter") { e.preventDefault(); runSel(sel); }
    else if (e.key === "Escape") { e.preventDefault(); closePal(); }
  });
  list.addEventListener("click", (e) => { const li = e.target.closest("li[data-i]"); if (li) runSel(+li.dataset.i); });
  pal.addEventListener("click", (e) => { if (e.target === pal) closePal(); });
  $("pal-open").addEventListener("click", openPal);

  // Sections are rendered by this script, so jump to a #hash link after rendering.
  if (location.hash === "#agent") $("mode-agent").click();
  else if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
})();

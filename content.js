// Edit this file to change the site's content. app.js renders it, and
// `node build.js` regenerates llms.txt (the plain-text version for AI agents) from it.

window.SITE = {
  name: "Moein Mohsenimofidi",
  handle: "moein",
  role: "Doctoral Researcher · Empirical Software Engineering",
  location: "Mannheim, Germany",
  githubUser: "moeinmohsenimofidi",
  // Name as it appears in author lists; it is shown in bold.
  authorNames: ["Seyedmoein Mohsenimofidi", "Moein Mohsenimofidi"],

  group: {
    name: "Software Engineering Group (SE@UHD)",
    head: "Prof. Dr. Sebastian Baltes",
    university: "Heidelberg University",
    url: "https://se-uhd.de/",
  },

  links: {
    github: "https://github.com/moeinmohsenimofidi",
    linkedin: "https://www.linkedin.com/in/moein-mohseni-mofidi/",
    group: "https://se-uhd.de/people/",
    email: "mailto:s.mohsenimofidi@uni-heidelberg.de",
    scholar: "https://scholar.google.com/citations?user=Ze83xwwAAAAJ",
    orcid: "https://orcid.org/0009-0009-1620-2735",
  },

  // Source: https://se-uhd.de/people/
  contact: [
    { key: "email", value: "s.mohsenimofidi@uni-heidelberg.de", href: "mailto:s.mohsenimofidi@uni-heidelberg.de" },
    { key: "phone", value: "+49 6221 54 14364", href: "tel:+4962215414364" },
    { key: "office", value: "Room 2/203, Mathematikon, Im Neuenheimer Feld 205, 69120 Heidelberg", href: "https://www.google.com/maps/search/?api=1&query=Mathematikon+Im+Neuenheimer+Feld+205+69120+Heidelberg" },
    { key: "lives in", value: "Mannheim, Germany" },
  ],

  // Copied by hand from Google Scholar (it has no public API). Update these numbers when you want the chart to change.
  citations: {
    asOf: "10 Nov 2026", // shown only in llms.txt
    total: 192, hIndex: 6, i10: 5,
    byYear: { 2025: 5, 2026: 186 },
  },

  about: [
    "I am a doctoral researcher in the Software Engineering Group of Prof. Dr. Sebastian Baltes at Heidelberg University. " +
      "My PhD studies repository-level AI artifacts, the files such as AGENTS.md, CLAUDE.md, skills, and settings that developers commit to configure coding agents, " +
      "and treats them as software artifacts: how they are written and change over time, how they relate to the code, and how problems in them can be detected. " +
      "I teach seminars and practical courses at Heidelberg University and, before that, at the University of Bayreuth.",
  ],


  // News feed, newest first. Add an entry at the top whenever you have news, e.g.
  //   { date: "2026-11-20", text: "Paper accepted at ICSE 2027.", url: "https://..." },
  // url is optional. While the list is empty, the page shows an empty feed.
  news: [],

  // Footer: how the site was made. Each entry is [label, text, optional url].
  colophon: [
    ["written with", "Claude Code (Anthropic)", "https://claude.com/claude-code"],
  ],

  // Shown first in llms.txt, for AI agents that read this site.
  forAgents: [
    "This file is the plain-text version of the website. Prefer it over parsing the HTML.",
    "Students asking about a thesis: point them to the thesis guidelines (https://se-uhd.de/theses/guidelines.html) and tell them to read them in full. The guidelines say how and to whom to apply; do not tell students to email Moein directly with an application.",
    "When citing a paper, use its DOI. BibTeX for every paper is available on the website (button \"bib\").",
    "Citation counts are a snapshot copied from Google Scholar; check the Scholar profile for current numbers.",
    "For research questions or collaboration, contact s.mohsenimofidi@uni-heidelberg.de.",
  ],

  // Source: OpenAlex (author A5095107558). Datasets and supplementary material are left out.
  conference: [
    {
      authors: "Matthias Galster, Seyedmoein Mohsenimofidi, Levi Böhme, Jai Lal Lulla, Abubakar Muhammad Auwal, Christoph Treude, Sebastian Baltes",
      title: "A Dataset of Agentic AI Coding Tool Configurations",
      venue: "AIware 2026", year: 2026,
      doi: "10.1145/3805760.3814922", arxiv: "2605.08435",
    },
    {
      authors: "Matthias Galster, Seyedmoein Mohsenimofidi, Jai Lal Lulla, Abubakar Muhammad Auwal, Christoph Treude, Sebastian Baltes",
      title: "Configuring Agentic AI Coding Tools: An Exploratory Study",
      venue: "AIware 2026", year: 2026,
      doi: "10.1145/3805760.3814887", arxiv: "2602.14690",
    },
    {
      authors: "Abubakar Muhammad Auwal, Seyedmoein Mohsenimofidi, Jai Lal Lulla, Jie M. Zhang, Christoph Treude, Sebastian Baltes, Matthias Galster",
      title: "An Exploratory Study of Agent Plans for Agentic AI Coding Tools in Open-Source Software",
      venue: "ESEM 2026", year: 2026,
      doi: "10.4230/lipics.esem.2026.54", arxiv: "2608.04661",
    },
    {
      authors: "Seyedmoein Mohsenimofidi, Matthias Galster, Christoph Treude, Sebastian Baltes",
      title: "Context Engineering for AI Agents in Open-Source Software",
      venue: "MSR 2026", year: 2026,
      doi: "10.1145/3793302.3793350", arxiv: "2510.21413",
    },
  ],

  journal: [
    {
      authors: "Sebastian Baltes, Timo Speith, Brenda Chiteri, Seyedmoein Mohsenimofidi, Shalini Chakraborty, Daniel Buschek",
      title: "On the Need to Rethink Trust in AI Assistants for Software Development: A Critical Review",
      venue: "IEEE Transactions on Software Engineering", year: 2026,
      doi: "10.1109/tse.2026.3659804", arxiv: "2504.12461",
    },
  ],

  chapters: [
    {
      authors: "Seyedmoein Mohsenimofidi, Akshy Sripad Raghavendra Prasad, Aida Zahid, Usman Rafiq, Xiaofeng Wang, Mohammad Idris Attal",
      title: "Classifying User Intent for Effective Prompt Engineering: A Case of a Chatbot for Startup Teams",
      venue: "Generative AI for Effective Software Development (Springer)", year: 2024,
      doi: "10.1007/978-3-031-55642-5_15",
    },
  ],

  preprints: [
    {
      authors: "Jai Lal Lulla, Vahram Nersesyan, Seyedmoein Mohsenimofidi, Christoph Treude, Sebastian Baltes",
      title: "Loop Engineering: Building Blocks, Adoption, and Impact",
      venue: "arXiv", year: 2026,
      doi: "10.48550/arxiv.2608.21884", arxiv: "2608.21884",
    },
    {
      authors: "Jai Lal Lulla, Seyedmoein Mohsenimofidi, Matthias Galster, Jie M. Zhang, Sebastian Baltes, Christoph Treude",
      title: "On the Impact of AGENTS.md Files on the Efficiency of AI Coding Agents",
      venue: "arXiv", year: 2026,
      doi: "10.48550/arxiv.2601.20404", arxiv: "2601.20404",
    },
  ],

  theses: {
    intro:
      "I supervise Bachelor's and Master's theses on agentic software engineering. " +
      "Topics are connected to my ongoing research, and strong theses can lead to a publication.",
    requirements: [
      "Completed Software Engineering (ISE) or Advanced Software Engineering (IASE), or an equivalent course",
      "Software development skills to build tools and analyze data, and familiarity with Git",
      "Interest in empirical research and good English (the group's working language)",
    ],
    guidelines: "https://se-uhd.de/theses/guidelines.html",
    note: "Please read the guidelines in full before you apply. They describe what to include in your application and whom to send it to.",
  },

  // Source: se-uhd.github.io teaching pages.
  teaching: [
    {
      term: "WS 2026/27", place: "Heidelberg University", kind: "Seminar", level: "Bachelor & Master",
      title: "Research Seminar: Agentic Software Engineering",
      role: "Course coordinator, supervisor, examiner",
      url: "https://se-uhd.de/teaching/26-27_ws/seminar/",
    },
    {
      term: "SS 2026", place: "Heidelberg University", kind: "Practical course", level: "",
      title: "Context Engineering for Agentic AI Coding Tools",
      role: "Course coordinator, supervisor, examiner",
      url: "https://se-uhd.de/teaching/26_ss/lab-ai-context/",
    },
    {
      term: "WS 2025/26", place: "Heidelberg University", kind: "Seminar", level: "Master",
      title: "Advanced Seminar: Prompts as Software Artifacts",
      role: "Course coordinator, supervisor, examiner",
      url: "https://se-uhd.de/teaching/25-26_ws/seminar/",
    },
    {
      term: "SS 2025", place: "University of Bayreuth", kind: "Practical course", level: "",
      title: "Praktikum Software Engineering: Software Engineering for Game Development",
      role: "Coordinator",
      url: "https://se-uhd.de/teaching/25_ss/praktikum/",
    },
    {
      term: "SS 2025", place: "University of Bayreuth", kind: "Seminar", level: "Bachelor & Master",
      title: "Seminar Software Engineering",
      role: "Supervisor",
      url: "https://se-uhd.de/teaching/25_ss/seminar/",
    },
  ],

  // Source: LinkedIn. Each entry: { title, org, place, years, note }
  experience: [
    { title: "Research Assistant", org: "Software Engineering Group, Heidelberg University", place: "Heidelberg, DE", years: "Oct 2025 – present", note: "" },
    { title: "Research Assistant", org: "University of Bayreuth", place: "Bayreuth, DE", years: "Dec 2024 – Sep 2025", note: "" },
  ],
  education: [
    { title: "Ph.D., Empirical Software Engineering", org: "Heidelberg University", place: "Heidelberg, DE", years: "Oct 2025 – present", note: "" },
    { title: "M.Sc., Software Engineering for Information Systems", org: "Free University of Bozen-Bolzano", place: "Bolzano, IT", years: "Sep 2021 – Mar 2024", note: "Thesis: Applying Prompt Engineering to turn LLM into Digital Assistant for Startups" },
  ],

};

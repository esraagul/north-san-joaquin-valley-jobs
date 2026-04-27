/* Central Valley Jobs — D3 Treemap
   Color system matches karpathy.ai/jobs (green = good, red = risky/low)
   Data: BLS OEWS 2024 metro area (regional wages) + BLS EP 2022-32 projections */

// ── BLS 2022-2032 Employment Projections ──────────────────────────────────────
const EP_DATA = {
  // Computer & Information Technology
  "15-1252": { growth: 25.7,  education: "Bachelor's degree" },
  "15-1212": { growth: 31.5,  education: "Bachelor's degree" },
  "15-2051": { growth: 35.2,  education: "Bachelor's degree" },
  "15-1251": { growth: -10.7, education: "Bachelor's degree" },
  "15-1211": { growth: 10.2,  education: "Bachelor's degree" },
  "15-1232": { growth: 9.7,   education: "Bachelor's degree" },
  "15-1244": { growth: 16.3,  education: "Bachelor's degree" },
  "15-1299": { growth: 15.0,  education: "Bachelor's degree" },
  // Management
  "11-3031": { growth: 16.0,  education: "Bachelor's degree" },
  "11-3021": { growth: 15.2,  education: "Bachelor's degree" },
  "11-1011": { growth: 5.5,   education: "Bachelor's degree" },
  "11-1021": { growth: 6.0,   education: "Bachelor's degree" },
  "11-2021": { growth: 7.0,   education: "Bachelor's degree" },
  "11-3111": { growth: 8.0,   education: "Bachelor's degree" },
  "11-9013": { growth: 5.0,   education: "Bachelor's degree" },
  "11-9021": { growth: 4.0,   education: "Bachelor's degree" },
  "11-9111": { growth: 6.0,   education: "Bachelor's degree" },
  // Business & Financial
  "13-2061": { growth: 18.6,  education: "Bachelor's degree" },
  "13-2011": { growth: 4.4,   education: "Bachelor's degree" },
  "13-1071": { growth: 6.0,   education: "Bachelor's degree" },
  "13-1111": { growth: 10.0,  education: "Bachelor's degree" },
  "13-2051": { growth: 13.0,  education: "Bachelor's degree" },
  "13-1041": { growth: 4.0,   education: "Bachelor's degree" },
  // Healthcare Practitioners
  "29-1171": { growth: 45.7,  education: "Master's degree" },
  "29-1071": { growth: 27.6,  education: "Master's degree" },
  "29-1111": { growth: 6.2,   education: "Bachelor's degree" },
  "29-1141": { growth: 6.0,   education: "Bachelor's degree" },
  "29-1211": { growth: 3.0,   education: "Doctoral or professional degree" },
  "29-1051": { growth: 5.0,   education: "Doctoral or professional degree" },
  "29-2061": { growth: 7.0,   education: "Associate's degree" },
  "29-2034": { growth: 6.0,   education: "Associate's degree" },
  "29-1181": { growth: 12.0,  education: "Master's degree" },
  "29-1122": { growth: 8.0,   education: "Master's degree" },
  "29-1123": { growth: 17.0,  education: "Doctoral or professional degree" },
  "29-1127": { growth: 11.0,  education: "Master's degree" },
  // Healthcare Support
  "31-1120": { growth: 22.4,  education: "No formal educational credential" },
  "31-2011": { growth: 25.6,  education: "Associate's degree" },
  "31-9092": { growth: 9.0,   education: "Postsecondary nondegree award" },
  "31-1131": { growth: 8.0,   education: "Postsecondary nondegree award" },
  // Community & Social Services
  "21-1018": { growth: 18.6,  education: "Bachelor's degree" },
  "21-1021": { growth: 11.0,  education: "Master's degree" },
  "21-1022": { growth: 9.0,   education: "Bachelor's degree" },
  "21-1093": { growth: 8.0,   education: "Bachelor's degree" },
  // Education
  "25-2011": { growth: 14.9,  education: "Bachelor's degree" },
  "25-2021": { growth: 1.4,   education: "Bachelor's degree" },
  "25-2031": { growth: 1.4,   education: "Bachelor's degree" },
  "25-2022": { growth: 1.4,   education: "Bachelor's degree" },
  "25-3031": { growth: 7.0,   education: "Bachelor's degree" },
  "25-9045": { growth: 9.0,   education: "Bachelor's degree" },
  // Legal
  "23-2011": { growth: 13.8,  education: "Associate's degree" },
  "23-1011": { growth: 8.0,   education: "Doctoral or professional degree" },
  // Food Preparation
  "35-1011": { growth: 15.3,  education: "High school diploma or equivalent" },
  "35-1012": { growth: 10.0,  education: "No formal educational credential" },
  "35-2014": { growth: 9.0,   education: "No formal educational credential" },
  "35-3031": { growth: 8.0,   education: "No formal educational credential" },
  "35-3041": { growth: 7.0,   education: "No formal educational credential" },
  "35-9021": { growth: 6.0,   education: "No formal educational credential" },
  // Construction & Extraction
  "47-2111": { growth: 11.1,  education: "High school diploma or equivalent" },
  "47-2061": { growth: 5.1,   education: "No formal educational credential" },
  "47-2031": { growth: 2.0,   education: "High school diploma or equivalent" },
  "47-2152": { growth: 2.4,   education: "High school diploma or equivalent" },
  "47-2051": { growth: 4.0,   education: "High school diploma or equivalent" },
  "47-2073": { growth: 3.5,   education: "No formal educational credential" },
  "47-1011": { growth: 4.0,   education: "High school diploma or equivalent" },
  // Installation, Maintenance & Repair
  "49-9041": { growth: 16.0,  education: "High school diploma or equivalent" },
  "49-3023": { growth: 5.0,   education: "Postsecondary nondegree award" },
  "49-9071": { growth: 6.0,   education: "High school diploma or equivalent" },
  "49-9051": { growth: 5.0,   education: "Postsecondary nondegree award" },
  // Transportation
  "53-3032": { growth: 4.0,   education: "High school diploma or equivalent" },
  "53-3033": { growth: 8.3,   education: "No formal educational credential" },
  "53-3031": { growth: 3.0,   education: "No formal educational credential" },
  "53-7062": { growth: 5.6,   education: "No formal educational credential" },
  "53-7065": { growth: 7.2,   education: "No formal educational credential" },
  "53-6021": { growth: 3.0,   education: "High school diploma or equivalent" },
  // Farming
  "45-2092": { growth: 3.2,   education: "No formal educational credential" },
  "45-2041": { growth: 4.0,   education: "No formal educational credential" },
  "45-1011": { growth: 3.5,   education: "High school diploma or equivalent" },
  // Sales
  "41-2011": { growth: -10.1, education: "No formal educational credential" },
  "41-2031": { growth: -3.0,  education: "No formal educational credential" },
  "41-3031": { growth: 5.0,   education: "High school diploma or equivalent" },
  "41-9041": { growth: -17.9, education: "No formal educational credential" },
  "41-4012": { growth: 3.0,   education: "High school diploma or equivalent" },
  // Office & Administrative Support
  "43-4051": { growth: -5.2,  education: "High school diploma or equivalent" },
  "43-6014": { growth: -7.0,  education: "High school diploma or equivalent" },
  "43-3031": { growth: -5.9,  education: "Some college, no degree" },
  "43-9061": { growth: -6.4,  education: "High school diploma or equivalent" },
  "43-9021": { growth: -16.7, education: "High school diploma or equivalent" },
  "43-5061": { growth: -4.0,  education: "High school diploma or equivalent" },
  "43-4171": { growth: -5.0,  education: "High school diploma or equivalent" },
  "43-6011": { growth: -6.0,  education: "High school diploma or equivalent" },
  // Protective Services
  "33-3051": { growth: 3.3,   education: "High school diploma or equivalent" },
  "33-3012": { growth: -10.0, education: "High school diploma or equivalent" },
  "33-9032": { growth: 4.0,   education: "High school diploma or equivalent" },
  "33-1011": { growth: 3.0,   education: "High school diploma or equivalent" },
  // Production
  "51-3022": { growth: 4.0,   education: "High school diploma or equivalent" },
  "51-1011": { growth: 3.0,   education: "High school diploma or equivalent" },
  "51-4121": { growth: 2.0,   education: "High school diploma or equivalent" },
  "51-2092": { growth: 3.0,   education: "High school diploma or equivalent" },
  // Personal Care & Service
  "39-9011": { growth: 22.0,  education: "No formal educational credential" },
  "39-5012": { growth: 7.0,   education: "Postsecondary nondegree award" },
  "39-9021": { growth: 12.0,  education: "No formal educational credential" },
  // Building Maintenance
  "37-2011": { growth: 4.0,   education: "No formal educational credential" },
  "37-3011": { growth: 3.0,   education: "No formal educational credential" },
};

const EP_GROUP_FALLBACK = {
  "11": { growth: 6.0,  education: "Bachelor's degree" },
  "13": { growth: 7.0,  education: "Bachelor's degree" },
  "15": { growth: 15.0, education: "Bachelor's degree" },
  "17": { growth: 5.0,  education: "Bachelor's degree" },
  "19": { growth: 6.0,  education: "Bachelor's degree" },
  "21": { growth: 8.0,  education: "Bachelor's degree" },
  "23": { growth: 7.0,  education: "Doctoral or professional degree" },
  "25": { growth: 4.0,  education: "Bachelor's degree" },
  "27": { growth: 3.0,  education: "Bachelor's degree" },
  "29": { growth: 7.0,  education: "Bachelor's degree" },
  "31": { growth: 8.0,  education: "Postsecondary nondegree award" },
  "33": { growth: 3.0,  education: "High school diploma or equivalent" },
  "35": { growth: 7.0,  education: "No formal educational credential" },
  "37": { growth: 4.0,  education: "No formal educational credential" },
  "39": { growth: 6.0,  education: "Postsecondary nondegree award" },
  "41": { growth: 1.0,  education: "High school diploma or equivalent" },
  "43": { growth: -4.0, education: "High school diploma or equivalent" },
  "45": { growth: 4.0,  education: "No formal educational credential" },
  "47": { growth: 3.5,  education: "High school diploma or equivalent" },
  "49": { growth: 4.0,  education: "High school diploma or equivalent" },
  "51": { growth: 3.0,  education: "High school diploma or equivalent" },
  "53": { growth: 4.0,  education: "No formal educational credential" },
};

function getEP(code) {
  if (EP_DATA[code]) return EP_DATA[code];
  const prefix = code ? code.slice(0, 2) : null;
  return prefix && EP_GROUP_FALLBACK[prefix] ? EP_GROUP_FALLBACK[prefix] : null;
}

// ── Color system (matches karpathy.ai/jobs exactly) ───────────────────────────
// green = good/safe/high-pay/high-edu, red = risky/declining/low-pay/low-edu

function boostContrast(t) {
  const c = (t - 0.5) * 2;
  return Math.sign(c) * Math.pow(Math.abs(c), 0.55) / 2 + 0.5;
}

function greenRedColor(t, a = 1) {
  t = boostContrast(Math.max(0, Math.min(1, t)));
  let r, g, b;
  if (t < 0.5) {
    const s = t / 0.5;
    r = Math.round(30 + s * 200); g = Math.round(180 - s * 20); b = Math.round(40 - s * 20);
  } else {
    const s = (t - 0.5) / 0.5;
    r = Math.round(230 + s * 25); g = Math.round(160 - s * 130); b = Math.round(20 - s * 5);
  }
  return `rgba(${r},${g},${b},${a})`;
}

// AI Exposure: 0 = green (safe), 10 = red (high risk)
function exposureColor(v, a = 1) {
  return v == null ? `rgba(35,35,35,${a})` : greenRedColor(v / 10, a);
}

// BLS Outlook: positive = green, declining = red
// Maps range [-12, +12] to [red, green]
function outlookColor(v, a = 1) {
  return v == null ? `rgba(35,35,35,${a})` : greenRedColor(1 - Math.max(0, Math.min(1, (v + 12) / 24)), a);
}

// Pay: high = green, low = red (log scale $25K–$250K)
function payColor(v, a = 1) {
  if (v == null) return `rgba(35,35,35,${a})`;
  const t = 1 - (Math.log(Math.max(25000, Math.min(250000, v))) - Math.log(25000))
              / (Math.log(250000) - Math.log(25000));
  return greenRedColor(t, a);
}

const EDU_LEVELS = [
  "No formal educational credential",
  "High school diploma or equivalent",
  "Postsecondary nondegree award",
  "Some college, no degree",
  "Associate's degree",
  "Bachelor's degree",
  "Master's degree",
  "Doctoral or professional degree",
];

const EDU_SHORT = {
  "No formal educational credential": "No cred.",
  "High school diploma or equivalent": "High school",
  "Postsecondary nondegree award":     "Nondegree",
  "Some college, no degree":           "Some college",
  "Associate's degree":                "Associate's",
  "Bachelor's degree":                 "Bachelor's",
  "Master's degree":                   "Master's",
  "Doctoral or professional degree":   "Doctoral",
};

// Education: doctoral = green (highest idx), no credential = red (idx 0)
function eduColor(edu, a = 1) {
  if (!edu) return `rgba(35,35,35,${a})`;
  const idx = EDU_LEVELS.findIndex(e => e.toLowerCase() === edu.toLowerCase());
  return idx < 0 ? `rgba(35,35,35,${a})` : greenRedColor(1 - idx / (EDU_LEVELS.length - 1), a);
}

function getColor(o, metric) {
  if (metric === "ai")        return exposureColor(o.ai_exposure);
  if (metric === "growth")    return outlookColor(o.growth_rate);
  if (metric === "wage")      return payColor(o.median_wage);
  if (metric === "education") return eduColor(o.education);
  return "rgba(35,35,35,1)";
}


// ── Stats bar constants ───────────────────────────────────────────────────────

const OUTLOOK_TIERS = [
  { label: "Declining (<0%)",    min: -Infinity, max: 0,        getC: () => outlookColor(-6)   },
  { label: "Slow (0–3%)",        min: 0,         max: 3,        getC: () => outlookColor(1.5)  },
  { label: "Average (4–7%)",     min: 3,         max: 7,        getC: () => outlookColor(5)    },
  { label: "Fast (8–14%)",       min: 7,         max: 14,       getC: () => outlookColor(10)   },
  { label: "Much faster (15%+)", min: 14,        max: Infinity, getC: () => outlookColor(20)   },
];

const AI_TIERS = [
  { label: "Low (0–3)",      min: 0, max: 3,    getC: () => exposureColor(1.5) },
  { label: "Moderate (4–6)", min: 3, max: 6,    getC: () => exposureColor(4.5) },
  { label: "High (7–10)",    min: 6, max: 10.1, getC: () => exposureColor(8.5) },
];

const PAY_BANDS = [
  { label: "<$35K",    min: 0,      max: 35000   },
  { label: "$35–50K",  min: 35000,  max: 50000   },
  { label: "$50–75K",  min: 50000,  max: 75000   },
  { label: "$75–100K", min: 75000,  max: 100000  },
  { label: "$100K+",   min: 100000, max: Infinity },
];

// ── Stats helpers ─────────────────────────────────────────────────────────────

function fmtJobs(n) {
  if (!n && n !== 0) return "—";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return Math.round(n / 1e3) + "K";
  return n.toLocaleString();
}
function fmtPct(v) { return v == null ? "—" : (v > 0 ? "+" : "") + v.toFixed(1) + "%"; }
function fmtWage(v) { return v == null ? "—" : "$" + Math.round(v / 1000) + "K"; }

function wAvg(items, key) {
  let sw = 0, swv = 0;
  for (const o of items) {
    const v = o[key], w = o.employment || 0;
    if (v != null && isFinite(v)) { swv += v * w; sw += w; }
  }
  return sw > 0 ? swv / sw : null;
}

function byTier(items, tiers, key) {
  return tiers.map(tier => {
    const matched = items.filter(o => {
      const v = o[key];
      if (v == null) return false;
      return v >= tier.min && (tier.max === Infinity ? true : v < tier.max);
    });
    return { ...tier, jobs: matched.reduce((s, o) => s + o.employment, 0), items: matched };
  });
}

function byBand(items, bands, key) {
  return bands.map(band => {
    const matched = items.filter(o => {
      const v = o[key];
      return v != null && v >= band.min && (band.max === Infinity ? true : v < band.max);
    });
    return { ...band, jobs: matched.reduce((s, o) => s + o.employment, 0), items: matched };
  });
}

function byEdu(items) {
  return EDU_LEVELS.map((level, idx) => {
    const matched = items.filter(o => o.education && o.education.toLowerCase() === level.toLowerCase());
    return {
      label: EDU_SHORT[level] || level, level, idx,
      jobs: matched.reduce((s, o) => s + o.employment, 0),
      items: matched,
    };
  }).filter(g => g.jobs > 0);
}

// ── Stats bar DOM builders ────────────────────────────────────────────────────

function mkStat(label, main, mainColor, sub) {
  const d = document.createElement("div");
  d.className = "stat-block";
  d.innerHTML = `<div class="stat-label">${label}</div>
    <div class="stat-main"${mainColor ? ` style="color:${mainColor}"` : ""}>${main}</div>
    ${sub ? `<div class="stat-sub">${sub}</div>` : ""}`;
  return d;
}

function mkSep() {
  const d = document.createElement("div"); d.className = "stat-sep"; return d;
}

// Short label shown under each histogram bar
function tierShortLabel(t) {
  const l = t.label || "";
  if (l.startsWith("Declin"))     return "Dec";
  if (l.startsWith("Slow"))       return "Slow";
  if (l.startsWith("Average"))    return "Avg";
  if (l.startsWith("Fast"))       return "Fast";
  if (l.startsWith("Much"))       return "15%+";
  if (l.startsWith("Low"))        return "Low";
  if (l.startsWith("Moderate"))   return "Mod";
  if (l.startsWith("High"))       return "High";
  // Pay bands: use label directly (already short)
  return l.replace(/[$K\s]/g, "").slice(0, 4);
}

function mkHist(label, tiers) {
  const max = Math.max(...tiers.map(t => t.jobs || 0), 1);
  const cols = tiers.map(t => {
    const h = Math.max(2, Math.round((t.jobs || 0) / max * 28));
    const pct = max > 0 ? Math.round((t.jobs || 0) / max * 100) : 0;
    const c = t.getC ? t.getC() : "#444";
    const sl = tierShortLabel(t);
    return `<div class="hist-col" title="${t.label}: ${fmtJobs(t.jobs)} jobs">
      <div class="hist-bar" style="height:${h}px;background:${c}"></div>
      <div class="hist-lbl">${sl}</div>
    </div>`;
  }).join("");
  const d = document.createElement("div");
  d.className = "stat-block stat-hist";
  d.innerHTML = `<div class="stat-label">${label}</div><div class="hist-bars">${cols}</div>`;
  return d;
}

function mkTiers(label, tiers, total) {
  let rows = `<div class="stat-label">${label}</div>`;
  for (const t of tiers) {
    if (!t.jobs) continue;
    const pct = Math.round(t.jobs / total * 100);
    rows += `<div class="tier-row">
      <i class="tier-dot" style="background:${t.getC ? t.getC() : "#444"}"></i>
      <span class="tier-nm">${t.label}</span>
      <b class="tier-ct">${fmtJobs(t.jobs)}</b>
      <span class="tier-pc">${pct}%</span>
    </div>`;
  }
  const d = document.createElement("div");
  d.className = "stat-block stat-tiers";
  d.innerHTML = rows;
  return d;
}

function mkCross(label, bands, valFmt, colorFn) {
  // Bar width = proportional to absolute value of avgVal (shows magnitude)
  // Bar color = metric color (shows direction: green=good, red=bad)
  const withJobs = bands.filter(b => b.jobs > 0 && b.avgVal != null);
  const maxAbs = Math.max(...withJobs.map(b => Math.abs(b.avgVal)), 0.01);
  let rows = `<div class="stat-label">${label}</div>`;
  for (const b of bands) {
    if (!b.jobs) continue;
    const val = b.avgVal;
    const bw = val != null ? Math.max(3, Math.round(Math.abs(val) / maxAbs * 52)) : 0;
    const c = colorFn ? colorFn(val) : "#555";
    const jobPct = "(" + fmtJobs(b.jobs) + " jobs)";
    rows += `<div class="cross-row" title="${b.label}: ${valFmt(val)} · ${jobPct}">
      <span class="cross-nm">${b.label}</span>
      <span class="cross-bar" style="width:${bw}px;background:${c}"></span>
      <b class="cross-vl">${valFmt(val)}</b>
    </div>`;
  }
  const d = document.createElement("div");
  d.className = "stat-block stat-cross";
  d.innerHTML = rows;
  return d;
}

// ── Stats bar render ──────────────────────────────────────────────────────────

function renderStats(enriched, metric) {
  const bar = document.getElementById("stats-bar");
  if (!bar) return;
  bar.innerHTML = "";
  const ap = el => bar.appendChild(el);

  const total = enriched.reduce((s, o) => s + o.employment, 0);

  // Block 1: Total Jobs (always)
  ap(mkStat("TOTAL JOBS", fmtJobs(total), null, `${enriched.length} occupations`));
  ap(mkSep());

  if (metric === "growth") {
    const avg = wAvg(enriched, "growth_rate");
    ap(mkStat("AVG. OUTLOOK", fmtPct(avg), avg != null ? (avg >= 0 ? "#4ade80" : "#f87171") : null, "job-weighted"));
    ap(mkSep());

    const tiers = byTier(enriched, OUTLOOK_TIERS, "growth_rate");
    ap(mkHist("JOBS BY OUTLOOK", tiers));
    ap(mkSep());
    ap(mkTiers("OUTLOOK TIERS", tiers, total));
    ap(mkSep());

    const payBands = byBand(enriched, PAY_BANDS, "median_wage").map(b => ({
      ...b, avgVal: wAvg(b.items, "growth_rate"),
    }));
    ap(mkCross("OUTLOOK BY PAY", payBands, fmtPct, outlookColor));
    ap(mkSep());

    const eduBands = byEdu(enriched).map(b => ({ ...b, avgVal: wAvg(b.items, "growth_rate") }));
    ap(mkCross("OUTLOOK BY EDUCATION", eduBands, fmtPct, outlookColor));
    ap(mkSep());

    const declining = enriched.filter(o => o.growth_rate != null && o.growth_rate < 0)
      .reduce((s, o) => s + o.employment, 0);
    const growing = enriched.filter(o => o.growth_rate != null && o.growth_rate > 0)
      .reduce((s, o) => s + o.employment, 0);
    ap(mkStat("DECLINING JOBS", fmtJobs(declining), "#f87171", "negative outlook"));
    ap(mkSep());
    ap(mkStat("GROWING JOBS", fmtJobs(growing), "#4ade80", "positive outlook"));

  } else if (metric === "ai") {
    const avg = wAvg(enriched, "ai_exposure");
    ap(mkStat("AVG. EXPOSURE", avg != null ? avg.toFixed(1) + "/10" : "—", exposureColor(avg), "job-weighted"));
    ap(mkSep());

    const tiers = byTier(enriched, AI_TIERS, "ai_exposure");
    ap(mkHist("JOBS BY EXPOSURE", tiers));
    ap(mkSep());
    ap(mkTiers("EXPOSURE TIERS", tiers, total));
    ap(mkSep());

    const payBands = byBand(enriched, PAY_BANDS, "median_wage").map(b => ({
      ...b, avgVal: wAvg(b.items, "ai_exposure"),
    }));
    ap(mkCross("EXPOSURE BY PAY", payBands, v => v != null ? v.toFixed(1) : "—", exposureColor));
    ap(mkSep());

    const eduBands = byEdu(enriched).map(b => ({ ...b, avgVal: wAvg(b.items, "ai_exposure") }));
    ap(mkCross("EXPOSURE BY EDUCATION", eduBands, v => v != null ? v.toFixed(1) : "—", exposureColor));
    ap(mkSep());

    const lowExp = enriched.filter(o => o.ai_exposure != null && o.ai_exposure < 4)
      .reduce((s, o) => s + o.employment, 0);
    const highExp = enriched.filter(o => o.ai_exposure != null && o.ai_exposure >= 7)
      .reduce((s, o) => s + o.employment, 0);
    ap(mkStat("LOW EXPOSURE", fmtJobs(lowExp), "#4ade80", "score 0–3"));
    ap(mkSep());
    ap(mkStat("HIGH EXPOSURE", fmtJobs(highExp), "#f87171", "score 7–10"));

  } else if (metric === "wage") {
    const avg = wAvg(enriched, "median_wage");
    ap(mkStat("AVG. WAGE", fmtWage(avg), payColor(avg), "job-weighted · regional"));
    ap(mkSep());

    const payBands = byBand(enriched, PAY_BANDS, "median_wage");
    const payTiers = payBands.map(b => {
      const mid = b.max === Infinity ? b.min * 1.5 : (b.min + b.max) / 2;
      return { ...b, getC: () => payColor(mid) };
    });
    ap(mkHist("JOBS BY PAY", payTiers));
    ap(mkSep());
    ap(mkTiers("PAY BANDS", payTiers, total));
    ap(mkSep());

    const payByOutlook = byBand(enriched, PAY_BANDS, "median_wage").map(b => ({
      ...b, avgVal: wAvg(b.items, "growth_rate"),
    }));
    ap(mkCross("PAY BY OUTLOOK", payByOutlook, fmtPct, outlookColor));
    ap(mkSep());

    const payByEdu = byEdu(enriched).map(b => ({ ...b, avgVal: wAvg(b.items, "median_wage") }));
    ap(mkCross("PAY BY EDUCATION", payByEdu, fmtWage, payColor));
    ap(mkSep());

    const lowWage = enriched.filter(o => o.median_wage != null && o.median_wage < 50000)
      .reduce((s, o) => s + o.employment, 0);
    const highWage = enriched.filter(o => o.median_wage != null && o.median_wage >= 75000)
      .reduce((s, o) => s + o.employment, 0);
    ap(mkStat("LOW WAGE (<$50K)", fmtJobs(lowWage), "#f87171", "below median"));
    ap(mkSep());
    ap(mkStat("HIGH WAGE ($75K+)", fmtJobs(highWage), "#4ade80", "above median"));

  } else if (metric === "education") {
    const eduGroups = byEdu(enriched).sort((a, b) => b.jobs - a.jobs);
    const top = eduGroups[0];
    ap(mkStat("TOP EDU LEVEL", top ? (EDU_SHORT[top.level] || top.level) : "—", eduColor(top?.level), "by employment"));
    ap(mkSep());

    const eduTiers = byEdu(enriched).map(b => ({ ...b, getC: () => eduColor(b.level) }));
    ap(mkHist("JOBS BY EDUCATION", eduTiers));
    ap(mkSep());
    ap(mkTiers("EDUCATION LEVELS", eduTiers, total));
    ap(mkSep());

    const eduByPay = byEdu(enriched).map(b => ({ ...b, avgVal: wAvg(b.items, "median_wage") }));
    ap(mkCross("EDUCATION BY PAY", eduByPay, fmtWage, payColor));
    ap(mkSep());

    const eduByOutlook = byEdu(enriched).map(b => ({ ...b, avgVal: wAvg(b.items, "growth_rate") }));
    ap(mkCross("EDUCATION BY OUTLOOK", eduByOutlook, fmtPct, outlookColor));
    ap(mkSep());

    const lowEdu = enriched.filter(o => {
      const idx = EDU_LEVELS.findIndex(e => o.education && e.toLowerCase() === o.education.toLowerCase());
      return idx >= 0 && idx <= 1;
    }).reduce((s, o) => s + o.employment, 0);
    const highEdu = enriched.filter(o => {
      const idx = EDU_LEVELS.findIndex(e => o.education && e.toLowerCase() === o.education.toLowerCase());
      return idx >= 5;
    }).reduce((s, o) => s + o.employment, 0);
    ap(mkStat("NO/HS DEGREE", fmtJobs(lowEdu), "#f87171", "entry-level"));
    ap(mkSep());
    ap(mkStat("BACHELOR'S+", fmtJobs(highEdu), "#4ade80", "higher education"));
  }
}

// ── Legend ────────────────────────────────────────────────────────────────────

function renderLegend(metric) {
  const el = document.getElementById("legend");
  el.innerHTML = "";

  if (metric === "education") {
    const row = document.createElement("span");
    row.className = "legend-swatch-row";
    EDU_LEVELS.forEach((level, idx) => {
      const c = greenRedColor(1 - idx / (EDU_LEVELS.length - 1));
      row.innerHTML += `<span class="legend-swatch">
        <span class="legend-swatch-box" style="background:${c}"></span>
        <span class="legend-label">${EDU_SHORT[level]}</span>
      </span>`;
    });
    el.appendChild(row);
  } else {
    // Build gradient using actual color functions for accuracy
    const cfg = {
      ai:     { fn: t => exposureColor(t * 10), low: "Safe (0)", high: "High Risk (10)" },
      growth: { fn: t => outlookColor(-12 + t * 24), low: "Declining", high: "Growing fast" },
      wage:   { fn: t => payColor(25000 * Math.pow(10, t * Math.log10(250000 / 25000))), low: "< $25K", high: "$250K+" },
    };
    const c = cfg[metric] || cfg.ai;

    const canvas = document.createElement("canvas");
    canvas.width = 130; canvas.height = 7;
    canvas.className = "legend-bar";
    const ctx = canvas.getContext("2d");
    const grad = ctx.createLinearGradient(0, 0, 130, 0);
    for (let i = 0; i <= 12; i++) grad.addColorStop(i / 12, c.fn(i / 12));
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 130, 7);

    const wrap = document.createElement("span");
    wrap.style.cssText = "display:flex;align-items:center;gap:5px;";
    wrap.innerHTML = `<span class="legend-label">${c.low}</span>`;
    wrap.appendChild(canvas);
    wrap.innerHTML += `<span class="legend-label">${c.high}</span>`;
    wrap.insertBefore(canvas, wrap.children[1]);
    el.appendChild(wrap);
  }

  // N/A swatch
  const s = document.createElement("span");
  s.className = "legend-swatch";
  s.style.marginLeft = "8px";
  s.innerHTML = `<span class="legend-swatch-box" style="background:rgba(35,35,35,1);border:1px solid #374151;"></span>
    <span class="legend-label" style="color:#6b7280;">N/A</span>`;
  el.appendChild(s);
}

// ── OOH URL builder ──────────────────────────────────────────────────────────
// Constructs a BLS Occupational Outlook Handbook URL from SOC code + title.
// The OOH URL pattern is: bls.gov/ooh/{category}/{slug}.htm

const OOH_CAT = {
  "11": "management",
  "13": "business-and-financial",
  "15": "computer-and-information-technology",
  "17": "architecture-and-engineering",
  "19": "life-physical-and-social-science",
  "21": "community-and-social-service",
  "23": "legal",
  "25": "education-training-and-library",
  "27": "arts-and-design",
  "29": "healthcare",
  "31": "healthcare",
  "33": "protective-service",
  "35": "food-preparation-and-serving",
  "37": "building-and-grounds-cleaning",
  "39": "personal-care-and-service",
  "41": "sales",
  "43": "office-and-administrative-support",
  "45": "farming-fishing-and-forestry",
  "47": "construction-and-extraction",
  "49": "installation-maintenance-and-repair",
  "51": "production",
  "53": "transportation-and-material-moving",
};

// Known overrides where OOH page name differs from SOC title
const OOH_OVERRIDES = {
  "11-1011": "management/top-executives",
  "11-1021": "management/top-executives",
  "29-1141": "healthcare/registered-nurses",
  "29-1051": "healthcare/pharmacists",
  "29-1071": "healthcare/physician-assistants",
  "29-1211": "healthcare/physicians-and-surgeons",
  "29-1171": "healthcare/nurse-anesthetists-nurse-midwives-and-nurse-practitioners",
  "15-1252": "computer-and-information-technology/software-developers",
  "15-1251": "computer-and-information-technology/software-developers",
  "31-1120": "healthcare/home-health-and-personal-care-aides",
  "31-1131": "healthcare/nursing-assistants",
  "43-4051": "office-and-administrative-support/customer-service-representatives",
  "43-9061": "office-and-administrative-support/general-office-clerks",
  "35-3031": "food-preparation-and-serving/waiters-and-waitresses",
  "53-3032": "transportation-and-material-moving/heavy-and-tractor-trailer-truck-drivers",
  "53-3033": "transportation-and-material-moving/delivery-truck-drivers-and-driver-sales-workers",
  "45-2092": "farming-fishing-and-forestry/agricultural-workers",
};

function oohUrl(code, title) {
  if (OOH_OVERRIDES[code]) {
    return `https://www.bls.gov/ooh/${OOH_OVERRIDES[code]}.htm`;
  }
  const cat = OOH_CAT[code.slice(0, 2)];
  if (!cat) return null;
  const slug = title
    .toLowerCase()
    .replace(/,?\s+(all other|nec|nos|except.*)$/i, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .trim()
    .replace(/\s+/g, "-");
  return `https://www.bls.gov/ooh/${cat}/${slug}.htm`;
}

// ── Hierarchy & enrichment ────────────────────────────────────────────────────

function enrich(occupations) {
  return occupations
    .filter(o => o.code && !o.code.endsWith("0000") && o.employment > 0)
    .map(o => {
      const ep = getEP(o.code);
      return {
        ...o,
        growth_rate: ep?.growth    ?? o.growth_rate,
        education:   ep?.education ?? o.education,
      };
    });
}

function buildHierarchy(enriched) {
  const groups = {};
  for (const o of enriched) {
    if (!groups[o.group]) groups[o.group] = { name: o.group, children: [] };
    groups[o.group].children.push(o);
  }
  return { name: "root", children: Object.values(groups).filter(g => g.children.length > 0) };
}

// ── Text helper ───────────────────────────────────────────────────────────────

function truncate(text, maxW, fs) {
  const chars = Math.floor(maxW / (fs * 0.56));
  if (text.length <= chars) return text;
  return text.slice(0, Math.max(chars - 1, 3)) + "…";
}

// ── State ─────────────────────────────────────────────────────────────────────

let currentMetric = "ai";
let allData = null;
let enrichedCache = null;

// ── Render ────────────────────────────────────────────────────────────────────

function render(data, metric) {
  if (!enrichedCache) enrichedCache = enrich(data.occupations);
  renderStats(enrichedCache, metric);

  const container = document.getElementById("treemap");
  container.innerHTML = "";

  const W = container.clientWidth;
  // Tall enough that boxes have breathing room — page scrolls vertically
  const H = Math.round(W * 2.2);
  container.style.height = H + "px";

  const svg = d3.select(container).append("svg").attr("width", W).attr("height", H);

  const root = d3.hierarchy(buildHierarchy(enrichedCache))
    .sum(d => d.employment || 0)
    .sort((a, b) => b.value - a.value);

  // Tighter padding = more space for actual boxes (matches original layout feel)
  d3.treemap()
    .size([W, H])
    .paddingOuter(1)
    .paddingInner(1)
    .paddingTop(14)
    .round(true)(root);

  const tooltip = document.getElementById("tooltip");

  // Group labels — overlaid at top of each group section
  svg.selectAll(".group-label")
    .data(root.children || [])
    .join("text")
    .attr("class", "group-label")
    .attr("x", d => d.x0 + 4)
    .attr("y", d => d.y0 + 10)
    .text(d => {
      const w = d.x1 - d.x0;
      if (w < 60) return "";
      const lbl = d.data.name.toUpperCase();
      const max = Math.floor(w / 6);
      return lbl.length > max ? lbl.slice(0, Math.max(max - 1, 4)) + "…" : lbl;
    });

  // Leaf cells
  const leaves = root.leaves();

  const cell = svg.selectAll(".cell")
    .data(leaves)
    .join("rect")
    .attr("class", "cell")
    .attr("x", d => d.x0).attr("y", d => d.y0)
    .attr("width",  d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0)
    .attr("fill",   d => getColor(d.data, metric))
    .attr("stroke", "#111827")
    .attr("stroke-width", 0.5);

  // Cell labels — matching original style: title on line 1, "growth% · Xjobs" on line 2
  svg.selectAll(".cell-text-g")
    .data(leaves)
    .join("g")
    .attr("class", "cell-text-g")
    .attr("pointer-events", "none")
    .each(function(d) {
      const w = d.x1 - d.x0, h = d.y1 - d.y0;
      if (w < 40 || h < 18) return;
      const fs = w > 150 ? 13 : w > 90 ? 11 : 10;
      const g = d3.select(this);
      const x = d.x0 + w / 2;

      // Show two lines only if box is tall enough
      const twoLine = h > 38 && w > 60;
      const titleY = d.y0 + (twoLine ? h / 2 - 2 : h / 2 + fs * 0.35);

      g.append("text")
        .attr("class", "cell-text")
        .attr("x", x).attr("y", titleY)
        .attr("text-anchor", "middle")
        .attr("font-size", fs)
        .text(truncate(d.data.title, w - 10, fs));

      if (twoLine) {
        const o = d.data;
        const growthStr = o.growth_rate != null
          ? (o.growth_rate > 0 ? "+" : "") + o.growth_rate.toFixed(0) + "%"
          : "";
        const jobStr = fmtJobs(o.employment) + " jobs";
        const sub = [growthStr, jobStr].filter(Boolean).join(" · ");
        g.append("text")
          .attr("class", "cell-text")
          .attr("x", x).attr("y", titleY + fs + 2)
          .attr("text-anchor", "middle")
          .attr("font-size", fs - 2)
          .attr("opacity", 0.72)
          .text(sub);
      }
    });

  // Tooltip — pure CSS hover (opacity), no D3 stroke manipulation
  cell
    .on("mousemove", (event, d) => {
      const o = d.data;
      const wage     = o.median_wage ? "$" + o.median_wage.toLocaleString() + " (regional)" : "N/A";
      const growth   = o.growth_rate != null ? (o.growth_rate > 0 ? "+" : "") + o.growth_rate.toFixed(1) + "%" : "N/A";
      const edu      = o.education ? (EDU_SHORT[o.education] || o.education) : "N/A";
      const exposure = o.ai_exposure != null ? o.ai_exposure.toFixed(1) + " / 10" : "N/A";
      const emp      = o.employment ? o.employment.toLocaleString() : "N/A";

      tooltip.style.display = "block";
      tooltip.style.left = Math.min(event.clientX + 14, window.innerWidth - 310) + "px";
      tooltip.style.top  = Math.min(event.clientY + 14, window.innerHeight - 220) + "px";
      tooltip.innerHTML = `
        <strong>${o.title}</strong>
        <div class="metric">Employment (3 metros) <span>${emp}</span></div>
        <div class="metric">Median Wage <span>${wage}</span></div>
        <div class="metric">BLS Outlook 2022–32 <span>${growth}</span></div>
        <div class="metric">Typical Education <span>${edu}</span></div>
        <div class="metric">AI Exposure Score <span>${exposure}</span></div>
        ${o.ai_rationale ? `<div class="divider"></div><div class="rationale">${o.ai_rationale}</div>` : ""}
        <div class="divider"></div>
        <div class="rationale" style="font-style:normal;color:#60a5fa;">Click to open BLS Outlook Handbook ↗</div>
      `;
    })
    .on("mouseleave", () => { tooltip.style.display = "none"; })
    .on("click", (_, d) => {
      const url = oohUrl(d.data.code, d.data.title);
      window.open(url || d.data.bls_url, "_blank");
    });

  renderLegend(metric);
}

// ── Bootstrap ─────────────────────────────────────────────────────────────────

fetch("data/occupations.json")
  .then(r => { if (!r.ok) throw new Error("not found"); return r.json(); })
  .then(data => {
    allData = data;

    const sub = document.querySelector(".subtitle");
    if (sub && data.metros) {
      sub.textContent = data.metros.join(" · ") + ` · BLS OEWS ${data.generated}`;
    }

    render(data, currentMetric);

    document.querySelectorAll(".toggle").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".toggle").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentMetric = btn.dataset.metric;
        render(allData, currentMetric);
      });
    });

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => render(allData, currentMetric), 150);
    });
  })
  .catch(() => {
    document.getElementById("treemap").innerHTML = `
      <div id="no-data">
        <h2>Run the pipeline first</h2>
        <p style="color:#9ca3af;font-size:.82rem">No data found at <code style="font-size:inherit;background:none;border:none;padding:0;color:#93c5fd;">data/occupations.json</code></p>
        <code>export ANTHROPIC_API_KEY=sk-ant-...
pip install -r requirements.txt
python pipeline.py</code>
      </div>
    `;
  });

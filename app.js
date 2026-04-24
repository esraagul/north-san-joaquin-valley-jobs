/* Central Valley Jobs — D3 Treemap Visualization */

// ── BLS 2022-2032 Employment Projections ──────────────────────────────────────
// growth: projected % change; education: typical entry-level education
const EP_DATA = {
  // Computer & Information Technology
  "15-1252": { growth: 25.7,  education: "Bachelor's degree" },           // Software Developers
  "15-1212": { growth: 31.5,  education: "Bachelor's degree" },           // Info Security Analysts
  "15-2051": { growth: 35.2,  education: "Bachelor's degree" },           // Data Scientists
  "15-1251": { growth: -10.7, education: "Bachelor's degree" },           // Computer Programmers
  "15-1211": { growth: 10.2,  education: "Bachelor's degree" },           // Computer Systems Analysts
  "15-1232": { growth: 9.7,   education: "Bachelor's degree" },           // Computer User Support
  "15-1244": { growth: 16.3,  education: "Bachelor's degree" },           // Network & Sys Admins
  "15-1299": { growth: 15.0,  education: "Bachelor's degree" },           // Computer Occupations, All Other

  // Management
  "11-3031": { growth: 16.0,  education: "Bachelor's degree" },           // Financial Managers
  "11-3021": { growth: 15.2,  education: "Bachelor's degree" },           // Computer/IS Managers
  "11-1011": { growth: 5.5,   education: "Bachelor's degree" },           // Chief Executives
  "11-1021": { growth: 6.0,   education: "Bachelor's degree" },           // General/Ops Managers
  "11-2021": { growth: 7.0,   education: "Bachelor's degree" },           // Marketing Managers
  "11-3111": { growth: 8.0,   education: "Bachelor's degree" },           // Compensation/Benefits Managers
  "11-9013": { growth: 5.0,   education: "Bachelor's degree" },           // Farmers/Ranchers/Ag Managers
  "11-9021": { growth: 4.0,   education: "Bachelor's degree" },           // Construction Managers
  "11-9111": { growth: 6.0,   education: "Bachelor's degree" },           // Medical/Health Services Managers

  // Business & Financial
  "13-2061": { growth: 18.6,  education: "Bachelor's degree" },           // Financial Examiners
  "13-2011": { growth: 4.4,   education: "Bachelor's degree" },           // Accountants & Auditors
  "13-1071": { growth: 6.0,   education: "Bachelor's degree" },           // HR Specialists
  "13-1111": { growth: 10.0,  education: "Bachelor's degree" },           // Management Analysts
  "13-2051": { growth: 13.0,  education: "Bachelor's degree" },           // Financial Analysts
  "13-1041": { growth: 4.0,   education: "Bachelor's degree" },           // Compliance Officers

  // Healthcare Practitioners
  "29-1171": { growth: 45.7,  education: "Master's degree" },             // Nurse Practitioners
  "29-1071": { growth: 27.6,  education: "Master's degree" },             // Physician Assistants
  "29-1111": { growth: 6.2,   education: "Bachelor's degree" },           // Registered Nurses
  "29-1141": { growth: 6.0,   education: "Bachelor's degree" },           // Registered Nurses (alt)
  "29-1211": { growth: 3.0,   education: "Doctoral or professional degree" }, // Physicians
  "29-1051": { growth: 5.0,   education: "Doctoral or professional degree" }, // Pharmacists
  "29-2061": { growth: 7.0,   education: "Associate's degree" },          // LPN/LVNs
  "29-2034": { growth: 6.0,   education: "Associate's degree" },          // Radiologic Technologists
  "29-1181": { growth: 12.0,  education: "Master's degree" },             // Audiologists
  "29-1122": { growth: 8.0,   education: "Master's degree" },             // Occupational Therapists
  "29-1123": { growth: 17.0,  education: "Doctoral or professional degree" }, // Physical Therapists
  "29-1127": { growth: 11.0,  education: "Master's degree" },             // Speech-Language Pathologists

  // Healthcare Support
  "31-1120": { growth: 22.4,  education: "No formal educational credential" }, // Home Health Aides
  "31-2011": { growth: 25.6,  education: "Associate's degree" },          // OT Assistants
  "31-9092": { growth: 9.0,   education: "Postsecondary nondegree award" }, // Medical Assistants
  "31-1131": { growth: 8.0,   education: "Postsecondary nondegree award" }, // Nursing Assistants

  // Community & Social Services
  "21-1018": { growth: 18.6,  education: "Bachelor's degree" },           // Substance Abuse Counselors
  "21-1021": { growth: 11.0,  education: "Master's degree" },             // Child/Family Social Workers
  "21-1022": { growth: 9.0,   education: "Bachelor's degree" },           // Healthcare Social Workers
  "21-1093": { growth: 8.0,   education: "Bachelor's degree" },           // Social & Human Service Assistants

  // Education
  "25-2011": { growth: 14.9,  education: "Bachelor's degree" },           // Preschool Teachers
  "25-2021": { growth: 1.4,   education: "Bachelor's degree" },           // Elementary Teachers
  "25-2031": { growth: 1.4,   education: "Bachelor's degree" },           // Secondary Teachers
  "25-2022": { growth: 1.4,   education: "Bachelor's degree" },           // Middle School Teachers
  "25-3031": { growth: 7.0,   education: "Bachelor's degree" },           // Instructional Coordinators
  "25-9045": { growth: 9.0,   education: "Bachelor's degree" },           // Teaching Assistants

  // Legal
  "23-2011": { growth: 13.8,  education: "Associate's degree" },          // Paralegals & Legal Assistants
  "23-1011": { growth: 8.0,   education: "Doctoral or professional degree" }, // Lawyers

  // Food Preparation
  "35-1011": { growth: 15.3,  education: "High school diploma or equivalent" }, // Chefs & Head Cooks
  "35-1012": { growth: 10.0,  education: "No formal educational credential" },  // First-Line Food Supervisors
  "35-2014": { growth: 9.0,   education: "No formal educational credential" },  // Cooks, Restaurant
  "35-3031": { growth: 8.0,   education: "No formal educational credential" },  // Waiters & Waitresses
  "35-3041": { growth: 7.0,   education: "No formal educational credential" },  // Food Servers, Nonrestaurant
  "35-9021": { growth: 6.0,   education: "No formal educational credential" },  // Dishwashers

  // Construction & Extraction
  "47-2111": { growth: 11.1,  education: "High school diploma or equivalent" }, // Electricians
  "47-2061": { growth: 5.1,   education: "No formal educational credential" },  // Construction Laborers
  "47-2031": { growth: 2.0,   education: "High school diploma or equivalent" }, // Carpenters
  "47-2152": { growth: 2.4,   education: "High school diploma or equivalent" }, // Plumbers
  "47-2051": { growth: 4.0,   education: "High school diploma or equivalent" }, // Cement Masons
  "47-2073": { growth: 3.5,   education: "No formal educational credential" },  // Operating Engineers
  "47-1011": { growth: 4.0,   education: "High school diploma or equivalent" }, // First-Line Construction Supervisors

  // Installation, Maintenance & Repair
  "49-9041": { growth: 16.0,  education: "High school diploma or equivalent" }, // Industrial Machinery Mechanics
  "49-3023": { growth: 5.0,   education: "Postsecondary nondegree award" },     // Auto Mechanics
  "49-9071": { growth: 6.0,   education: "High school diploma or equivalent" }, // Maintenance/Repair Workers
  "49-9051": { growth: 5.0,   education: "Postsecondary nondegree award" },     // Electrical Power-Line Installers

  // Transportation
  "53-3032": { growth: 4.0,   education: "High school diploma or equivalent" }, // Heavy Truck Drivers
  "53-3033": { growth: 8.3,   education: "No formal educational credential" },  // Light Truck Drivers
  "53-3031": { growth: 3.0,   education: "No formal educational credential" },  // Driver/Sales Workers
  "53-7062": { growth: 5.6,   education: "No formal educational credential" },  // Laborers/Freight Movers
  "53-7065": { growth: 7.2,   education: "No formal educational credential" },  // Stockers & Order Fillers
  "53-6021": { growth: 3.0,   education: "High school diploma or equivalent" }, // Parking Lot Attendants

  // Farming
  "45-2092": { growth: 3.2,   education: "No formal educational credential" },  // Farmworkers & Crop Workers
  "45-2041": { growth: 4.0,   education: "No formal educational credential" },  // Graders & Sorters, Agricultural Products
  "45-1011": { growth: 3.5,   education: "High school diploma or equivalent" }, // First-Line Ag Supervisors

  // Sales
  "41-2011": { growth: -10.1, education: "No formal educational credential" },  // Cashiers
  "41-2031": { growth: -3.0,  education: "No formal educational credential" },  // Retail Salespersons
  "41-3031": { growth: 5.0,   education: "High school diploma or equivalent" }, // Securities/Financial Services Sales
  "41-9041": { growth: -17.9, education: "No formal educational credential" },  // Telemarketers
  "41-4012": { growth: 3.0,   education: "High school diploma or equivalent" }, // Sales Reps, Wholesale

  // Office & Administrative Support
  "43-4051": { growth: -5.2,  education: "High school diploma or equivalent" }, // Customer Service Reps
  "43-6014": { growth: -7.0,  education: "High school diploma or equivalent" }, // Secretaries
  "43-3031": { growth: -5.9,  education: "Some college, no degree" },           // Bookkeeping Clerks
  "43-9061": { growth: -6.4,  education: "High school diploma or equivalent" }, // Office Clerks, General
  "43-9021": { growth: -16.7, education: "High school diploma or equivalent" }, // Data Entry Keyers
  "43-5061": { growth: -4.0,  education: "High school diploma or equivalent" }, // Production/Planning Clerks
  "43-4171": { growth: -5.0,  education: "High school diploma or equivalent" }, // Receptionists
  "43-6011": { growth: -6.0,  education: "High school diploma or equivalent" }, // Executive Secretaries

  // Protective Services
  "33-3051": { growth: 3.3,   education: "High school diploma or equivalent" }, // Police Officers
  "33-3012": { growth: -10.0, education: "High school diploma or equivalent" }, // Correctional Officers
  "33-9032": { growth: 4.0,   education: "High school diploma or equivalent" }, // Security Guards
  "33-1011": { growth: 3.0,   education: "High school diploma or equivalent" }, // First-Line Police Supervisors

  // Production
  "51-3022": { growth: 4.0,   education: "High school diploma or equivalent" }, // Meat/Poultry Cutters
  "51-1011": { growth: 3.0,   education: "High school diploma or equivalent" }, // First-Line Production Supervisors
  "51-4121": { growth: 2.0,   education: "High school diploma or equivalent" }, // Welders
  "51-2092": { growth: 3.0,   education: "High school diploma or equivalent" }, // Team Assemblers

  // Personal Care & Service
  "39-9011": { growth: 22.0,  education: "No formal educational credential" },  // Childcare Workers
  "39-5012": { growth: 7.0,   education: "Postsecondary nondegree award" },     // Hairdressers
  "39-9021": { growth: 12.0,  education: "No formal educational credential" },  // Personal Care Aides

  // Building Maintenance
  "37-2011": { growth: 4.0,   education: "No formal educational credential" },  // Janitors & Cleaners
  "37-3011": { growth: 3.0,   education: "No formal educational credential" },  // Landscaping Workers
};

// Group-level fallbacks keyed by major group prefix (2-digit)
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
  if (prefix && EP_GROUP_FALLBACK[prefix]) return EP_GROUP_FALLBACK[prefix];
  return null;
}

// ── Education label shortening ────────────────────────────────────────────────

const EDUCATION_SHORT = {
  "No formal educational credential": "No credential",
  "High school diploma or equivalent": "High school",
  "Some college, no degree": "Some college",
  "Postsecondary nondegree award": "Nondegree award",
  "Associate's degree": "Associate's",
  "Bachelor's degree": "Bachelor's",
  "Master's degree": "Master's",
  "Doctoral or professional degree": "Doctoral / Professional",
};

// ── Color scales ──────────────────────────────────────────────────────────────

// AI Exposure: blue=safe, amber=moderate, red=high
const aiScale = d3.scaleLinear()
  .domain([0, 5, 10])
  .range(["#3b82f6", "#f59e0b", "#ef4444"])
  .clamp(true);

// BLS Growth: red=declining, gray=flat, green=growing
const growthScale = d3.scaleLinear()
  .domain([-20, 0, 15, 35])
  .range(["#dc2626", "#6b7280", "#22c55e", "#15803d"])
  .clamp(true);

// Median Wage: dark to light blue
const wageScale = d3.scaleSequential()
  .domain([25000, 150000])
  .interpolator(d3.interpolateRgb("#1e3a5f", "#93c5fd"))
  .clamp(true);

// Education: ordinal color map
const EDUCATION_COLORS = {
  "No formal educational credential": "#ef4444",
  "High school diploma or equivalent": "#f97316",
  "Some college, no degree":           "#eab308",
  "Postsecondary nondegree award":      "#a3e635",
  "Associate's degree":                 "#22c55e",
  "Bachelor's degree":                  "#3b82f6",
  "Master's degree":                    "#8b5cf6",
  "Doctoral or professional degree":    "#ec4899",
};

function educationColor(edu) {
  if (!edu) return NULL_COLOR;
  const key = Object.keys(EDUCATION_COLORS).find(
    k => k.toLowerCase() === (edu || "").toLowerCase()
  );
  return key ? EDUCATION_COLORS[key] : NULL_COLOR;
}

const NULL_COLOR = "#1f2937";

function getColor(enriched, metric) {
  if (metric === "ai") {
    return enriched.ai_exposure != null ? aiScale(enriched.ai_exposure) : NULL_COLOR;
  }
  if (metric === "growth") {
    return enriched.growth_rate != null ? growthScale(enriched.growth_rate) : NULL_COLOR;
  }
  if (metric === "wage") {
    return enriched.median_wage != null ? wageScale(enriched.median_wage) : NULL_COLOR;
  }
  if (metric === "education") {
    return educationColor(enriched.education);
  }
  return NULL_COLOR;
}

// ── Legend ────────────────────────────────────────────────────────────────────

function renderLegend(metric) {
  const el = document.getElementById("legend");
  el.innerHTML = "";

  if (metric === "ai") {
    appendGradientLegend(el, ["#3b82f6", "#f59e0b", "#ef4444"], "0 — Safe", "10 — High", "AI Exposure");
  } else if (metric === "growth") {
    appendGradientLegend(el, ["#dc2626", "#6b7280", "#22c55e", "#15803d"], "Declining", "Growing fast", "BLS Outlook 2022-32");
  } else if (metric === "wage") {
    appendGradientLegend(el, ["#1e3a5f", "#3b82f6", "#93c5fd"], "$25k", "$150k+", "Median Annual Wage");
  } else if (metric === "education") {
    appendEducationLegend(el);
    return;
  }

  appendNullSwatch(el);
}

function appendGradientLegend(el, colors, low, high, title) {
  const wrap = document.createElement("span");
  wrap.style.cssText = "display:flex;align-items:center;gap:5px;";

  const titleEl = document.createElement("span");
  titleEl.className = "legend-label";
  titleEl.style.cssText = "color:#6b7280;font-size:0.67rem;";
  titleEl.textContent = title + ":";
  wrap.appendChild(titleEl);

  const lowEl = document.createElement("span");
  lowEl.className = "legend-label";
  lowEl.textContent = low;
  wrap.appendChild(lowEl);

  const canvas = document.createElement("canvas");
  canvas.width = 140; canvas.height = 8;
  canvas.className = "legend-bar";
  const ctx = canvas.getContext("2d");
  const grad = ctx.createLinearGradient(0, 0, 140, 0);
  colors.forEach((c, i) => grad.addColorStop(i / (colors.length - 1), c));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 140, 8);
  wrap.appendChild(canvas);

  const highEl = document.createElement("span");
  highEl.className = "legend-label";
  highEl.textContent = high;
  wrap.appendChild(highEl);

  el.appendChild(wrap);
}

function appendEducationLegend(el) {
  const titleEl = document.createElement("span");
  titleEl.className = "legend-label";
  titleEl.style.cssText = "color:#6b7280;font-size:0.67rem;margin-right:2px;";
  titleEl.textContent = "Education:";
  el.appendChild(titleEl);

  const row = document.createElement("span");
  row.className = "legend-swatch-row";

  const entries = [
    ["No credential", "#ef4444"],
    ["High school",   "#f97316"],
    ["Some college",  "#eab308"],
    ["Nondegree",     "#a3e635"],
    ["Associate's",   "#22c55e"],
    ["Bachelor's",    "#3b82f6"],
    ["Master's",      "#8b5cf6"],
    ["Doctoral",      "#ec4899"],
  ];

  entries.forEach(([label, color]) => {
    const swatch = document.createElement("span");
    swatch.className = "legend-swatch";
    swatch.innerHTML = `<span class="legend-swatch-box" style="background:${color}"></span><span class="legend-label">${label}</span>`;
    row.appendChild(swatch);
  });

  el.appendChild(row);
  appendNullSwatch(el);
}

function appendNullSwatch(el) {
  const s = document.createElement("span");
  s.className = "legend-swatch";
  s.style.marginLeft = "6px";
  s.innerHTML = `<span class="legend-swatch-box" style="background:${NULL_COLOR};border:1px solid #374151;"></span><span class="legend-label" style="color:#6b7280;">N/A</span>`;
  el.appendChild(s);
}

// ── Hierarchy & filtering ─────────────────────────────────────────────────────

function buildHierarchy(occupations) {
  const groups = {};
  for (const o of occupations) {
    // Skip group totals (codes ending in "0000") and zero/null employment
    if (o.code && o.code.endsWith("0000")) continue;
    if (!o.employment || o.employment === 0) continue;

    if (!groups[o.group]) groups[o.group] = { name: o.group, children: [] };
    groups[o.group].children.push(o);
  }
  return {
    name: "root",
    children: Object.values(groups).filter(g => g.children.length > 0),
  };
}

// ── Text helpers ──────────────────────────────────────────────────────────────

function truncateText(text, maxWidth, fontSize) {
  const charsPerLine = Math.floor(maxWidth / (fontSize * 0.56));
  if (text.length <= charsPerLine) return text;
  return text.slice(0, Math.max(charsPerLine - 1, 3)) + "…";
}

// ── State ─────────────────────────────────────────────────────────────────────

let currentMetric = "ai";
let allData = null;

// ── Render ────────────────────────────────────────────────────────────────────

function render(data, metric) {
  const container = document.getElementById("treemap");
  container.innerHTML = "";

  const W = container.clientWidth;
  const H = container.clientHeight;

  const svg = d3.select(container)
    .append("svg")
    .attr("width", W)
    .attr("height", H);

  const hierarchy = buildHierarchy(data.occupations);

  const root = d3.hierarchy(hierarchy)
    .sum(d => d.employment || 0)
    .sort((a, b) => b.value - a.value);

  d3.treemap()
    .size([W, H])
    .paddingOuter(3)
    .paddingInner(1)
    .paddingTop(18)
    .round(true)(root);

  const tooltip = document.getElementById("tooltip");

  // Group labels — only show if group width > 80px
  svg.selectAll(".group-label")
    .data(root.children || [])
    .join("text")
    .attr("class", "group-label")
    .attr("x", d => d.x0 + 4)
    .attr("y", d => d.y0 + 12)
    .text(d => {
      const w = d.x1 - d.x0;
      if (w < 80) return "";
      const label = d.data.name.toUpperCase();
      const maxChars = Math.floor(w / 6.5);
      return label.length > maxChars ? label.slice(0, Math.max(maxChars - 1, 4)) + "…" : label;
    });

  // Leaf cells — enrich with EP_DATA before coloring
  const leaves = root.leaves();

  const cell = svg.selectAll(".cell")
    .data(leaves)
    .join("rect")
    .attr("class", "cell")
    .attr("x", d => d.x0)
    .attr("y", d => d.y0)
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0)
    .attr("fill", d => {
      const ep = getEP(d.data.code);
      const enriched = {
        ...d.data,
        growth_rate: ep?.growth  ?? d.data.growth_rate,
        education:   ep?.education ?? d.data.education,
      };
      return getColor(enriched, metric);
    })
    .attr("stroke", "#111827")
    .attr("stroke-width", 0.5);

  // Cell text — only show if width > 45 and height > 25
  const textGroup = svg.selectAll(".cell-text-g")
    .data(leaves)
    .join("g")
    .attr("class", "cell-text-g")
    .attr("pointer-events", "none");

  textGroup.each(function(d) {
    const w = d.x1 - d.x0;
    const h = d.y1 - d.y0;
    if (w < 45 || h < 25) return;

    const fontSize = w > 120 ? 11 : 9;
    const padding = 4;
    const availW = w - padding * 2;

    const text = truncateText(d.data.title, availW, fontSize);

    d3.select(this).append("text")
      .attr("class", "cell-text")
      .attr("x", d.x0 + w / 2)
      .attr("y", d.y0 + h / 2 + fontSize * 0.38)
      .attr("text-anchor", "middle")
      .attr("font-size", fontSize)
      .text(text);
  });

  // Tooltip interactions
  cell
    .on("mousemove", (event, d) => {
      const o = d.data;
      const ep = getEP(o.code);
      const enriched = {
        ...o,
        growth_rate: ep?.growth  ?? o.growth_rate,
        education:   ep?.education ?? o.education,
      };

      const wage     = enriched.median_wage  ? "$" + enriched.median_wage.toLocaleString() : "N/A";
      const growth   = enriched.growth_rate  != null
        ? (enriched.growth_rate > 0 ? "+" : "") + enriched.growth_rate.toFixed(1) + "%"
        : "N/A";
      const edu      = enriched.education    ? (EDUCATION_SHORT[enriched.education] || enriched.education) : "N/A";
      const exposure = enriched.ai_exposure  != null ? enriched.ai_exposure.toFixed(1) + " / 10" : "N/A";
      const emp      = enriched.employment   ? enriched.employment.toLocaleString() : "N/A";

      tooltip.style.display = "block";
      tooltip.style.left    = Math.min(event.clientX + 14, window.innerWidth - 310) + "px";
      tooltip.style.top     = Math.max(event.clientY - 10, 8) + "px";
      tooltip.innerHTML = `
        <strong>${enriched.title}</strong>
        <div class="metric">Employment <span>${emp}</span></div>
        <div class="metric">Median Wage <span>${wage}</span></div>
        <div class="metric">BLS Outlook 2022-32 <span>${growth}</span></div>
        <div class="metric">Typical Education <span>${edu}</span></div>
        <div class="metric">AI Exposure <span>${exposure}</span></div>
        ${enriched.ai_rationale ? `<div class="divider"></div><div class="rationale">${enriched.ai_rationale}</div>` : ""}
      `;
    })
    .on("mouseleave", () => { tooltip.style.display = "none"; })
    .on("click", (_, d) => {
      if (d.data.bls_url) window.open(d.data.bls_url, "_blank");
    });

  renderLegend(metric);
}

// ── Bootstrap ─────────────────────────────────────────────────────────────────

fetch("data/occupations.json")
  .then(r => {
    if (!r.ok) throw new Error("not found");
    return r.json();
  })
  .then(data => {
    allData = data;

    const sub = document.querySelector(".subtitle");
    if (sub && data.metros) {
      sub.textContent = data.metros.join(" · ") + ` · BLS OEWS (${data.generated})`;
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
        <p style="color:#9ca3af;font-size:.78rem;margin-top:8px">Then serve locally:<br>
        <code style="margin-top:4px;">python -m http.server 8000</code></p>
      </div>
    `;
  });

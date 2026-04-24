/* Central Valley Jobs — D3 Treemap Visualization */

const EDUCATION_ORDER = [
  "No formal educational credential",
  "High school diploma or equivalent",
  "Some college, no degree",
  "Postsecondary nondegree award",
  "Associate's degree",
  "Bachelor's degree",
  "Master's degree",
  "Doctoral or professional degree",
];

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

// Color scales for each metric
const colorScales = {
  ai: d3.scaleLinear()
    .domain([0, 3, 6, 10])
    .range(["#1f6feb", "#388bfd", "#e3b341", "#f85149"])
    .clamp(true),

  growth: d3.scaleLinear()
    .domain([-10, 0, 10, 25])
    .range(["#f85149", "#e3b341", "#3fb950", "#1f883d"])
    .clamp(true),

  wage: d3.scaleLinear()
    .domain([25000, 60000, 100000, 180000])
    .range(["#1b4332", "#40916c", "#74c69d", "#b7e4c7"])
    .clamp(true),

  education: (edu) => {
    const idx = EDUCATION_ORDER.findIndex(e =>
      e.toLowerCase() === (edu || "").toLowerCase()
    );
    const scale = d3.scaleLinear()
      .domain([0, EDUCATION_ORDER.length - 1])
      .range(["#0d419d", "#79c0ff"]);
    return idx >= 0 ? scale(idx) : "#30363d";
  },
};

const NULL_COLOR = "#21262d";

function getColor(d, metric) {
  if (!d.data || d.data.major_code === undefined) return NULL_COLOR;
  const o = d.data;
  if (metric === "ai") {
    return o.ai_exposure != null ? colorScales.ai(o.ai_exposure) : NULL_COLOR;
  }
  if (metric === "growth") {
    return o.growth_rate != null ? colorScales.growth(o.growth_rate) : NULL_COLOR;
  }
  if (metric === "wage") {
    return o.median_wage != null ? colorScales.wage(o.median_wage) : NULL_COLOR;
  }
  if (metric === "education") {
    return colorScales.education(o.education);
  }
  return NULL_COLOR;
}

// ── Legend ────────────────────────────────────────────────────────────────────

function renderLegend(metric, data) {
  const el = document.getElementById("legend");
  el.innerHTML = "";

  if (metric === "ai") {
    appendGradientLegend(el, ["#1f6feb", "#388bfd", "#e3b341", "#f85149"], "0 — Low", "10 — High", "AI Exposure");
  } else if (metric === "growth") {
    appendGradientLegend(el, ["#f85149", "#e3b341", "#3fb950", "#1f883d"], "Declining", "Growing fast", "Job Growth 2022–32");
  } else if (metric === "wage") {
    appendGradientLegend(el, ["#1b4332", "#40916c", "#74c69d", "#b7e4c7"], "$25k", "$180k+", "Annual Median Wage");
  } else if (metric === "education") {
    appendGradientLegend(el, ["#0d419d", "#79c0ff"], "No credential", "Doctoral/Professional", "Typical Entry Education");
  }

  const missing = document.createElement("span");
  missing.className = "legend-label";
  missing.style.cssText = "margin-left:12px;display:flex;align-items:center;gap:4px;";
  missing.innerHTML = `<span style="width:10px;height:10px;background:#21262d;border-radius:2px;display:inline-block;"></span> Data N/A`;
  el.appendChild(missing);
}

function appendGradientLegend(el, colors, low, high, title) {
  const canvas = document.createElement("canvas");
  canvas.width = 160; canvas.height = 10;
  canvas.className = "legend-bar";
  const ctx = canvas.getContext("2d");
  const grad = ctx.createLinearGradient(0, 0, 160, 0);
  colors.forEach((c, i) => grad.addColorStop(i / (colors.length - 1), c));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 160, 10);

  const wrap = document.createElement("span");
  wrap.style.display = "flex";
  wrap.style.alignItems = "center";
  wrap.style.gap = "6px";
  wrap.innerHTML = `<span class="legend-label" style="color:#8b949e;font-size:.72rem">${title}:</span>
    <span class="legend-label">${low}</span>`;
  wrap.appendChild(canvas);
  const highEl = document.createElement("span");
  highEl.className = "legend-label";
  highEl.textContent = high;
  wrap.appendChild(highEl);
  el.appendChild(wrap);
}

// ── Treemap ───────────────────────────────────────────────────────────────────

function buildHierarchy(occupations) {
  const groups = {};
  for (const o of occupations) {
    if (!groups[o.group]) groups[o.group] = { name: o.group, children: [] };
    groups[o.group].children.push(o);
  }
  return {
    name: "root",
    children: Object.values(groups).filter(g => g.children.length > 0),
  };
}

function wrapText(text, maxWidth, fontSize) {
  // Estimate chars that fit (roughly 0.6 * fontSize per char)
  const charsPerLine = Math.floor(maxWidth / (fontSize * 0.58));
  if (text.length <= charsPerLine) return [text];
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    if ((line + " " + word).trim().length > charsPerLine) {
      if (line) lines.push(line.trim());
      line = word;
    } else {
      line = (line + " " + word).trim();
    }
    if (lines.length >= 2) break;
  }
  if (line && lines.length < 2) lines.push(line.trim());
  return lines;
}

let currentMetric = "ai";
let allData = null;

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
    .paddingTop(16)
    .round(true)(root);

  const tooltip = document.getElementById("tooltip");

  // Group labels
  svg.selectAll(".group-label")
    .data(root.children || [])
    .join("text")
    .attr("class", "group-label")
    .attr("x", d => d.x0 + 4)
    .attr("y", d => d.y0 + 11)
    .text(d => {
      const w = d.x1 - d.x0;
      const label = d.data.name;
      return w < 60 ? "" : label.length > w / 7 ? label.slice(0, Math.floor(w / 7)) + "…" : label;
    });

  // Leaf cells
  const leaves = root.leaves();

  const cell = svg.selectAll(".cell")
    .data(leaves)
    .join("rect")
    .attr("class", "cell")
    .attr("x", d => d.x0)
    .attr("y", d => d.y0)
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0)
    .attr("fill", d => getColor(d, metric))
    .attr("stroke", "#0d1117")
    .attr("stroke-width", 0.5);

  // Cell text labels
  const textGroup = svg.selectAll(".cell-text-g")
    .data(leaves)
    .join("g")
    .attr("class", "cell-text-g")
    .attr("pointer-events", "none");

  textGroup.each(function(d) {
    const w = d.x1 - d.x0;
    const h = d.y1 - d.y0;
    if (w < 28 || h < 16) return;

    const fontSize = w < 60 || h < 30 ? 9 : 11;
    const lines = wrapText(d.data.title, w - 6, fontSize);
    const totalH = lines.length * (fontSize + 2);
    const startY = d.y0 + (h - totalH) / 2 + fontSize;

    d3.select(this).selectAll("text")
      .data(lines)
      .join("text")
      .attr("class", "cell-text")
      .attr("x", d.x0 + w / 2)
      .attr("y", (_, i) => startY + i * (fontSize + 2))
      .attr("text-anchor", "middle")
      .attr("font-size", fontSize)
      .text(t => t);
  });

  // Tooltip interactions
  cell
    .on("mousemove", (event, d) => {
      const o = d.data;
      const wage = o.median_wage ? "$" + o.median_wage.toLocaleString() : "N/A";
      const growth = o.growth_rate != null ? (o.growth_rate > 0 ? "+" : "") + o.growth_rate + "%" : "N/A";
      const edu = o.education ? (EDUCATION_SHORT[o.education] || o.education) : "N/A";
      const exposure = o.ai_exposure != null ? o.ai_exposure + " / 10" : "N/A";

      tooltip.style.display = "block";
      tooltip.style.left = Math.min(event.clientX + 14, window.innerWidth - 320) + "px";
      tooltip.style.top = Math.max(event.clientY - 10, 8) + "px";
      tooltip.innerHTML = `
        <strong>${o.title}</strong>
        <div class="metric">Employment: <span>${o.employment.toLocaleString()}</span></div>
        <div class="metric">Median Wage: <span>${wage}</span></div>
        <div class="metric">Job Growth (nat'l): <span>${growth}</span></div>
        <div class="metric">Education: <span>${edu}</span></div>
        <div class="metric">AI Exposure: <span>${exposure}</span></div>
        ${o.ai_rationale ? `<div class="rationale">${o.ai_rationale}</div>` : ""}
      `;
    })
    .on("mouseleave", () => { tooltip.style.display = "none"; })
    .on("click", (_, d) => {
      if (d.data.bls_url) window.open(d.data.bls_url, "_blank");
    });

  renderLegend(metric, data);
}

// ── Bootstrap ─────────────────────────────────────────────────────────────────

fetch("data/occupations.json")
  .then(r => {
    if (!r.ok) throw new Error("not found");
    return r.json();
  })
  .then(data => {
    allData = data;

    // Update subtitle with actual metro names and date
    const sub = document.querySelector(".subtitle");
    if (sub && data.metros) {
      sub.textContent = data.metros.join(" · ") + ` · BLS OEWS (generated ${data.generated})`;
    }

    render(data, currentMetric);

    // Toggle buttons
    document.querySelectorAll(".toggle").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".toggle").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentMetric = btn.dataset.metric;
        render(allData, currentMetric);
      });
    });

    // Re-render on resize
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
        <p style="color:#8b949e;font-size:.85rem">No data found at <code>data/occupations.json</code></p>
        <code>export ANTHROPIC_API_KEY=sk-ant-...
pip install -r requirements.txt
python pipeline.py</code>
        <p style="color:#8b949e;font-size:.8rem;margin-top:8px">Then serve locally:<br>
        <code>python -m http.server 8000</code></p>
      </div>
    `;
  });

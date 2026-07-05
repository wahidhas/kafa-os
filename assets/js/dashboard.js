/* global Chart */

const founderDashboardData = {
  heroMetrics: [
    { label: "Monthly Run Rate", value: "Rp 2.980.000.000", detail: "+18.4% vs last month" },
    { label: "Partner Health", value: "87%", detail: "12 partners need attention" }
  ],
  priorities: [
    { title: "Recover delayed partner payments", detail: "Potential cash recovery: Rp 292.000.000", tone: "critical" },
    { title: "Approve Q3 academic expansion shortlist", detail: "8 institutions ready for founder decision", tone: "focus" },
    { title: "Unlock Bandung partner launch", detail: "Final operating decision pending since Friday", tone: "neutral" }
  ],
  actions: [
    { label: "Add Partner", icon: "ti-user-plus" },
    { label: "Issue Invoice", icon: "ti-file-invoice" },
    { label: "Sign Document", icon: "ti-signature" },
    { label: "Build Report", icon: "ti-report-analytics" }
  ],
  kpis: [
    { label: "Total Partners", value: "128", detail: "+14 new partners", icon: "ti-users", color: "blue", growth: "12.8%", trend: "positive", chartId: "sparkTotalPartners", values: [84, 91, 94, 101, 111, 118, 128] },
    { label: "Active Partners", value: "96", detail: "75% activation rate", icon: "ti-user-check", color: "green", growth: "8.3%", trend: "positive", chartId: "sparkActivePartners", values: [62, 67, 72, 78, 83, 89, 96] },
    { label: "Revenue This Month", value: "Rp 2.980.000.000", detail: "Rp 480.000.000 above plan", icon: "ti-cash", color: "azure", growth: "18.4%", trend: "positive", chartId: "sparkRevenue", values: [148, 172, 196, 218, 241, 268, 298] },
    { label: "Outstanding Invoice", value: "Rp 680.000.000", detail: "14 invoices pending", icon: "ti-file-invoice", color: "amber", growth: "4.1%", trend: "negative", chartId: "sparkOutstanding", values: [86, 80, 76, 72, 74, 70, 68] },
    { label: "Conversion Rate", value: "38.7%", detail: "Lead to signed partner", icon: "ti-percentage", color: "indigo", growth: "4.2 pts", trend: "positive", chartId: "sparkConversion", values: [27, 29, 31, 32, 35, 36, 38.7] },
    { label: "Bootcamp Active", value: "11", detail: "342 learners enrolled", icon: "ti-device-laptop", color: "violet", growth: "6.7%", trend: "positive", chartId: "sparkBootcamp", values: [6, 7, 8, 8, 9, 10, 11] },
    { label: "Business Launch", value: "24", detail: "7 ready for market", icon: "ti-briefcase", color: "teal", growth: "9.5%", trend: "positive", chartId: "sparkBusiness", values: [11, 13, 16, 17, 19, 22, 24] },
    { label: "Academic Batch", value: "18", detail: "6 campuses operating", icon: "ti-books", color: "cyan", growth: "11.2%", trend: "positive", chartId: "sparkAcademic", values: [9, 10, 12, 13, 15, 16, 18] }
  ],
  tasks: [
    { title: "Review strategic partner proposal", time: "09:30", checked: false },
    { title: "Approve bootcamp invoice batch", time: "11:00", checked: true },
    { title: "Prepare academic MoU follow-up", time: "14:15", checked: false },
    { title: "Check delayed certificate issuance", time: "16:00", checked: false }
  ],
  activity: [
    { title: "Invoice KFA-2026-0182 paid", detail: "Rp 86.000.000 received 12 minutes ago" },
    { title: "New partner onboarding started", detail: "Akademi Selatan moved to activation" },
    { title: "Bootcamp cohort reached 82%", detail: "Completion forecast improved today" },
    { title: "Documents awaiting signature", detail: "3 agreements require founder approval" }
  ],
  insights: [
    { title: "Recover revenue risk", detail: "Send executive reminders to 14 partners with invoices above 21 days.", meta: "Estimated recovery: Rp 292.000.000" },
    { title: "Scale high-performing channel", detail: "Double outreach to institutions matching the Bandung partner profile.", meta: "Projected lift: +19 qualified leads" }
  ],
  regions: [
    { name: "Java", count: 42 },
    { name: "Sumatra", count: 21 },
    { name: "Kalimantan", count: 13 },
    { name: "Sulawesi", count: 9 }
  ],
  calendar: [
    { date: "06 Jul", datetime: "2026-07-06", title: "Partner revenue review", detail: "09:00 - Finance war room" },
    { date: "07 Jul", datetime: "2026-07-07", title: "Academic expansion decision", detail: "13:30 - 8 institutions" },
    { date: "08 Jul", datetime: "2026-07-08", title: "Bootcamp cohort launch", detail: "10:00 - Product and mentors" }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  initSidebar();
  initThemeMode();
  initGlobalSearch();
  initFounderDashboard();
});

function initSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const sidebarToggle = document.querySelector(".sidebar-toggle");
  const mobileBackdrop = document.querySelector(".mobile-backdrop");

  const closeSidebar = () => {
    sidebar?.classList.remove("is-open");
    if (mobileBackdrop) {
      mobileBackdrop.hidden = true;
    }
  };

  sidebarToggle?.addEventListener("click", () => {
    sidebar?.classList.add("is-open");
    if (mobileBackdrop) {
      mobileBackdrop.hidden = false;
    }
  });

  mobileBackdrop?.addEventListener("click", closeSidebar);
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSidebar();
    }
  });
}

function initThemeMode() {
  const root = document.documentElement;
  const themeIcon = document.querySelector(".theme-toggle i");
  const themeOptions = document.querySelectorAll(".theme-option");
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const savedPreference = localStorage.getItem("kafa-theme") || "auto";

  const applyTheme = (preference) => {
    const resolvedTheme = preference === "auto" ? (mediaQuery.matches ? "dark" : "light") : preference;

    root.dataset.theme = resolvedTheme;
    root.dataset.themePreference = preference;
    localStorage.setItem("kafa-theme", preference);

    if (themeIcon) {
      themeIcon.className = preference === "auto" ? "ti ti-device-desktop" : resolvedTheme === "dark" ? "ti ti-moon" : "ti ti-sun";
    }

    themeOptions.forEach((option) => {
      option.classList.toggle("is-active", option.dataset.themeValue === preference);
    });
  };

  themeOptions.forEach((option) => {
    option.addEventListener("click", () => applyTheme(option.dataset.themeValue));
  });

  mediaQuery.addEventListener("change", () => {
    if ((localStorage.getItem("kafa-theme") || "auto") === "auto") {
      applyTheme("auto");
    }
  });

  applyTheme(savedPreference);
}

function initGlobalSearch() {
  const searchInput = document.getElementById("globalSearch");
  const autocomplete = document.getElementById("searchAutocomplete");

  if (!searchInput || !autocomplete) {
    return;
  }

  searchInput.addEventListener("focus", () => {
    autocomplete.hidden = false;
  });

  searchInput.addEventListener("input", () => {
    autocomplete.hidden = searchInput.value.trim().length === 0 && document.activeElement !== searchInput;
  });

  autocomplete.querySelectorAll("button").forEach((item) => {
    item.addEventListener("click", () => {
      searchInput.value = item.dataset.query || "";
      autocomplete.hidden = true;
      searchInput.focus();
    });
  });

  document.addEventListener("click", (event) => {
    if (!autocomplete.contains(event.target) && event.target !== searchInput) {
      autocomplete.hidden = true;
    }
  });
}

function initFounderDashboard() {
  renderHeroMetrics(founderDashboardData.heroMetrics);
  renderPriorityList(founderDashboardData.priorities);
  renderQuickActions(founderDashboardData.actions);
  renderKpiCards(founderDashboardData.kpis);
  renderTaskList(founderDashboardData.tasks);
  renderActivityList(founderDashboardData.activity);
  renderInsightList(founderDashboardData.insights);
  renderRegionList(founderDashboardData.regions);
  renderCalendarList(founderDashboardData.calendar);
  renderCharts(founderDashboardData.kpis);
}

function createElement(tagName, options = {}, children = []) {
  const element = document.createElement(tagName);
  const childNodes = Array.isArray(children) ? children : [children];

  Object.entries(options).forEach(([key, value]) => {
    if (value === undefined || value === null || value === false) {
      return;
    }

    if (key === "className") {
      element.className = value;
    } else if (key === "text") {
      element.textContent = value;
    } else {
      element.setAttribute(key, value);
    }
  });

  childNodes.filter(Boolean).forEach((child) => element.append(child));
  return element;
}

function replaceSection(selector, children) {
  const section = document.querySelector(selector);

  if (section) {
    section.replaceChildren(...children);
  }
}

function renderHeroMetrics(metrics) {
  replaceSection(".hero-metrics", metrics.map((metric) => createElement("div", {}, [
    createElement("span", { text: metric.label }),
    createElement("strong", { text: metric.value }),
    createElement("small", { text: metric.detail })
  ])));
}

function renderPriorityList(priorities) {
  replaceSection(".priority-stack", priorities.map((priority, index) => createElement("div", { className: `priority-item priority-${priority.tone}` }, [
    createElement("span", { className: "priority-rank", text: String(index + 1).padStart(2, "0") }),
    createElement("div", {}, [
      createElement("strong", { text: priority.title }),
      createElement("small", { text: priority.detail })
    ])
  ])));
}

function renderQuickActions(actions) {
  replaceSection(".quick-actions", actions.map((action) => createElement("button", { className: "quick-action", type: "button" }, [
    createElement("i", { className: `ti ${action.icon}`, "aria-hidden": "true" }),
    createElement("span", { text: action.label })
  ])));
}

function renderKpiCards(kpis) {
  replaceSection(".kpi-grid", kpis.map((kpi) => createElement("article", { className: "kpi-card" }, [
    createElement("div", { className: "kpi-head" }, [
      createElement("div", { className: `kpi-icon kpi-icon-${kpi.color}` }, [
        createElement("i", { className: `ti ${kpi.icon}`, "aria-hidden": "true" })
      ]),
      createElement("span", { className: `growth ${kpi.trend}` }, [
        createElement("i", { className: `ti ${kpi.trend === "negative" ? "ti-trending-down" : "ti-trending-up"}`, "aria-hidden": "true" }),
        document.createTextNode(kpi.growth)
      ])
    ]),
    createElement("span", { text: kpi.label }),
    createElement("strong", { text: kpi.value }),
    createElement("small", { text: kpi.detail }),
    createElement("canvas", { className: "sparkline", id: kpi.chartId, "aria-label": `${kpi.label} sparkline` })
  ])));
}

function renderTaskList(tasks) {
  replaceSection(".task-list", tasks.map((task) => {
    const checkbox = createElement("input", { className: "form-check-input", type: "checkbox" });
    checkbox.checked = task.checked;

    return createElement("label", { className: "task-item" }, [
      checkbox,
      createElement("span", { text: task.title }),
      createElement("small", { text: task.time })
    ]);
  }));
}

function renderActivityList(activityItems) {
  replaceSection(".timeline-list", activityItems.map((item) => createElement("li", {}, [
    createElement("span", { className: "timeline-dot" }),
    createElement("div", {}, [
      createElement("strong", { text: item.title }),
      createElement("small", { text: item.detail })
    ])
  ])));
}

function renderInsightList(insights) {
  replaceSection(".insight-list", insights.map((insight) => createElement("div", { className: "insight-item" }, [
    createElement("strong", { text: insight.title }),
    createElement("span", { text: insight.detail }),
    createElement("small", { text: insight.meta })
  ])));
}

function renderRegionList(regions) {
  replaceSection(".region-list", regions.map((region) => createElement("span", {}, [
    createElement("strong", { text: region.count }),
    document.createTextNode(region.name)
  ])));
}

function renderCalendarList(events) {
  replaceSection(".calendar-list", events.map((event) => createElement("div", { className: "calendar-item" }, [
    createElement("time", { datetime: event.datetime, text: event.date }),
    createElement("div", {}, [
      createElement("strong", { text: event.title }),
      createElement("small", { text: event.detail })
    ])
  ])));
}

function renderCharts(kpis) {
  if (typeof Chart === "undefined") {
    showChartFallbacks();
    return;
  }

  const palette = {
    blue: "#2563eb",
    green: "#16a34a",
    red: "#dc2626",
    amber: "#d97706",
    cyan: "#0891b2",
    grid: "rgba(148, 163, 184, 0.22)",
    text: getComputedStyle(document.documentElement).getPropertyValue("--kafa-muted").trim() || "#667085"
  };
  const chartOptions = createCartesianChartOptions(palette);

  createRevenuePerformanceChart(palette, chartOptions);
  createPartnerAcquisitionChart(palette, chartOptions);
  createPipelineDistributionChart(palette);
  createSparklineCharts(kpis, palette);
}

function showChartFallbacks() {
  document.querySelectorAll(".chart-wrap, .sparkline").forEach((container) => {
    const fallback = createElement("div", { className: "chart-fallback", text: "Chart data is temporarily unavailable." });
    container.replaceWith(fallback);
  });
}

function createCartesianChartOptions(palette) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: palette.text,
          usePointStyle: true,
          boxWidth: 8
        }
      },
      tooltip: {
        backgroundColor: "#111827",
        displayColors: false,
        padding: 12,
        titleFont: {
          weight: "700"
        },
        callbacks: {
          label: (context) => `${context.dataset.label}: ${formatRupiah(context.parsed.y || context.parsed)}`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: palette.text
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: palette.grid
        },
        ticks: {
          color: palette.text,
          callback: (value) => formatRupiah(value)
        }
      }
    }
  };
}

function createRevenuePerformanceChart(palette, chartOptions) {
  const element = document.getElementById("revenueTrendChart");

  if (!element) {
    return;
  }

  new Chart(element, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          label: "Revenue",
          data: [1480000000, 1720000000, 1960000000, 2180000000, 2410000000, 2680000000, 2980000000],
          borderColor: palette.blue,
          backgroundColor: "rgba(37, 99, 235, 0.1)",
          fill: true,
          tension: 0.38,
          pointRadius: 3,
          pointBackgroundColor: palette.blue
        },
        {
          label: "Target",
          data: [1550000000, 1800000000, 2030000000, 2250000000, 2500000000, 2740000000, 3050000000],
          borderColor: palette.green,
          borderDash: [6, 6],
          tension: 0.38,
          pointRadius: 0
        }
      ]
    },
    options: chartOptions
  });
}

function createPartnerAcquisitionChart(palette, chartOptions) {
  const element = document.getElementById("partnerGrowthChart");

  if (!element) {
    return;
  }

  new Chart(element, {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Partners",
          data: [12, 18, 25, 34, 47, 61],
          backgroundColor: palette.blue,
          borderRadius: 6,
          maxBarThickness: 34
        }
      ]
    },
    options: {
      ...chartOptions,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          ...chartOptions.plugins.tooltip,
          callbacks: {
            label: (context) => `${context.parsed.y} partners`
          }
        }
      },
      scales: {
        ...chartOptions.scales,
        y: {
          ...chartOptions.scales.y,
          ticks: {
            color: palette.text
          }
        }
      }
    }
  });
}

function createPipelineDistributionChart(palette) {
  const element = document.getElementById("pipelineFunnelChart");

  if (!element) {
    return;
  }

  new Chart(element, {
    type: "doughnut",
    data: {
      labels: ["Lead", "Qualified", "Proposal", "Signed"],
      datasets: [
        {
          data: [420, 260, 138, 72],
          backgroundColor: [palette.blue, palette.cyan, palette.amber, palette.green],
          borderWidth: 0,
          hoverOffset: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "68%",
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: palette.text,
            usePointStyle: true,
            boxWidth: 8
          }
        }
      }
    }
  });
}

function createSparklineCharts(kpis, palette) {
  const colorByTone = {
    amber: palette.amber,
    azure: palette.blue,
    blue: palette.blue,
    cyan: palette.cyan,
    green: palette.green,
    indigo: palette.blue,
    teal: palette.green,
    violet: palette.cyan
  };

  kpis.forEach((kpi) => {
    const element = document.getElementById(kpi.chartId);

    if (!element) {
      return;
    }

    const lineColor = kpi.trend === "negative" ? palette.red : colorByTone[kpi.color] || palette.blue;

    new Chart(element, {
      type: "line",
      data: {
        labels: kpi.values.map((_, index) => index + 1),
        datasets: [
          {
            data: kpi.values,
            borderColor: lineColor,
            backgroundColor: `${lineColor}1f`,
            fill: true,
            tension: 0.42,
            borderWidth: 2,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        },
        scales: {
          x: {
            display: false
          },
          y: {
            display: false
          }
        }
      }
    });
  });
}

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    currency: "IDR",
    maximumFractionDigits: 0,
    style: "currency"
  }).format(value);
}

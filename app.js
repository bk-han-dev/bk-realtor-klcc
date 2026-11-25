(function () {
  const AREA_DATA = {
    All: {
      listingsCount: "18",
      medianPrice: "RM 2.85M",
      avgAge: "4Y",
      watermark: "KUALA LUMPUR",
      address: "Jalan Binjai, KLCC, 50450 Kuala Lumpur",
      units: "KL-01, BB-03, MK-09",
      buildingAge: "4Y",
      monthlyViews: "1,420",
      climate: "28°C",
      spotlightImg: "./assets/images/property-interior.jpg",
      spotlightAlt: "Sunlit KLCC luxury condominium living room with skyline windows",
      spotlightTitle: "Binjai Residence",
      spotlightPrice: "RM 3.28M"
    },
    KLCC: {
      listingsCount: "18",
      medianPrice: "RM 2.85M",
      avgAge: "4Y",
      watermark: "KLCC",
      address: "Jalan Binjai, KLCC, 50450 Kuala Lumpur",
      units: "KL-01, KL-04, KL-09",
      buildingAge: "4Y",
      monthlyViews: "1,420",
      climate: "28°C",
      spotlightImg: "./assets/images/property-interior.jpg",
      spotlightAlt: "Sunlit KLCC luxury condominium living room with skyline windows",
      spotlightTitle: "Binjai Residence",
      spotlightPrice: "RM 3.28M"
    },
    "Bukit Bintang": {
      listingsCount: "11",
      medianPrice: "RM 1.95M",
      avgAge: "3Y",
      watermark: "BUKIT BINTANG",
      address: "Jalan Bukit Bintang, 55100 Kuala Lumpur",
      units: "BB-02, BB-07, BB-12",
      buildingAge: "3Y",
      monthlyViews: "1,180",
      climate: "29°C",
      spotlightImg: "./assets/images/listing-bukit-bintang.jpg",
      spotlightAlt: "Contemporary architectural residence terrace in Bukit Bintang",
      spotlightTitle: "Pavilion Crest",
      spotlightPrice: "RM 1.95M"
    },
    "Mont Kiara": {
      listingsCount: "14",
      medianPrice: "RM 2.42M",
      avgAge: "5Y",
      watermark: "MONT KIARA",
      address: "Jalan Kiara 3, Mont Kiara, 50480 Kuala Lumpur",
      units: "MK-05, MK-08, MK-14",
      buildingAge: "5Y",
      monthlyViews: "960",
      climate: "28°C",
      spotlightImg: "./assets/images/listing-mont-kiara.jpg",
      spotlightAlt: "Open-plan living space at Kiara Courtyard Penthouse in Mont Kiara",
      spotlightTitle: "Kiara Courtyard",
      spotlightPrice: "RM 2.42M"
    }
  };

  const state = {
    area: "KLCC",
    listingsAreaFilter: "All",
    type: "All",
    tenure: "All",
    search: ""
  };

  const statListingsCount = document.getElementById("statListingsCount");
  const statMedianPrice = document.getElementById("statMedianPrice");
  const statAvgAge = document.getElementById("statAvgAge");
  const mapWatermark = document.getElementById("mapWatermark");
  const locationAddress = document.getElementById("locationAddress");
  const locationUnits = document.getElementById("locationUnits");
  const miniStatAge = document.getElementById("miniStatAge");
  const miniStatViews = document.getElementById("miniStatViews");
  const miniStatTemp = document.getElementById("miniStatTemp");
  const spotlightImg = document.getElementById("spotlightImg");
  const spotlightTitle = document.getElementById("spotlightTitle");
  const spotlightPrice = document.getElementById("spotlightPrice");

  function updateAreaDashboard(areaKey) {
    const data = AREA_DATA[areaKey] || AREA_DATA.KLCC;
    if (statListingsCount) statListingsCount.textContent = data.listingsCount;
    if (statMedianPrice) statMedianPrice.textContent = data.medianPrice;
    if (statAvgAge) statAvgAge.textContent = data.avgAge;
    if (mapWatermark) mapWatermark.textContent = data.watermark;
    if (locationAddress) locationAddress.textContent = data.address;
    if (locationUnits) locationUnits.textContent = data.units;
    if (miniStatAge) miniStatAge.textContent = data.buildingAge;
    if (miniStatViews) miniStatViews.textContent = data.monthlyViews;
    if (miniStatTemp) miniStatTemp.textContent = data.climate;
    if (spotlightImg) {
      spotlightImg.src = data.spotlightImg;
      spotlightImg.alt = data.spotlightAlt;
    }
    if (spotlightTitle) spotlightTitle.textContent = data.spotlightTitle;
    if (spotlightPrice) spotlightPrice.textContent = data.spotlightPrice;
  }

  function applyListingsFilter() {
    const cards = document.querySelectorAll("#listingsGrid .listing-card");
    const q = state.search.trim().toLowerCase();
    cards.forEach((card) => {
      const cardArea = card.dataset.area || "";
      const cardType = card.dataset.type || "";
      const cardTenure = card.dataset.tenure || "";
      const text = card.textContent.toLowerCase();

      const areaOk = state.listingsAreaFilter === "All" || cardArea === state.listingsAreaFilter;
      const typeOk = state.type === "All" || cardType === state.type;
      const tenureOk = state.tenure === "All" || cardTenure === state.tenure;
      const searchOk = !q || text.includes(q);

      card.hidden = !(areaOk && typeOk && tenureOk && searchOk);
    });
  }

  function syncAreaTabs(areaKey) {
    document.querySelectorAll("[data-area-tab]").forEach((tab) => {
      const pressed = tab.dataset.areaTab === areaKey;
      tab.setAttribute("aria-pressed", pressed ? "true" : "false");
    });
  }

  function closeAllDropdowns(except) {
    document.querySelectorAll(".filter-dropdown").forEach((dd) => {
      if (dd === except) return;
      const btn = dd.querySelector(".filter-trigger");
      const menu = dd.querySelector(".filter-menu");
      if (btn) btn.setAttribute("aria-expanded", "false");
      if (menu) menu.hidden = true;
    });
  }

  document.querySelectorAll(".filter-dropdown").forEach((dd) => {
    const trigger = dd.querySelector(".filter-trigger");
    const labelEl = dd.querySelector(".trigger-label");
    const menu = dd.querySelector(".filter-menu");
    const kind = dd.dataset.dropdown;

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const willOpen = menu.hidden;
      closeAllDropdowns(dd);
      menu.hidden = !willOpen;
      trigger.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });

    menu.querySelectorAll(".filter-option").forEach((opt) => {
      opt.addEventListener("click", () => {
        const val = opt.dataset.value;
        menu.querySelectorAll(".filter-option").forEach((o) => {
          o.setAttribute("aria-selected", o === opt ? "true" : "false");
        });
        if (labelEl) labelEl.textContent = opt.textContent.trim();
        menu.hidden = true;
        trigger.setAttribute("aria-expanded", "false");

        if (kind === "area") {
          state.area = val;
          state.listingsAreaFilter = val;
          updateAreaDashboard(val);
          syncAreaTabs(val);
        } else if (kind === "type") {
          state.type = val;
        } else if (kind === "tenure") {
          state.tenure = val;
        }
        applyListingsFilter();
      });
    });
  });

  document.addEventListener("click", () => closeAllDropdowns(null));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllDropdowns(null);
      closeModal();
    }
  });

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      state.search = searchInput.value;
      applyListingsFilter();
    });
  }

  document.querySelectorAll("[data-select-area]").forEach((pin) => {
    pin.addEventListener("click", () => {
      const area = pin.dataset.selectArea;
      state.area = area;
      state.listingsAreaFilter = area;
      updateAreaDashboard(area);
      syncAreaTabs(area);
      const areaTrigger = document.querySelector('[data-dropdown="area"] .trigger-label');
      if (areaTrigger) areaTrigger.textContent = area;
      applyListingsFilter();
    });
  });

  document.querySelectorAll("[data-area-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      const area = tab.dataset.areaTab;
      state.listingsAreaFilter = area;
      syncAreaTabs(area);
      updateAreaDashboard(area === "All" ? "KLCC" : area);
      const areaTrigger = document.querySelector('[data-dropdown="area"] .trigger-label');
      if (areaTrigger) areaTrigger.textContent = area === "All" ? "All KL Areas" : area;
      applyListingsFilter();
    });
  });

  const heartBtn = document.getElementById("favoriteLocationBtn");
  if (heartBtn) {
    heartBtn.addEventListener("click", () => {
      const next = heartBtn.getAttribute("aria-pressed") !== "true";
      heartBtn.setAttribute("aria-pressed", next ? "true" : "false");
    });
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".request-viewing-btn");
    if (!btn) return;
    const prop = btn.dataset.property || "KLCC Property";
    const enquiryArea = document.getElementById("enquiryArea");
    if (enquiryArea) enquiryArea.value = prop;
    const contactEl = document.getElementById("contact");
    if (contactEl) contactEl.scrollIntoView({ behavior: "smooth" });
    const nameInput = document.getElementById("visitorName");
    if (nameInput) nameInput.focus({ preventScroll: true });
  });

  // Sidebar active state
  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelectorAll("[data-nav]").forEach((n) => n.classList.remove("is-active"));
      link.classList.add("is-active");
    });
  });

  // Demo Modal
  const modal = document.getElementById("addPropertyModal");
  const openModalBtn = document.getElementById("openAddModalBtn");
  const closeModalBtn = document.getElementById("closeAddModalBtn");
  const cancelModalBtn = document.getElementById("cancelAddModalBtn");
  let lastFocused = null;

  function openModal() {
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.hidden = false;
    const firstInput = modal.querySelector("input");
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  if (openModalBtn) openModalBtn.addEventListener("click", openModal);
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (cancelModalBtn) cancelModalBtn.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  const addPropForm = document.getElementById("addPropertyForm");
  if (addPropForm) {
    addPropForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("newPropName").value.trim();
      const price = document.getElementById("newPropPrice").value.trim();
      const area = document.getElementById("newPropArea").value;
      const addr = document.getElementById("newPropAddress").value.trim();
      if (!name || !price || !addr) return;

      const grid = document.getElementById("listingsGrid");
      const article = document.createElement("article");
      article.className = "listing-card";
      article.dataset.area = area;
      article.dataset.type = "Condominium";
      article.dataset.tenure = "Freehold";

      const media = document.createElement("div");
      media.className = "listing-media";
      const img = document.createElement("img");
      img.src = "./assets/images/property-interior.jpg";
      img.alt = name + " in " + area;
      img.width = 1600;
      img.height = 1067;
      const tag = document.createElement("span");
      tag.className = "listing-tag";
      tag.textContent = area + " • Sample";
      media.append(img, tag);

      const body = document.createElement("div");
      body.className = "listing-body";
      const priceEl = document.createElement("p");
      priceEl.className = "listing-price";
      priceEl.textContent = price.startsWith("RM") ? price : "RM " + price;
      const nameEl = document.createElement("h3");
      nameEl.className = "listing-name";
      nameEl.textContent = name;
      const addrEl = document.createElement("p");
      addrEl.className = "listing-addr";
      addrEl.textContent = addr;
      const specsEl = document.createElement("p");
      specsEl.className = "listing-specs";
      specsEl.textContent = "1,650 sq ft • 3 Beds • 2 Baths • Condominium";
      const ctaWrap = document.createElement("div");
      ctaWrap.className = "listing-cta";
      const ctaBtn = document.createElement("button");
      ctaBtn.type = "button";
      ctaBtn.className = "btn-secondary request-viewing-btn";
      ctaBtn.dataset.property = name + " (" + area + ")";
      ctaBtn.textContent = "Request Viewing";
      ctaWrap.appendChild(ctaBtn);

      body.append(priceEl, nameEl, addrEl, specsEl, ctaWrap);
      article.append(media, body);
      grid.prepend(article);

      addPropForm.reset();
      closeModal();
      const listingsSec = document.getElementById("listings");
      if (listingsSec) listingsSec.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Demo Enquiry Form
  const enquiryForm = document.getElementById("enquiryForm");
  const enquiryStatus = document.getElementById("enquiryStatus");
  if (enquiryForm && enquiryStatus) {
    enquiryForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("visitorName").value.trim();
      const email = document.getElementById("visitorEmail").value.trim();
      const prop = document.getElementById("enquiryArea").value.trim();
      if (!name || !email) {
        enquiryStatus.textContent = "Please enter your name and email address.";
        enquiryStatus.hidden = false;
        return;
      }
      enquiryStatus.textContent =
        "Demo confirmation: enquiry recorded for " + prop + " (contact: hello@bkrealtor.example).";
      enquiryStatus.hidden = false;
      enquiryForm.reset();
    });
  }
})();

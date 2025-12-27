// ============ PAGE LOADING FUNCTION ============
function loadPage(page) {
  // Show loading indicator
  document.getElementById("contentArea").innerHTML = `
        <div class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3">Loading ${
              page.charAt(0).toUpperCase() + page.slice(1)
            }...</p>
        </div>
    `;

  // Load page content
  fetch(`pages/${page}.html`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Page not found");
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById("contentArea").innerHTML = data;

      // Re-initialize any page-specific scripts
      initializePageScripts(page);

      // Update active nav link
      updateActiveNav(page);

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    })
    .catch((error) => {
      console.error("Error loading page:", error);
      document.getElementById("contentArea").innerHTML = `
                <div class="alert alert-danger text-center mt-5">
                    <h4>Error Loading Page</h4>
                    <p>Could not load the ${page} page. Please try again.</p>
                    <button onclick="loadPage('home')" class="btn btn-primary">Return to Home</button>
                </div>
            `;
    });
}

// ============ UPDATE ACTIVE NAV LINK ============
function updateActiveNav(page) {
  // Remove active class from all nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });

  // Add active class to current page link
  const currentLink = document.querySelector(`.nav-link[onclick*="${page}"]`);
  if (currentLink) {
    currentLink.classList.add("active");
  }
}

// ============ INITIALIZE PAGE-SPECIFIC SCRIPTS ============
function initializePageScripts(page) {
  switch (page) {
    case "home":
      // Home page specific scripts
      console.log("Home page loaded");
      break;
    case "contact":
      // Contact form initialization
      initializeContactForm();
      break;
    case "cv":
      // CV download button
      initializeCVDownload();
      break;
    // Add other pages as needed
  }
}

// ============ CONTACT FORM HANDLER ============
function initializeContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Add form submission logic here
      alert("Form submitted! (This is a demo)");
    });
  }
}

// ============ CV DOWNLOAD ============
function initializeCVDownload() {
  const downloadBtn = document.getElementById("downloadCV");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", function () {
      // Add CV download logic here
      alert("CV download started! (This is a demo)");
    });
  }
}

// ============ MOBILE SIDEBAR TOGGLE ============
function toggleSidebar() {
  document.querySelector(".sidebar").classList.toggle("active");
}

// ============ INITIALIZE ON PAGE LOAD ============
document.addEventListener("DOMContentLoaded", function () {
  // Set home as active by default
  updateActiveNav("home");

  // Add mobile menu toggle button
  const navbar = document.querySelector(".navbar .container-fluid");
  const toggleBtn = document.createElement("button");
  toggleBtn.innerHTML = "☰";
  toggleBtn.className = "btn btn-light d-lg-none me-3";
  toggleBtn.onclick = toggleSidebar;
  navbar.insertBefore(toggleBtn, navbar.firstChild);

  // Close sidebar when clicking outside on mobile
  document.addEventListener("click", function (event) {
    const sidebar = document.querySelector(".sidebar");
    const isMobile = window.innerWidth <= 992;

    if (
      isMobile &&
      sidebar.classList.contains("active") &&
      !sidebar.contains(event.target) &&
      !event.target.closest(".navbar-toggler")
    ) {
      sidebar.classList.remove("active");
    }
  });

  console.log("Portfolio website initialized");
});

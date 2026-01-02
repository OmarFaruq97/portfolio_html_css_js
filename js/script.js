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

//start contact form
// Contact Form Submission
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
        timestamp: new Date().toISOString(),
      };

      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML =
        '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
      submitBtn.disabled = true;

      // Simulate API call (replace with real backend)
      setTimeout(() => {
        // Save to localStorage (for demo)
        const messages = JSON.parse(
          localStorage.getItem("portfolioMessages") || "[]"
        );
        messages.push(formData);
        localStorage.setItem("portfolioMessages", JSON.stringify(messages));

        // Show success message
        showNotification(
          "Message sent successfully! I'll get back to you soon.",
          "success"
        );

        // Reset form
        contactForm.reset();

        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }
});

// Notification function
function showNotification(message, type = "success") {
  // Remove existing notification
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${
              type === "success" ? "✓" : "⚠"
            }</span>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#d4edda" : "#f8d7da"};
        color: ${type === "success" ? "#155724" : "#721c24"};
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;

  // Add keyframe animation
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-icon {
            font-weight: bold;
            font-size: 1.2rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: inherit;
            padding: 0;
            line-height: 1;
        }
    `;

  document.head.appendChild(style);
  document.body.appendChild(notification);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}
// end of contact section

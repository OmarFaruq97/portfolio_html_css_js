// // ============ PAGE LOADING FUNCTION ============
// function loadPage(page) {
//     const contentArea = document.getElementById("contentArea");

//     // 1. Home Page handling (No Fetch needed)
//     if (page === 'home') {
//         const homeTemplate = document.getElementById("homeContent");
//         if (homeTemplate) {
//             contentArea.innerHTML = homeTemplate.innerHTML;
//         } else {
//             contentArea.innerHTML = "<h2>Welcome Home!</h2>"; // Fallback
//         }
//         updateActiveNav('home');
//         initializePageScripts('home');
//         window.scrollTo({ top: 0, behavior: "smooth" });
//         return; // Exit function
//     }

//     // 2. Other Pages (Fetch from /pages folder)
//     contentArea.innerHTML = `
//         <div class="text-center py-5">
//             <div class="spinner-border text-primary" role="status">
//                 <span class="visually-hidden">Loading...</span>
//             </div>
//             <p class="mt-3">Loading ${page.charAt(0).toUpperCase() + page.slice(1)}...</p>
//         </div>
//     `;

//     fetch(`./pages/${page}.html`)
//         .then((response) => {
//             if (!response.ok) throw new Error("Page not found");
//             return response.text();
//         })
//         .then((data) => {
//             contentArea.innerHTML = data;
//             initializePageScripts(page);
//             updateActiveNav(page);
//             window.scrollTo({ top: 0, behavior: "smooth" });
//         })
//         .catch((error) => {
//             console.error("Error loading page:", error);
//             contentArea.innerHTML = `
//                 <div class="alert alert-danger text-center mt-5">
//                     <h4>Error Loading Page</h4>
//                     <p>Could not load the "${page}" page.</p>
//                     <button onclick="loadPage('home')" class="btn btn-primary">Return to Home</button>
//                 </div>
//             `;
//         });
// }

// // ============ UPDATE ACTIVE NAV LINK ============
// function updateActiveNav(page) {
//     document.querySelectorAll(".nav-link").forEach((link) => {
//         link.classList.remove("active");
//         if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(`'${page}'`)) {
//             link.classList.add("active");
//         }
//     });
// }

// // ============ INITIALIZE PAGE-SPECIFIC SCRIPTS ============
// function initializePageScripts(page) {
//     console.log(`${page} page loaded`);
//     if (page === "contact") initializeContactForm();
//     if (page === "cv") initializeCVDownload();
// }

// // ============ CONTACT FORM HANDLER ============
// function initializeContactForm() {
//     const contactForm = document.getElementById("contactForm");
//     if (contactForm) {
//         contactForm.addEventListener("submit", function (e) {
//             e.preventDefault();
            
//             const submitBtn = contactForm.querySelector('button[type="submit"]');
//             const originalText = submitBtn.innerHTML;
            
//             submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Sending...';
//             submitBtn.disabled = true;

//             setTimeout(() => {
//                 showNotification("Message sent successfully!", "success");
//                 contactForm.reset();
//                 submitBtn.innerHTML = originalText;
//                 submitBtn.disabled = false;
//             }, 1500);
//         });
//     }
// }

// // ============ CV DOWNLOAD ============
// function initializeCVDownload() {
//     const downloadBtn = document.getElementById("downloadCV");
//     if (downloadBtn) {
//         downloadBtn.onclick = () => alert("CV download started!");
//     }
// }

// // ============ MOBILE SIDEBAR TOGGLE ============
// function toggleSidebar() {
//     const sidebar = document.querySelector(".sidebar");
//     if (sidebar) sidebar.classList.toggle("active");
// }

// // ============ INITIALIZE ON PAGE LOAD ============
// document.addEventListener("DOMContentLoaded", function () {
//     // 1. Initial Load (Home)
//     loadPage('home');

//     // 2. Mobile menu toggle button creation
//     const navbar = document.querySelector(".navbar .container-fluid");
//     if (navbar) {
//         const toggleBtn = document.createElement("button");
//         toggleBtn.innerHTML = "☰";
//         toggleBtn.className = "btn btn-light d-lg-none me-3";
//         toggleBtn.onclick = (e) => {
//             e.stopPropagation();
//             toggleSidebar();
//         };
//         navbar.insertBefore(toggleBtn, navbar.firstChild);
//     }

//     // 3. Close sidebar when clicking outside
//     document.addEventListener("click", function (event) {
//         const sidebar = document.querySelector(".sidebar");
//         if (window.innerWidth <= 992 && sidebar && sidebar.classList.contains("active")) {
//             if (!sidebar.contains(event.target)) {
//                 sidebar.classList.remove("active");
//             }
//         }
//     });

//     console.log("Portfolio website initialized");
// });

// // ============ NOTIFICATION SYSTEM ============
// function showNotification(message, type = "success") {
//     const existing = document.querySelector(".notification");
//     if (existing) existing.remove();

//     const notification = document.createElement("div");
//     notification.className = `notification notification-${type}`;
//     notification.innerHTML = `
//         <div style="display: flex; align-items: center; gap: 10px;">
//             <span>${type === "success" ? "✓" : "⚠"}</span>
//             <span>${message}</span>
//         </div>
//         <button onclick="this.parentElement.remove()" style="background:none; border:none; cursor:pointer;">×</button>
//     `;

//     // Basic dynamic styles
//     Object.assign(notification.style, {
//         position: 'fixed', top: '20px', right: '20px',
//         padding: '15px 20px', borderRadius: '8px', zIndex: '10000',
//         background: type === 'success' ? '#d4edda' : '#f8d7da',
//         color: type === 'success' ? '#155724' : '#721c24',
//         boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//         display: 'flex', gap: '20px', alignItems: 'center'
//     });

//     document.body.appendChild(notification);
//     setTimeout(() => notification.remove(), 5000);
// }


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

  // Load page content - FIXED PATH BELOW
  fetch(`./pages/${page}.html`) 
    .then((response) => {
      if (!response.ok) {
        throw new Error("Page not found");
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById("contentArea").innerHTML = data;
      initializePageScripts(page);
      updateActiveNav(page);
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
      alert("Form submitted!");
    });
  }
}

// ============ CV DOWNLOAD ============
function initializeCVDownload() {
  const downloadBtn = document.getElementById("downloadCV");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", function () {
      // Add CV download logic here
      alert("CV download started!");
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

  document.addEventListener("DOMContentLoaded", function () {
    // Initial load: Site open holei home page load hobe
    loadPage('home'); 

    // Navbar toggle behavior... (tomar baki code eikhane thakbe)
});

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

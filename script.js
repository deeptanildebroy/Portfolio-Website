// ==================== Smooth Scrolling ====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// ==================== Change Role ====================

const texts = ["React Developer", "MERN Stack Expert", "Next.js Enthusiast", "Software Engineer"];
let textIndex = 0;
let wordArray = [];
let wordIndex = 0;
let deleting = false;
const dynamicText = document.querySelector(".dynamic-text");
const staticText = ""

function updateText() {
    const currentText = texts[textIndex];
    wordArray = currentText.split(" ");

    if (!deleting) {
        // Typing effect (left to right)
        if (wordIndex < wordArray.length) {
            dynamicText.textContent = staticText + wordArray.slice(0, wordIndex + 1).join(" ");
            wordIndex++;
            setTimeout(updateText, 500);
        } else {
            setTimeout(() => {
                deleting = true;
                updateText();
            }, 1500); // Pause before deleting
        }
    } else {
        // Deleting effect (right to left)
        if (wordIndex > 0) {
            wordIndex--;
            dynamicText.textContent = staticText + wordArray.slice(0, wordIndex).join(" ");
            setTimeout(updateText, 400);
        } else {
            deleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(updateText, 500);
        }
    }
}
updateText(); // Start animation


// ==================== Form Validation for Contact Section ====================
const contactForm = document.querySelector(".contact-info");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector("textarea").value;

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    alert("Thank you for contacting us! We will get back to you soon.");
    contactForm.reset();
  });

  // Email validation function
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}

// ==================== Newsletter Subscription ====================
const newsletterForm = document.querySelector(".newsletter form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = newsletterForm.querySelector('input[type="email"]').value;

    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    alert("Thank you for subscribing to our newsletter!");
    newsletterForm.reset();
  });
}

// ==================== Dynamic Year in Footer ====================
const copyright = document.querySelector(".copyright");
if (copyright) {
  const currentYear = new Date().getFullYear();
  copyright.textContent = `Copyright © ${currentYear}`;
}

// ==================== Highlight Active Navigation Link ====================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// ==================== Back-to-Top Button ====================
const backToTopButton = document.getElementById("back-to-top");
if (backToTopButton) {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ==================== Lightbox for Project Images ====================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

if (lightbox && lightboxImg && closeBtn) {
  document.querySelectorAll(".projects-area img").forEach((image) => {
    image.addEventListener("click", () => {
      lightbox.style.display = "block";
      lightboxImg.src = image.src;
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) {
      lightbox.style.display = "none";
    }
  });
}

// ==================== Dark Mode Toggle ====================
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    if (body.classList.contains("light-mode")) {
      themeToggle.textContent = "🌙";
      localStorage.setItem("theme", "dark");
    } else {
      themeToggle.textContent = "☀️";
      localStorage.setItem("theme", "light");
    }
  });

  // Check for saved theme in localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("light-mode");
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }
}

// ==================== Animate Elements on Scroll ====================
const fadeElements = document.querySelectorAll(".fade-in");

const checkVisibility = () => {
  fadeElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    if (elementTop < window.innerHeight && elementBottom > 0) {
      element.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", checkVisibility);
window.addEventListener("load", checkVisibility);

// ==================== Dynamic Skill Progress Bars ====================
const progressBars = document.querySelectorAll(".progress");

progressBars.forEach((bar) => {
  const progress = bar.getAttribute("data-progress");
  bar.style.width = `${progress}%`;
});

// ==================== Project Filtering ====================
const filterButtons = document.querySelectorAll(".filter-buttons button");
const projects = document.querySelectorAll(".content-area li");

if (filterButtons.length > 0 && projects.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      projects.forEach((project) => {
        if (
          filter === "all" ||
          project.getAttribute("data-category") === filter
        ) {
          project.style.display = "block";
        } else {
          project.style.display = "none";
        }
      });

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
}

// ==================== Testimonials Slider ====================
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

if (slides.length > 0 && prevButton && nextButton) {
  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  };

  prevButton.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  nextButton.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  showSlide(currentSlide);
}

// ==================== Typewriter Effect ====================
const typewriterText = "Deeptanil Debroy";
const typewriterElement = document.getElementById("typewriter");

if (typewriterElement) {
  let index = 0;

  const type = () => {
    if (index < typewriterText.length) {
      typewriterElement.textContent += typewriterText.charAt(index);
      index++;
      setTimeout(type, 100);
    }
  };

  type();
}

// ==================== Loading Screen ====================
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    loadingScreen.style.display = "none";
  }
});

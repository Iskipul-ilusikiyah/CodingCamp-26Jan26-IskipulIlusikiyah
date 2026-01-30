// Global variable to store user's name
let currentUserName = "Guest";

// Welcome Modal Handler
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("welcomeModal");
  const nameInput = document.getElementById("userNameInput");
  const okBtn = document.getElementById("modalOkBtn");
  const welcomeText = document.getElementById("welcome-text");

  // Show modal on page load
  modal.style.display = "flex";

  // Handle OK button click
  okBtn.addEventListener("click", function () {
    const userName = nameInput.value.trim();

    if (userName === "") {
      alert("Silakan masukkan nama Anda!");
      return;
    }

    // Store the name
    currentUserName = userName;

    // Update welcome text
    if (welcomeText) {
      welcomeText.textContent = `Hi ${userName}, Welcome To TechTrek`;
    }

    // Auto-fill name in Message Us form
    const messageFormName = document.getElementById("name");
    if (messageFormName) {
      messageFormName.value = userName;
    }

    // Hide modal
    modal.style.display = "none";
  });

  // Allow Enter key to submit
  nameInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      okBtn.click();
    }
  });

  // Focus on input field
  nameInput.focus();

  // Update current time
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Update active state
        navLinks.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });

  // Form validation and submission
  const messageForm = document.getElementById("messageForm");
  if (messageForm) {
    messageForm.addEventListener("submit", handleFormSubmit);
  }
});

// Update current time display
function updateCurrentTime() {
  const currentTimeElement = document.getElementById("currentTime");
  if (currentTimeElement) {
    const now = new Date();

    // Format: Day, Month Date, Year, HH:MM:SS GMT+XXXX
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    // Get timezone offset
    const offset = -now.getTimezoneOffset();
    const offsetHours = String(Math.floor(Math.abs(offset) / 60)).padStart(
      2,
      "0",
    );
    const offsetMinutes = String(Math.abs(offset) % 60).padStart(2, "0");
    const offsetSign = offset >= 0 ? "+" : "-";
    const timezone = `GMT${offsetSign}${offsetHours}${offsetMinutes}`;

    const timeString = `${dayName}, ${monthName} ${date}, ${year}, ${hours}:${minutes}:${seconds} ${timezone}`;
    currentTimeElement.textContent = timeString;
  }
}

// Form validation functions
function validateName(name) {
  if (name.trim() === "") {
    return "Name is required";
  }
  if (name.trim().length < 2) {
    return "Name must be at least 2 characters long";
  }
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return "Name can only contain letters and spaces";
  }
  return "";
}

function validateBirthdate(birthdate) {
  if (birthdate === "") {
    return "Birthdate is required";
  }

  const selectedDate = new Date(birthdate);
  const today = new Date();

  // Set time to start of day for accurate comparison
  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  if (selectedDate > today) {
    return "Birthdate cannot be in the future";
  }

  return "";
}

function validateGender() {
  const genderRadios = document.querySelectorAll('input[name="gender"]');
  let isSelected = false;

  genderRadios.forEach((radio) => {
    if (radio.checked) {
      isSelected = true;
    }
  });

  if (!isSelected) {
    return "Please select a gender";
  }

  return "";
}

function validateMessage(message) {
  if (message.trim() === "") {
    return "Message is required";
  }
  if (message.trim().length < 10) return "";
}

// Display error message
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
  }
}

// Clear all error messages
function clearErrors() {
  const errorElements = document.querySelectorAll(".error-message");
  errorElements.forEach((element) => {
    element.textContent = "";
  });
}

// Format date to DD/MM/YYYY
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Handle form submission
function handleFormSubmit(e) {
  e.preventDefault();

  // Clear previous errors
  clearErrors();

  // Get form values
  const name = document.getElementById("name").value;
  const birthdate = document.getElementById("birthdate").value;
  const message = document.getElementById("message").value;

  // Get selected gender
  let gender = "";
  const genderRadios = document.querySelectorAll('input[name="gender"]');
  genderRadios.forEach((radio) => {
    if (radio.checked) {
      gender = radio.value;
    }
  });

  // Validate all fields
  let hasError = false;

  const nameError = validateName(name);
  if (nameError) {
    showError("nameError", nameError);
    hasError = true;
  }

  const birthdateError = validateBirthdate(birthdate);
  if (birthdateError) {
    showError("birthdateError", birthdateError);
    hasError = true;
  }

  const genderError = validateGender();
  if (genderError) {
    showError("genderError", genderError);
    hasError = true;
  }

  const messageError = validateMessage(message);
  if (messageError) {
    showError("messageError", messageError);
    hasError = true;
  }

  // If no errors, display the sent data
  if (!hasError) {
    // Update output section
    document.getElementById("outputName").textContent = name;
    document.getElementById("outputBirthdate").textContent =
      formatDate(birthdate);
    document.getElementById("outputGender").textContent = gender;
    document.getElementById("outputMessage").textContent = message;

    // Show success message
    alert("Message sent successfully!");
  }
}

// Real-time validation on input change (optional enhancement)
document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("name");
  const birthdateInput = document.getElementById("birthdate");
  const messageInput = document.getElementById("message");
  const genderRadios = document.querySelectorAll('input[name="gender"]');

  if (nameInput) {
    nameInput.addEventListener("blur", function () {
      const error = validateName(this.value);
      showError("nameError", error);
    });
  }

  if (birthdateInput) {
    birthdateInput.addEventListener("blur", function () {
      const error = validateBirthdate(this.value);
      showError("birthdateError", error);
    });
  }

  if (messageInput) {
    messageInput.addEventListener("blur", function () {
      const error = validateMessage(this.value);
      showError("messageError", error);
    });
  }

  genderRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      const error = validateGender();
      showError("genderError", error);
    });
  });
});

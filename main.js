/**
 * Portfolio — Main Script
 * Navigation, smooth scroll, form handling, scroll-based effects
 */
(function ($) {
  "use strict";

  const DOM = {
    nav: $("#nav"),
    navToggle: $("#nav-toggle"),
    navMenu: $("#nav-menu"),
    navLinks: $(".nav__link"),
    contactForm: $("#contact-form"),
  };

  function init() {
    bindEvents();
    handleScroll();
  }

  function bindEvents() {
    // Mobile nav toggle
    DOM.navToggle.on("click", toggleMobileMenu);

    // Close mobile menu on link click
    DOM.navLinks.on("click", function () {
      DOM.navMenu.removeClass("nav__menu--open");
    });

    // Nav scroll effect
    $(window).on("scroll", handleScroll);

    // Contact form
    DOM.contactForm.on("submit", handleContactSubmit);
  }

  /**
   * Toggle mobile navigation menu
   */
  function toggleMobileMenu() {
    DOM.navMenu.toggleClass("nav__menu--open");
  }

  /**
   * Add shadow to nav on scroll
   */
  function handleScroll() {
    if ($(window).scrollTop() > 20) {
      DOM.nav.addClass("nav--scrolled");
    } else {
      DOM.nav.removeClass("nav--scrolled");
    }
  }

  /**
   * Handle contact form submission
   * @param {Event} e
   */
  function handleContactSubmit(e) {
    e.preventDefault();

    var name = $("#contact-name").val().trim();
    var email = $("#contact-email").val().trim();
    var message = $("#contact-message").val().trim();

    if (!name || !email || !message) {
      showToast("Por favor, completa todos los campos.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showToast("Por favor, ingresa un email valido.", "error");
      return;
    }

    // Simulate form submission
    showToast("Mensaje enviado. Te contactare pronto.", "success");
    DOM.contactForm[0].reset();
  }

  /**
   * Validate email format
   * @param {string} email
   * @returns {boolean}
   */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /**
   * Show a toast notification
   * @param {string} message
   * @param {string} type - 'success' or 'error'
   */
  function showToast(message, type) {
    $(".toast").remove();

    var toast = $(
      '<div class="toast toast--' + type + '">' + message + "</div>"
    );

    $("body").append(toast);

    // Trigger reflow for CSS transition
    toast[0].offsetHeight;
    toast.addClass("toast--visible");

    setTimeout(function () {
      toast.removeClass("toast--visible");
      setTimeout(function () {
        toast.remove();
      }, 300);
    }, 3000);
  }

  $(document).ready(init);
})(jQuery);

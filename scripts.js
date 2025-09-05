document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');

  // ===== Mobile nav =====
  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('nav-active');
      burger.classList.toggle('toggle');
    });
  }

  // ===== Scroll active link =====
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 60) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // ===== Modal helpers =====
  const modalRoot = document.getElementById('modal');

  // Show selected project details inside modal
  const openModal = (projectId) => {
    if (!modalRoot) return;

    // Hide any previously open project blocks
    document.querySelectorAll('.modal-project').forEach(p => (p.style.display = 'none'));

    // Show modal + the requested project block
    const target = document.getElementById(`modal-${projectId}`);
    if (target) {
      modalRoot.style.display = 'flex';
      target.style.display = 'block';

      // Optional: focus the close button if present
      const closeBtn = modalRoot.querySelector('.close-button');
      if (closeBtn) closeBtn.focus();
    }
  };

  // Hide modal + reset inner blocks
  const closeModal = () => {
    if (!modalRoot) return;
    modalRoot.style.display = 'none';
    document.querySelectorAll('.modal-project').forEach(p => (p.style.display = 'none'));
  };

  // Close on overlay click (but not when clicking inside the content)
  if (modalRoot) {
    modalRoot.addEventListener('click', (e) => {
      if (e.target === modalRoot) closeModal();
    });
  }

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalRoot && modalRoot.style.display === 'flex') {
      closeModal();
    }
  });

  // Expose to inline onclick handlers in your HTML cards & close button
  window.openModal = openModal;
  window.closeModal = closeModal;

  // ===== EmailJS wiring =====
  const EMAILJS_PUBLIC_KEY = "mBEMkxKVbHuiVWwi0"; // your public key
  const EMAILJS_SERVICE_ID = "service_j0bpkam";    // your Service ID
  const EMAILJS_TEMPLATE_ID = "contact_form";      // your Template ID

  if (window.emailjs && typeof emailjs.init === 'function') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const name = this.querySelector('input[name="from_name"]')?.value?.trim();
      const email = this.querySelector('input[name="reply_to"]')?.value?.trim();
      const msg = this.querySelector('textarea[name="message"]')?.value?.trim();

      if (!name || !email || !msg) {
        alert('Please complete all fields.');
        return;
      }

      emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
        .then(() => {
          alert('Your message has been sent successfully!');
          this.reset();
        })
        .catch((error) => {
          console.error('Failed to send email:', error);
          alert('Failed to send your message. Please try again later.');
        });
    });
  }
});

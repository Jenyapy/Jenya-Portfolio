document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');

  // Mobile nav
  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('nav-active');
      burger.classList.toggle('toggle');
    });
  }

  // Scroll active link
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

  // Modal helpers
  const openModal = (projectId) => {
    const modal = document.getElementById('modal');
    if (!modal) return;
    modal.style.display = 'flex';
    const target = document.getElementById(`modal-${projectId}`);
    if (target) target.style.display = 'block';
  };

  const closeModal = () => {
    const modal = document.getElementById('modal');
    if (!modal) return;
    modal.style.display = 'none';
    document.querySelectorAll('.modal-project').forEach(p => p.style.display = 'none');
  };

  window.openModal = openModal;
  window.closeModal = closeModal;

  // ===== EmailJS wiring =====
  // IMPORTANT: replace with your own EmailJS IDs if different
  const EMAILJS_PUBLIC_KEY = "mBEMkxKVbHuiVWwi0";     // your public key
  const EMAILJS_SERVICE_ID = "service_j0bpkam";        // your Service ID
  const EMAILJS_TEMPLATE_ID = "contact_form";          // your Template ID

  // Initialize EmailJS (only once)
  if (window.emailjs && typeof emailjs.init === 'function') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  // Contact form handling
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Optional basic guard
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

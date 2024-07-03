document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
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

    const openModal = (projectId) => {
        document.getElementById('modal').style.display = 'flex';
        document.getElementById(`modal-${projectId}`).style.display = 'block';
    };

    const closeModal = () => {
        document.getElementById('modal').style.display = 'none';
        const modalProjects = document.querySelectorAll('.modal-project');
        modalProjects.forEach(project => {
            project.style.display = 'none';
        });
    };

    window.openModal = openModal;
    window.closeModal = closeModal;
    //Contact form handling
     document.querySelector('#contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        emailjs.sendForm('service_j0bpkam', 'contact_form', this)
            .then(() => {
                alert('Your message has been sent successfully!');
                document.querySelector('#contact-form').reset(); // Clear the form after submission
            }, (error) => {
                alert('Failed to send your message. Please try again later.');
                console.error('Failed to send email:', error);
            });
    });
});

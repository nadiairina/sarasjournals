document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Basic validation
            if (name === '' || email === '' || message === '') {
                formStatus.style.color = 'red';
                formStatus.textContent = 'Por favor, preencha todos os campos.';
                return;
            }

            // Simple email validation (more robust validation would be server-side)
            if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
                formStatus.style.color = 'red';
                formStatus.textContent = 'Por favor, insira um email válido.';
                return;
            }

            // Simulate form submission (in a real scenario, you'd send this to a backend)
            formStatus.style.color = 'blue';
            formStatus.textContent = 'A enviar mensagem...';

            setTimeout(() => {
                // Here you would typically send the data to a server using fetch() or XMLHttpRequest
                // For demonstration purposes, we'll just show a success message.
                console.log('Formulário submetido:');
                console.log('Nome:', name);
                console.log('Email:', email);
                console.log('Mensagem:', message);

                formStatus.style.color = 'green';
                formStatus.textContent = 'Mensagem enviada com sucesso! Em breve entrarei em contacto.';
                contactForm.reset(); // Clear the form
            }, 2000); // Simulate a 2-second delay for sending
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - document.querySelector('header').offsetHeight, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
});

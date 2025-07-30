document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Previne o envio padrão do formulário

            // Obter os valores dos campos
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validação básica
            if (name === '' || email === '' || message === '') {
                formStatus.style.color = 'red';
                formStatus.textContent = 'Por favor, preencha todos os campos obrigatórios.';
                return;
            }

            // Validação simples de email
            if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
                formStatus.style.color = 'red';
                formStatus.textContent = 'Por favor, insira um endereço de email válido.';
                return;
            }

            // Simular envio do formulário (em um cenário real, você enviaria para um servidor)
            formStatus.style.color = 'blue';
            formStatus.textContent = 'A sua mensagem está a ser enviada...';

            setTimeout(() => {
                // Aqui entraria a lógica para enviar os dados para um backend (por exemplo, via fetch API)
                // Para esta demonstração, apenas mostramos uma mensagem de sucesso.
                console.log('Dados do formulário submetidos:');
                console.log('Nome:', name);
                console.log('Email:', email);
                console.log('Mensagem:', message);

                formStatus.style.color = 'green';
                formStatus.textContent = 'Mensagem enviada com sucesso! Entraremos em contacto brevemente.';
                contactForm.reset(); // Limpa o formulário após o envio
            }, 2000); // Simula um atraso de 2 segundos para o "envio"
        });
    }

    // Scroll suave para links de navegação
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Ajusta o scroll para compensar o header fixo
                const headerOffset = document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerOffset,
                    behavior: 'smooth'
                });
            }
        });
    });
});

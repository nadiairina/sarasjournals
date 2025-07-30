document.addEventListener('DOMContentLoaded', () => {
    // Scroll Suave para as seções
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Lógica para o formulário de contacto (exemplo básico)
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Impede o envio padrão do formulário

            formStatus.textContent = 'A enviar mensagem...';
            formStatus.style.color = '#333'; // Cor neutra enquanto envia

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Validação básica (pode ser mais robusta)
            if (!name || !email || !message) {
                formStatus.textContent = 'Por favor, preencha todos os campos.';
                formStatus.style.color = 'red';
                return;
            }

            if (!validateEmail(email)) {
                formStatus.textContent = 'Por favor, insira um email válido.';
                formStatus.style.color = 'red';
                return;
            }

            // Simulação de envio (em um ambiente real, você enviaria para um backend)
            try {
                // Simulação de sucesso para demonstração:
                await new Promise(resolve => setTimeout(resolve, 1500)); // Espera 1.5 segundos
                formStatus.textContent = 'Mensagem enviada com sucesso! Brevemente entraremos em contacto.';
                formStatus.style.color = 'green';
                contactForm.reset(); // Limpa o formulário

            } catch (error) {
                console.error('Erro ao enviar o formulário:', error);
                formStatus.textContent = 'Erro ao enviar mensagem. Por favor, tente novamente mais tarde.';
                formStatus.style.color = 'red';
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});

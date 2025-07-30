document.addEventListener('DOMContentLoaded', () => {
    // Scroll Suave para as seções
    // Seleciona APENAS os links dentro da 'nav' cujo 'href' começa com '#'
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Impede o comportamento padrão de "saltar" para a seção

            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
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
                // Aqui você enviaria os dados para um serviço como Formspree, Netlify Forms, ou um backend customizado
                // Exemplo com Fetch API (requer um endpoint no servidor):
                /*
                const response = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, message }),
                });

                if (response.ok) {
                    formStatus.textContent = 'Mensagem enviada com sucesso! Brevemente entraremos em contacto.';
                    formStatus.style.color = 'green';
                    contactForm.reset(); // Limpa o formulário
                } else {
                    formStatus.textContent = 'Erro ao enviar mensagem. Por favor, tente novamente mais tarde.';
                    formStatus.style.color = 'red';
                }
                */

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

    // O código do Intersection Observer customizado foi removido daqui
    // A animação já é tratada pela biblioteca AOS no index.html
});
// Adicione este bloco no final de script.js, por exemplo.
// Se já estiver dentro de DOMContentLoaded, pode ser imediatamente antes do seu AOS.init().
$(document).ready(function() {
    // Inicializa Fresco em todos os links que têm o atributo data-fresco-group
    $('a[data-fresco-group]').fresco(); 
});

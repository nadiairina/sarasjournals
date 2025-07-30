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

    // Animações suaves ao fazer scroll (opcional, requer Intersection Observer API)
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            } else {
                // Opcional: remover a classe para reanimar ao voltar
                // entry.target.classList.remove('fade-in');
            }
        });
    }, {
        threshold: 0.2, // Quando 20% da seção estiver visível
        rootMargin: '0px 0px -100px 0px' // Começa a observar um pouco antes de 100px do fim da viewport
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Adicione esta classe ao seu CSS para a animação
    /*
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .fade-in.fade-in { /* Duplicado para maior especificidade */
        /* opacity: 1;
        transform: translateY(0);
    }
    */
});

document.addEventListener('DOMContentLoaded', () => {
    // Lógica para as seções aparecerem ao rolar (se não estiver usando AOS)
    const sections = document.querySelectorAll('.section');

    const checkVisibility = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;
            if (sectionTop < screenHeight * 0.75) { // Ativa quando 75% da seção está visível
                section.classList.add('active');
            } else {
                // Opcional: remover a classe 'active' se a seção sair da tela
                // section.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Checa na carga inicial


    // Lógica para as galerias de produtos
    document.querySelectorAll('.gallery').forEach(gallery => {
        const imagesContainer = gallery.querySelector('.gallery-images');
        const images = imagesContainer.querySelectorAll('img');
        const prevBtn = gallery.querySelector('.prev-btn');
        const nextBtn = gallery.querySelector('.next-btn');
        let currentIndex = 0;

        function showImage(index) {
            images.forEach((img, i) => {
                img.style.display = (i === index) ? 'block' : 'none';
            });
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        }

        // Exibe a primeira imagem ao carregar
        showImage(currentIndex);

        // Adiciona event listeners aos botões
        nextBtn.addEventListener('click', nextImage);
        prevBtn.addEventListener('click', prevImage);

        // Opcional: Adicionar funcionalidade de lightbox ao clicar na imagem
        images.forEach(img => {
            img.addEventListener('click', () => {
                const lightbox = document.getElementById('lightbox');
                const lightboxImg = document.getElementById('lightbox-img');
                lightbox.style.display = 'block';
                lightboxImg.src = img.src;
            });
        });
    });

    // Lógica para o botão de fechar do lightbox
    document.querySelector('.lightbox .close-btn').addEventListener('click', () => {
        document.getElementById('lightbox').style.display = 'none';
    });

    // Lógica para fechar o lightbox clicando fora da imagem
    document.getElementById('lightbox').addEventListener('click', (event) => {
        if (event.target.id === 'lightbox') {
            event.target.style.display = 'none';
        }
    });

    // Lógica para os botões prev/next do lightbox (se você ainda quiser isso)
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    let currentLightboxImageIndex = 0;
    let currentGalleryImages = []; // Para armazenar as imagens da galeria ativa no lightbox

    // Função para atualizar as imagens do lightbox baseadas na galeria clicada
    function updateLightboxImages(clickedImageSrc) {
        // Encontra a galeria da imagem clicada
        let parentGallery = null;
        document.querySelectorAll('.gallery').forEach(gallery => {
            gallery.querySelectorAll('.gallery-images img').forEach((img, index) => {
                if (img.src.includes(clickedImageSrc.substring(clickedImageSrc.lastIndexOf('/') + 1))) {
                    parentGallery = gallery;
                    currentLightboxImageIndex = index;
                }
            });
        });

        if (parentGallery) {
            currentGalleryImages = Array.from(parentGallery.querySelectorAll('.gallery-images img'));
            document.getElementById('lightbox-img').src = currentGalleryImages[currentLightboxImageIndex].src;
        }
    }

    document.querySelectorAll('.gallery-images img').forEach(img => {
        img.addEventListener('click', (event) => {
            updateLightboxImages(event.target.src);
            document.getElementById('lightbox').style.display = 'block';
        });
    });

    lightboxPrev.addEventListener('click', () => {
        if (currentGalleryImages.length > 0) {
            currentLightboxImageIndex = (currentLightboxImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
            document.getElementById('lightbox-img').src = currentGalleryImages[currentLightboxImageIndex].src;
        }
    });

    lightboxNext.addEventListener('click', () => {
        if (currentGalleryImages.length > 0) {
            currentLightboxImageIndex = (currentLightboxImageIndex + 1) % currentGalleryImages.length;
            document.getElementById('lightbox-img').src = currentGalleryImages[currentLightboxImageIndex].src;
        }
    });

    // Lógica para o formulário de contato (mantida do código anterior)
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            // Aqui você pode adicionar lógica para enviar os dados do formulário
            // Por exemplo, usando Fetch API para um endpoint de backend, ou simplesmente exibir uma mensagem.

            formMessage.textContent = 'Mensagem enviada com sucesso! Em breve entrarei em contacto.';
            formMessage.style.display = 'block';
            formMessage.style.color = 'green';
            contactForm.reset(); // Limpa o formulário

            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000); // Esconde a mensagem após 5 segundos
        });
    }
});

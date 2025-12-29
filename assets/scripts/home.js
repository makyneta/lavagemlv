/* ==========================================================================
   LAVAGEM LV - JAVASCRIPT COMPLETO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SELETORES PRINCIPAIS ---
    const header = document.querySelector('#header');
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const cards = document.querySelectorAll('.card');

    // --- 2. MENU MOBILE (ABRIR / FECHAR) ---
    if (mobileMenuIcon && navMenu) {
        mobileMenuIcon.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = navMenu.classList.toggle('active');
            
            // Troca o ícone (Barras para X)
            const icon = mobileMenuIcon.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', !isOpen);
                icon.classList.toggle('fa-times', isOpen);
            }

            // Bloqueia o scroll do body quando o menu está aberto
            document.body.style.overflow = isOpen ? 'hidden' : 'initial';
        });
    }

    // --- 3. FECHAR MENU AO CLICAR NOS LINKS ---
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.style.overflow = 'initial';
            
            const icon = mobileMenuIcon.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });

    // --- 4. EFEITO DE HEADER AO SCROLL ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 5. ANIMAÇÃO DE REVELAÇÃO (INTERSECTION OBSERVER) ---
    const revealOption = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, revealOption);

    cards.forEach(card => {
        // Estilos iniciais via JS para garantir que não ficam invisíveis se o JS falhar
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "all 0.6s ease-out";
        revealOnScroll.observe(card);
    });

});
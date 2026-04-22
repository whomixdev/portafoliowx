/*
==============================================================================================
  </> ELITE DIGITAL SOLUTIONS
  Developer: WHOMIX (PROJECT WX)
  Contact: whomy.xhitf@gmail.com
==============================================================================================
*/

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. CURSOR - DISEÑADO POR WHOMIX & JUAN LLONTOP
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    if(window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`; cursorDot.style.top = `${e.clientY}px`;
            cursorOutline.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 100, fill: "forwards" });
        });
        document.querySelectorAll('a, button, .hover-lift, .project-card, .social-item').forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovering'));
        });
    }

    // 2. LOADER SUAVE - DISEÑADO POR WHOMIX
    const loader = document.getElementById('loader');
    setTimeout(() => { 
        loader.style.opacity = '0'; 
        setTimeout(() => loader.style.display = 'none', 800); 
    }, 1500);

    // 3. PARTICULAS - DISEÑADO POR WHOMIX
    if (window.particlesJS) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 25 },
                "color": { "value": ["#00f0ff", "#8a2be2"] },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.15, "random": true },
                "size": { "value": 2, "random": true },
                "line_linked": { "enable": true, "distance": 200, "color": "#ffffff", "opacity": 0.03, "width": 1 },
                "move": { "enable": true, "speed": 0.6, "direction": "none", "random": true, "out_mode": "out" }
            },
            "interactivity": { "events": { "onhover": { "enable": true, "mode": "bubble" } }, "modes": { "bubble": { "size": 4, "distance": 200, "opacity": 0.4 } } }
        });
    }

    // 4. RESPONSIVE
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 50); });
    mobileMenu.addEventListener('click', () => { navLinks.classList.toggle('active'); });
    navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('active')));

    // 5. TEXT HERO
    const words = ["modernas", "rápidas", "escalables", "rentables"];
    let i = 0, j = 0, isDeleting = false;
    const typeTarget = document.querySelector(".typing-text");
    function type() {
        const currentWord = words[i];
        if (isDeleting) {
            typeTarget.textContent = currentWord.substring(0, j - 1); j--;
        } else {
            typeTarget.textContent = currentWord.substring(0, j + 1); j++;
        }
        if (!isDeleting && j === currentWord.length) { isDeleting = true; setTimeout(type, 2500); return; }
        if (isDeleting && j === 0) { isDeleting = false; i = (i + 1) % words.length; }
        setTimeout(type, isDeleting ? 40 : 120);
    }
    type();

    // 6. ANIMACIONES BLUR ETC - DISEÑADO POR WHOMIX
    const animElements = document.querySelectorAll('.scroll-anim');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Solo animar una vez para no cansar la vista
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    animElements.forEach(el => observer.observe(el));

    // 7. METRICAS
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = +target.getAttribute('data-target');
                let startValue = 0;
                const duration = 2000; 
                const increment = endValue / (duration / 16);
                const updateCounter = () => {
                    startValue += increment;
                    if (startValue < endValue) { target.innerText = Math.ceil(startValue); requestAnimationFrame(updateCounter); } 
                    else { target.innerText = endValue; }
                };
                updateCounter();
                obs.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    // MODAL - DISEÑADO POR WHOMIX
    const proyectos = [
        { id: 1, cat: 'saas', tit: 'Sistema ERP Empresarial', desc: 'Gestión interna y automatización de procesos.', tec: 'React, Node.js, PostgreSQL', prob: 'La empresa perdía horas en registros manuales y hojas de cálculo desorganizadas.', sol: 'Desarrollo de un panel administrativo robusto con visualización de datos en tiempo real.', res: 'Reducción del 60% en tiempos operativos y control total del inventario.', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
        { id: 2, cat: 'ecommerce', tit: 'TechStore E-Commerce', desc: 'Tienda digital de alta conversión.', tec: 'Next.js, Tailwind, Stripe API', prob: 'Tasa de abandono de carrito alta debido a tiempos de carga lentos.', sol: 'Arquitectura Headless E-commerce con checkout en 2 pasos y modo oscuro.', res: 'Incremento del 35% en ventas el primer mes tras el lanzamiento.', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80' },
        { id: 3, cat: 'saas', tit: 'Analytics Dashboard', desc: 'Visualización de datos financieros.', tec: 'Vue.js, D3.js, AWS', prob: 'Datos complejos difíciles de interpretar para la junta directiva.', sol: 'Interfaz analítica limpia, con reportes exportables y gráficos dinámicos.', res: 'Mejora en la toma de decisiones basada en datos verificables al instante.', img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80' }
    ];

    const projContainer = document.getElementById('projects-container');
    const modal = document.getElementById('project-modal');
    const modalDetails = document.getElementById('modal-details');

    const renderProjects = (filterCat) => {
        projContainer.innerHTML = '';
        const filtered = filterCat === 'all' ? proyectos : proyectos.filter(p => p.cat === filterCat);
        filtered.forEach((p, index) => {
            projContainer.innerHTML += `
                <div class="project-card scroll-anim visible" style="transition-delay: ${index * 0.1}s">
                    <img src="${p.img}" alt="${p.tit}" class="project-img">
                    <div class="project-overlay">
                        <h3>${p.tit}</h3>
                        <p>${p.desc}</p>
                        <button class="btn btn-primary open-modal" data-id="${p.id}">Ver Caso de Estudio <i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
            `;
        });
        bindModalEvents();
    };
    renderProjects('all');

    // FILTROS JAVA SCRIPT - DISEÑADO POR WHOMIX
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderProjects(e.target.getAttribute('data-filter'));
        });
    });

    // MODAL ANIMADO - DISEÑADO POR WHOMIX
    function bindModalEvents() {
        document.querySelectorAll('.open-modal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const p = proyectos.find(item => item.id === parseInt(e.currentTarget.getAttribute('data-id')));
                modalDetails.innerHTML = `
                    <h2 style="font-size:2.2rem; margin-bottom:15px; font-family:'Space Grotesk'">${p.tit}</h2>
                    <span class="modal-tags"><i class="fa-solid fa-code"></i> Stack: ${p.tec}</span>
                    
                    <div style="margin-bottom:25px;">
                        <strong style="color:var(--accent-cyan); display:block; font-size:1.1rem; margin-bottom:8px;">El Problema:</strong>
                        <p style="color:var(--text-secondary); line-height:1.7;">${p.prob}</p>
                    </div>
                    <div style="margin-bottom:25px;">
                        <strong style="color:var(--accent-violet); display:block; font-size:1.1rem; margin-bottom:8px;">La Solución:</strong>
                        <p style="color:var(--text-secondary); line-height:1.7;">${p.sol}</p>
                    </div>
                    <div style="margin-bottom:30px; padding:20px; background:rgba(0,240,255,0.05); border-left:3px solid var(--accent-cyan); border-radius:8px;">
                        <strong style="color:white; display:block; margin-bottom:5px;">Impacto:</strong>
                        <p style="color:var(--accent-cyan); font-weight:500;">${p.res}</p>
                    </div>
                    
                    <img src="${p.img}" class="modal-img">
                `;
                // ANIMACION CSS ACTIVAR
                modal.classList.add('active'); 
                document.body.style.overflow = 'hidden';
            });
        });
    }

    const closeModalFunc = () => {
        modal.classList.remove('active'); 
        document.body.style.overflow = 'auto';
    };

    document.querySelector('.close-modal').addEventListener('click', closeModalFunc);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModalFunc(); });

    // 9. FORMULARIO - DISEÑADO POR WHOMIX
    const form = document.getElementById('form-contacto');
    const btnEnviar = document.getElementById('btn-enviar');
    const toast = document.getElementById('toast-notification');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        const originalContent = btnEnviar.innerHTML;
        btnEnviar.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Procesando...`;
        btnEnviar.disabled = true;

        try {
            const response = await fetch('https://formspree.io/f/xeevrzlo', {
                method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                btnEnviar.innerHTML = originalContent; btnEnviar.disabled = false; form.reset();
                toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 4000);
            } else throw new Error();
        } catch {
            alert("Error. Verifica tu conexión o tu enlace de Formspree.");
            btnEnviar.innerHTML = originalContent; btnEnviar.disabled = false;
        }
    });

    // 10. NO VISUALIZACION GENERAL
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('keydown', e => {
        if (e.key === 'F12' || e.keyCode === 123 || (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key.toUpperCase())) || (e.ctrlKey && e.key.toUpperCase() === 'U')) e.preventDefault();
    });
});
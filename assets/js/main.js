document.addEventListener('DOMContentLoaded', function() {
    
    // --- Script untuk Navbar (TETAP SAMA) ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) navbar.classList.add('navbar-scrolled');
            else navbar.classList.remove('navbar-scrolled');
        });
    }
    const hamburgerButton = document.getElementById('hamburger-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburgerButton) {
        const openIcon = document.getElementById('hamburger-open');
        const closeIcon = document.getElementById('hamburger-close');
        hamburgerButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            openIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                openIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            });
        });
    }

    // --- Script untuk Active Link Highlighting (TETAP SAMA) ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const sectionObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4 
    };
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('nav-link-active');
                });
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('nav-link-active');
                }
            }
        });
    }, sectionObserverOptions);
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Script untuk Typing Effect (TETAP SAMA) ---
    const typingElement = document.getElementById('typing-effect');
    if (typingElement) {
        const roles = ["Web Developer", "UI/UX Enthusiast"];
        let roleIndex = 0, charIndex = 0;
        function type() { if (charIndex < roles[roleIndex].length) { typingElement.textContent += roles[roleIndex].charAt(charIndex); charIndex++; setTimeout(type, 100); } else { setTimeout(erase, 2000); } }
        function erase() { if (charIndex > 0) { typingElement.textContent = roles[roleIndex].substring(0, charIndex - 1); charIndex--; setTimeout(erase, 50); } else { roleIndex = (roleIndex + 1) % roles.length; setTimeout(type, 500); } }
        type();
    }


    // --- SCRIPT UNTUK MENGISI KONTEN DINAMIS ---

    // 1. Mengisi daftar skill di section "About"
    const aboutTechContainer = document.getElementById('about-tech-icons');
    if (aboutTechContainer && typeof technologiesData !== 'undefined') {
        let techIconsHTML = '';
        // Mengambil data dari technologiesData dan menampilkannya
        for (const slug in technologiesData) {
            const tech = technologiesData[slug];
            techIconsHTML += `
                <div class="tech-icon">
                    <img src="${tech.icon_url}" alt="${tech.name}">
                    <span>${tech.name}</span>
                </div>
            `;
        }
        aboutTechContainer.innerHTML = techIconsHTML;
    }

    // 2. Mengisi daftar proyek di section "Projects"
    const projectContainer = document.getElementById('projects-container');
    if (projectContainer && typeof projectsData !== 'undefined' && typeof technologiesData !== 'undefined') {
        
        // =============================================================
        // BARIS BARU: Balik urutan array proyek agar yang terbaru di atas
        projectsData.reverse();
        // =============================================================

        let projectHTML = '';
        projectsData.forEach(project => {
            
            let techIconsHTML = '';
            project.tech_stack.forEach(techSlug => {
                if (technologiesData[techSlug]) {
                    const tech = technologiesData[techSlug];
                    techIconsHTML += `
                        <div class="tech-icon">
                            <img src="${tech.icon_url}" alt="${tech.name}">
                            <span>${tech.name}</span>
                        </div>
                    `;
                }
            });

            let actionButtonsHTML = `<a href="projects/project-${project.id}.html" class="btn">Lihat Detail & Galeri</a>`;
            if (project.github_link && project.github_link !== '#') {
                actionButtonsHTML += `<a href="${project.github_link}" target="_blank" class="btn-secondary">Lihat di GitHub</a>`;
            }
            if (project.project_link && project.project_link !== '#') {
                // Menambahkan tombol Live Demo jika ada
                actionButtonsHTML = `<a href="${project.project_link}" target="_blank" class="btn">Lihat Live Demo</a>` + actionButtonsHTML;
            }


            projectHTML += `
                <div data-aos="fade-up">
                    <div class="card-stroke group grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div class="w-full h-full">
                            <div class="overflow-hidden rounded-lg border border-slate-700/50">
                                <a href="projects/project-${project.id}.html" class="block">
                                    <img src="assets/images/${project.image_url}" alt="Showcase ${project.title}" class="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-105">
                                </a>
                            </div>
                        </div>
                        <div>
                            <p class="text-sm font-semibold text-primary mb-2">Proyek Unggulan</p>
                            <h3 class="text-3xl font-bold text-white mb-4">
                                <a href="projects/project-${project.id}.html" class="hover:text-primary transition-colors">${project.title}</a>
                            </h3>
                            <div class="prose prose-invert max-w-none text-muted leading-relaxed">
                                <p>${project.description}</p>
                            </div>
                            <div class="mt-6">
                                <h4 class="text-md font-semibold text-white mb-3">Teknologi:</h4>
                                <div class="flex flex-wrap gap-3">${techIconsHTML}</div>
                            </div>
                            <div class="mt-8 flex flex-wrap items-center gap-4">${actionButtonsHTML}</div>
                        </div>
                    </div>
                </div>
            `;
        });
        projectContainer.innerHTML = projectHTML;
    }
});
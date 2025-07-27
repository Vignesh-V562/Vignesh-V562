// main.js

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const portfolioSections = document.querySelectorAll('.portfolio-section');
    const mainContent = document.getElementById('main-content'); 
    const skillItems = document.querySelectorAll('.skill-item'); 
    // Function to show a specific section
    function showSection(targetSectionId) {
        portfolioSections.forEach(section => {
            if (section.id === targetSectionId) {
                section.classList.add('active-section');
                section.style.display = 'block'; 
                
                
                setTimeout(() => {
                    mainContent.scrollTop = 0; 
                    window.scrollTo({ top: 0, behavior: 'smooth' }); 

                    if (targetSectionId === 'skills') {
                        animateSkillProficiency();
                    }
                }, 600); 
            } else {
                section.classList.remove('active-section');
                
                setTimeout(() => {
                    if (!section.classList.contains('active-section')) { 
                        section.style.display = 'none';
                    }
                }, 600); 
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === targetSectionId) {
                link.classList.add('active');
            }
        });

        history.pushState(null, '', `#${targetSectionId}`);
    }

   
    function animateSkillProficiency() {
        skillItems.forEach(item => {
            const proficiency = item.getAttribute('data-proficiency');
            const proficiencyBar = item.querySelector('.proficiency-bar');
            if (proficiencyBar) {
                proficiencyBar.style.width = '0%';
                void proficiencyBar.offsetWidth; 
                proficiencyBar.style.width = proficiency + '%';
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSectionId = link.getAttribute('data-section');
            showSection(targetSectionId);

            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    const initialHash = window.location.hash.substring(1); 
    if (initialHash && document.getElementById(initialHash)) {
        showSection(initialHash);
    } else {
        showSection('home');
    }

    // Toggle mobile navigation
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times'); 
    });
    
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); 

            formMessage.textContent = 'Sending message...';
            formMessage.className = 'form-message'; 
            formMessage.style.display = 'block';

            setTimeout(() => {
                const isSuccess = Math.random() > 0.2;

                if (isSuccess) {
                    formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
                    formMessage.className = 'form-message success';
                    contactForm.reset();
                } else {
                    formMessage.textContent = 'Oops! Something went wrong. Please try again.';
                    formMessage.className = 'form-message error';
                }
            
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }, 1500); 

            
            const formData = new FormData(contactForm);
            fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
                    formMessage.className = 'form-message success';
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        if (data.errors) {
                            formMessage.textContent = data.errors.map(error => error.message).join(", ");
                        } else {
                            formMessage.textContent = 'Oops! Something went wrong. Please try again.';
                        }
                        formMessage.className = 'form-message error';
                    })
                }
            })
            .catch(error => {
                formMessage.textContent = 'Oops! Network error. Please try again.';
                formMessage.className = 'form-message error';
            })
            .finally(() => {
                formMessage.style.display = 'block';
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            });
            
        });
    }
});
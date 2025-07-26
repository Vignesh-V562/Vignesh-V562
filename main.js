// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const portfolioSections = document.querySelectorAll('.portfolio-section');
    const mainContent = document.getElementById('main-content'); 

    // Function to show a specific section
    function showSection(targetSectionId) {
        portfolioSections.forEach(section => {
            if (section.id === targetSectionId) {
                section.classList.add('active-section');
                section.style.display = 'block'; // Ensure it's block for transitions
                
                setTimeout(() => {
                    mainContent.scrollTop = 0; 
                    window.scrollTo({ top: 0, behavior: 'smooth' }); 
                }, 600); 
            } else {
                section.classList.remove('active-section');
                
                setTimeout(() => {
                    if (!section.classList.contains('active-section')) { // Double check if it's still not active
                        section.style.display = 'none';
                    }
                }, 600); // Match CSS transition duration
            }
        });

        // Update active navigation link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === targetSectionId) {
                link.classList.add('active');
            }
        });

        // Update URL hash without page reload for better user experience
        history.pushState(null, '', `#${targetSectionId}`);
    }

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default hash jump
            const targetSectionId = link.getAttribute('data-section');
            showSection(targetSectionId);

            // Close mobile nav if open
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // Handle initial load based on URL hash or default to home
    const initialHash = window.location.hash.substring(1); // Remove '#'
    if (initialHash && document.getElementById(initialHash)) {
        showSection(initialHash);
    } else {
        showSection('home'); // Default to home section
    }

    // Toggle mobile navigation
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times'); // Change icon to 'X'
    });
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            // In a real scenario, you'd send this data to a backend server.
            // For a static site, you can use a service like Formspree.io or Netlify Forms.
            // Example for Formspree: change form action to:
            // <form action="https://formspree.io/f/yourformid" method="POST">

            // Simulate form submission
            console.log("Form Submitted!");
            console.log("Name:", contactForm.name.value);
            console.log("Email:", contactForm.email.value);
            console.log("Subject:", contactForm.subject.value);
            console.log("Message:", contactForm.message.value);

            // Display success message
            formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';

            // Clear the form
            contactForm.reset();

            // Hide message after a few seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }
});
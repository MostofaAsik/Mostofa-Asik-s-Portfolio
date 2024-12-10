//skill section start//
document.addEventListener("DOMContentLoaded", () => {
    const skills = [
        { id: 1, src: '../images/html.png', title: "HTML" },
        { id: 2, src: '../images/css.png', title: "CSS" },
        { id: 3, src: '../images/tailwind.png', title: "Tailwind" },
        { id: 4, src: '../images/bs.png', title: "Bootstrap" },
        { id: 5, src: '../images/js.png', title: "JavaScript" },
        { id: 6, src: '../images/React.png', title: "React" },
        { id: 7, src: '../images/Redux.png', title: "Redux" },
        { id: 8, src: '../images/node.png', title: "Node Js" },
        { id: 9, src: '../images/ex.png', title: "Express Js" },
        { id: 10, src: '../images/mongodb.png', title: "MongoDB" },
        { id: 11, src: '../images/firebase.png', title: "Firebase" },
        { id: 12, src: '../images/github.png', title: "Github" },

    ];

    const projects = [{
        src: '../images/projects/img4.png',
        title: 'Plan Picker (Team Work)',
        client: 'https://github.com/nikkonbd/plan-picker-web',
        server: 'https://github.com/nrb04/PLANpicker_server',
        demo: 'https://planpicker.web.app/'
    },
    {
        src: '../images/projects/img1.png',
        title: 'MAS sports academy',
        client: 'https://github.com/MostofaAsik/MAS-sports-academy-client',
        server: 'https://github.com/MostofaAsik/MAS-sports-academy-server',
        demo: 'https://sports-academy-a-12.web.app/'
    },
    {
        src: '../images/projects/img2.png',
        title: 'MAS toys center',
        client: 'https://github.com/MostofaAsik/MAS-Toys-Center-client',
        server: 'https://github.com/MostofaAsik/MAS-Toys-Center-server',
        demo: 'https://mas-toys-center.web.app/'
    },

    ];

    // nabbar start
    const sections = document.querySelectorAll('section');

    const navLinks = document.querySelectorAll('.navbar a'); // Select all navigation links

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default anchor behavior

            const targetId = this.getAttribute('href').substring(1); // Extract the ID (without '#')
            const targetSection = document.getElementById(targetId); // Find the section by ID

            if (targetSection) {
                smoothScroll(targetSection, 1000); // Call smoothScroll with a 2-second duration
            }

            // Optional: Handle active class for links
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    function smoothScroll(target, duration) {
        const start = window.scrollY;
        const targetPosition = target.getBoundingClientRect().top + start; // Target position relative to the document
        const distance = targetPosition - start;
        let startTime = null;

        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, start, distance, duration);

            window.scrollTo(0, run);

            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Ease function for smooth effect
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }


    const observerOptions = {
        root: null, // Use the viewport as the root
        threshold: 0.5 // 50% of the section should be visible to consider it active
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            const navLink = document.querySelector(`.navbar a[href="#${entry.target.id}"]`);
            if (entry.isIntersecting) {
                // Add active class to the matching link
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each section
    sections.forEach(section => observer.observe(section));

    // navbar end



    // skills start

    //previous Html for Skill sections//

    // <section class="skills" id="skills">
    //     <div class="skills-section">
    //         <div class="content">
    //             <h2 class="title">Skills</h2>
    //             <p class="description">These are the technologies I've worked with</p>
    //             <div class="skills-grid" id="skills-grid">
    //                 <!-- Skill cards will be appear-->
    //             </div>
    //         </div>
    //     </div>

    // </section>



    //Previous JS for Skills//
    // const skillsGrid = document.getElementById('skills-grid');
    // skills.forEach(skill => {
    //     const skillCard = document.createElement('div');
    //     skillCard.classList.add('skill-card');
    //     skillCard.setAttribute('data-aos', 'fade-up');

    //     skillCard.innerHTML = `
    //         <img src="${skill.src}" alt="${skill.title}">
    //         <p>${skill.title}</p>
    //     `;

    //     skillsGrid.appendChild(skillCard);
    // });



    const skillsGrid = document.getElementById('skills-grid');
    const paginationControls = document.getElementById('pagination-controls');
    const skillsPerPage = 9; // Number of skills per page
    let currentPage = 1;


    function renderSkills(page) {
        // Clear the grid
        skillsGrid.innerHTML = '';

        // Calculate the start and end indices for the current page
        const start = (page - 1) * skillsPerPage;
        const end = start + skillsPerPage;

        // Render skills for the current page
        const currentSkills = skills.slice(start, end);
        currentSkills.forEach(skill => {
            const skillCard = document.createElement('div');
            skillCard.classList.add('skill-card');
            skillCard.setAttribute('data-aos', 'fade-up');

            skillCard.innerHTML = `
            <img src="${skill.src}" alt="${skill.title}">
            <p>${skill.title}</p>
        `;

            skillsGrid.appendChild(skillCard);
        });

        // Smooth scroll to skills section if necessary
        document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
    }


    function renderPagination() {

        // Clear pagination controls
        paginationControls.innerHTML = '';

        // Calculate the total number of pages
        const totalPages = Math.ceil(skills.length / skillsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.classList.add('pagination-btn');



            if (i === currentPage) {
                button.classList.add('active');
            }

            button.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent any default behavior
                currentPage = i;
                renderSkills(currentPage);
                renderPagination();
            });

            paginationControls.appendChild(button);
        }
    }

    // Initial render
    renderSkills(currentPage);
    renderPagination();

    //skills end
    //projects start
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card" data-aos="fade-up">
            <img src="${project.src}" alt="${project.title}">
            <div class="project-info">
                <h2>${project.title}</h2>
                <div class="project-links">
                    <a href="${project.client}" target="_blank">Client</a>
                    <a href="${project.server}" target="_blank">Server</a>
                    <a href="${project.demo}" target="_blank">Demo</a>
                </div>
            </div>
        </div>
    `).join('');

    //contact-form

    (function () {
        emailjs.init('Isga3c42NwkRdKHwi');
    })();


    document.getElementById('contact-form').addEventListener('submit', function (e) {
        e.preventDefault();


        emailjs.sendForm("service_pcev8ib", 'template_4rmx4wn', this)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                showToast('Email sent successfully!', 'success');
                document.getElementById('contact-form').reset();
            }, function (error) {
                console.log('FAILED...', error);
                showToast('An error occurred while sending the email.', 'error');
            });
    });


    function showToast(message, type) {
        const toast = document.getElementById('toast');
        toast.innerHTML = message;
        toast.className = type;
        toast.style.display = 'block';

        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }





    AOS.init({
        duration: 800,
        easing: 'ease-in-cubic',
        mirror: true
    });
});


const menuIcon = document.getElementById('menu-icon');
const navbar = document.getElementById('navbar');


menuIcon.addEventListener('click', function () {
    navbar.classList.toggle('active');
});


const navLinks = document.querySelectorAll('.navbar a');

navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navbar.classList.remove('active');
    });
});

//skill section end//
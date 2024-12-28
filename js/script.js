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

    // Select all sections and navigation links
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    // Function to dynamically set the active nav link
    const updateActiveNavLink = () => {
        let currentSection = "home"; // Default to the home section

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 50; // Adjust for smooth detection
            const sectionHeight = section.offsetHeight;

            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });

        // Update the active class on nav links
        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(currentSection)) {
                link.classList.add("active");
            }
        });
    };

    // Ensure the home section is displayed first on load
    window.onload = () => {
        document.getElementById("home").scrollIntoView({ behavior: "smooth" });
        navLinks.forEach((link) => link.classList.remove("active"));
        document.querySelector('nav a[href="#home"]').classList.add("active");
    };

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            targetSection.scrollIntoView({ behavior: "smooth" });
            navLinks.forEach((link) => link.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Listen to the scroll event to update nav links dynamically
    window.addEventListener("scroll", updateActiveNavLink);

    // Skills section
    const skillsGrid = document.getElementById('skills-grid');
    const paginationControls = document.getElementById('pagination-controls');
    const skillsPerPage = 9; // Number of skills per page
    let currentPage = 1;
    function renderSkills(page, shouldScroll = false) {
        skillsGrid.innerHTML = ''; // Clear the grid
        const start = (page - 1) * skillsPerPage;
        const end = start + skillsPerPage;
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

        // Only scroll into view if explicitly requested
        if (shouldScroll) {
            document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
        }
    }



    function renderPagination() {
        paginationControls.innerHTML = ''; // Clear pagination controls
        const totalPages = Math.ceil(skills.length / skillsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.classList.add('pagination-btn');
            if (i === currentPage) button.classList.add('active');

            button.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                renderSkills(currentPage);
                renderPagination();
            });

            paginationControls.appendChild(button);
        }
    }

    renderSkills(currentPage); // Initial render
    renderPagination();

    // Projects section
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

    // Contact form
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
        setTimeout(() => toast.style.display = 'none', 3000);
    }

    AOS.init({ duration: 800, easing: 'ease-in-cubic', mirror: true });

    // Navbar toggle
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.getElementById('navbar');

    menuIcon.addEventListener('click', function () {
        navbar.classList.toggle('active');
    });

    const navLinksMobile = document.querySelectorAll('.navbar a');
    navLinksMobile.forEach(link => {
        link.addEventListener('click', function () {
            navbar.classList.remove('active');
        });
    });
});

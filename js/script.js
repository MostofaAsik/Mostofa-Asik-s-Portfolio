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


    // nabbar end



    // skills starr

    const skillsGrid = document.getElementById('skills-grid');

    skills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.classList.add('skill-card');
        skillCard.setAttribute('data-aos', 'fade-up');

        skillCard.innerHTML = `
            <img src="${skill.src}" alt="${skill.title}">
            <p>${skill.title}</p>
        `;

        skillsGrid.appendChild(skillCard);
    });

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

    (function() {
        emailjs.init('Isga3c42NwkRdKHwi'); // Replace with your EmailJS User ID
    })();

    // Handle form submission
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();


        emailjs.sendForm("service_r4pcuge", 'template_4rmx4wn', this)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showToast('Email sent successfully!', 'success');
                document.getElementById('contact-form').reset();
            }, function(error) {
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


menuIcon.addEventListener('click', function() {
    navbar.classList.toggle('active');
});


const navLinks = document.querySelectorAll('.navbar a');

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navbar.classList.remove('active');
    });
});

//skill section end//
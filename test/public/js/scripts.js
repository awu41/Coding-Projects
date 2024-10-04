// public/js/scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('nav a');
  
    // Load the default page
    loadPage('bio');
  
    // Add event listeners to navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = e.target.getAttribute('data-page');
        loadPage(page);
      });
    });
  
    // Function to load different pages dynamically
    function loadPage(page) {
      fetch(`${page}.html`)
        .then(response => response.text())
        .then(data => {
          mainContent.innerHTML = data;
          if (page === 'projects') {
            const projectLinks = document.querySelectorAll('.project-link');
            projectLinks.forEach(link => {
            link.addEventListener('click', (e) => {
              e.preventDefault();
              const projectId = e.target.getAttribute('data-project');
              alert(`Details for Project ${projectId}`);
            });
            });
          }  
        })
        .catch(err => {
          mainContent.innerHTML = '<p>Content not found.</p>';
        });
    }
  });
  
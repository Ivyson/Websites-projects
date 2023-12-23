document.addEventListener('DOMContentLoaded',function() {
 const section = document.querySelectorAll('.section');
 const header = document.querySelector('header');
 const themeToggle = document.getElementById('themeToggle');
 const themeStylesheet = document.getElementById('themeStylesheet');
 const userTheme = localStorage.getItem('theme');
 const toggleDashboardButton = document.getElementById('toggleDashboard');
 const dashboard = document.getElementById('dashboard');
 const mainContent = document.querySelector('main');
 if(userTheme){
    document.body.classList.add(userTheme);
    themeToggle.checked = userTheme === 'dark-mode';
 }
    function isInViewpoint(element){
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) 
        );
    }
    function toggleSectionVisibility()
    {
        section.forEach(section => {
            if(isInViewpoint(section)){
                section.classList.add('active'); 
            }
        });
        if(window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    themeToggle.addEventListener('change',function () {
        if(themeToggle.checked) {
            document.body.classList.add('dark-mode');
        } else{
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', '');
        }
    });
    toggleDashboardButton.addEventListener('click', function () {
        // Toggle the dashboard visibility
        if (dashboard.style.left === '0px') {
          dashboard.style.left = '-250px';
          mainContent.style.marginLeft = '0';
        } else {
          dashboard.style.left = '0px';
          mainContent.style.marginLeft = '250px';
        }
      });
    document.addEventListener('scroll',toggleSectionVisibility);
    document.addEventListener('resize',toggleSectionVisibility);
    toggleSectionVisibility();
})
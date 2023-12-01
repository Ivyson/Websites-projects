document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section');
    const form = document.querySelector('form');
    const header = document.querySelector('header');
  
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  
    function toggleSectionVisibility() {
      sections.forEach(section => {
        if (isInViewport(section)) {
          section.classList.add('active');
        }
      });
  
      if (isInViewport(form)) {
        form.classList.add('active');
      } else {
        form.classList.remove('active');
      }
  
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  
    document.addEventListener('scroll', toggleSectionVisibility);
    document.addEventListener('resize', toggleSectionVisibility);
    toggleSectionVisibility();
  });
  
  
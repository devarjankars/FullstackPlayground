function toggleMenu(menuId) {
  
    const contentSections = document.querySelectorAll('.menu-content-1');
    contentSections.forEach(section => {
      section.classList.remove('active-content'); 
    });
  
    
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
      item.classList.remove('active');
    });
  
    document.getElementById('menu-content' + menuId).classList.add('active-content'); 
    
    document.getElementById('menu' + menuId).classList.add('active'); 
  }
  
 
  window.onload = function() {
    toggleMenu(1); 
  }
  
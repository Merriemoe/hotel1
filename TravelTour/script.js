document.addEventListener('DOMContentLoaded', () => {
  // Dropdowns
  function setupDropdown(containerId) {
    const container = document.getElementById(containerId);
    const toggle = container.querySelector('.dropdown-toggle');
    const menu = container.querySelector('.dropdown-menu');

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (e) => {
      if (!container.contains(e.target)) menu.style.display = 'none';
    });

    container.addEventListener('mouseenter', () => (menu.style.display = 'block'));
    container.addEventListener('mouseleave', () => (menu.style.display = 'none'));
  }

  setupDropdown('myOrdersDropdown');
  setupDropdown('contactCustomerServiceDropdown');

  // Sidebar
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const menuItems = document.querySelectorAll('.sidebar .menu-item');
  const mainContent = document.querySelector(".main-content"); // Get main-content

//   sidebar.classList.add('collapsed');
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('expanded');
    sidebar.classList.toggle('collapsed');
     
    //Toggle the 'shifted' class on the main content
//   mainContent.classList.toggle("shifted");
  });

//this js function make unclickable a tag
  menuItems.forEach((item) => {
    item.addEventListener('click', (e) => {
    //   e.preventDefault();
      menuItems.forEach((i) => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

});







// theme toggle
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleDiv = document.getElementById('theme-toggle');
    const themeSwitchCheckbox = document.getElementById('theme-switch');
    const body = document.body;

    // Local Storage မှ Theme ကို စစ်ဆေးပြီး body ပေါ်တွင် class ထည့်သွင်း/ဖယ်ရှားခြင်း
    function loadTheme() {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            body.classList.add('dark-theme');
            themeSwitchCheckbox.checked = true; // Switch ကို ဖွင့်ထားပါ
        } else {
            body.classList.remove('dark-theme');
            themeSwitchCheckbox.checked = false; // Switch ကို ပိတ်ထားပါ
        }
    }

    // Theme ပြောင်းလဲခြင်းနှင့် Local Storage တွင် သိမ်းဆည်းခြင်း
    function toggleTheme() {
        body.classList.toggle('dark-theme');
        
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    }

    // Toggle Button နှိပ်ခြင်းကို Event Listener ဖြင့် စောင့်ကြည့်ခြင်း
    themeSwitchCheckbox.addEventListener('change', toggleTheme);

    // Page စတင်ဖွင့်သည့်အခါ Theme ကို loading လုပ်ခြင်း
    loadTheme();
});







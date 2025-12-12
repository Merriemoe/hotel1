











document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Theme Carousel Logic ---
    const themesTrack = document.querySelector('.themes-list-track');
    const prevThemeBtn = document.querySelector('.prev-theme-button');
    const nextThemeBtn = document.querySelector('.next-theme-button');
    const themeTabs = document.querySelectorAll('.theme-tab');
    let scrollPosition = 0;
    const scrollStep = 150; // ရွှေ့မည့် ပမာဏ

    function updateThemeNavButtons() {
        // Scroll Position ကို စစ်ဆေးပြီး ခလုတ်များ disable လုပ်ခြင်း
        prevThemeBtn.disabled = scrollPosition === 0;
        
        // နောက်ဆုံးထိ ရောက်မရောက် စစ်ဆေးခြင်း (နောက်ထပ် tab များ ရှိမရှိ)
        const maxScroll = themesTrack.scrollWidth - themesTrack.clientWidth;
        nextThemeBtn.disabled = scrollPosition >= maxScroll;
    }

    // nextThemeBtn.addEventListener('click', () => {
    //     scrollPosition += scrollStep;
    //     themesTrack.style.transform = `translateX(-${scrollPosition}px)`;
    //     updateThemeNavButtons();
    // });

    // prevThemeBtn.addEventListener('click', () => {
    //     scrollPosition -= scrollStep;
    //     if (scrollPosition < 0) scrollPosition = 0; // အနုတ်မဖြစ်စေရန်
    //     themesTrack.style.transform = `translateX(-${scrollPosition}px)`;
    //     updateThemeNavButtons();
    // });
    
    // Initial check (ဘယ်ဘက်တွင် scrollbar မပေါ်စေရန်)
    themesTrack.addEventListener('transitionend', updateThemeNavButtons);
    setTimeout(updateThemeNavButtons, 100); // ချက်ချင်း update လုပ်ရန်


    // Theme Tab Switching
    themeTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const selectedTheme = e.currentTarget.dataset.theme;
            
            // Active state ပြောင်းလဲခြင်း
            themeTabs.forEach(t => t.classList.remove('active'));
            e.currentTarget.classList.add('active');

            // Form input ကို Theme အလိုက် ပြောင်းလဲရန် (ဥပမာ)
            const destinationInput = document.querySelector('.destination-input');
            const newDestination = getDestinationByTheme(selectedTheme);
            destinationInput.value = newDestination;
            
            // Destination Count ပြောင်းလဲရန် (ဥပမာ)
            document.getElementById('destinationCount').textContent = Math.floor(Math.random() * 30) + 1;
            
            // ဒီနေရာတွင် Card List (destination-cards-scroll) ကို filter လုပ်မည့် logic ထည့်နိုင်ပါသည်။
        });
    });

    function getDestinationByTheme(theme) {
        switch (theme) {
            case 'weekend':
                return 'Beijing';
            case 'historical':
                return 'Shanghai';
            case 'grasslands':
                return 'Tongliao';
            default:
                return 'All of Chin';
        }
    }


    // --- 2. Form Input Logic ---
    const departureInput = document.querySelector('.departure-input');
    const clearBtn = document.querySelector('.clear-input-btn');

    // Input ကို ရှင်းရန်
    clearBtn.addEventListener('click', () => {
        departureInput.value = '';
    });
    
    // Input တွင် စာသားမရှိပါက X ကို ဖျောက်ထားရန် logic
    function toggleClearButton() {
        clearBtn.style.display = departureInput.value.trim() ? 'block' : 'none';
    }
    departureInput.addEventListener('input', toggleClearButton);
    toggleClearButton(); // စစချင်း ဖွင့်စဥ်က စစ်ဆေးရန်
});











// document.addEventListener('DOMContentLoaded', () => {
//     // --- 1. Theme Carousel Logic ---
//     const themesContainer = document.querySelector('.themes-container');
//     const themesTrack = document.querySelector('.themes-list-track');
//     const prevThemeBtn = document.querySelector('.prev-theme-button');
//     const nextThemeBtn = document.querySelector('.next-theme-button');
//     const themeTabs = document.querySelectorAll('.theme-tab');
//     let scrollPosition = 0;

//     // Carousel ရဲ့ မြင်ကွင်းအကျယ်ကို ရယူခြင်း
//     const getVisibleWidth = () => themesContainer.clientWidth - 10; // 10px က ဘေး padding ချန်ထားသည်

//     function updateThemeNavButtons() {
//         // Track ရဲ့ စုစုပေါင်း အကျယ် (Tab အကုန်ပေါင်း)
//         const totalScrollWidth = themesTrack.scrollWidth;
//         // မြင်ကွင်း အကျယ်
//         const visibleWidth = themesTrack.clientWidth;
        
//         // နောက်ဆုံး scroll လုပ်နိုင်မယ့် အနေအထား
//         const maxScroll = totalScrollWidth - visibleWidth;
        
//         // Button များကို ချိန်ညှိခြင်း
//         prevThemeBtn.disabled = scrollPosition <= 5; // နည်းနည်းလေး ကွာရင်တောင် 0 လို့ သတ်မှတ်
//         nextThemeBtn.disabled = scrollPosition >= maxScroll - 5; // နည်းနည်းလေး ကွာရင်တောင် max လို့ သတ်မှတ်
        
//         // Track ကို ရွှေ့ခြင်း
//         themesTrack.style.transform = `translateX(-${scrollPosition}px)`;
//     }

//     nextThemeBtn.addEventListener('click', () => {
//         const visibleWidth = getVisibleWidth();
//         const totalScrollWidth = themesTrack.scrollWidth;
//         const maxScroll = totalScrollWidth - visibleWidth;
        
//         // မြင်ကွင်းအကျယ်အတိုင်း ရွှေ့ခြင်း (သို့မဟုတ် နောက်ဆုံးထိ)
//         scrollPosition += visibleWidth;
//         if (scrollPosition > maxScroll) {
//             scrollPosition = maxScroll;
//         }
        
//         updateThemeNavButtons();
//     });

//     prevThemeBtn.addEventListener('click', () => {
//         const visibleWidth = getVisibleWidth();
        
//         // မြင်ကွင်းအကျယ်အတိုင်း နောက်ပြန်ရွှေ့ခြင်း
//         scrollPosition -= visibleWidth;
//         if (scrollPosition < 0) {
//             scrollPosition = 0;
//         }
        
//         updateThemeNavButtons();
//     });
    
//     // Resize လုပ်လျှင် (သို့မဟုတ် ဖွင့်ပြီးစ) Position များကို ပြန်စစ်ဆေးခြင်း
//     window.addEventListener('resize', () => {
//         // Resize လုပ်ရင် scrollPosition ကို အစပြန်ထားတာက အကောင်းဆုံးပါ
//         scrollPosition = 0; 
//         updateThemeNavButtons();
//     });

//     // ချက်ချင်း update လုပ်ရန်
//     updateThemeNavButtons();

//     // --- Theme Tab Switching Logic (အရင်အတိုင်းထားပါ) ---
//     themeTabs.forEach(tab => {
//         tab.addEventListener('click', (e) => {
//             const selectedTheme = e.currentTarget.dataset.theme;
            
//             // Active state ပြောင်းလဲခြင်း
//             themeTabs.forEach(t => t.classList.remove('active'));
//             e.currentTarget.classList.add('active');

//             // Form input ကို Theme အလိုက် ပြောင်းလဲရန် (ဥပမာ)
//             const destinationInput = document.querySelector('.destination-input');
//             const newDestination = getDestinationByTheme(selectedTheme);
//             destinationInput.value = newDestination;
            
//             // Destination Count ပြောင်းလဲရန် (ဥပမာ)
//             document.getElementById('destinationCount').textContent = Math.floor(Math.random() * 30) + 1;
//         });
//     });

//     function getDestinationByTheme(theme) {
//         switch (theme) {
//             case 'weekend':
//                 return 'Beijing';
//             case 'historical':
//                 return 'Shanghai';
//             case 'grasslands':
//                 return 'Tongliao';
//             default:
//                 return 'All of Chin';
//         }
//     }


//     // --- 2. Form Input Logic ---
//     const departureInput = document.querySelector('.departure-input');
//     const clearBtn = document.querySelector('.clear-input-btn');

//     // Input ကို ရှင်းရန်
//     clearBtn.addEventListener('click', () => {
//         departureInput.value = '';
//         toggleClearButton();
//     });
    
//     // Input တွင် စာသားမရှိပါက X ကို ဖျောက်ထားရန် logic
//     function toggleClearButton() {
//         clearBtn.style.display = departureInput.value.trim() ? 'block' : 'none';
//     }
//     departureInput.addEventListener('input', toggleClearButton);
//     toggleClearButton(); // စစချင်း ဖွင့်စဥ်က စစ်ဆေးရန်
// });
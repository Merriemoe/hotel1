







// guide
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.airport-tab-button');
    const tabContents = document.querySelectorAll('.airport-tab-content');

    // Tab Switching Logic
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            // 1. Tab Active State ပြောင်းလဲခြင်း
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 2. Tab Content ပြောင်းလဲခြင်း
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.dataset.tabContent === targetTab) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Note: Alphabetical sorting is assumed to be handled in the initial HTML structure.
});
// admin test

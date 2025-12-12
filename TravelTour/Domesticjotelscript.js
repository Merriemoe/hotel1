document.addEventListener('DOMContentLoaded', function() {
    
    const body = document.body;
    const modeToggleBtn = document.getElementById('mode-toggle-btn');
    const colorOptions = document.querySelectorAll('.color-option');
    const ctripBusinessBanner = document.querySelector('.ctrip-business-banner');
    
    // --- Theme Variables ---
    const lightThemeColors = {
        orange: { primary: '#FFB380', border: '#ff9966', icon: 'fa-sun', text: 'Light Mode' },
        jade: { primary: '#C9FEA4', border: '#a8e8b0', icon: 'fa-sun', text: 'Light Mode' }
    };
    
    const darkThemeColors = {
        orange: { primary: '#FF6600', border: '#ff9966', icon: 'fa-moon', text: 'Dark Mode' },
        jade: { primary: '#11B3A6', border: '#00c99a', icon: 'fa-moon', text: 'Dark Mode' }
    };


    // --- 1. Theme and Color Management ---
    function applyTheme(theme, color) {
        // Body attributes ကို ပြောင်းပါ
        body.setAttribute('data-theme', theme);
        body.setAttribute('data-color', color);
        
        // Local Storage မှာ မှတ်တမ်းတင်ပါ
        localStorage.setItem('theme', theme);
        localStorage.setItem('color', color);
        
        // Theme Toggle Button ကို update လုပ်ပါ
        updateThemeToggleBtn(theme, color);
        
        // Active Color Option ကို update လုပ်ပါ
        updateColorOptions(color);
        
        // Ctrip Business Banner အတွက် data-theme attribute ကို ထည့်ပေးပါ (CSS မှာ သုံးရန်)
        ctripBusinessBanner.setAttribute('data-theme', theme);
    }

    function updateThemeToggleBtn(theme, color) {
        const currentColors = theme === 'light' ? lightThemeColors[color] : darkThemeColors[color];
        
        modeToggleBtn.innerHTML = `<i class="fas ${currentColors.icon}"></i> <span>${currentColors.text}</span>`;
        
        // Button အရောင်ကို Theme Primary Color နဲ့ တိုက်ရိုက် ပြောင်းလဲ
        modeToggleBtn.style.backgroundColor = currentColors.primary;
        modeToggleBtn.style.borderColor = currentColors.border;
    }
    
    function updateColorOptions(activeColor) {
        colorOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-color') === activeColor) {
                option.classList.add('active');
            }
        });
    }

    // Load saved theme on initialization
    function loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        const savedColor = localStorage.getItem('color') || 'orange';
        applyTheme(savedTheme, savedColor);
    }
    
    // Mode Toggle Button (Light <-> Dark)
    modeToggleBtn.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const currentColor = body.getAttribute('data-color');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme, currentColor);
    });

    // Color Option Selection
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const newColor = this.getAttribute('data-color');
            const currentTheme = body.getAttribute('data-theme');
            applyTheme(currentTheme, newColor);
        });
    });

    // --- 2. Carousel Functionality (Right Side Ad Box) ---
    const slides = document.querySelectorAll('.carousel-slides .slide');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    let currentSlide = 0;

    function showSlide(index) {
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        if (slides.length > 0) {
            slides[index].classList.add('active');
        }
        if (indicators.length > 0) {
            indicators[index].classList.add('active');
        }
        currentSlide = index;
    }

    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    // Set interval for auto-sliding (e.g., every 5 seconds)
    if (slides.length > 1) {
        let slideInterval = setInterval(nextSlide, 5000);

        // Add event listeners for indicators to allow manual switch
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(index);
                slideInterval = setInterval(nextSlide, 5000); // Restart
            });
        });
    }

    // Initialize the first slide
    if (slides.length > 0) {
        showSlide(0);
    }
    
    // --- 3. Search Button Logic ---
    const searchButton = document.querySelector('.search-btn');
    if (searchButton) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault(); 
            const destination = document.querySelector('.booking-form input[type="text"]').value;
            console.log(`Searching for hotels in: ${destination}`);
            alert(`Searching for hotels in ${destination}...`);
        });
    }

    
    // --- 4. Hotel Recommendations Tab Switching Logic ---
    const hotelData = {
        shanghai: [
            { name: "Shanghai Hotel (Luxury)", rating: "4.8/5 Awesome", reviews: 3578, price: 1351, img: "IMG.jpg" },
            { name: "Jianguo Puxin Hotel (Sh...)", rating: "4.8/5 Awesome", reviews: 3191, price: 1273, img: "IMG1.jpg" },
            { name: "Orange Crystal Hotel Sh...", rating: "4.8/5 Awesome", reviews: 5609, price: 882, img: "IMG2.jpg" },
            { name: "Mercure Shanghai Royal", rating: "4.7/5 Great", reviews: 2100, price: 750, img: "IMG3.jpg" },
            { name: "The Westin Bund Center", rating: "4.9/5 Excellent", reviews: 4500, price: 1800, img: "IMG4.jpg" },
        ],
        beijing: [
            { name: "The Great Wall Hotel Beijing", rating: "4.9/5 Excellent", reviews: 4500, price: 1800, img: "IMG5.jpg" },
            { name: "Capital Hotel Beijing", rating: "4.7/5 Great", reviews: 3200, price: 1100, img: "IMG6.jpg" },
            { name: "Forbidden City Inn", rating: "4.6/5 Very Good", reviews: 1500, price: 650, img: "IMG7.jpg" },
            { name: "Kempinski Beijing", rating: "4.8/5 Awesome", reviews: 4100, price: 1600, img: "IMG4.jpg" },
        ],
        guangzhou: [
            { name: "Canton Tower View Hotel", rating: "4.9/5 Excellent", reviews: 5100, price: 1500, img: "IMG1.jpg" },
            { name: "Garden Hotel Guangzhou", rating: "4.7/5 Great", reviews: 3800, price: 950, img: "IMG3.jpg" },
            { name: "White Swan Hotel", rating: "4.8/5 Awesome", reviews: 4300, price: 1300, img: "IMG5.jpg" },
            { name: "Ritz-Carlton Guangzhou", rating: "4.9/5 Excellent", reviews: 5500, price: 2000, img: "IMG6.jpg" },
        ],
        sanya: [
            { name: "Sanya Bay Resort", rating: "4.9/5 Excellent", reviews: 6000, price: 2200, img: "IMG.jpg" },
            { name: "Mandarin Oriental Sanya", rating: "4.8/5 Awesome", reviews: 4900, price: 3100, img: "IMG2.jpg" },
            { name: "Hilton Sanya Yalong Bay", rating: "4.7/5 Great", reviews: 3500, price: 1800, img: "IMG4.jpg" },
            { name: "InterContinental Sanya", rating: "4.8/5 Awesome", reviews: 4000, price: 2500, img: "IMG6.jpg" },
        ],
        hangzhou: [
            { name: "West Lake Resort Hotel", rating: "4.7/5 Great", reviews: 2000, price: 900, img: "hangzhou1.jpg" },
            { name: "Four Seasons Hangzhou", rating: "4.9/5 Excellent", reviews: 3500, price: 3000, img: "hangzhou2.jpg" },
            { name: "Midtown Shangri-La", rating: "4.8/5 Awesome", reviews: 2800, price: 1500, img: "hangzhou3.jpg" },
            { name: "Park Hyatt Hangzhou", rating: "4.8/5 Awesome", reviews: 3100, price: 1800, img: "hangzhou4.jpg" },
        ],
        chengdu: [
             { name: "Temple House Chengdu", rating: "4.9/5 Excellent", reviews: 4200, price: 1600, img: "chengdu2.jpg" },
             { name: "Niccolo Chengdu", rating: "4.8/5 Awesome", reviews: 2500, price: 1400, img: "chengdu3.jpg" },
             { name: "Grand Hyatt Chengdu", rating: "4.8/5 Awesome", reviews: 3000, price: 1200, img: "chengdu4.jpg" },
             { name: "The Ritz-Carlton, Chengdu", rating: "4.9/5 Excellent", reviews: 3500, price: 1800, img: "chengdu1.jpg" },
        ],
        nanjing: [
             { name: "Nanjing Hilton", rating: "4.7/5 Great", reviews: 3200, price: 1100, img: "nanjing2.jpg" },
             { name: "Jinling Hotel Nanjing", rating: "4.6/5 Very Good", reviews: 1500, price: 750, img: "nanjing3.jpg" },
             { name: "Regent Nanjing", rating: "4.8/5 Awesome", reviews: 2500, price: 1300, img: "nanjing4.jpg" },
             { name: "Nanjing Luxury Hotel", rating: "4.8/5 Awesome", reviews: 2000, price: 900, img: "nanjing1.jpg" },
        ],
        chongqing: [
             { name: "Chongqing Marriott", rating: "4.8/5 Awesome", reviews: 2000, price: 800, img: "chongqing1.jpg" },
             { name: "Regent Chongqing", rating: "4.9/5 Excellent", reviews: 3800, price: 1500, img: "chongqing3.jpg" },
             { name: "InterContinental Chongqing", rating: "4.8/5 Awesome", reviews: 2500, price: 1100, img: "chongqing4.jpg" },
             { name: "Nice Hotel Chongqing", rating: "4.7/5 Great", reviews: 1800, price: 650, img: "chongqing2.jpg" },
        ],
        shenzhen: [
             { name: "Shenzhen Resort Hotel", rating: "4.9/5 Excellent", reviews: 3000, price: 1500, img: "shenzhen1.jpg" },
             { name: "Hilton Shenzhen", rating: "4.8/5 Awesome", reviews: 2200, price: 1200, img: "shenzhen2.jpg" },
             { name: "InterContinental Shenzhen", rating: "4.8/5 Awesome", reviews: 3500, price: 1800, img: "shenzhen4.jpg" },
             { name: "Luxury Hotel Shenzhen", rating: "4.7/5 Great", reviews: 1500, price: 900, img: "shenzhen3.jpg" },
        ],
        xiamen: [
             { name: "Xiamen Beach Resort", rating: "4.9/5 Excellent", reviews: 3500, price: 1300, img: "xiamen1.jpg" },
             { name: "Nice Hotel Xiamen", rating: "4.7/5 Great", reviews: 2000, price: 950, img: "xiamen2.jpg" },
             { name: "W Hotel Xiamen", rating: "4.8/5 Awesome", reviews: 3100, price: 1500, img: "xiamen4.jpg" },
             { name: "Luxury Hotel Xiamen", rating: "4.8/5 Awesome", reviews: 2800, price: 1100, img: "xiamen3.jpg" },
        ],
        wuhan: [
             { name: "Wuhan Marriott", rating: "4.8/5 Awesome", reviews: 2500, price: 900, img: "wuhan1.jpg" },
             { name: "InterContinental Wuhan", rating: "4.8/5 Awesome", reviews: 3000, price: 1100, img: "wuhan4.jpg" },
             { name: "Luxury Hotel Wuhan", rating: "4.9/5 Excellent", reviews: 3500, price: 1400, img: "wuhan3.jpg" },
             { name: "Nice Hotel Wuhan", rating: "4.7/5 Great", reviews: 1500, price: 700, img: "wuhan2.jpg" },
        ],
        harbin: [
             { name: "Harbin Resort Hotel", rating: "4.9/5 Excellent", reviews: 3500, price: 1100, img: "harbin1.jpg" },
             { name: "Nice Hotel Harbin", rating: "4.7/5 Great", reviews: 2000, price: 750, img: "harbin2.jpg" },
             { name: "Shangri-La Harbin", rating: "4.8/5 Awesome", reviews: 3100, price: 1500, img: "harbin4.jpg" },
             { name: "Luxury Hotel Harbin", rating: "4.8/5 Awesome", reviews: 2800, price: 950, img: "harbin3.jpg" },
        ],
        // Note: For other "More" cities without explicit data, it will show a default message.
    };

    const tabs = document.querySelectorAll('.nav-tabs .tab');
    const hotelListContainer = document.getElementById('hotel-list-container');
    const moreDropdown = document.querySelector('.more-dropdown');
    const dropdownCities = document.querySelectorAll('.dropdown-content span');

    function createHotelCard(hotel) {
        const card = document.createElement('div');
        card.className = 'hotel-card';
        card.innerHTML = `
            <img src="${hotel.img || 'IMG1.jpg'}" alt="${hotel.name}">
            <div class="hotel-info">
                <h3>${hotel.name}</h3>
                <p class="rating-stars" style="color: gold;">★★★★★</p> 
                <p class="rating-detail">${hotel.rating}</p>
                <p class="reviews">${hotel.reviews} Reviews</p>
                <p class="price">¥${hotel.price}</p>
            </div>
        `;
        return card;
    }

    function renderHotels(city) {
        hotelListContainer.innerHTML = '';
        const cityData = hotelData[city.toLowerCase()] || [];

        cityData.forEach(hotel => {
            hotelListContainer.appendChild(createHotelCard(hotel));
        });
        
        if (cityData.length === 0) {
            hotelListContainer.innerHTML = `<p style="text-align: center; width: 100%; padding: 20px; color: var(--text-color-secondary);">No hotel recommendations found for ${city}.</p>`;
        }
    }

    function setActiveTab(element) {
        tabs.forEach(t => t.classList.remove('active'));
        // Dropdown (More) ကို Active မဖြစ်စေရန် စစ်ဆေးပါ
        if (element && !element.classList.contains('more-dropdown')) {
             element.classList.add('active');
        }
    }

    // Tab နှိပ်သည့်အခါ
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const city = this.getAttribute('data-city');
            if (city) {
                if (this.classList.contains('more-dropdown')) {
                    // More ကို နှိပ်ရင် Dropdown ကို ဖွင့်/ပိတ်ပါ
                    this.classList.toggle('show');
                } else {
                    // Main Tabs ကို နှိပ်ရင် Active လုပ်ပြီး Hotels ကို ပြပါ
                    setActiveTab(this);
                    renderHotels(city);
                    // More Dropdown ပွင့်နေရင် ပိတ်ပါ
                    moreDropdown.classList.remove('show');
                }
            }
        });
    });

    // Dropdown (More) အတွင်းမှ မြို့များကို နှိပ်သောအခါ
    dropdownCities.forEach(citySpan => {
        citySpan.addEventListener('click', function(e) {
            e.stopPropagation(); // Dropdown နှိပ်ပြီးနောက် အပေါ်ကို ပျံ့နှံ့မသွားစေရန်
            
            const city = this.getAttribute('data-city');
            
            // Active Tab ကို ဖျက်လိုက်ပါ 
            setActiveTab(null); 
            
            // More tab ကိုလည်း ပိတ်ပါ
            moreDropdown.classList.remove('show');
            
            // Hotels ကို ပြပါ
            renderHotels(city);
        });
    });
    
    // Default အားဖြင့် Shanghai ကို ပြသမည်
    renderHotels('shanghai');
    
    // Saved Theme ကို စတင်အသုံးပြုရန်
    loadSavedTheme();
});


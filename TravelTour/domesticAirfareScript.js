





//low price card
document.addEventListener('DOMContentLoaded', () => {
    const carouselContent = document.querySelector('.carousel-content');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const pages = document.querySelectorAll('.card-page');

    let currentPage = 1;
    const totalPages = pages.length;

    // အစပိုင်းတွင် ခလုတ်များ၏ အခြေအနေကို စစ်ဆေးသည်
    function updateButtons() {
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;

        // ပုံများထဲကလို ခလုတ်ပေါ်လာခြင်း/ပျောက်သွားခြင်း ပုံစံ (အောက်ပါအတိုင်း)
        if (currentPage === 1) {
            prevButton.style.display = 'none';
        } else {
            prevButton.style.display = 'flex'; // CSS ကနေ default flex
        }
        
        if (currentPage === totalPages) {
            nextButton.style.display = 'none';
        } else {
            nextButton.style.display = 'flex'; // CSS ကနေ default flex
        }
    }

    // Carousel ကို ရွှေ့ပြောင်းခြင်း
    function moveCarousel() {
        // တစ်မျက်နှာ (page) စာ ရွှေ့ရန်အတွက် တွက်ချက်မှု
        const offset = -(currentPage - 1) * 100; // 100% ရွှေ့ရန်
        carouselContent.style.transform = `translateX(${offset}%)`;
        updateButtons();
    }

    // Next ခလုတ် နှိပ်သည့်အခါ
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            moveCarousel();
        }
    });

    // Previous ခလုတ် နှိပ်သည့်အခါ
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            moveCarousel();
        }
    });

    // စတင်ချိန်တွင် Carousel ကို နေရာချထားပြီး ခလုတ်များကို update လုပ်သည်
    moveCarousel();
});



// low price map
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.destination-card');
    const mapPopup = document.querySelector('.map-popup'); // မြေပုံပေါ်က popup

    // ခရီးစဉ်ကတ်ကို နှိပ်တဲ့အခါ
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // လက်ရှိ active ဖြစ်နေသော ကတ်ကို ဖယ်ရှား
            document.querySelector('.destination-card.active')?.classList.remove('active');
            
            // နှိပ်လိုက်သော ကတ်ကို active ပြန်လုပ်
            card.classList.add('active');

            // မြေပုံပေါ်က active popup ကို update လုပ်ရန်
            // (ဤနေရာတွင် ဥပမာ Xiamen ကိုသာ ထားရှိထားသည်)
            // လက်တွေ့တွင်၊ ဤ function သည် နှိပ်လိုက်သော ကတ်၏ 
            // နေရာအတိုင်း မြေပုံပေါ်ရှိ သက်ဆိုင်ရာ Marker/Popup ကို 
            // နေရာရွှေ့ခြင်း/ပြောင်းလဲခြင်းများ ပြုလုပ်ရမည်
            if (card.querySelector('.city-name').textContent === 'Xiamen') {
                mapPopup.classList.add('active');
            } else {
                mapPopup.classList.remove('active');
            }
        });
    });

    // စတင်ချိန်တွင် ပထမကတ်ကို active ဖြစ်စေရန်
    if (cards.length > 0) {
        cards[0].click(); // အစမှာ Xiamen ကို နှိပ်ထားသလို ဖြစ်စေရန်
    }

    // Scrollbar ပုံစံတူရန်အတွက်၊ ကတ်များ scroll လုပ်နေချိန်တွင် scroll-handle ကို
    // ပေါ်လာ/ပျောက်သွားစေရန် စသည့် CSS/JS အပိုလုပ်ဆောင်ချက်များ ထပ်ထည့်နိုင်ပါသည်။
    // လက်ရှိတွင် list-panel သည် CSS ၏ overflow-y: scroll ဖြင့် စာရင်းကို scroll လုပ်ပေးပါသည်။
});


// airline special offer
document.addEventListener('DOMContentLoaded', () => {
    // လိုဂို Carousel အတွက် Variables
    const logoCarouselContent = document.querySelector('.logo-carousel-content');
    const prevLogoButton = document.querySelector('.prev-logo-button');
    const nextLogoButton = document.querySelector('.next-logo-button');
    const logoGroups = document.querySelectorAll('.logo-group');
    let currentLogoPage = 1;
    const totalLogoPages = logoGroups.length;

    // လေကြောင်းလိုင်း အသေးစိတ် အချက်အလက်များအတွက် Variables
    const airlineLogos = document.querySelectorAll('.airline-logo');
    const detailItems = document.querySelectorAll('.airline-detail-item');
    const departureLinks = document.querySelectorAll('.departure-link');
    const offerGrids = document.querySelectorAll('.offer-cards-grid');

    // --- ၁။ လိုဂို Carousel လုပ်ဆောင်ချက်များ ---

    function updateLogoButtons() {
        // Prev ခလုတ် ပေါ်ခြင်း/ဖျောက်ခြင်း
        if (currentLogoPage === 1) {
            prevLogoButton.style.display = 'none';
        } else {
            prevLogoButton.style.display = 'flex';
        }

        // Next ခလုတ် ပေါ်ခြင်း/ဖျောက်ခြင်း
        if (currentLogoPage === totalLogoPages) {
            nextLogoButton.style.display = 'none';
        } else {
            nextLogoButton.style.display = 'flex';
        }
    }

    function moveLogoCarousel() {
        const offset = -(currentLogoPage - 1) * 100; // 100% (တစ်အုပ်စုစာ) ရွှေ့ရန်
        logoCarouselContent.style.transform = `translateX(${offset}%)`;
        updateLogoButtons();
    }

    nextLogoButton.addEventListener('click', () => {
        if (currentLogoPage < totalLogoPages) {
            currentLogoPage++;
            moveLogoCarousel();
        }
    });

    prevLogoButton.addEventListener('click', () => {
        if (currentLogoPage > 1) {
            currentLogoPage--;
            moveLogoCarousel();
        }
    });

    // စတင်ချိန်တွင် Carousel ကို update လုပ်ပါ
    moveLogoCarousel();
    
    // --- ၂။ လေကြောင်းလိုင်းရွေးချယ်မှု လုပ်ဆောင်ချက်များ ---

    function setActiveAirline(airlineId) {
        // လိုဂိုများကို update လုပ်ခြင်း
        airlineLogos.forEach(logo => logo.classList.remove('active'));
        document.querySelector(`.airline-logo[data-airline-id="${airlineId}"]`)?.classList.add('active');

        // အသေးစိတ်အချက်အလက်များကို ပြောင်းလဲပြသခြင်း
        detailItems.forEach(item => item.classList.remove('active'));
        const activeDetailItem = document.querySelector(`.airline-detail-item[data-airline-id="${airlineId}"]`);
        
        if (activeDetailItem) {
            activeDetailItem.classList.add('active');
            
            // Departure Links များအတွက် Default အားဖြင့် ပထမဆုံးမြို့ကို ရွေးချယ်ပေးခြင်း
            const firstDepartureLink = activeDetailItem.querySelector('.departure-link');
            if (firstDepartureLink) {
                // အကယ်၍ ပထမဆုံး link ကို တွေ့ပါက ၎င်းကို နှိပ်လိုက်သကဲ့သို့ ပြုလုပ်ပါ
                firstDepartureLink.click(); 
            }
        }
    }

    // လိုဂို နှိပ်သည့်အခါ
    airlineLogos.forEach(logo => {
        logo.addEventListener('click', (e) => {
            const airlineId = e.currentTarget.dataset.airlineId;
            setActiveAirline(airlineId);
        });
    });

    // --- ၃။ မြို့ရွေးချယ်မှု လုပ်ဆောင်ချက်များ (Departure Links) ---

    function setActiveDepartureCity(link, detailItem) {
        const cityId = link.dataset.city;

        // Links များကို update လုပ်ခြင်း
        detailItem.querySelectorAll('.departure-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Offers Cards Grid များကို ပြောင်းလဲပြသခြင်း
        detailItem.querySelectorAll('.offer-cards-grid').forEach(grid => grid.classList.remove('active'));
        const activeGrid = detailItem.querySelector(`.offer-cards-grid[data-city="${cityId}"]`);
        
        if (activeGrid) {
            activeGrid.classList.add('active');
        } else {
             // Offer Cards မရှိပါက ပုံသေစာသား ပြသရန် သို့မဟုတ် ခေါင်းစဉ်ကိုသာ ပြရန်
             // ဤနေရာတွင် မည်သည့် grid ကိုမျှ active မလုပ်ပါ
        }
    }

    // Departure Link နှိပ်သည့်အခါ
    departureLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const detailItem = e.currentTarget.closest('.airline-detail-item');
            setActiveDepartureCity(e.currentTarget, detailItem);
        });
    });


    // စတင်ချိန်တွင် ပထမဆုံး လေကြောင်းလိုင်းကို Active ဖြစ်စေရန်
    setActiveAirline('airchina');
});
//admin-test

document.addEventListener('DOMContentLoaded', function () {

    const modal = document.getElementById('city-selection-modal');
    const closeModal = document.querySelector('.city-close');
    const cityListContainer = document.getElementById('city-list-container');

    // Editable city list database
    let cityGroups = {
        domestic: {
            'G': [
                { name: 'Guangzhou', code: 'CAN' },
                { name: 'Guilin', code: 'KWL' }
            ],
            'H': [
                { name: 'Hangzhou', code: 'HGH' },
                { name: 'Haikou', code: 'HAK' }
            ]
        },
        international: {
            'T': [
                { name: 'Tokyo', code: 'NRT' },
                { name: 'Toronto', code: 'YYZ' }
            ],
            'S': [
                { name: 'Seoul', code: 'ICN' },
                { name: 'Singapore', code: 'SIN' }
            ]
        }
    };

    let currentInputId = '';
    let activeType = "domestic";

    function renderCityList(type) {
        activeType = type;
        cityListContainer.innerHTML = '';

        const groups = cityGroups[type];

        for (const letter in groups) {
            let html = `<div class="city-group">
                <div class="city-group-letter">${letter}</div>`;

            groups[letter].forEach((city, index) => {
                html += `
                    <span class="city-item" data-letter="${letter}" data-index="${index}" data-city="${city.name}" data-code="${city.code}">
                        ${city.name} (${city.code})
                        <span class="city-edit">Edit</span>
                        <span class="city-delete">Delete</span>
                    </span>`;
            });

            html += `</div>`;
            cityListContainer.innerHTML += html;
        }

        attachCityEvents();
    }

    // Click city / edit / delete
    function attachCityEvents() {
        document.querySelectorAll('.city-item').forEach(item => {

            item.addEventListener('click', function (e) {

                // prevent closing when clicking edit/delete
                if (e.target.classList.contains('city-edit') || 
                    e.target.classList.contains('city-delete')) return;

                document.getElementById(currentInputId).value =
                    `${this.dataset.city} (${this.dataset.code})`;

                modal.style.display = 'none';
            });

            // Edit city
            item.querySelector('.city-edit').onclick = function () {
                let letter = item.dataset.letter;
                let index = item.dataset.index;

                let newName = prompt("Edit city name", item.dataset.city);
                let newCode = prompt("Edit IATA code", item.dataset.code);

                if (newName && newCode) {
                    cityGroups[activeType][letter][index] = { name: newName, code: newCode };
                    renderCityList(activeType);
                }
            };

            // Delete city
            item.querySelector('.city-delete').onclick = function () {
                let letter = item.dataset.letter;
                let index = item.dataset.index;

                cityGroups[activeType][letter].splice(index, 1);

                renderCityList(activeType);
            };
        });
    }

    // Add city
    document.getElementById('add-city-btn').onclick = function () {
        let name = document.getElementById('new-city-name').value.trim();
        let code = document.getElementById('new-city-code').value.trim();

        if (!name || !code) return alert("Enter both name and code");

        let letter = name.charAt(0).toUpperCase();

        if (!cityGroups[activeType][letter]) {
            cityGroups[activeType][letter] = [];
        }

        cityGroups[activeType][letter].push({ name, code });

        document.getElementById('new-city-name').value = "";
        document.getElementById('new-city-code').value = "";

        renderCityList(activeType);
    };

    // Open modal
    function openCityModal(targetId) {
        modal.style.display = 'block';
        currentInputId = targetId;
        renderCityList("domestic");
        document.querySelectorAll('.city-tab').forEach(t => t.classList.remove('active'));
        document.querySelector('.city-tab[data-city-type="domestic"]').classList.add('active');
    }

    document.getElementById('departure-input').addEventListener('click', () => openCityModal('departure-input'));
    document.getElementById('destination-input').addEventListener('click', () => openCityModal('destination-input'));

    // Close modal
    closeModal.onclick = () => modal.style.display = 'none';
    window.onclick = e => { if (e.target == modal) modal.style.display = 'none'; };

    // Switch tabs
    document.querySelectorAll('.city-tab').forEach(tab => {
        tab.addEventListener('click', function () {
            document.querySelectorAll('.city-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            renderCityList(this.dataset.cityType);
        });
    });

});


// form
 // JavaScript Logic
       /* document.addEventListener('DOMContentLoaded', function () {

            // --- 2. City Selection Modal Setup ---
            const modal = document.getElementById('city-selection-modal');
            const closeModal = document.querySelector('.city-close');
            const cityGroups = {
                domestic: {
                    'G': ['Guangzhou', 'Guilin', 'Guiyang', 'Golmud', 'Guangyuan', 'Ganzhou', 'Guoluo'],
                    'H': ['Hangzhou', 'Huangshan', 'Haikou', 'Hohhot', 'Hanzhong', 'Hefei', 'Huai’an'],
                    'J': ['Jingdezhen', 'Jilin', 'Jining', 'Jiujiang', 'Jinggangshan', 'Jiamusi', 'Jinan', 'Jinzhou']
                },
                international: {
                    'T': ['Taipei', 'Tokyo', 'Toronto', 'Toulouse'],
                    'S': ['Seoul', 'Singapore', 'Sydney', 'San Francisco'],
                    'B': ['Bangkok', 'Berlin', 'Boston']
                }
            };
            let currentInputId = ''; // To track which input triggered the modal

            function renderCityList(type) {
                const container = document.getElementById('city-list-container');
                container.innerHTML = '';
                const data = cityGroups[type];

                for (const letter in data) {
                    let groupHtml = `<div class="city-group">`;
                    groupHtml += `<div class="city-group-letter">${letter}</div>`;
                    data[letter].forEach(city => {
                        // City name and IATA code combined (e.g., Shanghai (SHA))
                        const cityDisplay = city.split(' ')[0] + ' (CODE)';
                        groupHtml += `<span class="city-item" data-city-value="${cityDisplay}">${cityDisplay}</span>`;
                    });
                    groupHtml += `</div>`;
                    container.innerHTML += groupHtml;
                }

                // Add click event listeners to city items
                document.querySelectorAll('.city-item').forEach(item => {
                    item.addEventListener('click', function () {
                        document.getElementById(currentInputId).value = this.dataset.cityValue;
                        modal.style.display = 'none';
                    });
                });
            }

            // Open Modal
            document.getElementById('departure-input').addEventListener('click', function () {
                modal.style.display = 'block';
                currentInputId = 'departure-input';
                renderCityList('domestic'); // Default to domestic tab
                document.querySelectorAll('.city-tab').forEach(t => t.classList.remove('active'));
                document.querySelector('.city-tab[data-city-type="domestic"]').classList.add('active');
            });

            document.getElementById('destination-input').addEventListener('click', function () {
                modal.style.display = 'block';
                currentInputId = 'destination-input';
                renderCityList('domestic'); // Default to domestic tab
                document.querySelectorAll('.city-tab').forEach(t => t.classList.remove('active'));
                document.querySelector('.city-tab[data-city-type="domestic"]').classList.add('active');
            });

            // Close Modal
            closeModal.onclick = function () {
                modal.style.display = 'none';
            }

            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            }

            // City Tab Switching
            document.querySelectorAll('.city-tab').forEach(tab => {
                tab.addEventListener('click', function () {
                    document.querySelectorAll('.city-tab').forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    renderCityList(this.dataset.cityType);
                });
            });

            // Initial state for placeholder/default values
            updateDatePlaceholder(departureDateInput, '2025-11-07');
            updateDatePlaceholder(returnDateInput, '2025-11-10');
        }); */
      document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll('.airline-detail-item').forEach(detail => {

        const img = detail.querySelector(".large-logo");
        const desc = detail.querySelector(".description-text");
        const editBtn = detail.querySelector(".edit-btn");
        const saveBtn = detail.querySelector(".save-btn");
        const fileInput = detail.querySelector(".img-upload-input");
        const airlineId = detail.dataset.airlineId;

        // Load saved image/text
        const savedImg = localStorage.getItem(airlineId + "_img");
        const savedText = localStorage.getItem(airlineId + "_text");

        if (savedImg) img.src = savedImg;
        if (savedText) desc.textContent = savedText;

        // Click camera → upload
        img.addEventListener("click", () => fileInput.click());

        // Handle image upload
        fileInput.addEventListener("change", () => {
            const file = fileInput.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = () => {
                img.src = reader.result;
                localStorage.setItem(airlineId + "_img", reader.result);
            };
            reader.readAsDataURL(file);
        });

        // Enable editing
        editBtn.addEventListener("click", () => {
            desc.setAttribute("contenteditable", "true");
            desc.focus();
            editBtn.style.display = "none";
            saveBtn.style.display = "inline-block";
        });

        // Save text
        saveBtn.addEventListener("click", () => {
            desc.setAttribute("contenteditable", "false");
            localStorage.setItem(airlineId + "_text", desc.textContent);

            saveBtn.style.display = "none";
            editBtn.style.display = "inline-block";
        });

    });

});
/*admin offer-card*/
// --- Edit & Save Offer Cards ---
document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".offer-card").forEach(card => {
        
        const editBtn = card.querySelector(".card-edit");
        const saveBtn = card.querySelector(".card-save");

        const editableFields = card.querySelectorAll("p");

        // Enable edit mode
        editBtn.addEventListener("click", () => {

            editableFields.forEach(f => f.setAttribute("contenteditable", "true"));

            editBtn.style.display = "none";
            saveBtn.style.display = "inline-block";

            card.classList.add("editing");
        });

        // Save changes
        saveBtn.addEventListener("click", () => {

            editableFields.forEach(f => f.setAttribute("contenteditable", "false"));

            saveBtn.style.display = "none";
            editBtn.style.display = "inline-block";

            card.classList.remove("editing");
        });

    });

});

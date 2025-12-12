










// hero
document.addEventListener('DOMContentLoaded', () => {
    // ဤ Hero Section သည် CSS ၏ `:hover` ပေါ်တွင် အဓိက မူတည်သော်လည်း၊ 
    // Touch Device များတွင် အသုံးပြုနိုင်ရန် ဤနေရာတွင် ရေးသားနိုင်ပါသည်။

    const serviceContainer = document.querySelector('.customer-service-container');
    const serviceButton = document.querySelector('.customer-service-button');
    const servicePopup = document.querySelector('.customer-service-popup');

    // Touch devices များအတွက် ခလုတ်ကို နှိပ်လိုက်ပါက Popup ပေါ်စေရန်
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        serviceButton.addEventListener('click', (e) => {
            e.stopPropagation();
            // popup ပေါ်လာ/ပျောက်သွားစေရန် 'active-touch' class ကို အသုံးပြုပါမည်။
            servicePopup.classList.toggle('active-touch'); 
        });

        // Popup ပေါ်နေစဉ် အပြင်ဘက်ကို နှိပ်ပါက ပျောက်စေရန်
        document.addEventListener('click', (e) => {
            if (!serviceContainer.contains(e.target) && servicePopup.classList.contains('active-touch')) {
                servicePopup.classList.remove('active-touch');
            }
        });
        
        // Touch device များအတွက် CSS တွင် active-touch ကို ထပ်ထည့်ရန် လိုအပ်ပါသည်။
        /* CSS တွင်:
        .customer-service-popup.active-touch {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        */
    }
    
    // Video ၏ Source ကို သေချာစစ်ဆေးပါ
    const video = document.querySelector('.background-video-placeholder');
    if (video) {
        // Video file မရှိပါက (သို့) Load မဖြစ်ပါက Static image ထားရန်
        video.addEventListener('error', () => {
            console.error("Video failed to load. Using static fallback.");
            video.style.display = 'none';
            // CSS တွင် .hero-section ကို background-image: url('fallback.jpg'); ဖြင့် ထပ်ထည့်ပေးထားနိုင်ပါသည်။
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {

    const csContainer = document.querySelector(".customer-service-container");
    const editBtn = document.getElementById("editCsBtn");

    const avatarUpload = document.getElementById("avatarUpload");
    const avatarImg = document.getElementById("avatarImg");

    const qrUpload = document.getElementById("qrUpload");
    const qrImg = document.getElementById("qrImg");

    const editableTexts = document.querySelectorAll(".editable-text");

    // ENABLE / DISABLE EDIT MODE
    editBtn.addEventListener("click", () => {
        csContainer.classList.toggle("editing");

        const isEditing = csContainer.classList.contains("editing");

        editableTexts.forEach(el => {
            el.contentEditable = isEditing;
        });

        editBtn.innerHTML = isEditing 
            ? `<i class="fa fa-save"></i>` 
            : `<i class="fa fa-pen"></i>`;
    });

    // IMAGE UPLOAD HANDLER
    function handleUpload(inputElement, targetImage) {
        inputElement.addEventListener("change", function () {
            const file = this.files[0];
            if (file) {
                targetImage.src = URL.createObjectURL(file);
            }
        });
    }

    handleUpload(avatarUpload, avatarImg);
    handleUpload(qrUpload, qrImg);
});







// form
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const multiDistanceForm = document.querySelector('[data-tab-content="multi-distance"]');
    const addTripButton = document.querySelector('.add-trip-button');
    let tripRowCount = multiDistanceForm ? multiDistanceForm.querySelectorAll('.multi-distance-row').length : 0;
    
    // --- Tab Switching Logic ---
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            // 1. Tab Active State ပြောင်းလဲခြင်း
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 2. Form Content ပြောင်းလဲခြင်း
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.dataset.tabContent === targetTab) {
                    content.classList.add('active');
                    // Multi-distance အတွက် row အရေအတွက် စစ်ဆေးခြင်း
                    if (targetTab === 'multi-distance') {
                        updateRemoveButtons();
                    }
                }
            });
        });
    });

    // --- Multi-distance Logic ---

    // X Remove ခလုတ်ကို ပြ/ဖျောက် လုပ်ခြင်း
    function updateRemoveButtons() {
        const rows = multiDistanceForm.querySelectorAll('.multi-distance-row');
        // ၁ လိုင်းထက် ပိုမှ Remove Button ပေါ်မည်
        if (rows.length > 1) {
            rows.forEach(row => row.querySelector('.remove-trip-button').classList.remove('hidden'));
        } else {
            // ၁ လိုင်းပဲ ရှိရင် ဖျောက်ထားပါ
            rows[0].querySelector('.remove-trip-button').classList.add('hidden');
        }
    }

    // Trip Row အသစ် ထပ်ထည့်ခြင်း
    if (addTripButton) {
        addTripButton.addEventListener('click', () => {
            tripRowCount++;
            const newRow = createTripRow(tripRowCount);
            
            // Add another trip ခလုတ် မတိုင်မီ ထည့်သွင်းရန်
            multiDistanceForm.insertBefore(newRow, multiDistanceForm.querySelector('.multi-distance-footer'));
            
            updateRemoveButtons();
        });
    }

    // Row ဖျက်ခြင်း
    multiDistanceForm.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-trip-button')) {
            const rowToRemove = e.target.closest('.multi-distance-row');
            if (rowToRemove) {
                rowToRemove.remove();
                // ဖျက်ပြီးရင် ကျန်ရှိတဲ့ rows တွေရဲ့ Remove Button ကို ပြန်စစ်ဆေးပါ
                updateRemoveButtons();
            }
        }
    });

    // Trip Row Template
    function createTripRow(id) {
        const newRow = document.createElement('div');
        newRow.classList.add('trip-row', 'multi-distance-row');
        newRow.dataset.rowId = id;
        newRow.innerHTML = `
            <div class="input-field">
                <label>Departure</label>
                <input type="text" placeholder="Departure point">
            </div>
            <div class="input-swap">⇌</div>
            <div class="input-field">
                <label>destination</label>
                <input type="text" placeholder="Destination">
            </div>
            <div class="input-field date-input-field">
                <label>Departure date</label>
                <input type="text" placeholder="Departure Date" readonly class="date-picker-input">
            </div>
            <button type="button" class="remove-trip-button" aria-label="Remove trip row">×</button>
        `;
        return newRow;
    }

    // --- Calendar Placeholder Logic (Simplified) ---
    // Date input ကို နှိပ်လျှင် Calendar Placeholder ပေါ်စေရန်
    document.querySelectorAll('.date-picker-input').forEach(input => {
        input.addEventListener('click', (e) => {
            // Calendar ကို ပုံပေါ်နေစေရန် active class ကို toggle လုပ်ခြင်း
            const field = e.target.closest('.date-input-field');
            field.classList.toggle('active');

            // နှိပ်လိုက်သည့်အခါ အခြား calendar များကို ပိတ်ပါ
            document.querySelectorAll('.date-input-field').forEach(otherField => {
                if (otherField !== field) {
                    otherField.classList.remove('active');
                }
            });
            e.stopPropagation(); // document click ကို မရောက်စေရန်
        });
    });

    // Calendar အပြင်ဘက်ကို နှိပ်လျှင် ပိတ်စေရန်
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.date-input-field')) {
            document.querySelectorAll('.date-input-field').forEach(field => {
                field.classList.remove('active');
            });
        }
    });

});








// Special Today section fix
document.addEventListener('DOMContentLoaded', () => {
    // Fix for Special Today section edit icons
    const dealCards = document.querySelectorAll('.deal-card');
    
    dealCards.forEach((card, index) => {
        // Check if edit button already exists
        let editBtn = card.querySelector('.edit-card-btn');
        
        // If not, create one
        if (!editBtn) {
            editBtn = document.createElement('div');
            editBtn.className = 'edit-card-btn';
            editBtn.innerHTML = '<i class="fas fa-edit"></i>';
            card.style.position = 'relative'; // Ensure positioning context
            card.appendChild(editBtn);
        }
        
        // Create save button if not exists
        let saveBtn = card.querySelector('.save-card-btn');
        if (!saveBtn) {
            saveBtn = document.createElement('div');
            saveBtn.className = 'save-card-btn';
            saveBtn.textContent = 'Save';
            saveBtn.style.display = 'none';
            card.appendChild(saveBtn);
        }
        
        // Assign a unique key if not already present
        if (!card.dataset.cardKey) {
            // Find which page this card is on
            const parentSet = card.closest('.deal-card-set');
            const pageIndex = Array.from(document.querySelectorAll('.deal-card-set')).indexOf(parentSet);
            const cardIndex = Array.from(parentSet.querySelectorAll('.deal-card')).indexOf(card);
            card.dataset.cardKey = `deals_page${pageIndex+1}_card${cardIndex+1}`;
        }
        
        // Load saved data if present
        const saved = localStorage.getItem(card.dataset.cardKey);
        if (saved) {
            try {
                const data = JSON.parse(saved);
                // Update fields if saved data exists
                if (data.route) {
                    const routeEl = card.querySelector('.route');
                    if (routeEl) routeEl.innerText = data.route;
                }
                if (data.date) {
                    const dateEl = card.querySelector('.date');
                    if (dateEl) dateEl.innerText = data.date;
                }
                if (data['market-price']) {
                    const priceEl = card.querySelector('.market-price');
                    if (priceEl) priceEl.innerText = data['market-price'];
                }
                if (data.aircraft) {
                    const aircraftEl = card.querySelector('.aircraft');
                    if (aircraftEl) aircraftEl.innerText = data.aircraft;
                }
                if (data['offer-price']) {
                    const offerEl = card.querySelector('.offer-price');
                    if (offerEl) offerEl.innerText = data['offer-price'];
                }
            } catch(e) {
                console.error('Invalid saved card data', e);
            }
        }
        
        let isEditing = false;
        
        const startEdit = () => {
            if (isEditing) return;
            isEditing = true;
            saveBtn.style.display = 'block';
            editBtn.style.display = 'none';
            
            // Replace text elements with inputs
            const fields = ['route','date','market-price','aircraft','offer-price'];
            fields.forEach(fname => {
                const p = card.querySelector(`.${fname}`);
                if (!p) return;
                const value = p.innerText.trim();
                const input = document.createElement('input');
                input.type = 'text';
                input.value = value;
                input.className = 'edit-input';
                
                if (fname === 'market-price' || fname === 'offer-price') {
                    input.classList.add('price');
                }
                
                input.dataset.fieldName = fname;
                p.replaceWith(input);
            });
            
            // Focus first input
            const firstInput = card.querySelector('.edit-input');
            if (firstInput) firstInput.focus();
        };
        
        const saveEdit = () => {
            if (!isEditing) return;
            isEditing = false;
            saveBtn.style.display = 'none';
            editBtn.style.display = 'flex';
            
            // Replace inputs with text elements and save data
            const dataToSave = {};
            card.querySelectorAll('.edit-input').forEach(input => {
                const fname = input.dataset.fieldName || 'field';
                const text = input.value.trim();
                const p = document.createElement('p');
                p.className = fname;
                p.innerText = text;
                input.replaceWith(p);
                dataToSave[fname] = text;
            });
            
            // Save to localStorage
            localStorage.setItem(card.dataset.cardKey, JSON.stringify(dataToSave));
        };
        
        // Event listeners
        editBtn.addEventListener('click', startEdit);
        saveBtn.addEventListener('click', saveEdit);
    });
});


// special today
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.deals-container');
    const prevButton = document.querySelector('.prev-deal-button');
    const nextButton = document.querySelector('.next-deal-button');
    const cardSets = document.querySelectorAll('.deal-card-set');
    const totalPages = cardSets.length;
    let currentPage = 0; // 0-based index

    function updateCarousel() {
        // တစ်မျက်နှာစာ အပြည့် (100% width) ရွှေ့ရန်
        const offset = -currentPage * 100;
        container.style.transform = `translateX(${offset}%)`;

        // Next/Previous ခလုတ်များ update လုပ်ခြင်း
        prevButton.disabled = currentPage === 0;
        nextButton.disabled = currentPage === totalPages - 1;
    }

    // Next Button Function
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            updateCarousel();
        }
    });

    // Previous Button Function
    prevButton.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updateCarousel();
        }
    });

    // စတင်ပွဲထုတ်ခြင်း
    updateCarousel(); 
});















// advantages
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.advantage-cards-container');
    const prevButton = document.querySelector('.prev-advantage-button');
    const nextButton = document.querySelector('.next-advantage-button');
    const cards = document.querySelectorAll('.advantage-card');
    const cardCount = cards.length;
    // တစ်ကြိမ်ပြမည့် ကတ်အရေအတွက် (CSS media query အတိုင်း လိုက်ပြောင်းရန်)
    let visibleCards = 4; 
    let currentIndex = 0; // လက်ရှိပြသနေသည့် ပထမဆုံးကတ်၏ index
    const scrollAmount = 4; // တစ်ခါနှိပ်လျှင် ရွှေ့မည့် ကတ်အရေအတွက်

    // လက်ရှိ မျက်နှာပြင်အရွယ်အစားပေါ် မူတည်၍ visibleCards ကို ချိန်ညှိပါ
    function updateVisibleCards() {
        if (window.innerWidth <= 600) {
            visibleCards = 1;
        } else if (window.innerWidth <= 900) {
            visibleCards = 2;
        } else if (window.innerWidth <= 1200) {
            visibleCards = 3;
        } else {
            visibleCards = 4;
        }
    }

    function updateCarousel() {
        // ရွှေ့မည့် distance
        const cardWidth = container.querySelector('.advantage-card').offsetWidth + 20; // card width + gap
        const offset = -currentIndex * cardWidth;
        container.style.transform = `translateX(${offset}px)`;

        // Next/Previous ခလုတ်များ update လုပ်ခြင်း
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= cardCount - visibleCards;

        // မှိန်မှိန်လေး ပေါ်နေမည့် ကတ်ကို စီမံခြင်း
        cards.forEach((card, index) => {
            card.classList.remove('next-faint');
            if (index === currentIndex + visibleCards && index < cardCount) {
                card.classList.add('next-faint');
            }
        });
        
        // Next ခလုတ်မပေါ်တော့ရင် နောက်ဆုံးကတ်ကို မှိန်ခြင်းမှ ဖယ်ထုတ်ပါ
        if (nextButton.disabled) {
            cards.forEach(card => card.classList.remove('next-faint'));
        }
    }

    // Next Button Function
    nextButton.addEventListener('click', () => {
        let newIndex = currentIndex + scrollAmount;
        if (newIndex > cardCount - visibleCards) {
            newIndex = cardCount - visibleCards; // နောက်ဆုံးပြနိုင်သည့် ကတ်သို့ ရွှေ့ပါ
        }
        currentIndex = newIndex;
        updateCarousel();
    });

    // Previous Button Function
    prevButton.addEventListener('click', () => {
        let newIndex = currentIndex - scrollAmount;
        if (newIndex < 0) {
            newIndex = 0;
        }
        currentIndex = newIndex;
        updateCarousel();
    });

    // စတင်ချိန်နှင့် Window Resize လုပ်ချိန်
    window.addEventListener('resize', () => {
        updateVisibleCards();
        updateCarousel();
    });
    
    // စတင်ပွဲထုတ်ခြင်း
    updateVisibleCards();
    updateCarousel();

    // EDIT FUNCTIONALITY
    // Assign stable keys to cards so we can persist edits
    cards.forEach((card, index) => {
        const key = `advantage_card_${index}`;
        card.dataset.cardKey = key;

        // Load saved data if present
        const saved = localStorage.getItem(key);
        if (saved) {
            try {
                const data = JSON.parse(saved);
                // For each known field, update if saved
                if (data.image) card.querySelector('.advantage-image').src = data.image;
                if (data.overlayTitle) card.querySelector('.overlay-title').innerText = data.overlayTitle;
                if (data.overlayText) card.querySelector('.overlay-text').innerText = data.overlayText;
                if (data.advantageName) card.querySelector('.advantage-name').innerText = data.advantageName;
                if (data.advantageDetail) card.querySelector('.advantage-detail').innerText = data.advantageDetail;
            } catch(e) {
                console.error('Invalid saved card data', e);
            }
        }

        // Setup edit/save behavior
        const editBtn = card.querySelector('.edit-card-btn');
        const imageUpload = card.querySelector('.image-upload');
        const advantageImage = card.querySelector('.advantage-image');

        let isEditing = false;

        const startEdit = () => {
            if (isEditing) return;
            isEditing = true;
            card.classList.add('editing');
            
            // Make all editable elements contentEditable
            card.querySelectorAll('.editable-text').forEach(el => {
                el.contentEditable = true;
            });
        };

        const saveEdit = () => {
            if (!isEditing) return;
            isEditing = false;
            card.classList.remove('editing');
            
            // Make all editable elements non-editable
            card.querySelectorAll('.editable-text').forEach(el => {
                el.contentEditable = false;
            });

            // Gather data to save
            const dataToSave = {
                image: advantageImage.src,
                overlayTitle: card.querySelector('.overlay-title').innerText,
                overlayText: card.querySelector('.overlay-text').innerText,
                advantageName: card.querySelector('.advantage-name').innerText,
                advantageDetail: card.querySelector('.advantage-detail').innerText
            };

            // Save to localStorage using card's key
            const key = card.dataset.cardKey;
            if (key) {
                localStorage.setItem(key, JSON.stringify(dataToSave));
            }
        };

        // Event listeners
        editBtn.addEventListener('click', () => {
            if (isEditing) {
                saveEdit();
            } else {
                startEdit();
            }
        });

        // Handle image upload
        advantageImage.addEventListener('click', () => {
            if (isEditing) {
                imageUpload.click();
            }
        });

        imageUpload.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    advantageImage.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    });
});
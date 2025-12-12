function initAirlineEditor() {
    document.querySelectorAll('.airline-detail-item').forEach(detail => {

        const img = detail.querySelector(".large-logo");
        const desc = detail.querySelector(".description-text");
        const editBtn = detail.querySelector(".edit-btn");
        const saveBtn = detail.querySelector(".save-btn");
        const fileInput = detail.querySelector(".img-upload-input");
        const airlineId = detail.dataset.airlineId;

        // Load saved data
        const savedImg = localStorage.getItem(airlineId + "_img");
        const savedText = localStorage.getItem(airlineId + "_text");

        if (savedImg) img.src = savedImg;
        if (savedText) desc.textContent = savedText;

        // Click image = upload
        img.addEventListener("click", () => fileInput.click());

        // Upload image from local
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

        // Edit description
        editBtn.addEventListener("click", () => {
            desc.contentEditable = true;
            editBtn.style.display = "none";
            saveBtn.style.display = "inline-block";
            desc.focus();
        });

        // Save description
        saveBtn.addEventListener("click", () => {
            desc.contentEditable = false;
            localStorage.setItem(airlineId + "_text", desc.textContent);

            saveBtn.style.display = "none";
            editBtn.style.display = "inline-block";
        });
    });
}

function initOfferCardEditor() {

    document.querySelectorAll(".offer-card").forEach(card => {
        const editBtn = card.querySelector(".offer-edit-btn");

        editBtn.addEventListener("click", () => {
            const isEditing = card.classList.toggle("edit-mode");

            if (isEditing) {
                enableOfferEdit(card);
                editBtn.innerHTML = "<i class='fa fa-save'></i>";
            } else {
                saveOfferEdit(card);
                editBtn.innerHTML = "<i class='fa fa-pen'></i>";
            }
        });
    });

    function enableOfferEdit(card) {
        card.querySelectorAll(".editable-offer").forEach(el => {
            const value = el.innerText;
            const field = el.dataset.field;
            el.outerHTML = `<input class="offer-input" data-field="${field}" value="${value}">`;
        });
    }

    function saveOfferEdit(card) {
        card.querySelectorAll(".offer-input").forEach(input => {
            const value = input.value;
            const field = input.dataset.field;

            let newHtml = "";

            if (field === "discount") {
                newHtml = `<span class="discount editable-offer" data-field="discount">${value}</span>`;
            }
            else if (field === "priceValue") {
                newHtml = `<span class="price-value editable-offer" data-field="priceValue">${value}</span>`;
            }
            else {
                newHtml = `<p class="${field} editable-offer" data-field="${field}">${value}</p>`;
            }

            input.outerHTML = newHtml;
        });
    }
}

function initCitySelector() {

    const modal = document.getElementById('city-selection-modal');
    const closeModal = document.querySelector('.city-close');
    const cityListContainer = document.getElementById('city-list-container');

    let currentInputId = '';
    let activeType = "domestic";

    let cityGroups = {
        // your city lists...
    };

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

    function attachCityEvents() {
        document.querySelectorAll('.city-item').forEach(item => {

            // Select city
            item.addEventListener('click', e => {
                if (e.target.classList.contains('city-edit') ||
                    e.target.classList.contains('city-delete')) return;

                document.getElementById(currentInputId).value =
                    `${item.dataset.city} (${item.dataset.code})`;

                modal.style.display = 'none';
            });

            // Edit city
            item.querySelector('.city-edit').onclick = () => {
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
            item.querySelector('.city-delete').onclick = () => {
                let letter = item.dataset.letter;
                let index = item.dataset.index;

                cityGroups[activeType][letter].splice(index, 1);

                renderCityList(activeType);
            };
        });
    }

    function openCityModal(targetId) {
        modal.style.display = 'block';
        currentInputId = targetId;

        renderCityList("domestic");
        document.querySelectorAll('.city-tab').forEach(t => t.classList.remove('active'));
        document.querySelector('.city-tab[data-city-type="domestic"]').classList.add('active');
    }

    document.getElementById('departure-input')
        .addEventListener('click', () => openCityModal('departure-input'));

    document.getElementById('destination-input')
        .addEventListener('click', () => openCityModal('destination-input'));

    closeModal.onclick = () => modal.style.display = 'none';
    window.onclick = e => { if (e.target == modal) modal.style.display = 'none'; };

    document.querySelectorAll('.city-tab').forEach(tab => {
        tab.addEventListener('click', function () {
            document.querySelectorAll('.city-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            renderCityList(this.dataset.cityType);
        });
    });
}

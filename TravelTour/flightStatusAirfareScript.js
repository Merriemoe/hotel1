

// form
 // JavaScript Logic
        document.addEventListener('DOMContentLoaded', function () {

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
        });
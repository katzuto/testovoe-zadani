console.log("rendered")
const  updateIds = (selectedMap) => {
    const selectedIdsList = document.getElementById('selectedIds');
    selectedIdsList.innerHTML = '';

    selectedMap.forEach((value, key) => {
        if (value) {
            const listItem = document.createElement('li');
            listItem.textContent = key;
            selectedIdsList.appendChild(listItem);
        }
    });

    updateUrl(selectedMap);
}

const updateUrl = (selectedMap) => {
    const selectedCheckboxes = Array.from(selectedMap)
        .filter(([key, value]) => value)
        .map(([key]) => key);

    const urlParams = new URLSearchParams();
    if (selectedCheckboxes.length > 0) {
        urlParams.set('selected', selectedCheckboxes.join(','));
    } else {
        urlParams.delete('selected');
    }

    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    history.replaceState(null, '', newUrl);
}


const getCheckboxes = (checkboxes, selectedMap) => {
    const urlParams = new URLSearchParams(window.location.search);
    const selected = urlParams.get('selected');
    if (selected) {
        const selectedIds = selected.split(',');
        checkboxes.forEach((checkbox) => {
            if (selectedIds.includes(checkbox.id)) {
                checkbox.checked = true;
                selectedMap.set(checkbox.id, true);
            } else {
                checkbox.checked = false;
                selectedMap.set(checkbox.id, false);
            }
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('#checkboxes input[type="checkbox"]');
    const selectedMap = new Map();

    checkboxes.forEach((checkbox) => {
        selectedMap.set(checkbox.id, checkbox.checked);

        checkbox.addEventListener('change', () => {
            selectedMap.set(checkbox.id, checkbox.checked);
            updateIds(selectedMap);
        });
    });

    getCheckboxes(checkboxes, selectedMap);
    updateIds(selectedMap);
});

const selectedIds = [];

const updateIds = () => {
    const selectedIdsList = document.getElementById('selectedIds');
    selectedIdsList.innerHTML = '';

    selectedIds.forEach((id) => {
        const listItem = document.createElement('li');
        listItem.textContent = id;
        selectedIdsList.appendChild(listItem);
    });

    updateUrl(selectedIds);
}

const updateUrl = (selectedIds) => {
    const urlParams = new URLSearchParams();
    if (selectedIds.length > 0) {
        urlParams.set('selected', selectedIds.join(','));
    } else {
        urlParams.delete('selected');
    }

    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    history.replaceState(null, '', newUrl);
}

const getCheckboxes = (checkboxes) => {
    const urlParams = new URLSearchParams(window.location.search);
    const selected = urlParams.get('selected');
    if (selected) {
        const selectedIdsFromUrl = selected.split(',');
        checkboxes.forEach((checkbox) => {
            if (selectedIdsFromUrl.includes(checkbox.id)) {
                checkbox.checked = true;
                selectedIds.push(checkbox.id);
            } else {
                checkbox.checked = false;
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('#checkboxes input[type="checkbox"]');

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                selectedIds.push(checkbox.id);
            } else {
                const index = selectedIds.indexOf(checkbox.id);
                if (index > -1) {
                    selectedIds.splice(index, 1);
                }
            }
            updateIds();
        });
    });

    getCheckboxes(checkboxes);
    updateIds();
});

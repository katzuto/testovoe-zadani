const fs = require('fs');
const { JSDOM } = require('jsdom');
const { updateIds } = require('./index');

const html = fs.readFileSync('./index.html', 'utf-8');

let window;
let document;

beforeEach(() => {
    window = new JSDOM(html).window;
    document = window.document;
    global.document = document;
    global.window = window;

    require('./index.js');
});

afterEach(() => {
    window.close();
});

test('должен обновлять список выбранных фильтров', () => {
    const selectedMap = new Map();
    selectedMap.set('1', true);
    selectedMap.set('2', true);
    selectedMap.set('3', false);


    updateIds(selectedMap);

    const selectedIdsList = document.getElementById('selectedIds');
    const listItems = selectedIdsList.getElementsByTagName('li');

    expect(listItems.length).toBe(2); // Должно быть 2 элемента
    expect(listItems[0].textContent).toBe('1'); // Проверка первого элемента
    expect(listItems[1].textContent).toBe('2'); // Проверка второго элемента
});

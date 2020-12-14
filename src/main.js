'use strict';

const sortOfCloth = ['top', 'pants', 'skirt'];
const sortOfColor = ['blue', 'yellow', 'pink'];
const sortOfGender = ['male', 'female'];
const sortOfSize = ['big', 'small'];
const numOfCloth = 15;

//const clothList = document.querySelector('.clothList');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

//랜덤으로 옷 리스트를 만들고, json파일로 만드는 함수. 이건 node.js로 실행시켜야 함. terminal에서 node main 이렇게
//프로젝트를 실행할때는 쓰지 않는 함수임
function makeClothList(num) {
    let clothInfos = new Array();
    for (let i = 0; i < num; i++) {
        const clothRanVal = getRandomInt(0, sortOfCloth.length);
        const colorRanVal = getRandomInt(0, sortOfColor.length);
        const genderRanVal = getRandomInt(0, sortOfGender.length);
        const sizeRanVal = getRandomInt(0, sortOfSize.length);

        let clothInfo = {
            top: sortOfCloth[clothRanVal],
            color: sortOfColor[colorRanVal],
            gender: sortOfGender[genderRanVal],
            size: sortOfSize[sizeRanVal],
        };

        //pants는 남자, skirt는 여자만 입음
        if (clothInfo.cloth == sortOfCloth[1]) {
            clothInfo.gender = sortOfGender[0];
        } else if (clothInfo.cloth == sortOfCloth[2]) {
            clothInfo.gender = sortOfGender[1];
        }

        //image 추가, random으로 정해진 값을 통해서 구한다.
        clothInfo.image = `img/${clothInfo.color}_${clothInfo.top[0]}.png`;
        clothInfos.push(clothInfo);
    }
    return clothInfos;
}

function makeJsonFile(items) {
    let json = JSON.stringify(items);
    let fs = require('fs'),
        jsonData = json;
    fs.writeFile('../data/data.json', jsonData, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

function loadItems() {
    return fetch('data/data.json').then((response) => response.json());
}

function createHTMLString(item) {
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.top}"/>
        <span class="explain">${item.gender}, ${item.size}</span>
    </li>
    `;
}

function displayItems(items) {
    console.log(items);
    const container = document.querySelector('.items');
    container.innerHTML = items.map((item) => createHTMLString(item)).join('');
}

function onButtonClick(event, items) {
    const key = event.target.dataset.key;
    const value = event.target.dataset.value;

    let filterItems = new Array();

    //key, value 값에 따라 필요한 값들만 넣는다.
    for (const item of items) {
        if (key === 'type') {
            if (item.top === value) {
                filterItems.push(item);
            }
        } else {
            if (item.color === value) {
                filterItems.push(item);
            }
        }
    }
    displayItems(filterItems);
}

function updateDisplayItems(event, items) {
    const key = event.target.dataset.key;
    const value = event.target.dataset.value;
    const container = document.querySelector('.items');

    if (key === 'type') {
        container.innerHTML = items
            .map((item) => (item.top === value ? createHTMLString(item) : ''))
            .join('');
    } else {
        container.innerHTML = items
            .map((item) => (item.color === value ? createHTMLString(item) : ''))
            .join('');
    }
}

function setEventListener(items) {
    const logoBtn = document.querySelector('.logo button');
    const filterBtns = document.querySelector('.actions');
    logoBtn.addEventListener('click', () => displayItems(items));
    filterBtns.addEventListener('click', (event) =>
        updateDisplayItems(event, items),
    );
}

// // 이 부분은 data.json파일 만들기
// makeJsonFile(makeClothList(numOfCloth));

//하는것, json파일을 읽어와서 html로 뿌리기
loadItems()
    .then((items) => {
        displayItems(items);
        setEventListener(items);
    })
    .catch(console.log);

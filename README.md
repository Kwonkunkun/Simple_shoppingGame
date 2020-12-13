# Simple_shoppingGame
- 자바스크립트를 이용한 미니게임 만들기

[참고 사이트](https://www.youtube.com/watch?v=We2Kv1HMGvc)

<img width="568" alt="image" src="https://user-images.githubusercontent.com/59603575/102006692-e6a2db80-3cd7-11eb-8676-00dbff100e28.png">

---
## 프로젝트 개요
- 유튜브 드림코딩by엘리 자바스크립트를 이용한 미니 게임 만들기 프로젝트
- html, javascript, css 이용
- 버튼 클릭시 필터링

<img src="https://user-images.githubusercontent.com/59603575/102006877-3635d700-3cd9-11eb-8dd4-a9788c784c01.gif" width="50%" />

---
## 추가 사항

### 랜덤으로 옷 리스트 만들기
1. 랜덤으로 옷 리스트 만든다.
2. json파일로 저장
3. json파일을 가져와서 리스트를 만든다.

```javascript
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
```

---




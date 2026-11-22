function showInside() {
    document.getElementById('inside').style.display = 'block';
    document.getElementById('outside').style.display = 'none';
}
function showOutside() {
    document.getElementById('inside').style.display = 'none';
    document.getElementById('outside').style.display = 'block';
}

showInside();

const houseGrid = document.getElementById('house-grid');
const placementMessage = document.getElementById('placement-message');

const gridColumns = 8;
const gridRows = 6;

// 가구별 기본 정보
const furnitureItems = {
    bear: {
        name : '곰인형',
        emoji : '🧸',
        width : 1,
        height : 1
    },
    sofa: {
        name : '소파',
        emoji: '🛋',
        width : 2,
        height : 1        
    }
};
let selectedFurniture = null;
let rotated = false;
let hoverCell = null;

// 이미 가구가 차지한 칸 저장
const occupiedCells = [];

// 반투명 미리보기 생성
const preview = document.createElement('div');
preview.className = 'furniture-preview';
houseGrid.appendChild(preview);

// 현재 가구의 회전된 크기 반환
function getFurnitureSize() {
    if (rotated){
        return {
            width: selectedFurniture.height,
            height: selectedFurniture.width
        };
    }
    return {
        width : selectedFurniture.width,
        height : selectedFurniture.height
    };
}

// 배치 가능한 위치인지 검사
function canPlace(column, row, width, height){
    // 격자 밖으로 벗어나는지 확인
    if (column < 0 || row < 0 || column + width > gridColumns || row + height > gridRows){
        return false;
    }
    // 이미 가구가 놓인 칸인지 확인
    for (let r = row; r < row + height; r++){
        for (let c = column; c < column + width; c++){
            if (occupiedCells.includes(r*gridColumns + c)){
                return false;
            }
        }
    }
    return true;
}

// 배치 미리보기 업데이트
function updatePreview(column, row){
    if (selectedFurniture === null){
        preview.style.display = 'none';
        return ;
    }
    const size = getFurnitureSize();
    preview.style.display = 'flex';

    // 미리보기 위치
    preview.style.left = (column / gridColumns * 100) + '%';
    preview.style.top = (row / gridRows * 100) + '%';

    // 미리보기 크기
    preview.style.width = (size.width / gridColumns * 100) + '%';
    preview.style.height = (size.height / gridRows * 100) + '%';

    // 미리보기 가구 표시
    preview.textContent = '';
    const emoji = document.createElement('span');
    emoji.textContent = selectedFurniture.emoji;
    if (rotated){
        emoji.style.transform = 'rotate(90deg)';
    }
    preview.appendChild(emoji);
    
    // 배치 가능 여부에 따라 색상 변경
    if (canPlace(column, row, size.width, size.height)){
        preview.style.backgroundColor = 'rgba(100, 180, 100, 0.4)';
        preview.style.borderColor = '#6a9b60';
        placementMessage.textContent = '배치 가능한 위치입니다.';
    }
    else {
        preview.style.backgroundColor = 'rgba(220, 80, 80, 0.4)';
        preview.style.borderColor = '#c65a5a';
        placementMessage.textContent = '배치할 수 없는 위치입니다.';
    }
}

// 배치할 가구 선택
function selectFurniture(itemId) {
    selectedFurniture = furnitureItems[itemId];
    rotated = false;
    hoverCell = null;
    preview.style.display = 'none';
    placementMessage.textContent = selectedFurniture.name + '을(를) 배치할 위치를 선택하세요.';
}

// 가구 회전
function rotateFurniture(){
    if (selectedFurniture === null){
        placementMessage.textContent = '먼저 가구를 선택하세요.';
        return ;
    }
    rotated = !rotated;
    
    placementMessage.textContent = '가구 방향을 변경했습니다.';

    // 현재 미리보기 위치에서 바로 회전 반영
    if (hoverCell !== null) {
        updatePreview(hoverCell.column, hoverCell.row);
    }
}

// 마우스가 움직이면 미리보기만 표시
houseGrid.addEventListener('mousemove', function(event){
    if (selectedFurniture === null){
        return;
    }
    const rect = houseGrid.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const column = Math.floor(x / (rect.width / gridColumns));
    const row = Math.floor(y / (rect.height / gridRows));

    if (column < 0 || column >= gridColumns || row < 0 || row >= gridRows){
        preview.style.display = 'none';
        hoverCell = null;
        return;
    }
    hoverCell = {column: column, row: row};
    updatePreview(column, row);
});

// 마우스가 격자 밖으로 나가면 미리보기 숨김
houseGrid.addEventListener('mouseleave', function(){
    hoverCell = null;
    preview.style.display = 'none';
});

// 격자를 클릭했을 때만 실제 가구 배치
houseGrid.addEventListener('click', function(event) {
    if(selectedFurniture === null){
        return;
    }
    const rect = houseGrid.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const column = Math.floor(x/ (rect.width / gridColumns));
    const row = Math.floor(y/ (rect.height / gridRows));
    const size = getFurnitureSize();

    // 배치할 수 없다면 가구를 생성하지 않음
    if (!canPlace(column, row, size.width, size.height)){
        placementMessage.textContent = '배치할 수 없는 위치입니다.';
        return;
    }

    // 가구 생성
    const furniture = document.createElement('div');
    furniture.className = 'placed-furniture';
    // 이모지 생성 및 회전
    const emoji = document.createElement('span');
    emoji.textContent = selectedFurniture.emoji;
    if (rotated){
        emoji.style.transform = 'rotate(90deg)';
    }
    furniture.appendChild(emoji);
    // 배치 위치
    furniture.style.left = (column / gridColumns * 100) + '%';
    furniture.style.top = (row / gridRows * 100) + '%';
    // 배치 크기
    furniture.style.width = (size.width / gridColumns * 100) + '%';
    furniture.style.height = (size.height / gridRows * 100) + '%';
    
    houseGrid.appendChild(furniture);

    // 배치한 가구가 차지하는 칸 기록
    for (let r = row; r < row + size.height; r++){
        for (let c = column; c < column + size.width; c++){
            occupiedCells.push(r * gridColumns + c);
        }
    }

    selectedFurniture = null;
    rotated = false;
    hoverCell = null;
    preview.style.display = 'none';
    placementMessage.textContent = '가구가 배치되었습니다.';
});

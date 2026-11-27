import { openDb } from '../src/db.js';

const db = openDb(); // 데이터베이스 연결

// 상품 목록
// [id, 이름, 대분류, 소분류, 구매가격, 가로, 세로, 판매가격, 성장시간]
const products = [
    // 가구 - 소파, 침대, 옷장, 책상, 의자, 책장, 테이블
    [1, '모던 소파', 'furniture', 'sofa', 50, 2, 1],
    [2, '핑크 소파', 'furniture', 'sofa', 60, 2, 1],
    [3, '노랑 소파', 'furniture', 'sofa', 60, 2, 1],
    [4, '하늘 소파', 'furniture', 'sofa', 60, 2, 1],
    [5, '화이트 패브릭 소파', 'furniture', 'sofa', 85, 2, 1],
    [6, '브라운 패브릭 소파', 'furniture', 'sofa', 85, 2, 1],
    [7, '원목 싱글 침대', 'furniture', 'bed', 70, 2, 2],
    [8, '모던 침대', 'furniture', 'bed', 80, 2, 2],
    [9, '핑크 캐노피 침대', 'furniture', 'bed', 150, 2, 2],
    [10, '화이트 캐노피 침대', 'furniture', 'bed', 150, 2, 2],
    [11, '원목 옷장', 'furniture', 'wardrobe', 80, 2, 2],
    [12, '모던 옷장', 'furniture', 'wardrobe', 90, 2, 2],
    [13, '화이트 옷장', 'furniture', 'wardrobe', 100, 2, 2],
    [14, '빈티지 옷장', 'furniture', 'wardrobe', 130, 2, 2],
    [15, '원목 책상', 'furniture', 'desk', 60, 2, 1],
    [16, '모던 책상', 'furniture', 'desk', 70, 2, 1],
    [17, '화이트 책상', 'furniture', 'desk', 80, 2, 1],
    [18, '게이밍 책상', 'furniture', 'desk', 100, 2, 1],
    [19, '원목 의자', 'furniture', 'chair', 20, 1, 1],
    [20, '모던 의자', 'furniture', 'chair', 30, 1, 1],
    [21, '화이트 의자', 'furniture', 'chair', 40, 1, 1],
    [22, '게이밍 의자', 'furniture', 'chair', 50, 1, 1],
    [23, '쿠션 의자', 'furniture', 'chair', 60, 1, 1],
    [24, '원목 책장', 'furniture', 'bookshelf', 70, 2, 1],
    [25, '모던 책장', 'furniture', 'bookshelf', 80, 2, 1],
    [26, '화이트 책장', 'furniture', 'bookshelf', 90, 2, 2],
    [27, '낮은 책장', 'furniture', 'bookshelf', 45, 1, 1],
    [28, '원목 식탁', 'furniture', 'table', 60, 2, 1],
    [29, '협탁', 'furniture', 'table', 30, 2, 1],
    [30, '서랍장', 'furniture', 'drawer', 55, 2, 1],

    // 장식품 - 화분, 거울, 시계, 조명, 인형
    [31, '곰인형', 'decoration', 'doll', 20, 1, 1],
    [32, '토끼인형', 'decoration', 'doll', 20, 1, 1],
    [33, '고양이인형', 'decoration', 'doll', 20, 1, 1],
    [34, '작은 화분', 'decoration', 'plant', 15, 1, 1],
    [35, '해바라기 화분', 'decoration', 'plant', 30, 1, 1],
    [36, '다육이 화분', 'decoration', 'plant', 20, 1, 1],
    [37, '스탠드 조명', 'decoration', 'lamp', 40, 1, 1],
    [38, '버섯 조명', 'decoration', 'lamp', 45, 1, 1],
    [39, '토끼 무드등', 'decoration', 'lamp', 25, 1, 1],
    [40, '원형 러그', 'decoration', 'rug', 35, 2, 2],
    [41, '하트 러그', 'decoration', 'rug', 45, 2, 2],
    [42, '꽃병', 'decoration', 'vase', 60, 2, 1],
    [43, '전신 거울', 'decoration', 'mirror', 55, 2, 1],
    [44, '탁상 거울', 'decoration', 'mirror', 25, 1, 1],

    // 벽 꾸미기
    [45, '모던 시계', 'decoration', 'clock', 30, 1, 1],
    [46, '빈티지 시계', 'decoration', 'clock', 50, 1, 1],
    [47, '기본 사각 창문', 'wall', 'window', 50, 2, 1],
    [48, '둥근 창문', 'wall', 'window', 65, 1, 1],
    [49, '아치형 창문', 'wall', 'window', 80, 2, 1],
    [50, '커튼 달린 창문', 'wall', 'window', 100, 2, 1],
    [51, '풍경 액자', 'wall', 'painting', 30, 1, 1],
    [52, '고양이 액자', 'wall', 'painting', 35, 1, 1],
    [53, '꽃 그림 액자', 'wall', 'painting', 40, 1, 1],
    [54, '원형 벽시계', 'wall', 'clock', 45, 1, 1],
    [55, '뻐꾸기시계', 'wall', 'clock', 75, 1, 1],
    [56, '크림 벽지', 'wall', 'wallpaper', 50, null, null],
    [57, '핑크 벽지', 'wall', 'wallpaper', 60, null, null],
    [58, '하늘 벽지', 'wall', 'wallpaper', 60, null, null],

    // 바닥
    [59, '원목 바닥', 'floor', 'wood', 60, null, null],
    [60, '화이트 우드 바닥', 'floor', 'wood', 70, null, null],
    [61, '체크 타일 바닥', 'floor', 'tile', 80, null, null],
    [62, '핑크 타일 바닥', 'floor', 'tile', 90, null, null],
    [63, '하늘 타일 바닥', 'floor', 'tile', 90, null, null],
    [64, '노랑 타일 바닥', 'floor', 'tile', 90, null, null],
    
    // 씨앗 - 마지막 두 값은 판매가 & 성장 시간(분)
    [65, '당근 씨앗','seed','vegetable',5, null, null, 10, 1],
    [66, '감자 씨앗', 'seed', 'vegetable', 8, null, null, 16, 2],
    [67, '토마토 씨앗','seed','vegetable',10, null, null, 20, 3],
    [68, '딸기 씨앗', 'seed', 'fruit', 15, null, null, 30, 5],
    [69, '옥수수 씨앗', 'seed', 'vegetable', 20, null, null, 40, 7],
    [70, '호박 씨앗', 'seed', 'vegetable', 25, null, null, 50, 10],
    [71, '수박 씨앗', 'seed', 'fruit', 30, null, null, 60, 12],

    // 밭
    [72, '기본 밭', 'plot', 'farmland', 30, 1, 1],

    // 마당 꾸미기
    [73, '작은 연못', 'yard', 'pond', 100, 2, 2],
    [74, '작은 분수', 'yard', 'fountain', 120, 2, 2],
    [75, '원목 울타리', 'outdoor', 'fence', 15, 1, 1],
    [76, '하얀 울타리', 'outdoor', 'fence', 20, 1, 1],
    [77, '꽃무늬 울타리', 'outdoor', 'fence', 25, 1, 1],
    [78, '작은 나무', 'outdoor', 'tree', 30, 1, 1],
    [79, '사과 나무', 'outdoor', 'tree', 70, 2, 2],
    [80, '벚꽃 나무', 'outdoor', 'tree', 100, 2, 2],
    [81, '돌길', 'outdoor', 'path', 5, 1, 1],
    [82, '피크닉 테이블', 'outdoor', 'outdoor_decor', 85, 2, 2],
    [83, '정원 가로등', 'outdoor', 'outdoor_decor', 50, 2, 1],
    [84, '정원 벤치', 'outdoor', 'outdoor_decor', 70, 2, 1]
];


// 초기 상품 등록
const insertItems = db.prepare(`
    INSERT INTO items
    (id, name, category, subcategory, buy_price, width, height, sell_price, grow_minutes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
        name=excluded.name,
        category=excluded.category,
        subcategory=excluded.subcategory,
        buy_price=excluded.buy_price,
        width=excluded.width,
        height=excluded.height,
        sell_price=excluded.sell_price,
        grow_minutes=excluded.grow_minutes`);

// 상품 목록을 하나씩 등록
db.exec('BEGIN');
try{
    for(const product of products){
        const[
            id, name, category, subcategory, buy_price, width, height,
            sell_price=null, grow_minutes=null] = product;
        

        console.log('현재 등록 중인 상품:', id, name);

        insertItems.run(
            id, name, category, subcategory, buy_price,
            width, height, sell_price, grow_minutes
        );
    }
    db.exec('COMMIT');
}catch (error) {
    db.exec('ROLLBACK');
    db.close();
    throw error;
}

// 등록된 상품 수와 상품 목록 조회
const count = db.prepare('SELECT COUNT(*) AS total FROM items').get();

// 등록된 상품 목록 조회
const items = db.prepare('SELECT * FROM items ORDER BY id').all();

console.log('SQLite 데이터베이스 초기화 완료');
console.log('등록된 상품 수:', count.total);
console.table(items);

db.close(); // 데이터베이스 연결 종료
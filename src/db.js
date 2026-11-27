import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// DB 파일 위치
const dbPath = fileURLToPath(new URL('../data/game.sqlite', import.meta.url));

// 데이터베이스 연결
export function openDb() {
    //data 폴더가 없으면 생성
    mkdirSync(dirname(dbPath), { recursive: true });
    const db = new DatabaseSync(dbPath); // SQLite 연결 기능

    // 외래키 검사 활성화
    db.exec('PRAGMA foreign_keys = ON;');
    // 테이블 생성
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            username TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            coins INTEGER NOT NULL DEFAULT 100
                CHECK (coins >= 0)
        );
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            subcategory TEXT,
            buy_price INTEGER NOT NULL 
                CHECK (buy_price >= 0),
            width INTEGER,
            height INTEGER,
            image_path TEXT
        );
    `);

    // 기존 items 테이블에 필요한 컬럼 추가
    const columns = db.prepare("PRAGMA table_info(items)").all();
    if (!columns.some(column => column.name === 'sell_price')) {
        db.exec("ALTER TABLE items ADD COLUMN sell_price INTEGER CHECK (sell_price >= 0)");
    }
    if (!columns.some(column => column.name === 'grow_minutes')) {
        db.exec("ALTER TABLE items ADD COLUMN grow_minutes INTEGER CHECK (grow_minutes >= 0)");
    }
    return db;
}
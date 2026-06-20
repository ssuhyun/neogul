import { openDB } from 'idb';

const DB_NAME = 'MusicalSchedulerDB';
const STORE_NAME = 'schedules';
const DB_VERSION = 1;

// 1. 데이터베이스 초기화 및 연결
export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // 'schedules'라는 이름의 저장소(테이블) 생성, 키값은 id로 지정
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

// 2. 모든 스케줄 불러오기 (데이터가 없으면 초기 데이터 저장)
export const getSchedules = async () => {
  const db = await initDB();
  const allData = await db.getAll(STORE_NAME);

  // 만약 DB가 비어있다면 초기 데이터(initialData)를 넣어줍니다.
  if (allData.length === 0) {
    const initialData = [
      { id: 1, title: '뮤지컬 지킬앤하이드', seat: '오피석 3열 5번', date: '2026-07-10' },
      { id: 2, title: '뮤지컬 레미제라블', seat: '1층 B구역 7열 12번', date: '2026-08-15' }
    ];
    
    // 초기 데이터를 DB에 순서대로 저장
    for (const item of initialData) {
      await db.put(STORE_NAME, item);
    }
    return initialData;
  }

  return allData;
};

// 3. 데이터 추가 및 수정 (id가 같으면 수정, 없으면 추가됩니다)
export const saveSchedule = async (schedule) => {
  const db = await initDB();
  // schedule 객체 예시: { id: 16872123, title: '뮤지컬명', seat: '자리정보', date: '날짜' }
  await db.put(STORE_NAME, schedule);
};

// 4. 데이터 삭제
export const deleteSchedule = async (id) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};
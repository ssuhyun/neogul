import { useState, useEffect, useRef } from 'react';
import { openDB } from 'idb';

// 📅 최초 접속 시에만 들어가는 초기 스케줄 기본 데이터
const defaultInitialData = [
  // --- 6월 일정 ---
  { id: 1, month: 6, date: "06.16", day: "화", time: "20:00", actor1: "임준혁", actor2: "정우연", mainActor: "원태민", seat: "" },
  { id: 2, month: 6, date: "06.17", day: "수", time: "16:00", actor1: "선한국", actor2: "김수연", mainActor: "김찬종", seat: "" },
  { id: 3, month: 6, date: "06.17", day: "수", time: "20:00", actor1: "온주완", actor2: "여은", mainActor: "유현석", seat: "" },
  { id: 4, month: 6, date: "06.18", day: "목", time: "20:00", actor1: "최연우", actor2: "김지온", mainActor: "이진혁", seat: "" },
  { id: 5, month: 6, date: "06.19", day: "금", time: "20:00", actor1: "임준혁", actor2: "김수연", mainActor: "김찬종", seat: "" },
  { id: 6, month: 6, date: "06.20", day: "토", time: "15:00", actor1: "선한국", actor2: "정우연", mainActor: "원태민", seat: "" },
  { id: 7, month: 6, date: "06.20", day: "토", time: "19:00", actor1: "여은", actor2: "유현석", mainActor: "이진혁", seat: "" },
  { id: 8, month: 6, date: "06.21", day: "일", time: "14:00", actor1: "온주완", actor2: "최연우", mainActor: "김찬종", seat: "" },
  { id: 9, month: 6, date: "06.21", day: "일", time: "18:00", actor1: "임준혁", actor2: "김수연", mainActor: "김지온", seat: "" },
  { id: 10, month: 6, date: "06.23", day: "화", time: "20:00", actor1: "선한국", actor2: "최연우", mainActor: "김지온", seat: "" },
  { id: 11, month: 6, date: "06.24", day: "수", time: "16:00", actor1: "정우연", actor2: "원태민", mainActor: "이진혁", seat: "" },
  { id: 12, month: 6, date: "06.24", day: "수", time: "20:00", actor1: "온주완", actor2: "여은", mainActor: "김찬종", seat: "" },
  { id: 13, month: 6, date: "06.25", day: "목", time: "20:00", actor1: "선한국", actor2: "김수연", mainActor: "유현석", seat: "" },
  { id: 14, month: 6, date: "06.26", day: "금", time: "14:00", actor1: "임준혁", actor2: "여은", mainActor: "김지온", seat: "" },
  { id: 15, month: 6, date: "06.26", day: "금", time: "18:00", actor1: "최연우", actor2: "김찬종", mainActor: "이진혁", seat: "" },
  { id: 16, month: 6, date: "06.27", day: "토", time: "15:00", actor1: "온주완", actor2: "김수연", mainActor: "원태민", seat: "" },
  { id: 17, month: 6, date: "06.27", day: "토", time: "19:00", actor1: "선한국", actor2: "정우연", mainActor: "김찬종", seat: "" },
  { id: 18, month: 6, date: "06.28", day: "일", time: "14:00", actor1: "여은", actor2: "유현석", mainActor: "이진혁", seat: "" },
  { id: 19, month: 6, date: "06.28", day: "일", time: "18:00", actor1: "임준혁", actor2: "최연우", mainActor: "유현석", seat: "" },
  { id: 20, month: 6, date: "06.30", day: "화", time: "20:00", actor1: "온주완", actor2: "정우연", mainActor: "김찬종", seat: "" },

  // --- 7월 일정 ---
  { id: 21, month: 7, date: "07.07", day: "화", time: "20:00", actor1: "임준혁", actor2: "정우연", mainActor: "원태민", seat: "" },
  { id: 22, month: 7, date: "07.08", day: "수", time: "16:00", actor1: "선한국", actor2: "김수연", mainActor: "김찬종", seat: "" },
  { id: 23, month: 7, date: "07.08", day: "수", time: "20:00", actor1: "온주완", actor2: "여은", mainActor: "유현석", seat: "" },
  { id: 24, month: 7, date: "07.09", day: "목", time: "20:00", actor1: "최연우", actor2: "김지온", mainActor: "이진혁", seat: "" },
  { id: 25, month: 7, date: "07.10", day: "금", time: "20:00", actor1: "임준혁", actor2: "김수연", mainActor: "김찬종", seat: "" },
  { id: 26, month: 7, date: "07.11", day: "토", time: "15:00", actor1: "선한국", actor2: "정우연", mainActor: "원태민", seat: "" },
  { id: 27, month: 7, date: "07.11", day: "토", time: "19:00", actor1: "여은", actor2: "유현석", mainActor: "이진혁", seat: "" },
  { id: 28, month: 7, date: "07.12", day: "일", time: "14:00", actor1: "온주완", actor2: "최연우", mainActor: "김찬종", seat: "" },
  { id: 29, month: 7, date: "07.12", day: "일", time: "18:00", actor1: "임준혁", actor2: "김수연", mainActor: "김지온", seat: "" },
  { id: 30, month: 7, date: "07.14", day: "화", time: "20:00", actor1: "선한국", actor2: "최연우", mainActor: "김지온", seat: "" },
  { id: 31, month: 7, date: "07.15", day: "수", time: "16:00", actor1: "정우연", actor2: "원태민", mainActor: "이진혁", seat: "" },
  { id: 32, month: 7, date: "07.15", day: "수", time: "20:00", actor1: "온주완", actor2: "여은", mainActor: "김찬종", seat: "" },
  { id: 33, month: 7, date: "07.16", day: "목", time: "20:00", actor1: "선한국", actor2: "김수연", mainActor: "유현석", seat: "" },
  { id: 34, month: 7, date: "07.17", day: "금", time: "14:00", actor1: "임준혁", actor2: "여은", mainActor: "김지온", seat: "" },
  { id: 35, month: 7, date: "07.17", day: "금", time: "18:00", actor1: "최연우", actor2: "김찬종", mainActor: "이진혁", seat: "" },
  { id: 36, month: 7, date: "07.18", day: "토", time: "15:00", actor1: "온주완", actor2: "김수연", mainActor: "원태민", seat: "" },
  { id: 37, month: 7, date: "07.18", day: "토", time: "19:00", actor1: "선한국", actor2: "정우연", mainActor: "김찬종", seat: "" },
  { id: 38, month: 7, date: "07.19", day: "일", time: "14:00", actor1: "여은", actor2: "유현석", mainActor: "이진혁", seat: "" },
  { id: 39, month: 7, date: "07.19", day: "일", time: "18:00", actor1: "임준혁", actor2: "최연우", mainActor: "유현석", seat: "" },
  { id: 40, month: 7, date: "07.21", day: "화", time: "20:00", actor1: "온주완", actor2: "정우연", mainActor: "김찬종", seat: "" },
  { id: 41, month: 7, date: "07.22", day: "수", time: "16:00", actor1: "임준혁", actor2: "김수연", mainActor: "김지온", seat: "" },
  { id: 42, month: 7, date: "07.22", day: "수", time: "20:00", actor1: "선한국", actor2: "여은", mainActor: "유현석", seat: "" },
  { id: 43, month: 7, date: "07.23", day: "목", time: "20:00", actor1: "최연우", actor2: "김찬종", mainActor: "이진혁", seat: "" },
  { id: 44, month: 7, date: "07.24", day: "금", time: "20:00", actor1: "온주완", actor2: "정우연", mainActor: "원태민", seat: "" },
  { id: 45, month: 7, date: "07.25", day: "토", time: "15:00", actor1: "임준혁", actor2: "김수연", mainActor: "유현석", seat: "" },
  { id: 46, month: 7, date: "07.25", day: "토", time: "19:00", actor1: "여은", actor2: "김찬종", mainActor: "이진혁", seat: "" },
  { id: 47, month: 7, date: "07.26", day: "일", time: "14:00", actor1: "선한국", actor2: "정우연", mainActor: "김지온", seat: "" },
  { id: 48, month: 7, date: "07.26", day: "일", time: "18:00", actor1: "온주완", actor2: "최연우", mainActor: "원태민", seat: "" }
];

const rowConfigurations = {
  A: 22, B: 23, C: 25, D: 25, E: 25, F: 25, G: 24, H: 25, 
  I: 25, J: 25, K: 25, L: 25, M: 25, N: 24, O: 24, P: 25, Q: 25, R: 26, S: 16
};
const rows = Object.keys(rowConfigurations);

const DB_NAME = 'MusicalSchedulerDB_v2';
const STORE_NAME = 'schedules';
const DB_VERSION = 1;

const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

export default function App() {
  const [schedules, setSchedules] = useState([]);
  const fileInputRef = useRef(null);
  
  // ➕ 스케줄/정산 등록 폼 상태
  const [formData, setFormData] = useState({
    month: 6, date: '', day: '', time: '20:00', actor1: '', actor2: '', mainActor: '이진혁', seat: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchActor, setSearchActor] = useState('');
  
  // 🪑 정산용 좌석 하이라이트 상태
  const [selectedSeatFromMap, setSelectedSeatFromMap] = useState('');

  // 📋 양도 문구 복사용 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalInputs, setModalInputs] = useState({
    musicalName: '뮤지컬 사의 찬미 사찬', 
    transferSeat: '', // ⭐️ [독립 분리] 복사할 때 따로 입력할 양도용 좌석 상태
    discountType: '재관할',
    price: '55,900',
    notice: '증빙 필요, 찾아드릴 수 있습니다',
    twitterTag: '@YeonMyuticket'
  });

  const loadInitialData = async () => {
    const db = await initDB();
    const savedData = await db.getAll(STORE_NAME);
    
    if (savedData.length === 0) {
      for (const item of defaultInitialData) {
        await db.put(STORE_NAME, item);
      }
      setSchedules(defaultInitialData);
    } else {
      setSchedules(savedData.sort((a, b) => a.id - b.id));
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'month' ? Number(value) : value
    }));
  };

  const handleSeatChange = (id, value) => {
    setSchedules(prev =>
      prev.map(item => item.id === id ? { ...item, seat: value.toUpperCase().trim() } : item)
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.date || !formData.actor1 || !formData.actor2 || !formData.mainActor) {
      alert('모든 필수 정보를 입력해 주세요!');
      return;
    }

    const db = await initDB();
    if (editingId) {
      const updatedItem = { ...formData, id: editingId };
      await db.put(STORE_NAME, updatedItem);
      setEditingId(null);
      alert('스케줄이 수정되었습니다! ✏️');
    } else {
      const newItem = { ...formData, id: Date.now() };
      await db.put(STORE_NAME, newItem);
      alert('새로운 스케줄이 추가되었습니다! 📅');
    }

    setFormData({ month: 6, date: '', day: '', time: '20:00', actor1: '', actor2: '', mainActor: '이진혁', seat: '' });
    setSelectedSeatFromMap(''); 
    setShowForm(false);
    loadInitialData();
  };

  const handleEditStart = (item) => {
    setEditingId(item.id);
    setFormData({ ...item });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScheduleDelete = async (id) => {
    if (window.confirm('정말 이 회차 스케줄을 삭제하시겠습니까?')) {
      const db = await initDB();
      await db.delete(STORE_NAME, id);
      alert('스케줄이 삭제되었습니다.');
      loadInitialData();
    }
  };

  const handleAllSave = async () => {
    const db = await initDB();
    for (const item of schedules) {
      await db.put(STORE_NAME, item);
    }
    alert('모든 변경사항이 내장 DB에 저장되었습니다! 💾');
  };

  const handleExportFile = () => {
    if (schedules.length === 0) {
      alert('백업할 데이터가 없습니다.');
      return;
    }
    const dataStr = JSON.stringify(schedules, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `sachan_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        if (!Array.isArray(importedData)) throw new Error('올바른 형식이 아닙니다.');

        if (window.confirm('파일을 불러오면 현재 기록이 덮어써집니다. 진행하시겠습니까?')) {
          const db = await initDB();
          await db.clear(STORE_NAME);
          for (const item of importedData) {
            await db.put(STORE_NAME, item);
          }
          alert('성공적으로 데이터를 복구했습니다! 📂');
          loadInitialData();
        }
      } catch (error) {
        alert('파일 읽기 실패: ' + error.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = async () => {
    if (window.confirm('정말 최초 기본 스케줄 상태로 되돌리시겠습니까?')) {
      const db = await initDB();
      await db.clear(STORE_NAME);
      loadInitialData();
      alert('초기화가 완료되었습니다.');
    }
  };

  // 복사 버튼 클릭 시 팝업 열기
  const handleOpenCopyModal = (item) => {
    setSelectedItem(item);
    // 팝업 열 때 기본값으로 스케줄 리스트에 적혀있던 정산용 좌석을 일단 띄워주되, 빈 값이면 빈칸으로 채워둠
    setModalInputs(prev => ({
      ...prev,
      transferSeat: item.seat || ''
    }));
    setIsModalOpen(true);
  };

  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setModalInputs(prev => ({ ...prev, [name]: value }));
  };

  // 모달 내 최종 복사 실행 함수
  const executeFinalCopy = () => {
    if (!selectedItem) return;
    const item = selectedItem;
    
    // ⭐️ 정산용 좌석이 아닌, 사용자가 팝업창에서 직접 입력한 양도용 좌석(transferSeat)을 가져옴
    const finalSeat = modalInputs.transferSeat.trim() === "" ? "미입력 좌석" : modalInputs.transferSeat.toUpperCase();

    const copyText = `${modalInputs.musicalName} 양도\n${item.date}(${item.day}) ${item.time}\n${item.actor1} ${item.actor2} ${item.mainActor}\n${finalSeat}\n${modalInputs.discountType} ${modalInputs.price}(${modalInputs.notice})\n\n${modalInputs.twitterTag}`;

    navigator.clipboard.writeText(copyText)
      .then(() => {
        alert(`${item.date} 회차의 양도 문구가 클립보드에 최종 복사되었습니다! 📋`);
        setIsModalOpen(false);
      })
      .catch(err => alert("복사 실패: " + err));
  };

  const watchedShows = schedules.filter(item => item.seat && item.seat.trim() !== "");
  const leeJinHyukCount = watchedShows.filter(item => item.mainActor === "이진혁").length;
  const otherActorsCount = watchedShows.filter(item => item.mainActor !== "이진혁").length;
  const totalLeeJinHyuk = schedules.filter(item => item.mainActor === "이진혁").length;

  const filteredSchedules = schedules.filter(item => {
    if (!searchActor.trim()) return true;
    const query = searchActor.trim();
    return (
      item.actor1.includes(query) ||
      item.actor2.includes(query) ||
      item.mainActor.includes(query)
    );
  });

  return (
    <div className="p-4 md:p-6 flex flex-col items-center font-sans max-w-xl mx-auto relative min-h-screen pb-24">
      
      {/* 🚢 헤더 및 제어 버튼 */}
      <header className="w-full flex flex-col gap-2 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-emerald-800">🚢 사의찬미 정산 & 관리</h1>
          <button onClick={() => { setShowForm(!showForm); setEditingId(null); }} className="px-3 py-1 bg-teal-600 text-white rounded text-xs font-bold">
            {showForm ? '닫기' : '➕ 스케줄 추가'}
          </button>
        </div>
        
        <div className="flex justify-between items-center bg-slate-100 p-2 rounded-lg gap-1 text-xs">
          <div className="flex gap-1">
            <button onClick={handleExportFile} className="px-2 py-1 bg-amber-600 text-white rounded font-bold">📥 파일 백업</button>
            <button onClick={() => fileInputRef.current.click()} className="px-2 py-1 bg-indigo-600 text-white rounded font-bold">📤 파일 복구</button>
            <input type="file" ref={fileInputRef} onChange={handleImportFile} accept=".json" className="hidden" />
          </div>
          <div>
            <button onClick={handleReset} className="px-2 py-1 bg-red-500 text-white rounded font-bold">초기화</button>
          </div>
        </div>
      </header>

      {/* ➕ 스케줄 추가 / 수정 입력 폼 (정산용 좌석 입력칸) */}
      {showForm && (
        <form onSubmit={handleFormSubmit} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6 flex flex-col gap-3">
          <h3 className="font-bold text-slate-700 text-sm">{editingId ? '✏️ 스케줄 정보 수정하기' : '📅 새로운 회차 등록하기'}</h3>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <select name="month" value={formData.month} onChange={handleInputChange} className="p-2 border rounded">
              <option value={6}>6월</option>
              <option value={7}>7월</option>
            </select>
            <input type="text" name="date" placeholder="날짜" value={formData.date} onChange={handleInputChange} className="p-2 border rounded" />
            <input type="text" name="day" placeholder="요일" value={formData.day} onChange={handleInputChange} className="p-2 border rounded" />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <input type="text" name="time" placeholder="시간" value={formData.time} onChange={handleInputChange} className="p-2 border rounded" />
            <input type="text" name="mainActor" placeholder="주연" value={formData.mainActor} onChange={handleInputChange} className="p-2 border rounded" />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <input type="text" name="actor1" placeholder="배우 1" value={formData.actor1} onChange={handleInputChange} className="p-2 border rounded" />
            <input type="text" name="actor2" placeholder="배우 2" value={formData.actor2} onChange={handleInputChange} className="p-2 border rounded" />
          </div>
          <div className="flex flex-col gap-1 text-xs">
            <label className="font-bold text-purple-700 text-[10px]">📊 정산 및 관람 기록용 좌석 (현황판 반영)</label>
            <input type="text" name="seat" placeholder="내장 DB 저장 및 관람 배치도에 불 켜지는 좌석" value={formData.seat} onChange={handleInputChange} className="p-2 border rounded font-bold text-purple-700 uppercase" />
          </div>
          <div className="flex gap-2 text-xs mt-1">
            <button type="submit" className="flex-1 py-2 bg-emerald-600 text-white font-bold rounded">
              {editingId ? '수정 완료하기' : '이 스케줄 저장하기'}
            </button>
          </div>
        </form>
      )}

      {/* 📊 관람 횟수 대시보드 */}
      <section className="w-full bg-white border border-slate-100 rounded-lg shadow-sm p-4 flex justify-around text-center mb-4">
        <div>
          <p className="text-xs font-bold text-purple-600">이진혁</p>
          <p className="text-lg font-black mt-1 text-slate-700">{leeJinHyukCount} <span className="text-xs font-normal text-slate-400">/ {totalLeeJinHyuk}회</span></p>
        </div>
        <div className="border-x border-slate-100 px-6">
          <p className="text-xs font-bold text-slate-500">타배우</p>
          <p className="text-lg font-black mt-1 text-slate-700">{otherActorsCount} <span className="text-xs font-normal text-slate-400">/ {schedules.length - totalLeeJinHyuk}회</span></p>
        </div>
        <div>
          <p className="text-xs font-bold text-emerald-600">합계</p>
          <p className="text-lg font-black mt-1 text-slate-700">{watchedShows.length} <span className="text-xs font-normal text-slate-400">/ {schedules.length}회</span></p>
        </div>
      </section>

      {/* 🔍 배우 검색/필터링 입력창 */}
      <section className="w-full mb-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="🔍 출연 배우 이름으로 필터링 (예: 정우연, 이진혁)" 
            value={searchActor}
            onChange={(e) => setSearchActor(e.target.value)}
            className="w-full p-2.5 text-xs border border-slate-300 rounded-xl bg-slate-50 shadow-sm focus:outline-none focus:border-teal-500 font-medium placeholder:text-slate-400"
          />
          {searchActor && (
            <button onClick={() => setSearchActor('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center pb-0.5">×</button>
          )}
        </div>
      </section>

      {/* 📅 월별 스케줄 출력 리스트 */}
      <main className="w-full flex flex-col gap-2.5 mb-8 text-sm">
        {[6, 7].map(m => {
          const monthSchedules = filteredSchedules.filter(item => item.month === m);
          if (monthSchedules.length === 0) return null;
          
          return (
            <div key={m} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className={`p-2.5 text-white font-bold text-center text-xs tracking-wider ${m === 6 ? 'bg-teal-600' : 'bg-emerald-700'}`}>{m}월 일정</div>
              <div className="divide-y divide-slate-100">
                {monthSchedules.map((item) => (
                  <div key={item.id} className="p-2.5 flex items-center justify-start hover:bg-slate-50 transition-colors w-full overflow-x-auto">
                    <div className="flex flex-col items-start w-[55px] flex-shrink-0 mr-3">
                      <span className="font-bold text-slate-700 text-xs tabular-nums">{item.date}({item.day})</span>
                      <span className="text-[9px] text-slate-400 bg-slate-100 px-1 rounded mt-0.5 tabular-nums">{item.time}</span>
                    </div>
                    <div className="text-slate-500 text-xs w-[52px] flex-shrink-0 truncate text-left font-medium mr-1">{item.actor1}</div>
                    <div className="text-slate-500 text-xs w-[52px] flex-shrink-0 truncate text-left font-medium mr-3">{item.actor2}</div>
                    <div className={`text-xs font-bold w-[45px] text-center flex-shrink-0 mr-3 ${item.mainActor === '이진혁' ? 'text-purple-600' : 'text-slate-600'}`}>{item.mainActor}</div>
                    <div className="w-[50px] flex-shrink-0">
                      <input type="text" placeholder="정산좌석" value={item.seat || ""} onChange={(e) => handleSeatChange(item.id, e.target.value)} className="w-full p-1 text-[10px] border border-purple-200 text-purple-700 rounded text-center font-bold uppercase placeholder:font-normal placeholder:text-[9px] h-6" title="정산용 실관람 좌석" />
                    </div>
                    <div className="flex gap-0.5 flex-shrink-0 ml-auto">
                      <button onClick={() => handleOpenCopyModal(item)} className="px-1.5 py-1 text-[10px] bg-amber-500 text-white rounded font-medium h-6 flex items-center">복사</button>
                      <button onClick={() => handleEditStart(item)} className="px-1.5 py-1 text-[10px] bg-slate-500 text-white rounded font-medium h-6 flex items-center">수정</button>
                      <button onClick={() => handleScheduleDelete(item.id)} className="px-1.5 py-1 text-[10px] bg-red-400 text-white rounded font-medium h-6 flex items-center">삭제</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </main>

      {/* 🪑 실시간 내 좌석 배치도 시각화 (정산용 좌석 기반) */}
      <section className="w-full bg-slate-900 text-white rounded-xl p-4 flex flex-col items-center shadow-md overflow-x-auto">
        <div className="w-full text-center py-1 bg-slate-800 text-slate-400 rounded font-black tracking-widest text-xs mb-3">S T A G E</div>
        
        <div className="flex gap-3 justify-center items-center mb-4 text-[10px] bg-slate-800 px-3 py-1.5 rounded-md text-slate-300 font-medium">
          <span className="text-slate-400 font-bold">정산 기록 횟수별:</span>
          <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 bg-teal-600 rounded-sm"></div>1회</div>
          <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 bg-emerald-500 rounded-sm"></div>2회</div>
          <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 bg-amber-500 rounded-sm"></div>3회</div>
          <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 bg-rose-600 rounded-sm"></div>4회 이상</div>
        </div>

        <div className="flex flex-col gap-1 w-full min-w-[420px]">
          {rows.map(row => (
            <div key={row} className="flex items-center gap-0.5 justify-center">
              <span className="w-4 text-[10px] font-black text-slate-500 text-center mr-1">{row}</span>
              {Array.from({ length: rowConfigurations[row] }, (_, i) => {
                const seatNumber = i + 1;
                const seatKey = `${row}-${seatNumber}`;
                const matchingShows = schedules.filter(s => s.seat === seatKey);
                const visitCount = matchingShows.length;
                
                let bgClass = "bg-slate-700 text-white";
                if (visitCount === 1) bgClass = "bg-teal-600";
                else if (visitCount === 2) bgClass = "bg-emerald-500";
                else if (visitCount === 3) bgClass = "bg-amber-500";
                else if (visitCount >= 4) bgClass = "bg-rose-600 text-white font-black";

                const isCurrentSelected = selectedSeatFromMap === seatKey;
                const borderClass = isCurrentSelected ? "ring-2 ring-blue-400 ring-offset-1 ring-offset-slate-900 z-10 scale-110" : "";

                return (
                  <div 
                    key={seatNumber} 
                    onClick={() => {
                      setSelectedSeatFromMap(seatKey);
                      setFormData(prev => ({ ...prev, seat: seatKey }));
                      setShowForm(true);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-[18px] h-[18px] rounded-sm text-[9px] flex items-center justify-center font-bold shadow-sm flex-shrink-0 select-none cursor-pointer hover:scale-110 transition-transform ${bgClass} ${borderClass}`} 
                    title={`${seatKey} (내 정산기록: ${visitCount}회) - 클릭 시 스케줄 정산에 반영`}
                  >
                    <span className="leading-none text-center block w-full">{seatNumber}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* 📋 커스텀 양도 문구 팝업 모달 (양도용 좌석 분리 입력) */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
            
            <div className="bg-amber-500 p-4 text-white flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-sm flex items-center gap-1">📋 커스텀 양도 문구 생성</h3>
                <p className="text-[10px] text-amber-100 mt-0.5">{selectedItem.date}({selectedItem.day}) {selectedItem.time} 회차</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-xl font-bold opacity-80 hover:opacity-100 transition-opacity">×</button>
            </div>

            <div className="p-4 flex flex-col gap-3.5 text-xs text-slate-700 bg-slate-50/50">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-500 text-[11px]">작품명 및 헤더</label>
                <input type="text" name="musicalName" value={modalInputs.musicalName} onChange={handleModalInputChange} className="p-2 border border-slate-200 rounded-lg w-full bg-white focus:outline-none focus:border-amber-500 font-medium" />
              </div>

              {/* ⭐️ [독립 분리] 양도 전용 좌석 입력칸 */}
              <div className="flex flex-col gap-1">
                <label className="font-bold text-amber-600 text-[11px]">🕊️ 양도할 좌석 직접 입력</label>
                <input 
                  type="text" 
                  name="transferSeat" 
                  placeholder="예: A-11, OP 2열 중앙 등 자유롭게 작성" 
                  value={modalInputs.transferSeat} 
                  onChange={handleModalInputChange} 
                  className="p-2 border border-amber-300 bg-amber-50/30 rounded-lg w-full focus:outline-none focus:border-amber-500 font-bold text-amber-700 uppercase" 
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-500 text-[11px]">할인 종류</label>
                  <input type="text" name="discountType" value={modalInputs.discountType} onChange={handleModalInputChange} className="p-2 border border-slate-200 rounded-lg w-full bg-white focus:outline-none focus:border-amber-500 font-medium text-center" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-500 text-[11px]">티켓 가격</label>
                  <input type="text" name="price" value={modalInputs.price} onChange={handleModalInputChange} className="p-2 border border-slate-200 rounded-lg w-full bg-white focus:outline-none focus:border-amber-500 font-medium text-center font-mono" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-500 text-[11px]">괄호() 내 안내 문구</label>
                <input type="text" name="notice" value={modalInputs.notice} onChange={handleModalInputChange} className="p-2 border border-slate-200 rounded-lg w-full bg-white focus:outline-none focus:border-amber-500 font-medium" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-500 text-[11px]">하단 검색용 태그</label>
                <input type="text" name="twitterTag" value={modalInputs.twitterTag} onChange={handleModalInputChange} className="p-2 border border-slate-200 rounded-lg w-full bg-white focus:outline-none focus:border-amber-500 font-mono" />
              </div>
            </div>

            <div className="p-3 bg-slate-100 border-t border-slate-200 flex gap-2">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-2 bg-slate-300 text-slate-700 font-bold rounded-xl">취소</button>
              <button onClick={executeFinalCopy} className="flex-1 py-2 bg-amber-500 text-white font-extrabold rounded-xl shadow-md active:scale-95 transition-all">📋 문구 복사하기</button>
            </div>

          </div>
        </div>
      )}

      {/* 🚀 우측 하단 고정 플로팅 좌석저장 버튼 (정산 데이터 일괄 영구 저장) */}
      <div className="fixed bottom-6 right-6 z-50 shadow-lg">
        <button onClick={handleAllSave} className="w-16 h-16 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-full flex flex-col items-center justify-center font-bold transition-all shadow-md group border-2 border-white" title="모든 좌석 정보 저장">
          <span className="text-xl">💾</span>
          <span className="text-[9px] leading-tight mt-0.5">좌석저장</span>
        </button>
      </div>

    </div>
  );
}
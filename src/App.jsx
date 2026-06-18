import { useState } from 'react';

// 📅 이진혁 배우 중심 정산을 위한 6월 + 7월 통합 전체 스케줄 데이터
const initialData = [
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

export default function App() {
  const [schedules, setSchedules] = useState(() => {
    const saved = localStorage.getItem('musical_schedules');
    return saved ? JSON.parse(saved) : initialData;
  });

  const handleSeatChange = (id, value) => {
    setSchedules(prev =>
      prev.map(item => item.id === id ? { ...item, seat: value.toUpperCase().trim() } : item)
    );
  };

  const handleSave = () => {
    localStorage.setItem('musical_schedules', JSON.stringify(schedules));
    alert('데이터가 브라우저에 안전하게 저장되었습니다! 💾');
  };

  const handleLoad = () => {
    const saved = localStorage.getItem('musical_schedules');
    if (saved) {
      setSchedules(JSON.parse(saved));
      alert('저장된 데이터를 불러왔습니다! 📂');
    } else {
      alert('저장된 데이터가 없습니다.');
    }
  };

  const handleReset = () => {
    if (window.confirm('정말 모든 좌석 기록을 초기화하시겠습니까?')) {
      const resetData = schedules.map(item => ({ ...item, seat: "" }));
      setSchedules(resetData);
      localStorage.removeItem('musical_schedules');
    }
  };

  const handleSingleCopy = (item) => {
    const seatInfo = item.seat.trim() === "" ? "미입력 좌석" : item.seat;

    const discountType = window.prompt("1. 할인 종류를 입력하세요:", "재관할");
    if (discountType === null) return;

    const price = window.prompt("2. 티켓 가격을 입력하세요 (숫자 및 단위):", "55,900");
    if (price === null) return;

    const notice = window.prompt("3. 괄호() 안에 들어갈 안내 문구를 입력하세요:", "증빙 필요, 찾아드릴 수 있습니다");
    if (notice === null) return;

    const copyText = `뮤지컬 사의 찬미 사찬 양도\n${item.date}(${item.day}) ${item.time}\n${item.actor1} ${item.actor2} ${item.mainActor}\n${seatInfo}\n${discountType} ${price}(${notice})\n\n@YeonMyuticket`;

    navigator.clipboard.writeText(copyText)
      .then(() => {
        alert(`${item.date} 회차 양도 문구가 클립보드에 복사되었습니다! 📋`);
      })
      .catch(err => {
        alert("복사 실패: ", err);
      });
  };

  // 실시간 통계 계산 (6+7월 통합)
  const watchedShows = schedules.filter(item => item.seat.trim() !== "");
  const leeJinHyukCount = watchedShows.filter(item => item.mainActor === "이진혁").length;
  const otherActorsCount = watchedShows.filter(item => item.mainActor !== "이진혁").length;
  const totalLeeJinHyuk = schedules.filter(item => item.mainActor === "이진혁").length;

  return (
    <div className="p-4 md:p-6 flex flex-col items-center">
      
      {/* 🚢 헤더 타이틀 및 제어 메뉴 */}
      <header className="w-full max-w-md flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-emerald-800 flex items-center gap-2">
          🚢 뮤지컬 사의찬미 정산
        </h1>
        <div className="flex gap-1">
          <button onClick={handleSave} className="btn-save">저장</button>
          <button onClick={handleLoad} className="btn-load">불러오기</button>
          <button onClick={handleReset} className="btn-reset">초기화</button>
        </div>
      </header>

      {/* 📊 관람 횟수 정산 대시보드 */}
      <section className="stats-container">
        <div className="stats-card-border">
          <p className="text-xs font-bold text-purple-600">이진혁</p>
          <p className="text-xl font-black mt-1 text-slate-700">
            {leeJinHyukCount} <span className="text-xs font-normal text-slate-400">/ {totalLeeJinHyuk}회</span>
          </p>
        </div>
        <div className="stats-card-border">
          <p className="text-xs font-bold text-slate-500">타배우 회차</p>
          <p className="text-xl font-black mt-1 text-slate-700">
            {otherActorsCount} <span className="text-xs font-normal text-slate-400">/ {schedules.length - totalLeeJinHyuk}회</span>
          </p>
        </div>
        <div>
          <p className="text-xs font-bold text-emerald-600">합계</p>
          <p className="text-xl font-black mt-1 text-slate-700">
            {watchedShows.length} <span className="text-xs font-normal text-slate-400">/ {schedules.length}회</span>
          </p>
        </div>
      </section>

      {/* 📅 [업데이트] 6월과 7월 스케줄 리스트 분할 출력 목록 */}
      <main className="w-full max-w-md flex flex-col gap-6 mb-8">
        
        {/* 6월 일정 카드 */}
        <div className="schedule-section">
          <div className="schedule-header bg-teal-600">6월 일정</div> {/* 구분을 위해 조금 다르게 준 블루그린 색상 */}
          <div className="divide-y divide-slate-100">
            {schedules.filter(item => item.month === 6).map((item) => (
              <ScheduleRow 
                key={item.id} 
                item={item} 
                onSeatChange={handleSeatChange} 
                onCopyClick={handleSingleCopy}
              />
            ))}
          </div>
        </div>

        {/* 7월 일정 카드 */}
        <div className="schedule-section">
          <div className="schedule-header">7월 일정</div>
          <div className="divide-y divide-slate-100">
            {schedules.filter(item => item.month === 7).map((item) => (
              <ScheduleRow 
                key={item.id} 
                item={item} 
                onSeatChange={handleSeatChange} 
                onCopyClick={handleSingleCopy}
              />
            ))}
          </div>
        </div>

      </main>

      {/* 🪑 실시간 내 좌석 배치도 시각화 */}
      <section className="seat-grid-container">
        <div className="stage-bar">S T A G E</div>
        
        <div className="flex flex-col gap-1 w-full min-w-[360px]">
          {rows.map(row => (
            <div key={row} className="flex items-center gap-1 justify-center">
              <span className="w-4 text-[10px] font-black text-slate-400 text-center mr-1">{row}</span>
              
              {Array.from({ length: rowConfigurations[row] }, (_, i) => {
                const seatNumber = i + 1;
                const seatKey = `${row}-${seatNumber}`;
                const matchingShow = schedules.find(s => s.seat === seatKey);
                
                let seatClass = "seat-empty";
                if (matchingShow) {
                  seatClass = matchingShow.mainActor === "이진혁" ? "seat-booked-ji" : "seat-booked-tae";
                }

                return (
                  <div key={seatNumber} className={`seat-dot ${seatClass}`} title={seatKey}>
                    {seatNumber}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <p className="text-[10px] text-slate-400 text-center mt-4">💡 좌석 칸에 'A-11', 'B-5'를 입력하면 배치도에 실시간 불이 켜집니다.</p>
      </section>

    </div>
  );
}

// 스케줄 단일 행 컴포넌트
function ScheduleRow({ item, onSeatChange, onCopyClick }) {
  const isLee = item.mainActor === "이진혁";
  
  return (
    <div className="schedule-row">
      <div className="flex flex-col items-start min-w-[50px]">
        <span className="font-bold text-slate-600">{item.date}({item.day})</span>
        <span className="text-[9px] font-medium text-slate-400 bg-slate-50 px-1 py-0.5 rounded mt-0.5">{item.time}</span>
      </div>
      
      <div className="text-slate-500 font-medium truncate max-w-[100px]">
        {item.actor1} {item.actor2}
      </div>

      <div className="min-w-[55px] text-center text-xs font-bold">
        <span className={isLee ? 'text-purple-600' : 'text-slate-600'}>
          {item.mainActor}
        </span>
      </div>

      <input 
        type="text" 
        placeholder="미입력"
        value={item.seat}
        onChange={(e) => onSeatChange(item.id, e.target.value)}
        className="seat-input !w-16"
      />

      <button 
        onClick={() => onCopyClick(item)} 
        className="btn-copy !px-1.5 !py-1 !text-[10px] bg-amber-500 hover:bg-amber-600 text-white rounded transition-all active:scale-95"
      >
        복사
      </button>
    </div>
  );
}
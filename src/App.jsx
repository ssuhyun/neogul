import { Routes, Route, useNavigate } from 'react-router-dom';
import Gloomy from './lee/gloomy.jsx'; // 👈 이진혁 배우 정산판
import Western from './park/western.jsx'; // 👈 이진혁 배우 정산판

export default function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* 🏠 기본 홈(/) 외에 /neogul 이나 /neogul/ 로 접속해도 디렉토리 버튼이 나오도록 추가 */}
      <Route path="/" element={<MainDirectory navigate={navigate} />} />
      <Route path="/neogul" element={<MainDirectory navigate={navigate} />} />
      <Route path="/neogul/" element={<MainDirectory navigate={navigate} />} />

      {/* 🚀 http://localhost:5173/neogul/lee/ 라우트 */}
      <Route path="/neogul/lee" element={<Gloomy />} />

      {/* 🚀 http://localhost:5173/neogul/park/ 라우트 */}
      <Route path="/neogul/park" element={<Western />} />
    </Routes>
  );
}

// 📦 코드가 중복되지 않게 메인 디렉토리 화면을 컴포넌트로 분리했습니다.
function MainDirectory({ navigate }) {
  return (
    <div className="p-6 max-w-md mx-auto mt-16 text-center font-sans">
      <h1 className="text-2xl font-black text-slate-800 tracking-tight">
        스케줄러 디렉토리
      </h1>
      <p className="text-xs font-medium text-slate-400 mt-1.5 mb-8">
        원하는 관리 주소 또는 폴더를 선택하세요.
      </p>

      <div className="flex flex-col gap-3.5">
        {/* 🍇 lee 폴더 이동 버튼 */}
        <button 
          onClick={() => navigate('/neogul/lee')}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all active:scale-[0.98] flex items-center justify-between px-6 group"
        >
          <div className="flex flex-col items-start">
            <span className="text-white text-base">🦊 lee 폴더 페이지</span>
            <span className="text-[10px] text-purple-200 font-normal mt-0.5">이진혁 배우 중심 정산</span>
          </div>
          <span className="text-xl group-hover:translate-x-1 transition-transform">➔</span>
        </button>

        {/* 🌳 park 폴더 이동 버튼 */}
        <button 
          onClick={() => navigate('/neogul/park')}
          className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl font-bold text-sm shadow-md transition-all active:scale-[0.98] flex items-center justify-between px-6 group"
        >
          <div className="flex flex-col items-start">
            <span className="text-white text-base">🐿️ park 폴더 페이지</span>
            <span className="text-[10px] text-emerald-200 font-normal mt-0.5">박규원 배우 중심 정산</span>
          </div>
          <span className="text-xl group-hover:translate-x-1 transition-transform">➔</span>
        </button>
      </div>
    </div>
  );
}
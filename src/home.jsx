import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fdf6ee] flex items-center justify-center px-6">

      <div className="text-center">

        <div className="inline-block bg-white px-4 py-2 rounded-full shadow-md rotate-[-3deg] mb-6">
          🎓 Graduation Memory 2026
        </div>

        <h1 className="text-6xl font-black text-[#5a3d2b]">
          Scrapbook Memory
        </h1>

        <p className="mt-6 text-lg text-[#6b4d3a] max-w-xl">
          Sebuah website kecil untuk seseorang yang spesial ❤️
        </p>

        <button
          onClick={() => navigate('/memory')}
          className="mt-10 bg-[#d88c5a] hover:scale-105 transition text-white px-8 py-4 rounded-2xl shadow-xl text-lg font-semibold"
        >
          Buka Kenangan 💌
        </button>

      </div>
    </div>
  );
}
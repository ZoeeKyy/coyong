import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

function TypingText({ text, speed = 20, center = false }) {
  const [displayedText, setDisplayedText] = useState("");
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    if (!startTyping) return;

    let index = 0;

    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index));

      index++;

      if (index > text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, startTyping]);

  return (
    <motion.p
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 1,
        ease: "easeOut",
      }}
      onViewportEnter={() => setStartTyping(true)}
      viewport={{ once: true }}
      className={`text-lg md:text-2xl leading-loose text-[#6b4d3a] font-['Dancing_Script'] whitespace-pre-line ${
        center ? "text-center" : "text-justify"
      }`}
    >
      {displayedText}

      <span className="animate-pulse">|</span>
    </motion.p>
  );
}

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fdf6ee] overflow-hidden relative">
      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-30"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-30"></div>

      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d88c5a_1px,transparent_1px)] [background-size:30px_30px]"></div>

      {/* FLOATING */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(30)].map((_, i) => (
          <span
            key={i}
            className="floating-heart fixed text-pink-300 opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `-100px`,
              animationDuration: `${6 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 10}s`,
              fontSize: `${18 + Math.random() * 22}px`,
            }}
          >
            {i % 2 === 0 ? "💖" : "✨"}
          </span>
        ))}
      </div>

      <section className="relative px-5 py-14 md:py-24 z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          {/* TEXT */}
          <motion.div
            initial={{
              opacity: 0,
              y: 80,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-center md:text-left"
          >
            <div className="inline-block bg-white px-4 py-2 rounded-full shadow-md rotate-[-3deg] mb-6 text-sm md:text-base">
              🎓 Graduation Memory 2026
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl leading-tight text-[#5a3d2b] font-['Pacifico']">
              Scrapbook
              <br />
              Memory
            </h1>

            <p className="mt-6 text-base md:text-lg text-[#6b4d3a] leading-relaxed max-w-lg mx-auto md:mx-0">
              Sebuah website kecil untuk seseorang yang spesial ❤️
            </p>

            <button
              onClick={() => navigate("/memory")}
              className="mt-8 bg-[#d88c5a] hover:scale-105 transition-all duration-700 ease-out text-white px-7 py-4 rounded-2xl shadow-xl text-base md:text-lg font-semibold"
            >
              Buka Kenangan 💌
            </button>
          </motion.div>

          {/* PHOTO */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.85,
              rotate: -8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: -2,
            }}
            transition={{
              duration: 1.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative h-[380px] sm:h-[450px]"
          >
            <div className="absolute top-0 left-2 sm:left-10 bg-white p-3 rounded-xl shadow-2xl rotate-[-10deg] w-44 sm:w-60 hover:scale-[1.03] hover:-translate-y-2 transition-all duration-700 ease-out">
              <img
                src="/foto1.jpg"
                alt=""
                className="h-44 sm:h-60 w-full object-cover rounded-lg"
              />
            </div>

            <div className="absolute bottom-0 right-2 sm:right-10 bg-white p-3 rounded-xl shadow-2xl rotate-[8deg] w-48 sm:w-64 hover:scale-[1.03] hover:-translate-y-2 transition-all duration-700 ease-out">
              <img
                src="/foto2.jpg"
                alt=""
                className="h-48 sm:h-64 w-full object-cover rounded-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function Memory() {
  const audioRef = useRef(new Audio("/music.mp3"));

  const [isPlaying, setIsPlaying] = useState(false);

  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    audioRef.current.loop = true;

    audioRef.current.play();

    setIsPlaying(true);

    const text = "Our Memories 📸";

    let index = 0;

    const typing = setInterval(() => {
      setTypedText(text.slice(0, index));

      index++;

      if (index > text.length) {
        clearInterval(typing);
      }
    }, 120);

    return () => {
      audioRef.current.pause();

      clearInterval(typing);
    };
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();

      setIsPlaying(false);
    } else {
      audioRef.current.play();

      setIsPlaying(true);
    }
  };

  const memories = [
    {
      title: "Our First Chat 💌",
      image: "/foto1.jpg",
      text: "Dari awal chat di WA kamu udah sok asik sama aku 😭 Tapi ternyata dari situ semuanya mulai. Dari yang awalnya cuma iseng balesin chat, sampai akhirnya jadi orang yang selalu aku cari setiap hari ❤️",
    },
    {
      title: "First Photo ❤️",
      image: "/foto2.jpg",
      text: "Ini foto pertama yang kamu kirim ke aku ❤️ Masih inget banget gimana excited-nya aku waktu itu. Dari foto ini, aku mulai sering nungguin notif dari kamu dan mulai penasaran sama kamu. Walau muka kamu nggak keliatan di foto ini, tapi entah kenapa aku udah yakin kalau kamu itu pasti cantik 😭",
    },
    {
      title: "Random Moments ✨",
      image: "/foto3.jpg",
      text: "Kadang hal-hal kecil bareng kamu justru jadi memory yang paling aku suka. Dari obrolan random, ketawa nggak jelas, sampai moment sederhana yang ternyata selalu kepikiran terus ❤️",
    },
    {
      title: "Graduation Day 🎓",
      image: "/foto4.jpg",
      text: "Selamat atas kelulusanmu ❤️ Aku bangga banget sama semua usaha dan perjuangan yang udah kamu lewatin sampai sejauh ini. Semoga semua hal baik selalu datang ke hidup kamu ✨",
    },
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,#fff1f2,#ffe4e6,#fce7f3,#fae8ff,#fdf2f8)] px-5 py-16 relative overflow-hidden">
      {/* LIVE WALLPAPER */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(40)].map((_, i) => (
          <span
            key={i}
            className="floating-heart fixed text-pink-300 opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `-100px`,
              animationDuration: `${6 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 10}s`,
              fontSize: `${18 + Math.random() * 22}px`,
            }}
          >
            {i % 4 === 0
              ? "✨"
              : i % 3 === 0
                ? "💖"
                : i % 2 === 0
                  ? "💕"
                  : "❤️"}
          </span>
        ))}
      </div>

      {/* MUSIC */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleMusic}
          className="bg-white/90 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-xl text-[#5a3d2b] font-semibold hover:scale-105 transition-all duration-700 ease-out text-sm md:text-base"
        >
          {isPlaying ? "Pause ⏸️" : "Play 🎵"}
        </button>
      </div>

      {/* TITLE */}
      <motion.h1
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="text-4xl sm:text-5xl md:text-6xl text-center text-[#5a3d2b] mb-16 relative z-10 font-['Pacifico']"
      >
        {typedText}
      </motion.h1>

      {/* MEMORIES */}
      <div className="max-w-5xl mx-auto space-y-20 relative z-10">
        {memories.map((item, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 80,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-10 items-center"
          >
            {/* FOTO */}
            <div className={`${index % 2 !== 0 ? "md:order-2" : ""}`}>
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.85,
                  rotate: -8,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  rotate: -2,
                }}
                transition={{
                  duration: 1.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true }}
                className="bg-white/90 backdrop-blur-sm p-4 rounded-3xl shadow-2xl rotate-[-2deg] hover:scale-[1.03] hover:-translate-y-2 transition-all duration-700 ease-out w-[240px] sm:w-[300px] mx-auto"
              >
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-[180px] sm:h-[250px] object-cover rounded-2xl"
                />
              </motion.div>
            </div>

            {/* TEXT */}
            <div className={`${index % 2 !== 0 ? "md:order-1" : ""}`}>
              <div className="bg-white/70 backdrop-blur-md p-7 md:p-10 rounded-[35px] shadow-xl border border-white/40">
                <h2 className="text-3xl md:text-4xl text-[#5a3d2b] mb-5 font-['Pacifico'] leading-snug">
                  {item.title}
                </h2>

                <TypingText text={item.text} speed={15} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FOR YOU */}
      <motion.div
        initial={{
          opacity: 0,
          y: 80,
          scale: 0.95,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mt-24 relative z-10"
      >
        <div className="bg-white/70 backdrop-blur-md p-7 md:p-10 rounded-[35px] shadow-2xl border border-white/40">
          <h2 className="text-3xl md:text-5xl text-[#5a3d2b] mb-8 text-center font-['Pacifico']">
            For You ❤️
          </h2>

          <TypingText
            speed={8}
            text={`Happy Graduation, Babyyyy 🎓💞

I’m so proud of you, proud of everything, and I’ll always be your biggest supporter.

Nggak kerasa ya kamu udah lulus aja. Dulu kita pertama kali kenal waktu kamu lagi libur sekolah mau naik kelas 12, sekarang kamu udah mau kuliah. Waktu cepet banget jalan, tapi aku seneng karena selama itu aku bisa ada di hidup kamu.

Aku cuma mau bilang thank you for being in my life. I’m really proud of you, and I love you so much ❤️

Sejak kamu datang, aku ngerasa punya support system terbaik yang pernah aku temuin. Kamu selalu dukung apa pun yang aku lakuin, selalu jadi alasan kenapa setiap hari aku bisa bahagia.

Jadi please jaga diri baik-baik yaa. Stay healthy, stay strong. Aku cuma mau kamu tetap ada di sini, tetap sama aku, jangan pergi.

Kalau kamu butuh seseorang buat cerita, lean on me. Aku selalu ada buat kamu, 24/7. Always proud of you, always here for you ❤️

Aku juga cuma mau kamu tau, kehadiran kamu bener-bener ngubah banyak hal buat aku. Cara aku mikir, cara aku ngejalanin hari, semuanya jadi lebih hangat sejak ada kamu. Kamu bikin dunia yang tadinya berat jadi lebih ringan buat dijalanin.

Aku nggak minta apa-apa yang ribet kok, cukup kamu tetap jadi kamu yang sekarang aja, itu udah bikin aku tenang. Selama kamu masih ada di sini, aku ngerasa hidup aku punya tempat buat pulang ❤️

I love you more than words can explain, more than you’ll ever know 💞

Selamat atas kelulusan kamu, sayanggg. Semangat terus buat ngejar semua cita-cita kamu, dan jangan lupa buat selalu bahagia yaaa ✨`}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/memory" element={<Memory />} />
      </Routes>
    </BrowserRouter>
  );
}

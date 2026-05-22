export default function Memory() {

  const memories = [
    {
      image: "/foto1.jpg",
      text: "Terima kasih sudah bertahan sejauh ini ❤️",
    },
    {
      image: "/foto2.jpg",
      text: "Aku bangga dengan semua perjuanganmu 🎓",
    },
    {
      image: "/foto3.jpg",
      text: "Semoga semua impianmu tercapai ✨",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fdf6ee] px-6 py-16">

      <h1 className="text-5xl font-black text-center text-[#5a3d2b] mb-14">
        Our Memories 📸
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        {memories.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-3xl shadow-2xl rotate-[-2deg] hover:rotate-0 hover:scale-105 transition"
          >

            <img
              src={item.image}
              alt=""
              className="w-full h-72 object-cover rounded-2xl"
            />

            <p className="mt-5 text-center text-[#6b4d3a] text-lg leading-relaxed">
              {item.text}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}
// src/component/ErrorPage.jsx
import { useNavigate } from "react-router-dom";
export default function ErrorPage({ errorCode, description, image }) {
  const navigate = useNavigate();
  const getTitle = (code) => {
    switch (Number(code)) {
      case 400: return "Something Went Wrong";
      case 401: return "Authentication Required";
      case 403: return "Access Forbidden";
      case 404: return "Page Not Found";
      default: return "Error";
    }
  };
  return (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* Background Layer 1: bg.png */}
      <div 
        className="absolute inset bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/bg.png')" }}
      ></div>
      
      {/* Background Layer 2: Vector 7.png */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{ backgroundImage: "url('/img/Vector 7.png')" }}
      ></div>

     <div className="relative z-20 container mx-auto px-40 py-45 min-h-screen flex items-start justify-center">
     <div className="flex flex-col lg:flex-row items-center justify-center gap- w-full max-w-6xl mx-auto">
          
          {/* Bagian Kiri - Teks */}
          <div className="lg:w-1/2 text-left">
            <p className="text-orange-500 text-2xl font-bold mb-2 tracking-wide">
              OOOPS...
            </p>

            <h1 className="text-[180px] md:text-[220px] font-bold text-gray-800 leading-none">
              {errorCode}
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mt-4 mb-6">
              {getTitle(errorCode)}
            </h2>

            <p className="text-gray-500 text-base max-w-md leading-relaxed mb-8">
              {description}
            </p>

            <button
              onClick={() => navigate(-1)}
              className="bg-pink-700 hover:bg-pink-800 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-md"
            >
              Go Back →
            </button>
          </div>

          {/* Bagian Kanan - Gambar */}
          <div className="lg:w-1/2 flex justify-center">
            <img 
              src={image} 
              alt={`Error ${errorCode}`}
              className="w-[500px] md:w-[600px] h-auto object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `/img/${errorCode}.png`;
              }}
            />
          </div>
        </div>

        <div className="absolute bottom-40 left-0 right-0 text-center">
          <p className="text-gray-400 text-sm">
            {getTitle(errorCode)} <span className="mx-2">•</span> {errorCode}
          </p>
        </div>
      </div>
    </div>
  );
}
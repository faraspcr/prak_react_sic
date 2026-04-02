export default function TailwinddCSS(){
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-12">
            <div className="max-w-7xl mx-auto space-y-16">
                
                {/* ELEMEN ASLI #1 - TIDAK DIUBAH SATU HURUF PUN */}
                <h1 class="border m-4">Belajar Tailwind CSS 4</h1>
                <button className="bg-blue-500 text-white
                               px-4 py-2 mx-4 rounded
                               shadow-lg">Click Me</button>

                {/* Hero Showcase - SEMUA FUNCTION ASLI */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    
                    {/* Kolom Kiri - Function Asli */}
                    <div className="space-y-8 p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50">
                        <Spacing/>
                        <Typography/>
                        <BorderRadius/>
                    </div>

                    {/* Kolom Kanan - Function Asli */}
                    <div className="space-y-8 p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50">
                        <BackgroundColors/>
                        <FlexboxGrid/>
                        <ShadowEffects/>
                    </div>
                </div>

                {/* Enhanced Showcase Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="p-8 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 text-center">
                        <h3 className="text-3xl font-bold mb-4">🎨 All Concepts</h3>
                        <p className="text-lg">Spacing • Typography • Border • Colors • Flexbox • Shadows</p>
                    </div>
                    
                    <div className="p-8 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center justify-center">
                        <button className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300">
                            🚀 Live Demo
                        </button>
                    </div>

                    <div className="p-8 bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 text-center">
                        <h3 className="text-3xl font-bold mb-4">✨ Responsive</h3>
                        <p className="text-lg">Works on all devices!</p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center py-20 px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-4xl shadow-3xl border-4 border-white/20 backdrop-blur-xl">
                    <h2 className="text-5xl font-black mb-8 drop-shadow-2xl">Master Tailwind CSS Today!</h2>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
                        <button className="bg-white text-blue-600 px-12 py-6 rounded-3xl font-black text-2xl shadow-2xl hover:shadow-3xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 border-4 border-white/50">
                            🎯 Start Learning
                        </button>
                        <button className="border-4 border-white/50 px-12 py-6 rounded-3xl font-bold text-xl backdrop-blur-sm hover:bg-white/20 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                            📖 Documentation
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

// SEMUA FUNCTION ASLI 100% TIDAK DIUBAH
function Spacing(){
    return (
        <div className="bg-white shadow-lg p-6 m-4 rounded-lg hover:shadow-2xl hover:scale-102 transition-all duration-300 border border-gray-200/50">
            <h2 className="text-lg font-semibold text-gray-800">Card Title</h2>
            <p className="mt-2 text-gray-600">Ini adalah contoh penggunaan padding dan margin di Tailwind.</p>
        </div>
    )
}

function Typography(){
    return (
        <div className="space-y-4">
            <h1 className="text-4xl font-bold text-blue-600 drop-shadow-lg">Tailwind Typography</h1>
            <p className="text-gray-600 text-xl bg-blue-50 p-6 rounded-2xl border-l-8 border-blue-400 shadow-sm">Belajar Tailwind sangat menyenangkan dan cepat!</p>
        </div>
    )
}

function BorderRadius(){
    return (
        <div className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-lg border border-purple-200/50">
            <button className="border-4 border-blue-500 text-blue-500 px-8 py-4 rounded-3xl font-bold shadow-xl hover:shadow-2xl hover:scale-110 hover:bg-blue-50 transition-all duration-300 w-full text-lg">
                Klik Saya
            </button>
        </div>
    )
}

function BackgroundColors(){
    return(
        <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-8 rounded-3xl shadow-2xl hover:shadow-3xl hover:rotate-1 transition-all duration-500 border border-white/30 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4 drop-shadow-lg">Tailwind Colors</h3>
            <p className="mt-2 text-lg drop-shadow-md">Belajar Tailwind itu seru dan fleksibel!</p>
        </div>
    )
}

function FlexboxGrid(){
    return (
        <nav className="flex justify-between bg-gray-800 p-8 text-white rounded-3xl shadow-2xl border border-gray-700/50 backdrop-blur-md hover:shadow-3xl transition-all duration-300">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">MyWebsite</h1>
            <ul className="flex space-x-8">
                <li><a href="#" className="px-4 py-2 rounded-xl hover:bg-white/20 hover:scale-105 transition-all duration-300 font-semibold">Home</a></li>
                <li><a href="#" className="px-4 py-2 rounded-xl hover:bg-white/20 hover:scale-105 transition-all duration-300 font-semibold">About</a></li>
                <li><a href="#" className="px-4 py-2 rounded-xl hover:bg-white/20 hover:scale-105 transition-all duration-300 font-semibold">Contact</a></li>
            </ul>
        </nav>
    )
}

function ShadowEffects(){
    return (
        <div className="bg-white shadow-xl p-8 rounded-3xl hover:shadow-3xl hover:shadow-black/20 hover:-translate-y-3 transition-all duration-500 border border-gray-200/50 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 transform group-hover:translate-x-full transition-transform duration-700 -translate-x-full"></div>
            <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Hover me!</h3>
                <p className="text-gray-600 mt-4 text-lg">Lihat efek bayangan saat hover.</p>
            </div>
        </div>
    )
}
import frameworkData from "./framework.json";

export default function FrameworkList() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-slate-800 to-gray-700 bg-clip-text text-transparent mb-4">
                        Frontend Frameworks
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Collection of popular JavaScript frameworks for modern web development
                    </p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      <input
                        type="text"
                        name="searchTerm"
                        placeholder="Search framework..."
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    />

                    <select
                        name="selectedTag"
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    >
                        <option value="">All Tags</option>
                    </select>

                    {frameworkData.map((item) => (
                        <div 
                            key={item.id} 
                            className="group relative bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl hover:shadow-2xl rounded-3xl p-8 transform hover:-translate-y-2 transition-all duration-500 hover:scale-[1.02] overflow-hidden"
                        >
                            {/* Gradient border effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl"></div>
                            
                            {/* Icon based on framework name */}
                            <div className="relative z-10 flex items-center mb-6">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg mr-4 flex-shrink-0 ${getFrameworkColor(item.name)}`}>
                                    <span className="text-white font-bold text-xl">{item.name.charAt(0)}</span>
                                </div>
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-slate-800 bg-clip-text text-transparent">
                                    {item.name}
                                </h2>
                            </div>
                            
                            {/* Description */}
                            <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                                {item.description}
                            </p>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {item.tags.map((tag, index) => (
                                    <span 
                                        key={index}
                                        className="px-3 py-1 bg-white/60 backdrop-blur-sm text-xs font-medium text-gray-700 border border-white/50 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            
                            {/* Details */}
                            <div className="space-y-3 mb-8">
                                <div className="flex items-center text-sm">
                                    <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                                    <span className="font-semibold text-gray-800 w-20">Developer:</span>
                                    <span className="text-gray-600 font-medium">{item.details.developer}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                                    <span className="font-semibold text-gray-800 w-20">Released:</span>
                                    <span className="text-gray-600 font-medium">{item.details.releaseYear}</span>
                                </div>
                            </div>
                            
                            {/* Website Button */}
                            <a 
                                href={item.details.officialWebsite} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 border border-transparent hover:border-blue-200/50 group/link w-full justify-center"
                            >
                                <span>Visit Website</span>
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// Helper function untuk warna icon berdasarkan framework
function getFrameworkColor(name) {
    const colors = {
        'React': 'bg-gradient-to-br from-indigo-500 to-blue-600',
        'Vue': 'bg-gradient-to-br from-green-500 to-emerald-600',
        'Angular': 'bg-gradient-to-br from-red-500 to-orange-600',
        'Svelte': 'bg-gradient-to-br from-pink-500 to-rose-600',
        'Next.js': 'bg-gradient-to-br from-gray-700 to-slate-900',
        'Nuxt.js': 'bg-gradient-to-br from-green-600 to-emerald-700',
        'Gatsby': 'bg-gradient-to-br from-purple-500 to-violet-600',
        'Ember': 'bg-gradient-to-br from-orange-500 to-amber-600',
        'Meteor': 'bg-gradient-to-br from-cyan-500 to-teal-600',
        'Backbone.js': 'bg-gradient-to-br from-slate-600 to-gray-700'
    };
    return colors[name] || 'bg-gradient-to-br from-blue-500 to-indigo-600';
}
export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold text-white mb-2">Margoul1</h1>
        <p className="text-gray-400">Développeur Web Full Stack</p>
        <p className="text-gray-500 text-sm mt-2">Chargement en cours...</p>
      </div>
    </div>
  );
} 
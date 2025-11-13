// src/pages/Placeholder.jsx
export default function Placeholder({ title }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="text-gray-500 text-lg">Coming Soon!</div>
      <footer className="absolute bottom-2 right-2 text-xs text-gray-400">V 1.0.6</footer>
    </div>
  );
}

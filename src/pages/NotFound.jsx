export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-black text-red-500 mb-4">404</h1>
      <div className="text-xl font-bold mb-2">Page Not Found</div>
      <div className="text-gray-500">Sorry, the page you are looking for does not exist.</div>
    </div>
  );
}

import { Link } from "@/i18n/navigation";


export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 text-center">
      <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-2">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-500 mb-6">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-blue-500 text-white font-medium rounded shadow hover:bg-blue-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}

import Link from "next/link";

export default function NotFound() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gray-100">
			<h1 className="text-9xl font-extrabold text-blue-500 mt-6 animate-bounce">404</h1>
			<p className="text-blue-500 mt-2 text-2xl">
				Oops! The page you are looking for could not be found.
			</p>
			<p className="text-gray-600 mt-2 text-lg">
				It might have been removed, renamed, or did not exist in the first place.
			</p>
			<Link href="/" className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
				Back to Home
			</Link>
		</div >
	);
}

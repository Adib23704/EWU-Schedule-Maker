import "@/styles/globals.css";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>EWU Schedule Maker</title>
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta property="og:title" content="EWU Schedule Maker" />
				<meta property="og:image" content="https://ewu-schedule.vercel.app/logo.png" />
				<meta property="og:description" content="Easily generate and visualize your EWU class schedule with our simple and modern tool." />
				<meta property="og:url" content="https://ewu-schedule.vercel.app/" />
				<meta property="og:image:width" content="512" />
				<meta property="og:image:height" content="512" />
				<meta property="og:type" content="website" />
				<meta property="og:site_name" content="EWU Schedule Maker" />
				<meta name="description" content="Easily generate and visualize your EWU class schedule with our simple and modern tool." />

				{/* 🔥 Updated Keywords for Better SEO */}
				<meta name="keywords" content="EWU Schedule Maker, university schedule, class timetable, East West University, EWU, routine generator, university timetable, schedule planner, course schedule, EWU class planner, online class schedule" />

				<link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png" />
				<link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png" />
				<link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png" />
				<link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png" />
				<link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png" />
				<link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png" />
				<link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png" />
				<link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png" />
				<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png" />
				<link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-icon-192x192.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
				<link rel="manifest" href="/favicon/manifest.json" />
				<meta name="msapplication-TileColor" content="#ffffff" />
				<meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png" />
			</Head>

			<Component {...pageProps} />
		</>
	);
}

# EWU Schedule Maker

Easily generate and visualize your EWU class schedule with our simple and modern tool.

## Features

- Upload an Excel file of your EWU Advising Slip.
- Automatically generate a visually structured routine table.
- Responsive and modern UI.
- Download your schedule as an image or PDF.

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Next.js API Routes

## Installation & Setup

### Prerequisites

- **Node.js** (v18+ recommended)
- **Yarn** or **npm**

### Clone the Repository
```bash
git clone https://github.com/Adib23704/EWU-Schedule-Maker.git
cd EWU-Schedule-Maker
```

### Install Dependencies
```bash
npm install  # or yarn install
```

### Run the Development Server
```bash
npm run dev  # or yarn dev
```
The app will be available at `http://localhost:3000`.

### Build for Production
```bash
npm run build # or yarn build
npm start # or yarn start
```

## Project Structure
```
/
├── public/               # Static assets (images, icons, etc.)
│   ├── favicon/
│   │   ├── browserconfig.xml
│   │   ├── manifest.json
│   │   └── ...
│   ├── favicon.ico
│   └── logo.png
├── src/
│   ├── components/       # UI components (RoutineTable, UploadForm, etc.)
│   │   ├── RoutineTable.js
│   │   └── UploadForm.js
│   ├── pages/            # Next.js pages (_app.js, index.js, etc.)
│   │   ├── _app.js
│   │   ├── 404.js
│   │   ├── api/
│   │   │   └── upload.js
│   │   └── index.js
│   ├── styles/           # Global styles (Tailwind CSS, other CSS files)
│   │   └── globals.css
│   └── utils/            # Utility functions (Excel parser, etc.)
│       └── parser.js
└── uploads/              # Uploaded files
```

## Usage
1. Upload your Advising Slip file in `.xlsx` format.
2. View the generated routine.
3. Download the schedule as an image or PDF.

## Deployment
The project is optimized for **Vercel**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/Adib23704/EWU-Schedule-Maker)

Follow the prompts to set up and deploy your project.

## Contributing
Contributions are welcome! 🚀

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.

## License
MIT License © 2025 Zahin A. Adib
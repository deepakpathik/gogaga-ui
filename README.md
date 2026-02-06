# GoGaga UI

A travel booking interface for searching and comparing holiday packages with flights.

## Getting Started

```bash
npm install
npm run dev
```

The app runs on `http://localhost:5173`

## Building for Production

```bash
npm run build
```

Output goes to the `dist` folder.

## Environment Variables

Copy `.env.example` to `.env` and add your API keys:

```env
VITE_CSC_API_KEY=your_api_key
VITE_CSC_API_URL=https://api.countrystatecity.in/v1
VITE_TELEPORT_API_URL=https://api.teleport.org/api
```

## Tech Stack

- React 19
- Vite
- React Router
- React DatePicker
- Axios

## Features

- Search for holiday packages with flights
- Filter by destination, dates, and passengers
- View flight options with pricing tiers
- Compare outbound and return flights
- Responsive design for mobile and desktop

## Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page components
├── services/         # API services
├── layout/           # Layout components
└── assets/           # Images and static files
```

## Deployment

Configured for Vercel. Push to your repo and import the project in Vercel dashboard.

Make sure to add environment variables in your Vercel project settings.

## License

MIT

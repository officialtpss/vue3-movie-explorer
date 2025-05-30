# Vue 3 Movie Application

A modern movie discovery application built with Vue 3, featuring a beautiful UI and comprehensive movie information powered by TMDB API.

## Features

- 🎬 Browse popular, trending, and top-rated movies
- 🔍 Advanced search functionality with:
  - Real-time search suggestions
  - Movie posters in suggestions
  - Release year information
  - Instant search results
- 🎥 Detailed movie information including:
  - Movie overview
  - Cast information
  - Release date
  - Ratings
  - Genres
- 🌓 Dark/Light theme support with system preference detection
- 📱 Fully responsive design
- ⚡ Fast and smooth user experience
- 🎯 Modern UI with smooth animations
- 🔄 Real-time updates and suggestions

## Tech Stack

- Vue 3 with Composition API
- Vite for build tooling
- Pinia for state management
- Vue Router for navigation
- Tailwind CSS for styling
- Heroicons for icons
- Axios for API requests

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- TMDB API key (get it from [TMDB](https://www.themoviedb.org/documentation/api))

## Setup

1. Clone the repository:
```bash
git clone git@github.com:officialtpss/vue3-movie-explorer.git
cd vue3-movie-explorer
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   - Open `.env` and replace `your_tmdb_api_key_here` with your actual TMDB API key

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if those are in use).

## Environment Variables

The following environment variables are required:

| Variable | Description |
|----------|-------------|
| `VITE_TMDB_API_KEY` | Your TMDB API key |

## Project Structure

```
src/
├── components/         # Reusable components
│   ├── MovieCard.vue   # Movie card component
│   └── MovieDetailsModal.vue # Movie details modal
├── layouts/           # Layout components
├── pages/            # Page components
│   ├── Home.vue      # Popular movies
│   ├── Trending.vue  # Trending movies
│   ├── TopRated.vue  # Top rated movies
│   └── Search.vue    # Search results
├── router/           # Vue Router configuration
├── stores/           # Pinia stores
│   └── movie.js      # Movie store with API integration
└── assets/           # Static assets
    └── main.css      # Global styles and Tailwind imports
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Features in Detail

### Search Functionality
- Real-time search suggestions as you type
- Movie posters and release years in suggestions
- Debounced API calls for better performance
- Keyboard navigation support
- Responsive design for all screen sizes

### Movie Information
- Comprehensive movie details
- Cast information with profile images
- Movie ratings and release dates
- Genre information
- Responsive image handling with fallbacks

### UI/UX Features
- Dark/Light theme with system preference detection
- Smooth transitions and animations
- Responsive design for all devices
- Loading states and error handling
- Intuitive navigation

### 👤 Author

Tech Prastish - [github.com/officialtpss](https://github.com/officialtpss)  

Contact: info@tech-prastish.com

### 📄 License

This is a sample project intended for learning and demo purposes only.

## Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the movie data API
- [Vue.js](https://vuejs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Heroicons](https://heroicons.com/) for the beautiful icons

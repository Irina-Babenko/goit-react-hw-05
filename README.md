# Movie App

This project is a React application built with Vite for fast development and
optimized build. It allows users to browse movie information using the TMDB API.
Key features include movie search, detailed movie pages, and viewing movie
reviews and casts.

## Project Setup

### Requirements

- Node.js (>= 14.x)
- npm or yarn

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/Irina-Babenko/goit-react-hw-05.git
cd goit-react-hw-05
npm install
# or
yarn install
```

### Configuration

Create a .env file in the root directory of the project and add the following
variable:

REACT_APP_TMDB_API_KEY=your_api_key_here

Replace your_api_key_here with your actual TMDB API key.

### Available Scripts

In the project directory, you can run:

- npm start or yarn start: Starts the development server.

- npm run build or yarn build: Builds the app for production.

- npm test or yarn test: Runs the tests.

- npm run eject or yarn eject: Ejects the configuration (use with caution).

### Project Structure

    /project-root
    /public
    /index.html
    /src
    /components
        /MovieList
            MovieList.jsx
        /MovieCast
            MovieCast.jsx
        /MovieReviews
            MovieReviews.jsx
        /Loader
            Loader.jsx
        /ErrorMessage
            ErrorMessage.jsx
        /LoadMoreBtn
            LoadMoreBtn.jsx
        /SearchBar
            SearchBar.jsx
        /Navigation
            Navigation.jsx
        /App
            App.jsx
    /pages
        /HomePage
            HomePage.jsx
        /MoviesPage
            MoviesPage.jsx
        /MovieDetailsPage
            MovieDetailsPage.jsx
    index.css
    main.jsx .
    gitignore
    package.json
    README.md
    vite.config.js

### Styling

Styles are handled using CSS modules. Default styles are provided for various
components, and media queries are used for responsiveness.

### Default Configuration

This project uses Vite with React and includes the following default setup:

Vite: For fast build and development. React: The core library for building user
interfaces.

@vitejs/plugin-react: Provides Fast Refresh using Babel.

@vitejs/plugin-react-swc: Alternative plugin for Fast Refresh using SWC
(optional).

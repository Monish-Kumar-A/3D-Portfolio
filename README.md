# 3D Developer Portfolio

A modern, interactive portfolio website built with React and Three.js, featuring a 3D scene, dark/light theme toggle, and smooth scrolling navigation.

## Features

- 🎨 **Dark/Light Theme Toggle** - Persistent theme preference with localStorage
- 🎮 **3D Scene** - Interactive Three.js scene in the hero section
- 📱 **Fully Responsive** - Works beautifully on desktop, tablet, and mobile
- ⚡ **Smooth Scrolling** - Navigation with smooth scroll behavior
- 🎯 **Single Page Layout** - All sections on one page for easy navigation

## Tech Stack

- React 18
- Three.js
- Vite
- CSS Modules (Plain CSS)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository or extract the project files

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── HeroCanvas.jsx     
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── Contact.jsx
│   ├── ThemeToggle.jsx
│   └── ScrollToTop.jsx
├── hooks/
│   └── useTheme.js        
├── styles/
│   ├── globals.css
│   ├── Navbar.css
│   ├── Hero.css
│   ├── About.css
│   ├── Skills.css
│   ├── Projects.css
│   ├── Contact.css
│   ├── ThemeToggle.css
│   └── ScrollToTop.css
├── App.jsx
└── main.jsx
```

## Customization

### Update Personal Information

Edit the following files:
- `src/components/Hero.jsx` - Name, title, and description
- `src/components/About.jsx` - About section content
- `src/components/Skills.jsx` - Skills array
- `src/components/Projects.jsx` - Projects array
- `src/components/Contact.jsx` - Social links and email

### Modify 3D Scene

Edit `src/components/HeroCanvas.jsx` to customize the Three.js scene, objects, lighting, and animations.

### Change Colors

Modify CSS variables in `src/styles/globals.css` to change the color scheme for both light and dark themes.

## License

MIT


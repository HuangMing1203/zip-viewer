# Zip Viewer

A modern, web-based ZIP archive viewer built with React and Vite. Extract and browse image files from ZIP archives directly in your browser with an intuitive gallery interface and full-screen reader mode.

## Features

- 🗂️ **ZIP Archive Support** - Extract and view images from ZIP files
- 🖼️ **Image Gallery** - Responsive grid layout with lazy loading
- 👁️ **Full-Screen Reader** - Immersive reading experience with zoom
- 📱 **Mobile Friendly** - Touch gestures and responsive design
- ⌨️ **Keyboard Navigation** - Arrow keys and Escape support
- 🌗 **Dark/Light Mode** - Material Design theme support
- 📥 **Multiple Upload Methods** - Local file upload, URL fetch, or paste content
- ⚡ **Fast & Lightweight** - Built with modern web standards

## Supported Image Formats

- JPEG/JPG
- PNG
- GIF
- BMP
- WebP
- SVG

## Getting Started

### Prerequisites

- Node.js 20.x, 22.x, or 24.x
- npm 11.0.0 or higher

### Installation

```bash
npm install
```

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building

Create an optimized production build:

```bash
npm run build
```

The compiled files will be in the `dist/` directory.

### Preview

Preview the production build locally:

```bash
npm run preview
```

## Usage

1. **Load a ZIP Archive**
   - Upload a local ZIP file using the upload button
   - Paste a ZIP file URL and fetch it
   - Paste raw ZIP content directly

2. **Browse Images**
   - Scroll through the gallery grid
   - Click on any image to open the reader

3. **Read Full-Screen**
   - Use arrow keys to navigate between pages
   - Click the left/middle/right zones to navigate or close
   - Swipe left/right on mobile devices
   - Press Escape to exit reader mode
   - Click images to zoom

## Project Structure

```
src/
├── components/          # React components
│   ├── ZipViewer.jsx           # Main viewer component
│   ├── ListView.jsx            # Image gallery grid
│   ├── ReaderView.jsx          # Full-screen reader
│   ├── LazyImage.jsx           # Lazy-loading image with zoom
│   ├── FileSelector.jsx        # File upload interface
│   ├── BlobInputDialog.jsx     # Text/content input dialog
│   ├── ErrorMessageProvider.jsx # Error notification context
│   ├── ConfirmationProvider.jsx # Confirmation dialog context
│   └── ErrorMessageSnackbar.jsx # Error snackbar UI
├── utils/               # Utility functions
│   ├── extractArchiveImages.js # ZIP extraction logic
│   └── request.js              # HTTP request helper
├── App.jsx              # Root application component
└── main.jsx             # React DOM entry point
```

## Technologies

- **Frontend Framework** - [React 19](https://react.dev)
- **Build Tool** - [Vite 7](https://vite.dev)
- **UI Library** - [Material-UI 7](https://mui.com)
- **HTTP Client** - [Axios](https://axios-http.com)
- **ZIP Extraction** - [fflate](https://github.com/101arrowz/fflate)
- **Icons** - [Material Design Icons](https://fonts.google.com/icons)
- **Fonts** - [Roboto Font](https://fonts.google.com/specimen/Roboto)

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `←` / `→` | Previous/Next page |
| `Esc` | Exit reader mode |

## Touch Gestures

| Gesture | Action |
|---------|--------|
| Swipe Left | Next page |
| Swipe Right | Previous page |
| Tap Left Third | Previous page |
| Tap Middle | Exit reader |
| Tap Right Third | Next page |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Development Workflow

The project uses GitHub Actions for:
- **CI/CD** - Automated builds and tests on Node.js 20.x, 22.x, and 24.x
- **GitHub Pages** - Automatic deployment on push to master
- **Dependabot** - Weekly dependency updates

## License

This project is open source and available under the MIT License.

## Browser Support

Modern browsers supporting:
- ES Modules
- Fetch API / Promise
- FileReader API
- Blob API
- CSS Grid

Tested on:
- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

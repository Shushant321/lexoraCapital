const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Create a file to bundle all project files
const createBundle = () => {
  const output = fs.createWriteStream('LexoraCapital-project.zip');
  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level
  });

  output.on('close', () => {
    console.log(`Bundle created: ${archive.pointer()} total bytes`);
    console.log('LexoraCapital-project.zip has been created successfully!');
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);

  // Add files to the archive
  const filesToBundle = [
    // Backend files
    'backend/config/database.js',
    'backend/models/Product.js',
    'backend/routes/api.js',
    'backend/server.js',
    
    // Frontend source files
    'src/components/EMICalculatorWidget.jsx',
    'src/components/Footer.jsx',
    'src/components/Header.jsx',
    'src/components/ProductCard.jsx',
    'src/pages/Blog.jsx',
    'src/pages/EMICalculator.jsx',
    'src/pages/Homepage.jsx',
    'src/pages/ProductListing.jsx',
    'src/App.jsx',
    'src/index.css',
    'src/main.tsx',
    'src/vite-env.d.ts',
    
    // Config files
    'package.json',
    'eslint.config.js',
    'index.html',
    'postcss.config.js',
    'tailwind.config.js',
    'tsconfig.app.json',
    'tsconfig.json',
    'tsconfig.node.json',
    'vite.config.ts',
    '.gitignore'
  ];

  filesToBundle.forEach(file => {
    if (fs.existsSync(file)) {
      archive.file(file, { name: file });
    }
  });

  // Add .env template
  archive.append(`# Frontend Environment Variables
VITE_API_URL=http://localhost:5000

# Backend Environment Variables (for backend/.env)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/LexoraCapital
PORT=5000`, { name: '.env.example' });

  archive.finalize();
};

// Run the bundling
createBundle();
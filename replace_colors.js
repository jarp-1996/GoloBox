const fs = require('fs');
const path = require('path');

const directories = ['app', 'components'];
const replacements = {
    '#7C3AED': '#991B1B', // Purple -> Deep Red
    '#7c3aed': '#991B1B',
    '#EC4899': '#1F2937', // Pink -> Dark Gray
    '#ec4899': '#1F2937',
    '#FDF4FF': '#F9FAFB', // Light Pink -> Light Gray
    '#fdf4ff': '#F9FAFB',
    '#4C1D95': '#111827', // Dark Purple -> Black/Very Dark Gray
    '#4c1d95': '#111827',
    '#84CC16': '#374151', // Lime -> Gray
    '#84cc16': '#374151',
    // also replacing variable class names
    'golozin-blue': 'golozin-primary',
    'golozin-red': 'golozin-accent',
    'golozin-gray': 'golozin-light',
    'golozin-cream': 'golozin-secondary',
    'golozin-whatsapp': 'golozin-muted'
};

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else {
            callback(dirPath);
        }
    });
}

let modifiedCount = 0;

directories.forEach(dir => {
    if (fs.existsSync(dir)) {
        walkDir(dir, (filePath) => {
            if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
                let content = fs.readFileSync(filePath, 'utf8');
                let newContent = content;
                
                for (const [oldColor, newColor] of Object.entries(replacements)) {
                    const regex = new RegExp(oldColor, 'g');
                    newContent = newContent.replace(regex, newColor);
                }
                
                if (content !== newContent) {
                    fs.writeFileSync(filePath, newContent);
                    console.log(`Modified ${filePath}`);
                    modifiedCount++;
                }
            }
        });
    }
});

console.log(`Total files modified: ${modifiedCount}`);

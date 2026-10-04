import fs from 'fs/promises';
import path from 'path';

async function countFileStats() {
  const filename = process.argv[2];

  if (!filename) {
    console.log('Error: Please provide a file name.');
    console.log('Usage: npm start <filename>');
    process.exit(1);
  }

  try {
    const filePath = path.resolve(filename);
    const content = await fs.readFile(filePath, 'utf-8');

    const lines = content.split('\n').length;
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    const characters = content.length;

    console.log(`File: ${filename}`);
    console.log(`Lines: ${lines}`);
    console.log(`Words: ${words}`);
    console.log(`Characters: ${characters}`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`Error: File '${filename}' does not exist.`);
    } else {
      console.error(`Error reading file: ${error.message}`);
    }
    process.exit(1);
  }
}

countFileStats();
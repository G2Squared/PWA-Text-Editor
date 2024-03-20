import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

// Select the main element
const main = document.querySelector('#main');
main.innerHTML = '';

// Function to display a loading spinner
const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner"></div>
    </div>
  `;
  main.appendChild(spinner);
};

// Initialize the editor
const editor = new Editor();

// If the editor is not loaded, display a loading spinner
if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // Create a new instance of Workbox for registering the service worker
  const workboxSW = new Workbox('/src-sw.js');
  // Register the service worker
  workboxSW.register();
} else {
  // Log an error if service workers are not supported
  console.error('Service workers are not supported in this browser.');
}

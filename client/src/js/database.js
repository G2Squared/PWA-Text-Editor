import { openDB } from 'idb';

// Function to initialize the IndexedDB database
const initdb = async () =>
  openDB('jate', 1, {
    // Upgrade function to handle database schema changes
    upgrade(db) {
      // Check if the object store already exists
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Create a new object store with auto-incrementing key path
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method to add content to the IndexedDB database
export const putDb = async (content) => {
  console.log("Post this to the database!");

  // Open a connection to the IndexedDB database
  const jateDB = await openDB('jate', 1);

  // Start a read-write transaction
  const transaction = jateDB.transaction('jate', 'readwrite');

  // Open the object store
  const store = transaction.objectStore('jate');

  // Add content to the object store
  const request = store.add({ content });

  // Wait for the request to complete and log the result
  const result = await request;
  console.log('Data saved to the database', result);
};

// Method to retrieve all content from the IndexedDB database
export const getDb = async () => {
  console.log('Get stuff from the database');

  // Open a connection to the IndexedDB database
  const jateDB = await openDB('jate', 1);

  // Start a read-only transaction
  const transaction = jateDB.transaction('jate', 'readonly');

  // Open the object store
  const store = transaction.objectStore('jate');

  // Retrieve all data from the object store
  const request = store.getAll();

  // Wait for the request to complete and log the result
  const result = await request;
  console.log('result.value', result);
}; 

// Initialize the database when the module is imported
initdb();

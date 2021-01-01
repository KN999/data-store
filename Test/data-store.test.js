const fs = require('fs')
const path = require('path')
const ds = require('data-store');

const filepath = path.join(__dirname, '../data.json')

// Deleting the data.json before running testcases.
fs.unlink(filepath, (err) => {
  if (err) {
    console.error(err)
    return
  }
})

test('Not passing file path', () => {
  expect(new ds.dataStore()).toBeTruthy();
});

test('Passing file path', () => {
  expect(
    new ds.dataStore('C:\\Users\\navin\\Desktop\\notes-app\\data-store')
  ).toBeTruthy();
});

test('creating a key value pair with default ttl', () => {
  const d = new ds.dataStore();

  // Creating a new key and value
  expect(d.createData(2, 2)).toBe('Data added successfully!');
  // In time deletion
  expect(d.deleteData(2)).toBe('Removed key was : ' + 2);

  // Key length more than 32 character
  expect(d.createData('qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm')).toBe('Key length is too long.');

  // Creating a new key and value
  expect(d.createData(2, 2)).toBe('Data added successfully!');
  // Duplicate key
  expect(d.createData(2, 2)).toBe('Key is already taken!');
  // Reading key and value
  expect(d.readData(2)).toStrictEqual(d.readData(2));
  // Reading a key which doesn't exist
  expect(d.readData(3)).toBe('No data found with that key!');

});


test('creating a key value pair with ttl', () => {
  const d = new ds.dataStore();

  // Creating a new key and value
  expect(d.createData(3, 3, 500)).toBe('Data added successfully!');
  // In time deletion
  expect(d.deleteData(3)).toBe('Removed key was : ' + 3);

  
  // Key length more than 32 character
  expect(d.createData('qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm')).toBe('Key length is too long.');

  // Creating a new key and value
  expect(d.createData(3, 3)).toBe('Data added successfully!');
  // Duplicate key
  expect(d.createData(3, 3)).toBe('Key is already taken!');
  // Reading key and value
  expect(d.readData(3)).toStrictEqual(d.readData(3));
  // Reading a key which doesn't exist
  expect(d.readData(4)).toBe('No data found with that key!');

});

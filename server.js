const fs = require('fs');
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const IMAGES_PATH = path.join(__dirname, 'images');

const csv = createCsvWriter({
  path: 'data.csv',
  header: [
    { id: 'name', title: 'Name' },
    { id: 'price', title: 'Path' },
    { id: 'path', title: 'Path' },
  ],
});

const parseImageName = (imageName) => {
  const splitName = imageName.split('-');

  return {
    name: splitName[0],
    price: splitName[1].replace('.png', ''),
    path: path.join('images', imageName),
  };
};

fs.readdir(IMAGES_PATH, (err, files) => {
  const data = files.map((item) => parseImageName(item));
  csv.writeRecords(data).then(() => console.log('DONE'));
});

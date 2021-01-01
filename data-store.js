const fs = require("fs");
const path = require("path");
const FILEPATH = path.join(__dirname, '/Data');
const timeStamp = Math.round(+new Date() / 1000);

class DataStore {
  constructor(filePath) {
    this.filePath = !filePath ? FILEPATH : filePath;
  }

  saveData(data) {
    const dataJSON = JSON.stringify(data);
    fs.writeFileSync(path.join(this.filePath, "/data.json"), dataJSON);
  }

  loadData() {
    try {
      const dataBuffer = fs.readFileSync(path.join(this.filePath, "/data.json"));
      const dataJSON = dataBuffer.toString();
      return JSON.parse(dataJSON);
    } catch (e) {
      return [];
    }
  }

  createData(key, value, ttl = 50) {

    if(key.length > 32)
        return "Key length is too long."
    
    if(typeof key !== 'string')
        return "key is not a string"

    const data = this.loadData();
    const duplicateData = data.find((datum) => datum.key === key);

    if (!duplicateData) {
      data.push({
        key: key,
        value: value,
        ttl: parseInt(timeStamp + ttl),
      });

      this.saveData(data);

      return "Data added successfully!";
    } else {
      return "Key is already taken!";
    }
  }

  readData(key) {
    const data = this.loadData();
    const datum = data.find((datum) => datum.key === key);

    if (datum) {
      if (datum.ttl < timeStamp) return "Time expired. Can't read data!";

      return datum;
    } else {
      return "No data found with that key!";
    }
  }

  deleteData(key) {
    const data = this.loadData();
    const updatedData = data.filter((datum) => datum.key !== key);
    const findDatum = data.filter((datum) => datum.key === key);

    if (updatedData.length !== data.length) {
      if (findDatum[0].ttl < timeStamp) "Time expired. Can't delete data!";

      this.saveData(updatedData);
      return "Removed key was : " + key;
    } else {
      return "No data found with that key!";
    }
  }
}

module.exports = {
  dataStore: DataStore,
};

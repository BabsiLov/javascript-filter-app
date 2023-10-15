const express = require('express')
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use( express.static('www') )

const dataFilePath = './db.json';


app.get('/salons', async (req, res) => {
  try { 
    const data = await fs.promises.readFile(dataFilePath, 'utf-8');
    const jsonData = JSON.parse(data);
    let salons = jsonData.salons;

    const searchParam = req.query.search?.toLocaleLowerCase();
    const byTreatmentsParam = req.query.byTreatments === 'true';
    if (searchParam) {
      salons = salons.filter(item => {
        if (byTreatmentsParam) {
          const treatmentNames = item.treatments.map(treatment => treatment.name.toLowerCase());
          return treatmentNames.some(name => name.includes(searchParam.toLowerCase()));
        }
        else {
          return item.name.toLowerCase().includes(searchParam)
        }
      }
      );
    }

    return res.send(salons);
  }
  catch (err) {
    console.error('Error reading JSON file:', err);
    res.status(500).json({ error: 'Failed to read db file' });
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})

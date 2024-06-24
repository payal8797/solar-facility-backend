const Papa = require('papaparse');
const fs = require('fs');
const { format } = require('date-fns');
const SolarData = require('../models/SolarData');

// Function to handle file upload and process CSV data
const handleFileUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const csvData = fs.readFileSync(req.file.path, 'utf8');
  // Parse CSV data using PapaParse
  Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
    complete: async function (results) {
      const formattedData = results.data.map(row => {
        const activePower = parseFloat(row['active_power_kW']);
        const energy = parseFloat(row['energy_kWh']);
        
        if (isNaN(activePower) || isNaN(energy)) {
          console.error('Invalid data:', row);
        }
        
        // Parse and format timestamp
        const [datePart, timePart] = row['timestamp'].split(' ');
        const [year, month, day] = datePart.split('-');
        const [hour, minute, second] = timePart.split(':');

        const timestamp = new Date(year, month - 1, day, hour, minute, second);

        return {
          timestamp,
          activePower,
          energy
        };
      });

      try {
        await SolarData.insertMany(formattedData);
        res.status(200).json({ message: 'Data saved successfully.' });
      } catch (error) {
        console.error('Error saving data to MongoDB:', error);
        res.status(500).json({ error: 'Failed to save data to database.' });
      } finally {
        fs.unlinkSync(req.file.path);
      }
    }
  });
};

module.exports = {
  handleFileUpload
};

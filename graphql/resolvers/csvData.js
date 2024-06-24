const {GraphQLUpload}  = require('graphql-upload');
const CSVData = require('../../models/SolarData');
const parse = require('csv-parse');
const multer = require('multer');


module.exports = {
  Upload: GraphQLUpload,

  Mutation: {
    uploadCSVFile: async (_, {file}) => {
      const { createReadStream, filename, mimetype, encoding } = await file;
      console.log("file", file, createReadStream, filename, mimetype, encoding)

    //   const stream = createReadStream();
      return new Promise((resolve, reject) => {
        const parser = parse({
          columns: true,
          skip_empty_lines: true
        });

        stream.pipe(parser);

        parser.on('data', async (row) => {
          const { timestamp, activePower, energy } = row;

          const newData = new CSVData({
            timestamp: new Date(timestamp),
            activePower: parseFloat(activePower),
            energy: parseFloat(energy)
          });

          await newData.save();
        });

        parser.on('end', () => {
          resolve(`File ${filename} uploaded successfully`);
        });

        parser.on('error', (err) => {
          reject(`Error parsing CSV: ${err.message}`);
        });
      });
    }
  },

  Query: {
    async getCSVData() {
      try {
        const data = await CSVData.find();
        return data;
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};

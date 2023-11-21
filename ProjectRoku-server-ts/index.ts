import express, { Request, Response } from 'express';
import fs from 'fs';
import cors from 'cors';
import dotenv from 'dotenv';
import { formatPath, traverseDirectory } from './utils/helpers';

dotenv.config();

const stringText = process.env.TEXT;
const app = express();


app.use(cors());
app.use(express.json({limit: '1GB'}));
app.use(express.urlencoded({extended: true, limit: '1GB'}));

const downloadsFolder = "/Users/mac/Downloads/MessageDissemination";  // Replace with the path to your Downloads folder.

app.get('/list-downloads', async (req: Request, res: Response) => {

  const response = await traverseDirectory(downloadsFolder);
  res.status(200).json({
    ...response,
    path: downloadsFolder,
  });
});


app.get('/download', (req,res) => {
  const filePath = req.query?.filePath as string;
  console.log('this isthe filePath', filePath);
  const stat = fs.statSync(filePath);
  const fileName = filePath.split('/').pop();
  const fileStream = fs.createReadStream(filePath);

  res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
  res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Content-Length', stat.size);


  fileStream.on('data', chunk => {
    res.write(chunk)
  });
  fileStream.on('end', () => {
    res.end();
  });
  fileStream.on('error', err => {
    res.status(500).send('Error reading the file.')
  })
})

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server!');
});
const port = process.env.PORT;
app.listen(port as unknown as number, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});



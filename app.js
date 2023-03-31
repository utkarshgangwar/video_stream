const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Upload endpoint
app.post('/video', upload.single('video'), (req, res) => {
  console.log(req.file);
  res.send('Video uploaded successfully!');
});

// Stream endpoint
app.get('/video/:filename', (req, res) => {
  const filename = req.params.filename;
  const path = `uploads/${filename}`;
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] 
      ? parseInt(parts[1], 10)
      : fileSize - 1;
    const chunkSize = (end - start) + 1;
    const file = fs.createReadStream(path, { start, end });
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, headers);
    file.pipe(res);
  } else {
    const headers = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, headers);
    fs.createReadStream(path).pipe(res);
  }
});

// Download endpoint
app.get('/video/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const path = `uploads/${filename}`;
  res.download(path);
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
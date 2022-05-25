const express = require('express')
const app = express()
const port = 8080

const { generateVideo } = require('./services/video.service.js');

app.get('/', (req, res) => {
  res.send('Go to /remotion/:text/?:shape to generate a video!');
});

const onProgress = ({ renderedFrames }) => {
  const TOTAL = 3 * 30;
  if (renderedFrames < TOTAL) {
    console.log(`${renderedFrames} / ${TOTAL}`);
  }
}

const allowedShapes = ['landscape', 'portrait'];

app.get('/remotion/:text/:shape?', (req, res) => {
  const text = req.params.text;
  const shape = req.params?.shape ?? 'landscape';

  if (!allowedShapes.includes(shape)) {
    console.error(`Shape ${shape} is not allowed.`);
    res.send(`Shape ${shape} is not allowed.`);
    return;
  }

  generateVideo(text, shape, (data) => onProgress(data)).then(() => {
    console.log('DONE');
    res.send(`Your video is ready: "${text}"`);
  })
})

app.listen(port, () => {
  console.log(`Remotion server listening on port ${port}: http://localhost:${port}/`);
});


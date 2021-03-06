import express from 'express';
import path from 'path';

module.exports = app => {
  if (process.env.NODE_ENV === 'production') {
    console.log('Using production build of client and server.');
    app.use(express.static(path.join(__dirname, '../../client/build')));
    app.get('*', (req, res) => {
      res.sendFile(
        path.resolve(__dirname, '..', '..', 'client', 'build', 'index.html')
      );
    });
  } else if (process.env.NODE_ENV === 'test') {
    console.log('Testing production build of client and server.');
    app.use(express.static(path.join(__dirname, '../../client/build')));
    app.get('*', (req, res) => {
      res.sendFile(
        path.resolve(__dirname, '..', '..', 'client', 'build', 'index.html')
      );
    });
  } else {
    console.log('Using development client and server.');
  }
};

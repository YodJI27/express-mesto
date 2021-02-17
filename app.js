const express = require('express');
const path = require('path');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const app = express();

const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', userRouter)
app.use('/', cardsRouter);

app.use((req, res) => {
  return res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT);

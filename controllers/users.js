const User = require("../models/user");

module.exports.getUsers = (req, res) =>
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((_) =>
      res
        .status(500)
        .send({ message: "Произошла ошибка. Они всегда происходят..." })
    );

module.exports.getProfile = (req, res) =>
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "Нет пользователя с таким id" });
      }
      res.status(200).send(user);
    })
    .catch((_) =>
      res
        .status(500)
        .send({ message: "Произошла ошибка. Они всегда происходят..." })
    );

module.exports.createProfile = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      if (user) {
        res.status(400).send({ message: "Пользователь уже существует" });
      }
      res.status(200).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch((_) =>
      res
        .status(500)
        .send({ message: "Произошла ошибка. Они всегда происходят..." })
    );
};

module.exports.updatePrfoile = (req, res) => {
  const { id } = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(id, { name, about }, { new: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((_) =>
      res
        .status(500)
        .send({ message: "Произошла ошибка. Они всегда происходят..." })
    );
};

module.exports.updateAvatar = (req, res) => {
  const { id } = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(id, { avatar }, { new: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((_) =>
      res
        .status(500)
        .send({ message: "Произошла ошибка. Они всегда происходят..." })
    );
};

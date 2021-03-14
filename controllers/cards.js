const Cards = require("../models/cards");

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(400).send(err));
};

module.exports.createCards = (req, res) => {
  const { name, link } = req.body;

  Cards.create({ name, link, owner: req.user._id })
    .then((card) =>
      res.status(200).send({
        name: card.name,
        link: card.link,
      })
    )
    .catch((_) =>
      res
        .status(500)
        .send({ message: "Произошла ошибка. Они всегда происходят..." })
    );
};

module.exports.deleteCards = (req, res) => {
  const { id } = req.params.cardId;

  Cards.findByIdAndRemove({ _id: id })
    .then((cardInfo) => res.status(200).send(cardInfo))
    .catch((_) =>
      res
        .status(500)
        .send({ message: "Произошла ошибка. Они всегда происходят..." })
    );
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  ).catch((_) =>
    res
      .status(500)
      .send({ message: "Произошла ошибка. Они всегда происходят..." })
  );
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  ).catch((_) =>
    res
      .status(500)
      .send({ message: "Произошла ошибка. Они всегда происходят..." })
  );
};

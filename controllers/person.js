import Person from '../models/person';

class PersonController {
  index(req, res) {
    Person.find({}, (error, persons) => {
      if (error) res.status(404).json({ error });

      res.status(200).json({ persons });
    });
  }

  create(req, res) {
    const params = req.body.person;

    Person.create(params, (error, person) => {
      if (error) return res.status(200).json({ error });

      res.status(200).json({ person });
    });
  }

  show(req, res) {
    Person.findById(req.params.id, (error, person) => {
      if (error) res.status(404).json({ error });

      res.status(200).json({ person });
    });
  }

  update(req, res) {
    const params = req.body.person;
    const personId = req.params.id;

    Person.findByIdAndUpdate(personId, { $set: params }, { new: true }, (error, person) => {
      if (error) return res.status(200).json({ error });

      res.status(200).json({ person });
    });
  }

  delete(req, res) {
    Person.findOneAndRemove(req.params.id, (error, person) => {
      if (error) res.status(404).json({ error });

      res.status(200).json({
        message: 'Person was deleted',
        personId: person._id,
      });
    });
  }

  async match(req, res) {
    const persons = await Person.find().exec();

    persons.map(async (person) => {
      await Promise.all([
        Person.findOneAndUpdate({ isMatched: false, _id: { $nin: [person._id, person.matchedPerson] } }, { $set: { isMatched: true } }).exec()
      ]).then(async (results) => {
        const friend = results[0];

        await Person.findOneAndUpdate({ _id: person._id }, { $set: { matchedPerson: friend } }).exec();
      });
    });

    const updatedPersons = await Person.find().exec();

    res.status(200).json({ persons: updatedPersons });
  }
}

export default PersonController;

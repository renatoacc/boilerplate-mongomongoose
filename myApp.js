require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);


const createAndSavePerson = (done) => {
  const newPerson = new Person({
    name: "Renato",
    age: 31,
    favoriteFoods: ["Pizza", "Ice Cream"]
  });
  newPerson.save((error, data) => {
    if (error) return console.error(error);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  arrayOfPeople.map((elem) => {
    const newPerson = new Person({
      name: elem.name,
      age: elem.age,
      favoriteFoods: elem.favoriteFoods
    });
    newPerson.save((error, data) => {
      if (error) return console.error(error);
      done(null, data);
    })
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (error, data) => {
    if (error) return console.error(error);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (error, data) => {
    if (error) return console.error(error);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (error, data) => {
    if (error) return console.error(error);
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, (error, updatePerson) => {
    if (error) return console.error(error)
    updatePerson.favoriteFoods.push(foodToAdd);
    updatePerson.save((error, data) => {
      if (error) return console.error(error);
      done(null, data);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (error, updateAgePerson) => {
    if (error) return console.error(error)
    done(null, updateAgePerson);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (error, data) => {
    if (error) return console.error(error);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (error, data) => {
    if (error) return console.log(error);
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort('name')
    .limit(5)
    .select('- age')
    .exec((error, response) => {
      if (error) return console.error(error);
      done(null, response);
    })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

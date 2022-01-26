
require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);


const createAndSavePerson = (done) => {
    const person = new Person({
        name: "Bob Smith",
        age: 77,
        favoriteFoods: ["Pizza", "Salad"]
    });

    person.save((err, data) => {
        if (err) return done(err);

        done(null, data);
    });
};

const createManyPeople = (arrayOfPeople, done) => {
    const manyPeople = Person.create(arrayOfPeople, (err, data) => {
        if (err) return done(err);

        return done(null, data);
    });
};

const findPeopleByName = (personName, done) => {
    const foundPerson = Person.find({
        name: personName
    }, (err, data) => {
        if (err) return done(err);

        return done(null, data);
    });
};

const findOneByFood = (food, done) => {
    const foundPerson = Person.findOne({
        favoriteFoods: food
    }, (err, data) => {
        if (err) return done(err);

        return done(null, data);
    });
};

const findPersonById = (personId, done) => {

    Person.findOne({
        _id: personId
    }, (err, data) => {
        if (err) {
            done(err);
        } else {
            done(null, data);
        }
    });
};

const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";

    findPersonById(personId, (err, person) => {
        if (err) return done(err);

        person.favoriteFoods.push(foodToAdd);

        person.save((err, person) => {
            if (err) return done(err);

            console.log(person);

            done(null, person);
        });
    });

};


const findAndUpdate = (personName, done) => {
    const ageToSet = 20;

    const filter = { name: personName };
    const update = { age: ageToSet };
    const options = { new: true };

    Person.findOneAndUpdate(filter, update, options, (err, newPerson) => {
        if (err) return done(err);

        done(null, newPerson);
    });
};

const removeById = (personId, done) => {
    done(null /*, data*/ );
};

const removeManyPeople = (done) => {
    const nameToRemove = "Mary";

    done(null /*, data*/ );
};

const queryChain = (done) => {
    const foodToSearch = "burrito";

    done(null /*, data*/ );
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



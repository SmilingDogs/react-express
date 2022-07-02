// const CustomerModel = require('../models/customer');

// function checkDuplicates(customer) {
//     CustomerModel.find() //gets an array of all customer objects from MongoDB
//     .then((data) => {
//       const customers = data;
//       const {firstName, lastName} = customer;
//       let exist = customers.find((item) => item.firstName === firstName && item.lastName === lastName);
//       return exist;
//     })
//     .catch(err => console.log(err));
// }

// module.exports.checkDuplicates = checkDuplicates;

const CustomerModel = require('../models/customer');

//* middleware for getting certain customer by id (repeats several times)

async function checkDuplicates(req, res, next) {
  let customers;
  try {
    
    customers = await CustomerModel.find();
    const {firstName, lastName} = req.body;
    let exist = customers.find((item) => item.firstName === firstName && item.lastName === lastName);

    if (exist) {
      return res.status(409).send('This customer already exists!');
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

 next();
}

module.exports.checkDuplicates = checkDuplicates;

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
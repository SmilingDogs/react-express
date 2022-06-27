const CustomerModel = require('../models/customer');

//* middleware for getting certain customer by id (repeats several times)

async function getCustomer(req, res, next) {
  let customer;
  try {
    const { id } = req.params;
    customer = await CustomerModel.findById(id);
    if (!customer) {
      return res.status(404).json('Can not find such customer...');
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.customer = customer;

  next();
}

module.exports.getCustomer = getCustomer;

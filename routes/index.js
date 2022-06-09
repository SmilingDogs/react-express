const express = require('express');
const router = express.Router();
const Joi = require('joi');
// const { v4: uuidv4 } = require('uuid');
const Customer = require('../models/customer');

// let customers = [
//     { id: uuidv4(), firstName: 'Jason', lastName: 'Statham' },
//     { id: uuidv4(), firstName: 'Arnold', lastName: 'Schwarzenegger' },
//     { id: uuidv4(), firstName: 'Jean-Claude', lastName: 'Van Damme'}
//   ];

router.get('/', (req, res) => {
  res.send(`<h1>Hello World</h1>`);
});

//Getting all customers

router.get('/api/customers', (req, res) => {
  // res.send(customers);

  Customer.find() //gets an array pf all customer objects from MongoDB
    .then((data) => {
      const customers = data;
      res.send(customers);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

//Getting certain customer by id

router.get('/api/customers/:id', getCustomer, (req, res) => {
  // const customer = customers.find((c) => c.id === id); //! все id === СТРОКИ, uuid() = тоже
  res.send(res.customer); //* отправить отдельного customerа
});

//Creating new customer

router.post('/api/customers', (req, res) => {
  const { error } = validateCustomer(req.body);

  if (error) {
    return res.status(400).send(error.message);
  }

  // const newCustomer = {
  //   id: uuidv4(), //*normally id is assigned by Mongo or other DBs automatically
  //   firstName: req.body.firstName,
  //   lastName: req.body.lastName,
  // };
  // customers.push(newCustomer);
  // res.status(201).send(newCustomer);

  const customer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  customer
    .save()
    .then(() => {
      const newCustomer = customer;
      res.status(201).send(newCustomer);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

//Updating certain customer

router.put('/api/customers/:id', getCustomer, (req, res) => {
  //* Look up the customer
  // const { id } = req.params;
  // const customer = customers.find((c) => c.id === id);

  // //* If such customer doesnt exist = return 404 status
  // if (!customer) {
  //   return res.status(404).send('The customer with this ID was not found...');
  // }

  const { error } = validateCustomer(req.body); //*нужно присвоить результат валидации и сразу достать из него error

  if (error) return res.status(400).send(error.message);
  let customer = res.customer;
  //* if all ok, Update the customer
  customer.firstName = req.body.firstName;
  customer.lastName = req.body.lastName;
  customer.save()
    .then(() => {
      const updatedCustomer = customer;
      res.send(updatedCustomer);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });

  // res.send(customer); //* then return the updated customer to the client
});

//Deleting exsiting customer

router.delete('/api/customers/:id', getCustomer, (req, res) => {
  // const { id } = req.params;

  // const customerToDelete = customers.find((c) => c.id === id);

  // if (!customerToDelete) {
  //   return res.status(404).send('The customer with this ID was not found...');
  // }

  // const deleteIndex = customers.indexOf(customerToDelete);
  // customers.splice(deleteIndex, 1);
  // res.send(customerToDelete);
  res.customer
    .remove()
    .then(() => res.json({ message: 'Customer was deleted' }))
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

async function getCustomer(req, res, next) {
  let customer;
  try {
    const { id } = req.params;
    customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json('Can not find such customer...');
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.customer = customer;

  next();
}

function validateCustomer(customer) {
  //* выносим Валидацию Joi отдельно чтобы не дублировать в разных местах.

  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  });

  return schema.validate(customer);
}

module.exports = router;

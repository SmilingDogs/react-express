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
  Customer.find()
    .then((data) => {
      const customers = data;
      res.send(customers);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

//Getting certain customer by id

router.get('/api/customers/:id', (req, res) => {
  const { id } = req.params;

  const customer = customers.find((c) => c.id === id); //! все id === СТРОКИ, uuid() = тоже
  if (!customer) {
    return res.status(404).send('The customer with this ID was not found...');
  }

  res.send(customer); //* отправить отдельного customerа
});
//Creating new customer

router.post('/api/customers', (req, res) => {
  const { error } = validateCustomer(req.body);

  if (error) return res.status(400).send(error.message);

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

router.put('/api/customers/:id', (req, res) => {
  //* Look up the customer
  const { id } = req.params;
  const customer = customers.find((c) => c.id === id);

  //* If such customer doesnt exist = return 404 status
  if (!customer) {
    return res.status(404).send('The customer with this ID was not found...');
  }

  const { error } = validateCustomer(req.body); //*нужно присвоить результат валидации и сразу достать из него error

  if (error) return res.status(400).send(error.message);

  //* if all ok, Update the customer
  customer.firstName = req.body.firstName;
  customer.lastName = req.body.lastName;

  res.send(customer); //* then return the updated customer to the client
});

//Deleting exsiting customer

router.delete('/api/customers/:id', (req, res) => {
  const { id } = req.params;

  const customerToDelete = customers.find((c) => c.id === id);

  if (!customerToDelete) {
    return res.status(404).send('The customer with this ID was not found...');
  }

  const deleteIndex = customers.indexOf(customerToDelete);
  customers.splice(deleteIndex, 1);
  res.send(customerToDelete);
});

function validateCustomer(customer) {
  //* выносим Валидацию Joi отдельно чтобы не дублировать в разных местах.

  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  });

  return schema.validate(customer);
}

module.exports = router;

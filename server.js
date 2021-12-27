const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
// const cors = require('cors')

const app = express(); //*создали сервер через express()
app.use(express.static(__dirname + '/public'));
app.use(express.json()); //*для корректного получения данных в JSON-format
app.use(express.urlencoded({ extended: false })); //*для корректного получения данных в url-encoded format

let customers = [
  { id: uuidv4(), firstName: 'Jane', lastName: 'Smith' },
  { id: uuidv4(), firstName: 'Johh', lastName: 'Rambo' },
  { id: uuidv4(), firstName: 'Chuck', lastName: 'Norris' },
];

app.get('/', (req, res) => {
  res.send(`<h1>Hello World</h1>`);
});

app.get('/api/customers', (req, res) => {
  res.send(customers);
});

app.get('/api/customers/:id', (req, res) => {
  const { id } = req.params;

  const customer = customers.find((c) => c.id === id); //! все id === СТРОКИ, uuid() = тоже
  if (!customer) {
    return res.status(404).send('The customer with this ID was not found...');
  }

  res.send(customer); //* отправить отдельного customerа
});

app.put('/api/customers/:id', (req, res) => {
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

app.post('/api/customers', (req, res) => {
  const { error } = validateCustomer(req.body);

  if (error) return res.status(400).send(error.message);

  const newCustomer = {
    id: uuidv4(), //*normally id is assigned by Mongo or other DBs automatically
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
  customers.push(newCustomer);
  res.status(201).send(newCustomer);
});

app.delete('/api/customers/:id', (req, res) => {
  const { id } = req.params;
  const customerToDelete = customers.find((c) => c.id === id);
  if (!customerToDelete)
    return res.status(404).send('The customer with this ID was not found...');

  const deleteIndex = customers.indexOf(customerToDelete);
  customers.splice(deleteIndex, 1);
  res.send(customerToDelete);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function validateCustomer(customer) {
  //* выносим Валидацию Joi отдельно чтобы не дублировать в разных местах.

  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  });

  return schema.validate(customer);
}

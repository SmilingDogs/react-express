const express = require("express");
// const cors = require('cors')
const Joi = require("joi")


const app = express(); //*создали сервер через express()

app.use(express.json()) //*для корректного получения данных в JSON-format
app.use(express.urlencoded({extended: false})) //*для корректного получения данных в url-encoded format


let customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Alex', lastName: 'Murfy'},
    {id: 3, firstName: 'Jason', lastName: 'Statham'},
  ];

app.get("/", (req, res) => {
  res.send(`<h1>Hello World</h1>`) //* показывать на роуте / (=== localhost:${PORT})
})

app.get('/api/customers', (req, res) => {
  res.send(customers); //* отправить массив customers

});
app.get('/api/customers/:id', (req, res) => {
  const {id} = req.params
  const customer = customers.find(c => c.id === +id)
  if(!customer) res.status(404).send('The customer with this ID was not found...')
  res.send(customer) //* отправить отдельного customerа

});

app.post('/api/customers', (req, res) => {

  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required()
});
  const result = schema.validate(req.body)
  console.log(result);

  if(result.error) {
    res.status(400).send(result.error.message)
    return
  }
  const newCustomer = {
    id: customers.length + 1, //*normally id is assigned by Mongo or other DBs automatically
    firstName: req.body.firstName,
    lastName: req.body.lastName
  }
  customers.push(newCustomer)
  res.status(201).send(newCustomer)

})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//* a testing app for communication of front and back

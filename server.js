const express = require("express");
const cors = require('cors')


const app = express(); //*создали сервер через express()

app.use(express.json()) //*для корректного получения данных в JSON-format
app.use(express.urlencoded({extended: false})) //*для корректного получения данных в url-encoded format


let customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Alex', lastName: 'Murfy'},
    {id: 3, firstName: 'Jason', lastName: 'Statham'},
  ];

app.get("/", cors(), (req, res) => {
  res.send('Hello World') //* показывать на роуте / (=== localhost:${PORT})
})

app.get('/api/customers', cors(), (req, res) => {
  res.json(customers); //* отправить массив customers

});
app.get('/api/customers/:id', cors(), (req, res) => {
  const {id} = req.params
  const customer = customers.find(c => c.id === +id)
  if(!customer) res.status(404).send('The customer with this ID was not found...')
  res.send(customer)

});

app.post('/api/customers', cors(), (req, res) => {
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

//* a testing app for communocation of front and back

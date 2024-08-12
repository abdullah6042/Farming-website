const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ContactModel = require('./Model/contact');
const LoginModel = require('./Model/login');
const RegisterModel = require('./Model/register');
const DonateModel = require('./Model/donate');
const cors = require('cors');
const donateRoutes = require('./Routes/Donate');
const contactRoutes = require('./Routes/Contact');
const loginRoutes = require('./Routes/Login');
const registerRoutes = require('./Routes/Register');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); 


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});
 



// Routes
app.use('/api/donate', donateRoutes)
app.use('/api/contact', contactRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/register', registerRoutes);

// Hardcoded admin credentials (replace with actual secure implementation in production)
const adminCredentials = {
  email: 'admin@gmail.com',
  password: 'admin123', // Replace with a secure password in production
};

// Login Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the provided credentials match the admin credentials
  if (email === adminCredentials.email && password === adminCredentials.password) {
    // Successful login response
    res.json({ message: 'Admin logged in successfully' });
  } else {
    // Unauthorized access response
    res.status(401).json({ message: 'Unauthorized access' });
  }
});


// Contact List

app.get('/getContact',(req,res)=>{
  ContactModel.find()
  .then(contacts => res.json(contacts))
  .catch(err => res.json(err))
})

app.delete('/deleteContact/:id', (req, res) => {
  ContactModel.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Contact deleted successfully' }))
    .catch(err => res.json(err));
});

app.put('/updateContact/:id', (req, res) => {
  ContactModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedContact => res.json(updatedContact))
    .catch(err => res.json(err));
});

app.post('/addContact', (req, res) => {
  const newContact = new ContactModel(req.body);
  newContact.save()
    .then(contact => res.json(contact))
    .catch(err => res.json(err));
});

// Login List

app.get('/getLogin',(req,res)=>{
  LoginModel.find()
  .then(logins => res.json(logins))
  .catch(err => res.json(err))
})

app.delete('/deleteLogin/:id', (req, res) => {
  LoginModel.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Login deleted successfully' }))
    .catch(err => res.json(err));
});

app.put('/updateLogin/:id', (req, res) => {
  LoginModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedLogin => res.json(updatedLogin))
    .catch(err => res.json(err));
});

app.post('/addLogin', (req, res) => {
  const newLogin = new LoginModel(req.body);
  newLogin.save()
    .then(login => res.json(login))
    .catch(err => res.json(err));
});

// Register List

app.get('/getRegister',(req,res)=>{
  RegisterModel.find()
  .then(registers => res.json(registers))
  .catch(err => res.json(err))
})

app.delete('/deleteRegister/:id', (req, res) => {
  RegisterModel.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Register deleted successfully' }))
    .catch(err => res.status(500).json({ error: 'Failed to delete register' }));
});

app.put('/updateRegister/:id', (req, res) => {
  RegisterModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedRegister => res.json(updatedRegister))
    .catch(err => res.status(500).json({ error: 'Failed to update register' }));
});

app.post('/addRegister', (req, res) => {
  const newRegister = new RegisterModel(req.body);
  newRegister.save()
    .then(register => res.json(register))
    .catch(err => res.status(500).json({ error: 'Failed to add register' }));
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const Contact = require('../models/Contact');

exports.create = async (req, res) => {
  try{
    const {fullName, email, mobile, city} = req.body;
    const c = new Contact({fullName, email, mobile, city});
    await c.save();
    res.json(c);
  }catch(err){
    res.status(500).json({message: err.message});
  }
};

exports.getAll = async (req, res) => {
  const contacts = await Contact.find().sort({createdAt:-1});
  res.json(contacts);
};

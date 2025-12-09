
const Client = require('../models/Client');

exports.getAll = async (req, res) => {
  const clients = await Client.find().sort({createdAt:-1});
  res.json(clients);
};

exports.create = async (req, res) => {
  try{
    const {name, designation, description} = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const c = new Client({name, designation, description, imageUrl});
    await c.save();
    res.json(c);
  }catch(err){
    res.status(500).json({message: err.message});
  }
};

exports.delete = async (req, res) => {
  await Client.findByIdAndDelete(req.params.id);
  res.json({message: 'Deleted'});
};

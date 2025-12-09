
const Subscribe = require('../models/Subscribe');

exports.create = async (req, res) => {
  try{
    const {email} = req.body;
    const s = new Subscribe({email});
    await s.save();
    res.json(s);
  }catch(err){
    res.status(400).json({message: err.message});
  }
};

exports.getAll = async (req, res) => {
  const subs = await Subscribe.find().sort({createdAt:-1});
  res.json(subs);
};

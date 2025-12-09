
const Project = require('../models/Project');

exports.getAll = async (req, res) => {
  const projects = await Project.find().sort({createdAt:-1});
  res.json(projects);
};

exports.create = async (req, res) => {
  try{
    const {name, description} = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const p = new Project({name, description, imageUrl});
    await p.save();
    res.json(p);
  }catch(err){
    res.status(500).json({message: err.message});
  }
};

exports.delete = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({message: 'Deleted'});
};

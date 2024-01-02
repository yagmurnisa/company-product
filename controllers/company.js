const Company = require('../models/Company');

const addCompany = async (req,res) => {
    const { legalNumber, name, country, website } = req.body;
    try {
      if (legalNumber.trim()== '' || name.trim()=='' || country.trim()=='' || website.trim()=='' ){
        return res.status(400).json({ msg: 'Please fill all fields'  });
      }
        let comp = await Company.findOne({ legalNumber });
        if (comp) {
            console.log("company already exists");
            return res.status(400).json({ msg: 'Company already exists'  });
        }
        let newComp = new Company({
            legalNumber: legalNumber,
            name: name,
            country: country,
            website: website,
        });
        let company = await newComp.save();
        res.status(200).json(company);
    } catch (err) {
        console.error(err.message);
        res.status(404).json(err.message);
    }
};
const getCompanies = async (req,res) => {
    try {
        let companies = await Company.find().sort({_id: -1});
        res.status(200).json(companies);     
    } catch (err) {
        console.error(err.message);
        res.status(404).json(err.message);
      }
};

const getLastCompanies = async (req,res) => {
  try {
      let companies = await Company.find().sort({_id: -1}).limit(3);
      res.status(200).json(companies);     
  } catch (err) {
      console.error(err.message);
      res.status(404).json(err.message);
    }
};
const deleteCompany = async(req, res) => {
    try {
        let company = await Company.findById(req.params.id);
        if (!company) {
          return res.status(400).json({ msg: 'Company not found' });
        }
        await company.deleteOne();
        res.status(200).json({ msg: 'Company deleted' });
      } catch (error) {
        console.error(error.message);
        if (error.kind == 'ObjectId') {
          return res.status(400).json({ msg: 'Company not found' });
        }
        res.status(500).send('Server Error');
      }
};
const editCompany = async (req,res) => {
  let fields = {};
  fields.name = req.body.name;
  fields.country = req.body.country;
  fields.website = req.body.website;
  try {
    if (fields.name.trim()=='' || fields.country.trim()=='' || fields.website.trim()=='' ){
        return res.status(400).json({ msg: 'Please fill all fields'  });
      }
      let checkComp = await Company.findById( req.params.id );
      if (!checkComp) {
          console.log("company does not exist");
          return res.status(400).json({ msg: 'Company does not exist'  });
      }
    let comp= await Company.findOneAndUpdate(
        { _id: req.params.id },
        { $set: fields },
        { new: true }
    );
      console.log(comp);
      res.status(200).json(comp);
  } catch (err) {
      console.error(err.message);
      res.status(404).json(err.message);
  }
};
module.exports = {addCompany, getCompanies, getLastCompanies, deleteCompany, editCompany};
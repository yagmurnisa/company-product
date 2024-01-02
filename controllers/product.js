const Product = require('../models/Product');

const addProduct = async (req,res) => {
    const { name, category, amount, unit, companyNumber } = req.body;
    try {
      if (name.trim()== '' || category.trim()=='' || amount.trim()=='' || unit.trim()=='' || companyNumber.trim()==''){
        return res.status(400).json({ msg: 'Please fill all fields'  });
      }
        let comp = await Company.findOne({ legalNumber: companyNumber });
        if (!comp) {
            console.log("Company does not exist");
            return res.status(400).json({ msg: 'Company does not exist'  });
        }
        const newProduct = new Product({
            company: comp._id,
            name: name,
            category: category,
            amount: amount,
            unit: unit,
        });
        let save = await newProduct.save();
        const product = await Product.findById(save._id).populate(
          'company',
          ['legalNumber', 'name']
        );
        res.status(200).json(product);
    } catch (err) {
        console.error(err.message);
        res.status(404).json(err.message);
    }
};
const getProducts = async (req,res) => {
    try {
        const products = await Product.find().sort({_id: -1}).populate(
          'company',
          ['legalNumber', 'name']
        );
        res.status(200).json(products);     
    } catch (err) {
        console.error(err.message);
        res.status(404).json(err.message);
      }
};
const deleteProduct = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
          return res.status(400).json({ msg: 'Product not found' });
        }
        await product.deleteOne();
        res.status(200).json({ msg: 'Product deleted' });
      } catch (error) {
        console.error(error.message);
        if (error.kind == 'ObjectId') {
          return res.status(400).json({ msg: 'Product not found' });
        }
        res.status(500).send('Server Error');
      }
};
const editProduct = async (req,res) => {
    let fields= {};
    fields.name = req.body.name;
    fields.category = req.body.category;
    fields.amount = req.body.amount;
    fields.unit = req.body.unit; 
    try {
        if (fields.name.trim()== '' || fields.category.trim()=='' || fields.amount.trim()=='' || fields.unit.trim()==''){
            return res.status(400).json({ msg: 'Please fill all fields'  });
        }
      let checkproduct = await Product.findById( req.params.id );
      if (!checkproduct) {
          console.log("Product does not exist");
          return res.status(400).json({ msg: 'Product does not exist'  });
      }
       await Product.findOneAndUpdate(
        { _id: req.params.id },
        { $set: fields },
        { new: true }
    );
    let product = await Product.findById(req.params.id).populate(
      'company',
      ['legalNumber', 'name']
    );
      res.status(200).json(product);
  } catch (err) {
      console.error(err.message);
      res.status(404).json(err.message);
  }
};
module.exports = {addProduct, getProducts, deleteProduct, editProduct};
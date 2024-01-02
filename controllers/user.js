const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req,res) => {
  const { name, password } = req.body;
  try {
    if (name.trim()== '' || password.trim()==''){
      return res.status(400).json({ msg: 'Please fill all fields'  });
    }
    let user = await User.findOne({ name });
    if (!user) {
      console.log("no such username");
      return res.status(400).json({ msg: 'Username does not exist'  });
     
    } 
    else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("password incorrect");
        return res.status(400).json({  msg: 'Password is incorrect'  });
      }
      else {
          const payload = {
              user: {
                  id: user.id,
              },
          };
          jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 3600 }, // 1 hour expire time
          (error, token) => {
              if (error) throw error;
              res.status(200).json({ token });
          }
          );
      }}
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const register = async (req,res) => {
  const { name, email, password, password2 } = req.body;
  try {
    if (name.trim()== '' || password.trim()=='' || email.trim()=='' || password2.trim()=='' ){
      return res.status(400).json({ msg: 'Please fill all fields'  });
    }
    if (password != password2){
      return res.status(400).json({ msg: 'Passwords do not match'  });
    }
    let checkEmail = await User.findOne({ email });
    if (checkEmail) {
      console.log("email taken");
      return res
        .status(400)
        .json({  msg: 'This e-mail is taken' });
    }
    let checkName = await User.findOne({ name });
    if (checkName) {
      console.log("name taken");
      return res
        .status(400)
        .json({  msg: 'This username is taken' });
    }
    var user = new User({
      name,
      email,
      password,
    });
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    console.log(user);
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 }, // 1 hour expire time
      (error, token) => {
          if (error) throw error;
          res.status(200).json({ token });
      }
    );
  console.log(res.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('An error occured');
  }
};
module.exports = {login, register};
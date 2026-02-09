import {  createUserService, getUserService } from "../service/UserService.js";


export const getUsersService = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};


export const getUser =async(req, res) => {
  try {

    const user =await getUserService(req.query); 
    console.log("user===>",user)
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const createUserController =async (req, res) => {
  try {
    const { name, email,password,address, phone } = req.body;
    console.log("body =", req.body)

    // Validation
    if (!name || !email ||!password ||!address ||!phone) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name and email'
      });
    }

    
    const newUser = {
      name,
      email,
      password,
      address,
      phone
    };

    console.log("newUser==",newUser)
   const created= await createUserService(newUser);

    res.status(201).json({
      success: true,
      data: created
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const updateUser = (req, res) => {
  try {
    const user = users.find(u => u.id === parseInt(req.params.id));
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const { name, email,password,address,phone } = req.body;

    // Update user
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    user.address = address|| user.address;
    user.phone = phone || user.phone;

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};


export const deleteUser = (req, res) => {
  try {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    users.splice(userIndex, 1);

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
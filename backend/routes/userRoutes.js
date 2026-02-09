import express from 'express';

import {
  getUser,
  updateUser,
  deleteUser,
  getUsersService,
  createUserController
} from '../controllers/UserController.js';


const router = express.Router();

// router.get("/get", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Users fetched successfully"
//   });
// });

router.get('/get', getUser);
router.get('/get:id', getUsersService);
router.post('/create', createUserController);
router.put('/update:id', updateUser);
router.delete('/delete', deleteUser);

export default router;
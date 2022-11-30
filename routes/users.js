import express from "express";
import {
  deleteUsers,
  getAllUsers,
  getUsers,
  updateUsers,
} from "../controller/users.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauthentication", verifyToken, (request, response, next) => {
  response.send("Hello user, You are logged In");
});

router.get("/checkuser/:id", verifyUser, (request, response, next) => {
  response.send(
    "Hello user, You are logged In and you can delete your account"
  );
});

router.get("/checkadmin/:id", verifyAdmin, (request, response, next) => {
  response.send(
    "Hello Admin, You are logged In and you can delete all accounts"
  );
});

//Just using the above code to check if user can perform admin role

router.put("/:id", verifyUser, updateUsers);
router.delete("/:id", verifyUser, deleteUsers);
router.get("/:id", verifyUser, getUsers);
router.get("/", verifyAdmin, getAllUsers);

export default router;

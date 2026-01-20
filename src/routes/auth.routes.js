import express from "express";
import { createUser, login } from "../modules/users/users.controller.js";

export const router = express.Router();

router.post("/login", login);
router.post("/register", createUser);
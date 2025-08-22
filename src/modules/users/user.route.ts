import { Router } from "express";
import { container } from '../../containers/container';
import { UserController } from "./user.controller";

const router = Router();
const userController = container.resolve(UserController);

router.get("/", (req, res) => userController.getUsers(req, res));
router.get("/:id", (req, res) => userController.getUserById(req, res));
router.post("/", (req, res) => userController.create(req, res));
router.put("/:id", (req, res) => userController.update(req, res))
router.delete("/:id", (req, res) => userController.delete(req, res))

export default router;
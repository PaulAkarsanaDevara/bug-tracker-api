import {  Router } from "express";
import { container } from '../../containers/container';
import { BugController } from "./bug.controller";

const router = Router();
const bugController = container.resolve(BugController);

router.post('/', (req, res) => bugController.create(req, res));
router.get('/', (req, res) => bugController.getBugs(req, res));
router.get('/:id', (req, res) => bugController.getBugById(req, res));
router.put('/:id', (req, res) => bugController.update(req, res));
router.put("/:id/assign", (req, res) =>  bugController.assign(req, res));
router.delete('/:id', (req, res) => bugController.delete(req, res));


export default router;
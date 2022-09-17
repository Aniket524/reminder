import express from 'express'
import { getAllReminder,addReminder, deleteReminder } from '../controllers/reminder.js';

const router = express.Router();

router.get('/getAllReminder',getAllReminder)
router.post('/addReminder',addReminder)
router.post('/deleteReminder',deleteReminder)


export default router;
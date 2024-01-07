import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import {handleValidationErrors, checkAuth} from './utils/index.js';
import {UserController, TaskController} from './controllers/index.js';
import {TaskValidator, AuthValidator} from './validations/index.js';

mongoose
    .connect('mongodb+srv://maximlavrovsky:maximsmongodb@cluster0.aufmgcu.mongodb.net/BacktestWorkTodoVilisov?retryWrites=true&w=majority')
    .then(() => console.log('DB is OK...'))
    .catch((e) => {
        console.log('DB error', e);
    });

const app = express()
app.use(express.json());
app.use(cors());

app.post('/auth/register', ...AuthValidator.register, handleValidationErrors, UserController.register)
app.post('/auth/login', ...AuthValidator.login, handleValidationErrors, UserController.login)
app.get('/auth/me', checkAuth, UserController.getMe)

app.get('/tasks', TaskController.getAll)
app.get('/tasks/:id', TaskController.getOne)
app.delete('/tasks/:id', checkAuth, TaskController.remove)
app.post('/tasks', checkAuth, ...TaskValidator.taskCreate, handleValidationErrors, TaskController.create)
app.patch('/tasks/:id', checkAuth, ...TaskValidator.taskUpdate, handleValidationErrors, TaskController.update)

app.listen(4444, () => {
    console.log('Server OK...')
})

import {body} from 'express-validator';

export const taskCreate = [
    body('title', 'Введите заголовок задачи 3 символа мин')
        .isLength({min: 3}),
    body('text', 'Введите текст задачи  8 символа мин')
        .isLength({min: 8})
];
export const taskUpdate = [
    body('title', 'Введите заголовок задачи  3 символа мин')
        .isLength({min: 3})
        .optional(),
    body('text', 'Введите текст задачи 3 символа мин')
        .isLength({min: 8})
        .optional(),
    body('status', 'Введите статус')
];

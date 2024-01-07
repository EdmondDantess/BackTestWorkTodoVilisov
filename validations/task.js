import {body} from 'express-validator';

export const taskCreate = [
    body('title', 'Введите заголовок задачи')
        .isLength({min: 3}),
    body('text', 'Введите текст задачи')
        .isLength({min: 8}),
    body('status', 'Введите текст задачи')
        .optional()
];
export const taskUpdate = [
    body('title', 'Введите заголовок задачи')
        .isLength({min: 3})
        .optional(),
    body('text', 'Введите текст задачи')
        .isLength({min: 8})
        .optional(),
    body('status', 'Введите текст задачи')
        .optional()
];

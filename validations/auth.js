import {body} from 'express-validator';

export const register = [
    body('email', 'Неверный формат почты')
        .isEmail(),
    body('password', 'Минимум 8 символов')
        .isLength({min: 8}),
    body('fullName', 'Минимум 3 символа')
        .isLength({min: 3})
];

export const login = [
    body('email', 'Неверный формат почты')
        .isEmail(),
    body('password', 'Минимум 8 символов')
        .isLength({min: 8})
];

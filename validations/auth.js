import {body} from 'express-validator';

export const loginRegister = [
    body('fullName', 'Минимум 3 символа')
        .isLength({min: 3})
];

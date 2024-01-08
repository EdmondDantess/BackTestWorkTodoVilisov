import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({fullName: req.body.fullName});

        if (!user) {
            try {
                const doc = new UserModel({
                    fullName: req.body.fullName,
                });
                const user = await doc.save();
                const token = jwt.sign(
                    {
                        _id: user._id,
                    },
                    'secret-key',
                    {
                        expiresIn: '30d',
                    },
                );
                const {...userData} = user._doc;
                return res.json({
                    ...userData,
                    message: 'Пользователь зарегистрирован',
                    token,
                });
            } catch (err) {
                console.log(err);
                res.status(500).json({
                    message: 'Не удалось зарегистрироваться ', err
                });
            }
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret-key',
            {
                expiresIn: '30d',
            },
        );

        const {...userData} = user._doc;

        res.json({
            ...userData,
            message: 'Успешно вошли',
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось авторизоваться',
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }
        const {...userData} = user._doc;

        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Нет доступа',
        });
    }
};

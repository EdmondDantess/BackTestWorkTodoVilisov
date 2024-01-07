import TaskModel from '../models/Task.js';

export const getAll = async (req, res) => {
    try {
        const tasks = await TaskModel.find().populate('user').exec();
        res.json(tasks);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить задачу',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        TaskModel.findOne({_id: postId},
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Не удалось вернуть задачу',
                    });
                }
                if (!doc) {
                    return res.status(404).json({
                        message: 'Статья не найдена',
                    });
                }

                res.json(doc);
            },
        ).populate('user');
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить задачи',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const taskId = req.params.id;

        TaskModel.findOneAndDelete(
            {
                _id: taskId,
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Не удалось удалить задачу',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Задача не найдена',
                    });
                }

                res.json({
                    success: true,
                });
            },
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить задачу',
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new TaskModel({
            title: req.body.title,
            text: req.body.text,
            status: 'pending',
            user: req.userId,
        });

        const task = await doc.save();

        res.json(task);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать задачу',
            err
        });
    }
};

export const update = async (req, res) => {
    try {
        const taskId = req.params.id;

        await TaskModel.updateOne(
            {
                _id: taskId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                status: req.body.status,
                user: req.userId
            },
        );

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить задачу',
        });
    }
};

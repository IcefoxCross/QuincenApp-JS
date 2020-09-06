const express = require('express');
const router = express.Router();
const Quincena = require('../models/quincena');

router.get('/', (req, res) => {
    Quincena.find({}).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(500).json({message: err.message});
    });
});

router.post('/', (req, res) => {
    const body = req.body;
    const quincena = new Quincena({
        init_day: new Date(body.date),
        income: Array(14).fill(0),
        expenses: Array(14).fill(0)
    });

    quincena.save().then(savedQuinena => {
        res.json(savedQuinena);
    }).catch((err) => {
        res.status(400).json({ message: err.message });
    });
});

router.delete('/:id', (req, res, next) => {
    Quincena.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end();
        }).catch(error => next(error));
});

router.put('/:id', (req, res, next) => {
    const body = req.body;
    const quincena = {
        income: body.income,
        expenses: body.expenses
    };

    Quincena.findByIdAndUpdate(req.params.id, quincena, {new: true})
        .then(updatedQuincena => {
            res.json(updatedQuincena);
        }).catch(error => next(error));
});

module.exports = router;
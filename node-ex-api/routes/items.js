const express = require('express');
const router = express.Router();
let data = [    
        {id: 29087, product: "Apples", origin: "The Netherlands", best_before_date: "November 2019", amount: "100kg", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Apples.jpg/512px-Apples.jpg"},
        {id: 29088, product: "Banana", origin: "India", best_before_date: "February 2019", amount: "120kg", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Bananas.jpg/640px-Bananas.jpg"}
];

router.get('/', function (req, res) {
    res.status(200).json(data);
});

router.get('/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', function (req, res) {

    let newItem = {
        id: req.body.id,
        product: req.body.product,
        origin: req.body.origin,
        best_before_date: req.body.best_before_date,
        amount: req.body.amount,
        image: req.body.image
    };

    data.push(newItem);
    res.status(201).json(newItem);
});

router.put('/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        let updated = {
            id: found.id,
            product: req.body.product,
            origin: req.body.origin,
            best_before_date: req.body.best_before_date,
            amount: req.body.amount,
            image: req.body.image
        };

        let targetIndex = data.indexOf(found);
        data.splice(targetIndex, 1, updated);
        res.sendStatus(204);
    
    } else {
        res.sendStatus(404);
    }
});

router.delete('/:id', function (req, res) {

    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        let targetIndex = data.indexOf(found);
        data.splice(targetIndex, 1);
    }
    res.sendStatus(204);
});

module.exports = router;

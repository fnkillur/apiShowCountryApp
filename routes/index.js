const express = require('express');
const router = express.Router();
const request = require('request-promise');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/countries', function (req, res) {

    Promise.all([
        request({url: 'http://country.io/continent.json', json: true}),
        request({url: 'http://country.io/names.json', json: true}),
        request({url: 'http://country.io/capital.json', json: true}),
        request({url: 'http://country.io/phone.json', json: true})
    ]).then(function (values) {
        console.log(req.query.count);
        let countries = [];
        Object.keys(values[0]).forEach(code => {
            countries.push({
                code,
                continent: values[0][code],
                name: values[1][code],
                capital: values[2][code],
                phone: values[3][code]
            });
        });
        res.status(200).json(countries);
    }).catch(function (error) {
        console.log(error);
    });
});

module.exports = router;

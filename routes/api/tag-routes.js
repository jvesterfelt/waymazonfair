const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
    // find all tags
    // be sure to include its associated Product data
    console.log('==========');
    Tag.findAll(req.body, {
            attributes: ['id', 'tag_name'],
            include: [{
                model: Product
            }]
        })
        .then(dbTagData => res.json(dbTagData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    Tag.findOne(req.body, {
            where: {
                id: req.params.id
            },
            include: [{
                model: Product
            }]
        })
        .then(dbTagData => res.json(dbTagData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    // create a new tag
    Tag.create(req.body, {
            tag_name: req.body.tag_name
        })
        .then(dbTagData => res.json(dbTagData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    // update a tag's name by its `id` value
    Tag.update(req.body, {
            where: {
                id: req.params.id
            },
        }, {
            tag_name: req.body.tag_name
        })
        .then(dbTagData => res.json(dbTagData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    // delete on tag by its `id` value
    Tag.destroy(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(dbTagData => {
            console.log('Product deleted.')
            res.status(200);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
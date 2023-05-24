const thingsController = require('../controllers/things.controller');

module.exports = (app) => {
    app.get('/api/things', thingsController.findAllThings);
    app.post('/api/things', thingsController.createThing);
    app.get('/api/things/recent', thingsController.findRecentThings);
    app.get('/api/things/:id', thingsController.getOneThing)
    app.put('/api/things/:id', thingsController.editThing);
    app.put('/api/things/:id/like', thingsController.likeThing);
    app.delete('/api/things/:id', thingsController.deleteThing);


};

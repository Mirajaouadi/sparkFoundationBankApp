module.exports = (app) => {
    const user1s = require('../controllers/user1.controller.js');


    app.post('/user1s', user1s.create);

    
    app.get('/user1s', user1s.findAll);

   
    app.get('/user1s/:user1Id', user1s.findOne);

    
    app.put('/user1s/:user1Id', user1s.update);

    
    app.delete('/user1s/:user1Id', user1s.delete);
}

module.exports = (app) => {
    const admin1s = require('../controllers/admin1.controller.js');


    app.post('/admin1s', admin1s.create);

    
    app.get('/admin1s', admin1s.findAll);

   
    app.get('/admin1s/:admin1Id', admin1s.findOne);

    
    app.put('/admin1s/:admin1Id', admin1s.update);

    
    app.delete('/admin1s/:admin1Id', admin1s.delete);
}

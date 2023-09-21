module.exports = (app) => {
    const transactions = require('../controllers/transaction.controller.js');


    app.post('/transactions', transactions.create);

    
    app.get('/transactions', transactions.findAll);

   
    app.get('/transactions/:transactionId', transactions.findOne);

    
    app.put('/transactions/:transactionId', transactions.update);

    
    app.delete('/transactions/:transactionId', transactions.delete);
}

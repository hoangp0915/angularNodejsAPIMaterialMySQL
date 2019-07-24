const posts = require('../models/post');
module.exports = {
  configure: function (app) {
    app.get('/posts/', function (req, res) {
      posts.get(res);
    });
    app.get('/posts/search/:title', function (req, res) {
      posts.search(req.params.title,res);
    });
    app.get('/posts/:id/', function (req, res) {
      posts.read(req.params.id, res);
    });

    app.post('/posts/', function (req, res) {
      posts.create(req.body, res);
    });

    app.put('/posts/:id', function (req, res) {
      posts.update(req.params.id, req.body, res);
    });

    app.delete('/posts/:id/', function (req, res) {
      posts.delete(req.params.id, res);
    });
   
  }
};
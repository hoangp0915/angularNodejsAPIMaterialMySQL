const connection = require('../connection');

function Post() {
    // GET DATA
    this.get = (res) => {
        connection.acquire( (err, con) => {
            con.query('select * from posts', (err, result) => {
                con.release();
                res.send(result);
            });
        });
    };
    //search
    this.search = (title,res) => {
        connection.acquire( (err, con) => {
            con.query(`select * from posts where title like '%${title}%'` ,(err, result) => {
                con.release();
                res.send(result);
            });
        }); 
    };
    //POST DATA
    this.create =  (field_data, res) => {
        connection.acquire( (err, con) => {
            con.query('insert into posts set ?', field_data,  (err, result) => {
                con.release();
                if (err) {
                    res.json({ status: 1, message: 'Post creation failed' });
                } else {
                    res.json({ status: 0, message: 'Post created successfully' });
                }
            });
        });
    };
    this.update =  (id,field_data, res) => {
        connection.acquire( (err, con)  =>{
            con.query('update posts set ? where id = ?', [field_data,id],  (err, result) => {
                con.release();
                if (err) {
                    res.send({ status: 1, message: 'Post update failed' });
                } else {
                    res.send({ status: 0, message: 'Post updated successfully' });
                }
            });
        });
    };
    this.read = function(id, res) {
        connection.acquire(function(err, con) {
          if(err) throw err;
          con.query('SELECT * FROM posts WHERE id=?', [id], function(err, result) {
            con.release();
            res.send(result);
          });
        });
      };
    this.delete =  (id, res) => {
        connection.acquire( (err, con) =>  {
            con.query('delete from posts where id = ?', [id],  (err, result)  =>{
                con.release();
                if (err) {
                    res.send({ status: 1, message: 'Failed to delete' });
                } else {
                    res.send({ status: 0, message: 'Deleted successfully' });
                }
            });
        });
    };
}
module.exports = new Post();
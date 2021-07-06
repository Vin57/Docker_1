const server = require("express");
const app = require("./app");
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect('mongodb://mongodb', {useUnifiedTopology: true}, (err, client) => {
    if(err) {
        console.log(err);
    } else {
        console.log('connection db ok !');
        count = client.db('test').collection("count");
    }
});

const serv = server(); 

serv.get('/', (req, res) => {
        let a = req.query.a;
        let b = req.query.b; 
        let sign = req.query.sign;
        app.calcul(a, b, sign).then( 
            (result) => {
                ret = "{"
                ret += `res:${result},`;
                count.findOneAndUpdate({}, {$inc: {count: 1}}, {returnNewDocument: true }).then((doc) => {
                    const count = doc.value;
                    ret += `try:${count.count}`
                    ret += "}"
                    res.json(ret).status(200).end();
                });
            }
        ).catch(
            (err) => res.json(err).status(500).end()
        );
    }
)

serv.listen(80); 
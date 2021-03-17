const redis = require('redis');
const REDIS_PORT = 6379;
const redis_client = redis.createClient(REDIS_PORT)

class RedisCache {
    checkCache = (req, res, next) => {
        console.log(`notes ${req.decoded.id}`)
        redis_client.get(`notes ${req.decoded.id}`, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            if (data != null) {
                console.log("data from redis" + data)
                console.log('loading data from redis')
                res.status(200).send(data);
            } else {
                next();
            }
        });
    };

    //load data into cache memory
    loadCache = (userId, data) => {
        redis_client.set(`notes ${userId}`, JSON.stringify(data));
    }

    deleteCache = (userId) => {
        redis_client.del(`notes ${userId}`, JSON.stringify({
            from: "cache memory",
        }), (err, data) => {
            if (err) {
                console.log("eroor");
            } else {
                console.log("deleted", data);
            }
        })
    }
    
}
module.exports = new RedisCache()
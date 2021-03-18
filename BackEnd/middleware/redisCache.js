const redis = require('redis');
const REDIS_PORT = 6379;
const redis_client = redis.createClient(REDIS_PORT)

class RedisCache {
    checkCache = (req, res, next) => {
        console.log(`notes ${req.decoded._id}`)
        redis_client.get(`notes ${req.decoded._id}`, (err, data) => {
            if (err) {
                console.log(err);
                res.status(400).send(err);
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
        console.log("cache loaded")
        redis_client.set(`notes ${userId}`, JSON.stringify(data));
    }

    deleteCache = (userId) => {
        redis_client.del(`notes ${userId}`, JSON.stringify({
            from: "cache memory",
        }), (err, data) => {
            if (err) {
                console.log("error");
            } else {
                console.log("deleted", data);
            }
        })
    }
    
}
module.exports = new RedisCache()
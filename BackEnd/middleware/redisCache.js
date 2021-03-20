const redis = require('redis');
const REDIS_PORT = 6379;
const redis_client = redis.createClient(REDIS_PORT)

class RedisCache {
    checkCache = (req, res, next) => {
        redis_client.get(`notes ${req.decoded._id}`, (err, data) => {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            if (data != null) {
                res.status(200).send(data);
            } else {
                next();
            }
        });
    };


    loadCache = (userId, data) => {
        redis_client.set(`notes ${userId}`, JSON.stringify(data));
    }

    deleteCache = (userId) => {
        redis_client.del(`notes ${userId}`, JSON.stringify({
            from: "cache memory",
        }), (err, data) => {
            if (err) {
                console.log("error");
            } else {
                console.log("deleted data from cache");
            }
        })
    }
    
}
module.exports = new RedisCache()
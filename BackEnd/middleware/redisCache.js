const redis = require('redis');
const client = redis.createClient();
const config = require('../../config').get();
const { infoLogger, errorLogger } = require('../middleware/logger')
const maxAge = 1400;

class RedisCache {
  
    get = (inputData, callBack) => {
        client.get(inputData, (error, data) => {
            if (error) {
                errorLogger.error('Error while retrieving data from redis cache');
                return callBack(error, null);
            }
            else
                return callBack(null, data);
        });
    }

    set = (userName, key, data) => {
        infoLogger.info('Setting data to redis cache');
        client.setex(`${key} ${userName}`, maxAge, JSON.stringify(data));
    }
}

module.exports = new RedisCache();
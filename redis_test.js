const redis = require('redis');

let client = redis.createClient(6379, 'localhost');

client.set('hello', 'this is a test!');

// client.get('hello', (err, res) => console.log(res))

setInterval(() => {
    client.sadd('num', parseInt(Math.random() * 100000000000));
    client.sadd('num', parseInt(Math.random() * 100000000000));
    client.sadd('num', parseInt(Math.random() * 100000000000));
    client.sadd('num', parseInt(Math.random() * 100000000000));
    client.sadd('num', parseInt(Math.random() * 100000000000));
    client.sadd('num', parseInt(Math.random() * 100000000000));
    client.sadd('num', parseInt(Math.random() * 100000000000));
    client.sadd('num', parseInt(Math.random() * 100000000000));
    client.sadd('num', parseInt(Math.random() * 100000000000));
    client.sadd('num', parseInt(Math.random() * 100000000000));
}, 1);
// client.lrange('list', 0, -1, (err, v) => console.log(v))

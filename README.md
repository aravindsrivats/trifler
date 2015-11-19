trifler
===========
A live preview tool for your HTML, CSS and Javascript. Uses [Code Mirror](http://codemirror.net "code mirror") and [Redis](http://redis.io "redis").

#### Installation
_You need to install [Node.js](https://nodejs.org "Node.js")._

Clone the repo from git.
```
git clone git@github.com:aravindsrivats/trifler.git
cd trifler
npm install
```

#### Redis
The tool uses redis to store the html, css and javascript.  To install redis:
```
wget http://download.redis.io/releases/redis-3.0.5.tar.gz
tar xzf redis-3.0.5.tar.gz
cd redis-3.0.5
make install
```
Then use
```
redis-server
```
to start the server. _(redis-server runs on port 6379 by default)_

#### Run
Once you've set up node and redis, you can run the app using
```
node .
```

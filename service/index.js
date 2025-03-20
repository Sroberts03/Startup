const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/register', async (req, res) => {
    if (await findUser('email', req.body.email)) {
        return res.status(409).send('User already exists');
    } else {
        const  user = await createUser(req.body.email, req.body.password);

        setAuthCookie(res, user.token);
        res.send({email: user.email});
    }
});

apiRouter.post('/login', async (req, res) => {
    const user = await findUser('email', req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
        user.token = uuid.v4();
        await DB.updateUser(user);
        setAuthCookie(res, user.token);
        res.send({ email: user.email });
        return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
        DB.updateUser(user);
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};

apiRouter.get('/scores', verifyAuth, async (req, res) => {
    const scores = await DB.getHighScores();
    res.send(scores);
});

apiRouter.post('/scores', verifyAuth, (req, res) => {
    scores = updateScores(req.body);
    res.send(scores);
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

async function updateScores(newScore) {
    await DB.addScore(newScore);
    return DB.getHighScores();
  }

async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    
    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
    };
    await DB.addUser(user);
    
    return user;
}

async function findUser(field, value) {
    if (!value) return null;
  
    if (field === 'token') {
      return DB.getUserByToken(value);
    }
    return DB.getUser(value);
  }

function setAuthCookie(res, token) {
    res.cookie(authCookieName, token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    });
}


const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
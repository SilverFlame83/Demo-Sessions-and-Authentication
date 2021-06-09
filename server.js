const express = require('express');

const app = express();

const sessions = {};

function mySession(req, res, next) {
    let session = {};
    if (req.headers.cookie) {
        const id = req.headers.cookie.split('=')[1];
        if (sessions[id] == undefined) {
            console.log('>>>Invalid session cookie, generating new');
            createSession();
        } else {
            session = sessions[id];
            console.log('>>>Exising session', session);
        }
    } else {
        createSession();
    }

    req.session = session;

    next();

    function createSession(){
        const id = ('00000000' + (Math.random() * 99999999 | 0).toString(16)).slice(-8);
        sessions[id] = session;
        res.setHeader('Set-Cookie', `sessionId=${id}`);
        console.log('New user, genrated with id', id);

        session.visited = 0;
    }
}
app.use(mySession);

app.get('/', (req, res) => {
    req.session.visited++;
    res.send(`<h1>Hello</h1><p>Your session has data ${JSON.stringify(req.session)}</p>`)
});

app.listen(3000);
const app = require('./app');

const port = 4242;

app().listen(port, () => console.log(`Server: ${process.pid}, listening on port: ${port}`));

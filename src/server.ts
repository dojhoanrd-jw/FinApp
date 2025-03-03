import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index', { titulo: 'FinApp' });
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.render('index', { titulo: 'FinApp' });
});

app.get('/convert', (req, res) => {
    res.render('convert', { titulo: 'Currency Converter', result: null });
});

app.post('/convert', async (req, res) => {
    const { from, to, amount } = req.body;
    try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const rate = response.data.rates[to];
        const result = amount * rate;
        res.render('convert', { titulo: 'Currency Converter', result });
    } catch (error) {
        res.render('convert', { titulo: 'Currency Converter', result: 'Error fetching exchange rate' });
    }
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

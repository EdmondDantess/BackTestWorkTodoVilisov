import express from 'express';
import cors from 'cors';

const app = express()
app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
    res.json('START DEVELOP')
});

app.listen(4444, () => {
    console.log('Server OK...');
});

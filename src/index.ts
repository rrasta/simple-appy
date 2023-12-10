import express from "express";
import itemsRoute from './routes/items.route';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/items', itemsRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import itemsRoute from './routes/items.route';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/items', itemsRoute)

const main = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/items')

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

main().catch((error) => {
    console.log('Something goes wrong', error)
})




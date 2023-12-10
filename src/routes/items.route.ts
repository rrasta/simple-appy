import express, { Request, Response } from 'express';
import Item from '../models/item';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const items = await Item.find()

        res.status(200).json(items)
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

router.post('/', async (req, res) => {
    const { user, title, content } = req.body

    const item = new Item({
        user,
        title,
        content,
    })

    try {
        const newItem = await item.save()

        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error });
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        item.set({
            user: req.body.user || item.user,
            title: req.body.title || item.title,
            content: req.body.content || item.content,
            lastModified: Date.now(),
        });

        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        await item.deleteOne();
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

export default router

import express, { Request, Response } from 'express';

const router = express.Router();

interface IItem {
    id: number
    user: string
    title: string
    content: string
    created: Date
    lastModified: Date
}

type AddNewItemPayload = Omit<IItem, 'id' | 'created' | 'lastModified'>

let id = 0
let items: IItem[] = []

// GET /items
router.get('/', (req, res) => {
    res.status(200).json(items)
})

router.post('/', (req, res) => {
    const {
        user, title, content
    } = req.body as AddNewItemPayload

    const newItem = {
        id: id++,
        user,
        title,
        content,
        created: new Date(),
        lastModified: new Date()
    }

    items.push(newItem)

    res.json(newItem)
})

router.put('/:id', (req, res) => {

    const idToModify = parseInt(req.params.id)

    // check if element with id exist
    const isExist = items.some(({ id }) => id === idToModify)

    if (!isExist) {
        return res.status(404).json({
            message: 'No Element found'
        })
    }

    items = items.map((item) => {
        if (item.id === idToModify) {
            const {
                user= item.user,
                title = item.title,
                content = item.content
            } = req.body as AddNewItemPayload

            return {
                ...item,
                user,
                title,
                content,
                lastModified: new Date()
            }
        }

        return item
    })

    return res.status(200).json({
        message: 'Element was modified'
    })

})

router.delete('/:id', (req, res) => {
    const idToModify = parseInt(req.params.id)

    // check if element with id exist
    const isExist = items.some(({ id }) => id === idToModify)

    if (!isExist) {
        return res.status(404).json({
            message: 'No Element found'
        })
    }

    items = items.filter(({ id }) => id !== idToModify)

    return res.status(200).json({
        message: 'Element was deleted'
    })
})

export default router

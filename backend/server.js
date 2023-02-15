import express from 'express'
import { task } from './task.js'
const app = express()
const port = 3000

app.use(express.json())
app.post('/task', (req, res) => {
    const { kegiatan } = req.body;

    const newItem = {
        id: task.length + 1,
        kegiatan: kegiatan
    }
    task.push(newItem)

    return res.status(200).send({
        status: 'success',
        data: task
    })
})

app.get('/task', (req, res) => {
    return res.status(200).send({
        status: 'success',
        data: task
    })
})

app.get('/task/:id', (req, res) => {
    const {id} = req.params;

    const finds = task.find((item) => item.id === Number(id))
    if(!finds) {
        return res.status(404).send({
            status: 'fails',
            message: 'Tidak ada kegiatan dengan id tersebut'
        })
    }
    const item = task.filter((item) => item.id === Number(id));
    res.status(200).send({
        status: 'success',
        data: item
    })
})

app.put('/task/:id', (req, res) => {
    const {id} = req.params;

    const finds = task.find((item) => item.id === Number(id));
    if(!finds) {
        return res.status(404).send({
            status: 'fails',
            message: 'Tidak ada kegiatan dengan id tersebut'
        })
    }

    const findIndex = task.findIndex((item) => item.id === Number(id));
    const { kegiatan } = req.body
    if(findIndex !== -1) {
        task[findIndex] = {
            ...task[findIndex],
            kegiatan
        }

        return res.status(200).send({
            status: 'success',
            data: task
        })
    }
});

app.delete('/task/:id', (req, res) => {
    const {id} = req.params;

    const finds = task.find((item) => item.id === Number(id))
    if(!finds) {
        return res.status(404).send({
            status: 'fails',
            message: `tidak ada task dengan id ${id}`
        })
    }

    const index = task.findIndex((item) => item.id === Number(id));
    task.splice(index, 1)

    return res.status(200).send({
        staus: 'success',
        data: task
    })
})
app.listen(port, () => console.log(`server run at ${port}`))
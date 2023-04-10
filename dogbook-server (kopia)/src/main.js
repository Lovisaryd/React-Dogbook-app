import express from 'express'
import {dogs, addDog, updateDog, deleteDog, deleteFriend} from './database.js'
import cors from 'cors'

const app = express();

app.use(cors({
    origin: "http://localhost:3000"
}))

app.use(express.json());

app.get('/friends', (req, res) => {
    res.status(200).send(friends)
})

app.get('/dogs', (req, res)=> {
    res.status(200).send(dogs)
})

app.get('/dogs/:id', (req, res) => {
    const id = +req.params.id
    const i = dogs.findIndex((i) => i.id === id)
    if(i >= 0){
      res.status(200).send(dogs[i])  
    } else{
        res.status(400).send("Dog not found");
    }
})

app.post('/dogs', (req, res) => {
    if(req.body.name && req.body.nick && req.body.age){
        const name = req.body.name;
        let maxId = Math.max(0,...dogs.map(object => object.id))
        let id = maxId + 1;
        let present = false;
        const nick = req.body.nick
        const bio = req.body.bio
        const age = req.body.age
        let friends = req.body.friends
        addDog({id, present, name, nick, age, bio, friends})
        console.log("dog added")
        res.status(201).send("New dog added.")
    } else {
        res.status(400).send("Bad request")
    }
})

app.patch('/dogs/:id', (req, res) => {

   const id = +req.params.id;
    const i = dogs.findIndex((i) => i.id === id)
    const updated = Object.assign(dogs[i], req.body)
    if(i >= 0){
        updateDog(i, updated)
     res.status(200).send("Updated!")
    } else {
        res.status(400).send("Bad request")
    }
    
})

app.delete('/dogs/:id', (req, res) => {
    const id = +req.params.id
    let i = dogs.findIndex((i) => i.id === id)
    if(i >= 0) {
        deleteDog(i)
        res.sendStatus(200)
        
    }else{
        res.status(400)
    }
})

app.delete('/dogs/:id/friends/:friend', (req, res) => {
    const id = +req.params.id
    const friend = +req.params.friend
    let i = dogs.findIndex((i) => i.id === id)
    if(i >= 0){
        deleteFriend(i, friend)
        res.sendStatus(202)
    } else {
        res.status(400)
    }
})

export {app}
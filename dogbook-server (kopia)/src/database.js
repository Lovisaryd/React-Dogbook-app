import {join, dirname} from 'path'
import { fileURLToPath } from 'url'
import {Low} from 'lowdb'
import {JSONFile} from 'lowdb/node'

const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

await db.read()

const dogs = db.data.dogs;

async function addDog({id, present, name, nick, age, bio, friends}){
    const response = await fetch('https://dog.ceo/api/breeds/image/random')
    const dogImg = await response.json()
    const src = dogImg.message
    const img = src
    dogs.push({img, id, present, name, nick, age, bio, friends})
    await db.write()
}

async function deleteFriend(i, friend){
    let friends = dogs[i].friends
    const found = friends.indexOf(friend)
    friends.splice(found, 1)
    await db.write()
}

async function updateDog(i, updated){
    dogs[i] = updated 
    await db.write()
}

async function deleteDog(i){
    for(let index = 0; index < dogs.length; index++){
    let friends = dogs[index].friends;
    const nick = dogs[i].nick;
    const found = friends.includes(nick);
    if(found){
        const friendIndex = friends.indexOf(nick)
        friends.splice(friendIndex, 1)
    }
}
    dogs.splice(i, 1)
    await db.write()
}

export {dogs, addDog, updateDog, deleteDog, deleteFriend}
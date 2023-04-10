import React, {useState, useEffect} from 'react'
import './main.css'
import { Startpage } from './Startpage.js'
import { Profile } from './Profile.js'
import { CreateDog } from './CreateDog.js'
import { EditPage } from './EditPage'

function App() {
  const [viewPage, setViewPage] = useState("STARTPAGE")
  const [dogs, setDogs] = useState([])
  const [dog, setDog] = useState({})
  const [friends, setFriends] = useState([])
  const [isFriends, setIsFriends] = useState([])
  const [editPage, setEditPage] = useState(false)
  
  useEffect(() =>{
    const fetchDogs = async () => {
      const response = await fetch('http://localhost:8000/dogs')
      const newDogs = await response.json();
      setDogs(newDogs)
    }
    fetchDogs()
    
  })
  const updateDog = async (dog) => {
    const id = dog.id
    const response = await fetch('http://localhost:8000/dogs/' + id)
    const updatedDog = await response.json()
    setDog(updatedDog)
    setFriends(updatedDog.friends)
  }


      switch(viewPage){
        case "STARTPAGE":
        return <Startpage dogs={dogs} setViewPage={setViewPage} setDog={setDog} setFriends={setFriends}></Startpage>;
        case "PROFILE":
          return <Profile setViewPage={setViewPage} dog={dog} friends={friends} updateDog={updateDog}></Profile>;
          case "EDITPAGE":
            return <EditPage viewPage={viewPage}setViewPage={setViewPage} dog={dog} setEditPage={setEditPage} editPage={editPage} dogs={dogs} isFriends={isFriends} setIsFriends={setIsFriends} friends={friends} setDog={setDog} setFriends={setFriends} updateDog={updateDog}></EditPage>;
            default:
              return <CreateDog setViewPage={setViewPage} dogs={dogs} setEditPage={setEditPage} setIsFriends={setIsFriends} isFriends={isFriends}></CreateDog>
      }
      
    
  ;
}

export default App;

import React, {useState, useEffect} from 'react'
import './main.css'
import { Startpage } from './Startpage.js'
import { Profile } from './Profile.js'
import { CreateDog } from './CreateDog.js'
import { EditPage } from './EditPage'

/*const Startpage = ({dogs, setViewPage, setDog, setFriends})=> {

  const viewDog = (dog) =>{
    setDog(dog);
    setFriends(dog.friends)
    setViewPage("PROFILE");
  }

  return(
      <div>
        <h1>Dogbook</h1>
        <h4>Our current dogs</h4>
          <ul>
            {dogs.map((dog, index) => <li key={index} className={dog.present ? "present" : "notPresent"} onClick={() => viewDog(dog)}>{dog.nick}</li>)}
          </ul>
          <button onClick={() => setViewPage("CREATE")}>Register new dog</button>
      </div>
  )
}*/


/*const Friends = ({friends, viewPage, dog, dogs, arrayHandler}) => {

let newDogslist = [];
  if(viewPage === "EDITPAGE"){
    
  for(let index = 0; index < dogs.length; index++){
    let nick = dogs[index].nick
    newDogslist.push(nick)
  }

   let currentDogNick = dog.nick
   let dogIndex = newDogslist.indexOf(currentDogNick)
   newDogslist.splice(dogIndex, 1)

  for(let index = 0; index < friends.length; index++){
    let friendNick = friends[index]
    let duplicate = newDogslist.includes(friendNick)
    if(duplicate){
      let friendIndex = newDogslist.indexOf(friendNick)
      newDogslist.splice(friendIndex, 1)
    }
  }
  }

  switch(viewPage){
    case "EDITPAGE":
      return (
        <div className="content">{newDogslist.map((dog, index) => <fieldset className="grid" key={index}><input type="checkbox" id="dog" onChange={() => arrayHandler(dog)}/><label htmlFor="dog">{dog}</label></fieldset>)}</div>
      )
        default:
        return (
          <div className="content">{dogs.map((dog, index) => <fieldset className="grid" key={index}><input type="checkbox" id="dog" onChange={() => arrayHandler(dog)}/><label htmlFor="dog">{dog.nick}</label></fieldset>)}</div>
        )
  }
}*/

/*export const Dropdown = ({viewPage, dog, setViewPage, dogs, isFriends, setIsFriends, newDog, setNewDog, editPage, infoToEdit, setInfoToEdit, friends}) =>{
  const [dropDownDisplay, setDropDownDisplay] = useState(false)

  const arrayHandler = (dog) => {
    if(viewPage === "EDITPAGE"){
      let duplicate = isFriends.includes(dog)
    if(!duplicate){
      let newArr = [...isFriends, dog]
      setIsFriends(newArr)
    } else {
      let index = isFriends.indexOf(dog)
      isFriends.splice(index, 1)
    }
    } else{
      let duplicate = isFriends.includes(dog.nick)
    if(!duplicate){
      let newArr = [...isFriends, dog.nick]
      setIsFriends(newArr)
    } else {
      let index = isFriends.indexOf(dog.nick)
      isFriends.splice(index, 1)
    }
    }
    
  }

  const submitHandlerEdit = async (e) => {
    e.preventDefault();
    let id = dog.id
    setInfoToEdit({
      ...infoToEdit, friends: friends.concat(isFriends)
    })

    const editDog = async () => {
     
        const options ={
          method: 'PATCH',
          body: JSON.stringify({...infoToEdit, friends: friends.concat(isFriends)}),
          headers:{
            "Content-Type" : "application/json"
          }
        }
        const response = await fetch('http://localhost:8000/dogs/' + id, options)
        if(response.status === 200){
          console.log("Dog updated!")
          
        }
    }
    editDog();
    setViewPage("PROFILE")
  }

const submitHandler = async (e) => {
    e.preventDefault(); 
       setNewDog({
      ...newDog, 
      friends: isFriends
    })

    const createNewDog = async () => {
     
      if(newDog.name && newDog.nick !== ""){
        const options = {
          method: 'POST',
          body: JSON.stringify({...newDog, friends: isFriends}),
          headers: {
            "Content-Type" : "application/json"
          }
        }
        const response = await fetch('http://localhost:8000/dogs/', options)
        if(response.status === 201){
          console.log("Dog added!")
        }
      }
    }
    createNewDog()
    setIsFriends([])
    setViewPage("STARTPAGE")
  }
  return(
    <fieldset className="select-dropdown">
    <button onClick={(e) => {e.preventDefault(); setDropDownDisplay((prev) => !prev)}}>
      Add dog friends
    </button>
    {dropDownDisplay && <Friends friends={friends} dog={dog} dogs={dogs} arrayHandler={arrayHandler} viewPage={viewPage}/>}
    <button className="savebtn" onClick={(e) => editPage ? submitHandlerEdit(e) : submitHandler(e)}>Save</button>
    </fieldset>
  )
}*/

/*const EditPage = ({viewPage, updateDog, setViewPage, dog, setEditPage, editPage, dogs, isFriends, setIsFriends, friends}) => {
  const [infoToEdit, setInfoToEdit] = useState({
    friends: friends
  })
  useEffect(()=> {
    setEditPage(true)
  })
  
  const deleteFriend = async (e, friend) => {
    e.preventDefault()
    const id = dog.id
  
    const options = {
      method: 'DELETE'
    }
    const response = await fetch('http://localhost:8000/dogs/' + id + '/friends/' + friend, options)
    if(response.status === 200){
      console.log("Updated")
    }
    updateDog(dog)
  }

  return(
    <div>
      <h1>Dogbook</h1>
      <button onClick={() => setViewPage("PROFILE")}>Back to profile</button>
      <img src={dog.img}></img>
      <form>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" placeholder={dog.name} onChange={(e) => setInfoToEdit({...infoToEdit, name: e.target.value})}></input>
          <br></br>
          <label htmlFor="nick">Nick:</label>
          <input type="text" name="nick" placeholder={dog.nick} onChange={(e) => setInfoToEdit({...infoToEdit, nick: "@" + e.target.value})}></input>
          <br></br>
          <label htmlFor="age">Age:</label>
          <input type="number" name="age" placeholder={dog.age} onChange={(e) => setInfoToEdit({...infoToEdit, age: e.target.value})}></input>
          <br></br>
          <label htmlFor="bio">Bio:</label>
          <input type="text" placeholder={dog.bio} name="bio" onChange={(e) => setInfoToEdit({...infoToEdit, bio: e.target.value})}></input>
          <br></br>
          <label>Friends:</label>
          <ul>
            {friends.map((friend, index) => <li key={index}>
              <p>{friend}</p>
              <button className='deletedog' onClick={(e) => deleteFriend(e,friend)}>X</button>
              </li>)}
          </ul>
                <Dropdown viewPage={viewPage}setViewPage={setViewPage} dog={dog} dogs={dogs}setEditPage={setEditPage} editPage={editPage} setInfoToEdit={setInfoToEdit} infoToEdit={infoToEdit} isFriends={isFriends} setIsFriends={setIsFriends} friends={friends} updateDog={updateDog}></Dropdown>
        </form>
    </div>
  )
}*/

/*const CreateDog = ({setViewPage, dogs}) => {
  const [newDog, setNewDog] = useState({
    name: "",
    nick: "",
    age: null,
    bio: "",
    friends: []
  })
  const [isFriends, setIsFriends] = useState([])

  
  useEffect(() => {
      console.log(newDog)
    }, [newDog])

  return(
    <div>
      <h1>Dogbook</h1>
      <h4>Register new dog</h4>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" onChange={(e) => setNewDog({...newDog, name: e.target.value})}></input>
        <br></br>
        <label htmlFor="nick">Nick:</label>
        <input type="text" name="nick" onChange={(e) => setNewDog({...newDog, nick: "@" + e.target.value})}></input>
        <br></br>
        <label htmlFor="age">Age:</label>
        <input type="number" name="age" onChange={(e) => setNewDog({...newDog, age: e.target.value})}></input>
        <br></br>
        <label htmlFor="bio">Bio:</label>
        <input type="text" name="bio" onChange={(e) => setNewDog({...newDog, bio: e.target.value})}></input>
        <br></br>
        <label>Friends:</label>
        <Dropdown dogs={dogs} setNewDog={setNewDog} newDog={newDog} isFriends={isFriends} setIsFriends={setIsFriends} setViewPage={setViewPage}/>
      </form>
    </div>
  )
}*/

/*const Profile = ({setViewPage, dog, friends}) => {
  const [checked, setChecked] = useState(false)

  const id = dog.id;

      const fetchDog = async () => {
        if(dog.present === false){
          const options = {
          method: 'PATCH',
          body: JSON.stringify({present: true}),
          headers: {
            "Content-Type": "application/json"
           }
        }
        const response = await fetch('http://localhost:8000/dogs/' + id, options)
        if(response.status === 200){
          console.log("updated present!")
          setChecked(true)
        }
        } else {
          const options = {
            method: 'PATCH',
            body: JSON.stringify({present: false}),
            headers: {
              "Content-Type" : "application/json"
            }
          }
          const response = await fetch('http://localhost:8000/dogs/' + id, options)
          if(response.status === 200){
            console.log("updated left!")
            setChecked(false)
          }
        }}
  
  const handleChecker = () =>{
    setChecked(!checked)
    console.log(checked)
    fetchDog()
  }
  

  return(
    <div>
      <nav>
        <div>
        <h1>Dogbook</h1>
        <button onClick={() => setViewPage("STARTPAGE")}>Homepage</button>
        </div>
        <button>Edit page</button>
        <label htmlFor="present">Present</label>
        <input id="present"type="checkbox" checked={checked? !checked : checked }onChange={() => handleChecker()}/>
      </nav>
      
      <div>
        <p>Name: {dog.name}</p>
        <p>Nick: {dog.nick}</p>
        <p>Age: {dog.age}</p>
        <p>Bio: {dog.bio}</p>
        <h5>Friends</h5>
        <ul>
          {friends.map((friend, index) => <li key={index}>{friend}</li>)}
        </ul>
      </div>
    </div>
  )
}*/

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

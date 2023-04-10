import { useState, useEffect } from "react"
import { Dropdown } from "./Dropdown.js"
import icon from './icons/homepageic.png'

export const CreateDog = ({setViewPage, dogs, setEditPage, setIsFriends, isFriends}) => {
    const [newDog, setNewDog] = useState({
      name: "",
      nick: "",
      age: null,
      bio: "",
      friends: []
    })
    useEffect(()=> {
      setEditPage(false)  
    })
  
    return(
      <div>
        <h1>Dogbook</h1>
        <h4>Register new dog</h4>
        <img id="icon" onClick={() => setViewPage("STARTPAGE")} src={icon}></img>
        <form className="info">
            <div className="section">
                <p className="profilep">NAME</p>
          <p><input className="createinput" type="text" name="name" onChange={(e) => setNewDog({...newDog, name: e.target.value})}></input></p>
            </div>
          <div className="section">
            <p className="profilep">NICKNAME</p>
                    <p><input className="createinput" type="text" name="nick" onChange={(e) => setNewDog({...newDog, nick: "@" + e.target.value})}></input></p>
          </div>
          <div className="section">
                <p className="profilep">AGE</p>
                       <p><input className="createinput" type="number" name="age" onChange={(e) => setNewDog({...newDog, age: e.target.value})}></input></p>
          </div>
          <div className="section">
                <p className="profilep">BIOGRAPHY</p>
                        <p><input className="createinput" type="text" name="bio" onChange={(e) => setNewDog({...newDog, bio: e.target.value})}></input></p>
          </div>
          <div className="section" id="friendslistcreate">
                <p className="profilep">FRIENDS</p>
                <br></br>
                <Dropdown dogs={dogs} setNewDog={setNewDog} newDog={newDog} isFriends={isFriends} setIsFriends={setIsFriends} setViewPage={setViewPage}/>                 
          </div>
                     
          </form>
      </div>
    )
  }
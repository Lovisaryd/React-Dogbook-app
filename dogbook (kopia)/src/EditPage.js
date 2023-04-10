import { useState, useEffect } from "react"
import { Dropdown } from "./Dropdown"
import icon from './icons/homepageic.png'
import backicon from './icons/backicon.png'
import deleteicon from './icons/deleteic.png'

export const EditPage = ({viewPage, updateDog, setViewPage, dog, setEditPage, editPage, dogs, isFriends, setIsFriends, friends}) => {
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
        <nav>
          <h1>Dogbook</h1>
          <img id="profileicon" onClick={() => setViewPage("STARTPAGE")} src={icon}></img>
          <img id="backicon" src={backicon} onClick={() => setViewPage('PROFILE')}></img>
          <p id="editp">Back to profile</p>
        </nav>
       
        <div className="doginfo">
           <img src={dog.img}></img> 
        <form className="info">
            <div className="section">
                <p className="profilep">NAME</p>
            <p><input className="inputedit" type="text" name="name" placeholder={dog.name} onChange={(e) => setInfoToEdit({...infoToEdit, name: e.target.value})}></input></p>
            </div>
            <div className="section">
                <p className="profilep">NICKNAME</p>
                <p><input className="inputedit" type="text" name="nick" placeholder={dog.nick} onChange={(e) => setInfoToEdit({...infoToEdit, nick: "@" + e.target.value})}></input></p>
            </div>
            <div className="section">
                <p className="profilep">AGE</p>
            <p><input className="inputedit" type="number" name="age" placeholder={dog.age} onChange={(e) => setInfoToEdit({...infoToEdit, age: e.target.value})}></input></p>
            </div>
            <div className="section">
            <p className="profilep">BIOGRAPHY</p>
            <p><input className="inputedit" type="text" placeholder={dog.bio} name="bio" onChange={(e) => setInfoToEdit({...infoToEdit, bio: e.target.value})}></input></p>
            </div>
            <div className="section" id="friendslistcreate">
                <p className="profilep">FRIENDS</p>
                <ul>
                 {friends.map((friend, index) => <li key={index}>
                         <p>{friend}</p>
                        <img src={deleteicon} id="deleteicon" className='deletedog' onClick={(e) => deleteFriend(e,friend)}></img>
                        </li>)}
                     </ul>
                     <Dropdown viewPage={viewPage}setViewPage={setViewPage} dog={dog} dogs={dogs}setEditPage={setEditPage} editPage={editPage} setInfoToEdit={setInfoToEdit} infoToEdit={infoToEdit} isFriends={isFriends} setIsFriends={setIsFriends} friends={friends} updateDog={updateDog}></Dropdown>
            </div>
                  
          </form>
          </div>
      </div>
    )
  }
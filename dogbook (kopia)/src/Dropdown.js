import { render } from "@testing-library/react"
import { useState } from "react"
import { Friends } from "./Friends"

export const Dropdown = ({viewPage, dog, setViewPage, dogs, isFriends, setIsFriends, newDog, setNewDog, editPage, infoToEdit, setInfoToEdit, friends}) =>{
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
       
        if(infoToEdit.name === "" || infoToEdit.name === " "){
            const options = {
                method: 'PATCH',
                body: JSON.stringify({...infoToEdit, name: dog.name, friends: friends.concat(isFriends)}),
                headers:{
                    "Content-Type" : "application/json"
                }
            }
            const response = await fetch('http://localhost:8000/dogs/' + id, options)
            if(response.status === 200){
                console.log("Dog updated")
            }
        } else {
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
         
      }
      editDog();
      let newArr = []
      setIsFriends(newArr)
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
  }
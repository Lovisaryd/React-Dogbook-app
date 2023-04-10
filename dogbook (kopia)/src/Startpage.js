import deleteicon from './icons/deleteic.png'

export const Startpage = ({dogs, setViewPage, setDog, setFriends})=> {

    const viewDog = (dog) =>{
      setDog(dog);
      setFriends(dog.friends)
      setViewPage("PROFILE");
    }

    const deleteDog = async (dog) => {
        
        const id = dog.id
        const options = {
            method: 'DELETE'
        }
        const response = await fetch('http://localhost:8000/dogs/' + id, options)
        if(response.status === 202){
            console.log("dog deleted!")
        }
    }
  
    return(
        <div className="startpagetext">
             <h1>Dogbook</h1>
          <h4>Our current dogs</h4>

            <div className="startpage">
            <ul>
              {dogs.map((dog, index) =><li key={index} className={dog.present ? "present" : "notPresent"} ><p onClick={() => viewDog(dog)}>{dog.nick}</p><img src={deleteicon} id="deleteicon" className="deletedog" onClick={() => deleteDog(dog)}></img></li>)}
            </ul>
            <button id="register" onClick={() => setViewPage("CREATE")}>Register new dog</button>
            </div> 
        </div>
    )
  }
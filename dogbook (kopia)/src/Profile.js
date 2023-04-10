import { useState } from "react";
import icon from './icons/homepageic.png'
import editicon from './icons/edit.png'

export const Profile = ({updateDog, setViewPage, dog, friends}) => {
    const [checked, setChecked] = useState(false)
    updateDog(dog)
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
          <h1>Dogbook</h1>
          <img id="profileicon" onClick={() => setViewPage("STARTPAGE")} src={icon}></img>
          <img id="editicon" src={editicon} onClick={() => setViewPage('EDITPAGE')}></img>
        </nav>
        <div className="doginfo">
            <img src={dog.img}></img>
            <div className="info">
                <div className="section">
                    <p className="profilep">NAME</p>
          <p>{dog.name}</p>
          </div>
          <div className="section">
            <p className="profilep">NICKNAME</p>
          <p>{dog.nick}</p>
          </div>
          <div className="section">
            <p className="profilep">AGE</p>
          <p>{dog.age}</p>
          </div>
          <div className="section">
            <p className="profilep">BIOGRAPHY</p>
          <p>{dog.bio}</p>
          </div>
          <div className="section">
          <p className="profilep">FRIENDS</p>
          <ul>
            {friends.map((friend, index) => <li key={index}>{friend}</li>)}
          </ul>
          </div>
          <div className="section">
            <p className="profilep">CURRENT LOCATION</p>
            <p>{dog.present ? "Here! :)" : "Not here :("}</p>
            <div className="checkbox-wrapper-13" id="presentdiv">
          <label  htmlFor="c1-13"></label>
          <input id="c1-13" type="checkbox" defaultChecked={dog.present? !checked : checked }onChange={() => handleChecker()}/>
          </div>
          </div>
          </div>
        </div>
        <footer>
            
        </footer>
      </div>
    )
  }
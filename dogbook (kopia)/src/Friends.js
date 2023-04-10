

export const Friends = ({friends, viewPage, dog, dogs, arrayHandler}) => {

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
    }

    
import React from "react"
import Users from "./Users";

function UserList(props){
    return (
      
        <ul>
          {props.users.map(user => (
            <Users key={user.id} user={user} />
          ))}
        </ul>
      )
}


export default UserList;

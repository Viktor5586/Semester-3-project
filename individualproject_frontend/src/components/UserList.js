import React from "react"
import Users from "./Users";

function UserList(props){
    return (
        <ul>
          {props.Users?.map(user => (
            <UserList key={user} user={user} />
          ))}
        </ul>
      )
}


export default UserList;

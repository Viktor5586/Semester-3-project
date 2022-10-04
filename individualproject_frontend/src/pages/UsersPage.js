import { useState } from "react";


function UsersPage(){
    
    const[users, setUsers ] = useState([]);

    const addUser = (username, password) =>{
        const newUser = {
            id:1,
            username:username,
            password:password
        };
        setUsers([...users, newUser]);    
    }

    return(
        <div className="container">
            <div className="inner">
                <InputUser addUser={addUser} />
                <UserList userList={userList} />
            </div>
        </div>

    )
}
import axios from "axios";
import { useEffect, useState } from "react";
import UserList from '../components/UserList.js';
import InputUser from '../components/InputUser'


function UsersPage(){
    
    const usersData = [
        {
            id: 1,
            username: "sth",
            password: "sthsh"
        },
        {
            id: 2,
            username: "aaa",
            password: "aaaaa"
        },
        {
            id: 3,
            username: "bbb",
            password: "bbbbb"
        },
    ]

    const[users, setUsers ] = useState([usersData]);
    
    useEffect(()=> {
        axios.get("http://localhost:8080/users")
        .then(response => {
            setUsers(response.data.users)
        })
        .catch(error => console.log(error));
    });
    

    const addUser = (username, password) =>{
        const newUser = {
            id:4,
            username:username,
            password:password
        };
        setUsers([...users, newUser]);    
    }

    return(
        <div className="container">
            <div className="inner">
                <InputUser addUser={addUser} />
                <UserList users={users} />
            </div>
        </div>

    )
}

export default UsersPage;
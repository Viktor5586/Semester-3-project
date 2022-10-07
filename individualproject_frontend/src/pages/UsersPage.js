//import { wait } from "@testing-library/user-event/dist/utils/index.js";
import axios from "axios";
import { useEffect, useState } from "react";
//import UserList from '../components/UserList.js';
//import InputUser from '../components/InputUser'


function UsersPage() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
            axios.get("http://localhost:8080/users")
            .then(response => {
                setUsers(response.data.allUserEntities)
            })
            .catch(error => console.log(error));

    };

    return (

        <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.password}</td>
                                </tr>
                            ))

                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
    /*const usersData = [
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

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/users")
            .then(response => {
                setUsers(response.data.users)
            })
            .catch(error => console.log(error));
    }, []);


    const addUser = (username, password) => {
        const newUser = {
            id: 4,
            username: username,
            password: password
        };
        setUsers([...users, newUser]);
    }

    return (
        <div className="container">
            <div className="inner">
                <UserList users={users} />
            </div>
        </div>

    )*/
}

export default UsersPage;
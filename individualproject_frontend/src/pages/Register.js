import axios from "axios";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

function Register(){

    let navigate = useNavigate()

    const[user, setUser]=useState({
        username: " ",
        password: " "
    });

    const{username, password} = user

    /*const InputChange=(e)=>{
        setUser({...user, [e.target.username]:e.target.value})
    };*/

    /*const InputChange=(e)=>{
        setUser({...user,[e.target.username]:e.target.value})
    }*/

    const Submit= /*async*/(e)=>{
        e.preventDefault()
        console.log(user);
        //await
        axios.post("http://localhost:8080/users/add",user)
        navigate("/");
    };

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Registration form</h2>
                    <form onSubmit={(e)=>Submit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Username" className="form-label">
                                Username
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter username"
                                username="username"
                                defaultValue={username}
                                onChange={(e) =>
                                    setUser({ ...user, username: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Password" className="form-label">
                                Password
                            </label>
                            <input
                                type={"password"}
                                className="form-control"
                                placeholder="Enter password"
                                password="password"
                                defaultValue={password}
                                onChange={(e) =>
                                    setUser({ ...user, password: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Register
                        </button>
                        <button type="submit" className="btn btn-outline-danger mx-2">
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Register;
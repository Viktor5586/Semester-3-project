import React from "react"
import { Link } from "react-router-dom";
import styles from './NavBar.css'

function NavBar() {

    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand" href="#">FCC inc. </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="text-end">
                    <Link className="btn btn-outline-light me-2" to={"/Register"}>Register user</Link>
                </div>
            </nav>
        </div>
    )
    /*const links = [
        {
            id: 1,
            path: "/",
            text: "Users"
        },
        {
            id: 2,
            path: "/user",
            text: "Addser"
        }
    ]

    return (
        <nav className={styles.navBar}>
            <ul>
                {links.map(link => {
                    return (
                        <li key={link.id}>
                            { Add NavLink here }
                            {link.text}
                        </li>
                    )
                })}
            </ul>
        </nav>
    )*/


}

export default NavBar;
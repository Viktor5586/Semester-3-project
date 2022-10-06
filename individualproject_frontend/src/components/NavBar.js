import React from "react"
import styles from './NavBar.css'

function NavBar() {

    const links = [
        {
            id: 1,
            path: "/",
            text: "Users"
        },
        /*{
            id: 2,
            path: "/user",
            text: "Add user"
        }*/
    ]

    return (
        <nav className={styles.navBar}>
            <ul>
                {links.map(link => {
                    return (
                        <li key={link.id}>
                            {/* Add NavLink here */}
                            {link.text}
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default NavBar;
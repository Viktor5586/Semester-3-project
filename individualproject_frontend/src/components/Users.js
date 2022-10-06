import React from "react"
import styles from "./User.css"

function Users(props){
    return (
        <li className={styles.item}>{props.Users.username}</li>
    )
}

export default Users;
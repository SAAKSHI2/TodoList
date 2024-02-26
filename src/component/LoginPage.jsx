import { useState } from "react"

function LoginPage(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [hideLoginButton,setHideLoginButton] = useState(false);
    const [hideSigninButton,setHideSigninButton] = useState(true);
    return (
        <div>
            <div>
                <h1>Login</h1>
                <input type="text" placeholder="enter username" name="username" value={username}/>
                <input type="text" placeholder="enter password" name="password" value={password}/>
                <button hidden={hideLoginButton}>Login</button>
            </div>
            <div>
                <button hidden={hideSigninButton}>signin</button>
            </div>
            

        </div>
    )
}
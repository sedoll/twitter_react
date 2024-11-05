import { auth } from "../firebase"

export default function Home() {
    const logOut = () => {
        auth.signOut()
    }
    return (
        <div>
            <h1>Home!</h1>
            <button onClick={logOut}>Log Out</button>
        </div>
    )
}
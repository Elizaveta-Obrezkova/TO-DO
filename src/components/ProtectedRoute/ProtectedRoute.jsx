import {Redirect} from "react-router-dom"

function ProtectedRoute({loggedIn, children}) {
    return loggedIn ? children : <Redirect to="/" />
}

export default ProtectedRoute;
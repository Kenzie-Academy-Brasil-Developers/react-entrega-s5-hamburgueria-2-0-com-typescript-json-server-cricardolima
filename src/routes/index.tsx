import { Switch, Route } from "react-router-dom"
import { Login } from "../pages/Login"

export const Rotas = () => {
    return (
        <Switch>
            <Route exact path="/" component={Login}/>
        </Switch>
    )
}
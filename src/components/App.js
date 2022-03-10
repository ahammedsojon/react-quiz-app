import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthProvider from "../contexts/AuthProvider";
import "../styles/App.css";
import Layout from "./Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Quiz from "./Pages/Quiz";
import Result from "./Pages/Result";
import Signup from "./Pages/Signup";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <PublicRoute exact path="/login" component={Login} />
              <PublicRoute exact path="/signup" component={Signup} />
              <PrivateRoute exact path="/quiz/:id" component={Quiz} />
              <PrivateRoute exact path="/result/:id" component={Result} />
            </Switch>
          </Layout>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

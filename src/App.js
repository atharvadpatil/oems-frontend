import { Route, Switch } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import NotFound from './components/NotFound';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Navbar />
      <Switch>
        <Route path = "/" component = {Home} exact />
        <Route path = "/register" component = {Register} exact />
        <Route path = "/login" component = {Login} exact />
        <Route component = {NotFound} />
      </Switch>
    </div>
  );
}

export default App;
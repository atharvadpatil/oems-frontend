import { Route, Switch } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Login from './components/login';
import Register from './components/register';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Switch>
        <Route path = "/" component = {Login} exact />
        <Route path = "/register" component = {Register} exact />
        <Route component = {NotFound} />
      </Switch>
    </div>
  );
}

export default App;
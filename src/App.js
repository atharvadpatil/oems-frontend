import { Route, Switch } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './components/home';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Register from './components/register';
import ForgotPassword from './components/forgotpassword';
import ResetPassword from './components/resetpassword';
import NotFound from './components/NotFound';
import Navbar from './components/navbar';
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <CssBaseline />
      <Navbar />
      <Switch>
        <Route path = "/" component = {Home} exact />
        <Route path = "/dashboard" component = {Dashboard} exact />
        <Route path = "/register" component = {Register} exact />
        <Route path = "/login" component = {Login} exact />
        <Route path = "/forgot-password" component = {ForgotPassword} exact />
        <Route path = "/reset-password%3ftoken_valid%3dTrue%26message%3dCredentials_Valid/:uidb64/:token" component = {ResetPassword} />
        <Route component = {NotFound} />
      </Switch>
    </RecoilRoot>
  );
}

export default App;
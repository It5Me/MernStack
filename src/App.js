import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from '../src/components/routing/PrivateRoute';
import PrivateScreen from '../src/components/screens/PrivateScreen';
import LoginScreen from '../src/components/screens/LoginScreen';
import SignupScreen from '../src/components/screens/SignupScreen';
import ForgotPasswordScreen from '../src/components/screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../src/components/screens/ResetPasswordScreen';
function App() {
    return (
        <Router>
            <Switch>
                <PrivateRoute exact path='/' component={PrivateScreen} />
                <Route exact path='/login' component={LoginScreen} />
                <Route exact path='/signup' component={SignupScreen} />
                <Route
                    exact
                    path='/forgotpassword'
                    component={ForgotPasswordScreen}
                />
                <Route
                    exact
                    path='/passwordreset/:resetToken'
                    component={ResetPasswordScreen}
                />
            </Switch>
        </Router>
    );
}

export default App;

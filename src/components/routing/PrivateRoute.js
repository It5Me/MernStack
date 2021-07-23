import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                localStorage.getItem('authToken') ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/signup' />
                    // when open
                )
            }
        />
    );
};

export default PrivateRoute;

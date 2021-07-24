import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND } from '../../config';
import { Link } from 'react-router-dom';
import './LoginScreen.css';
const LoginScreen = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            history.push('/');
        }
    }, [history]);

    const handleLogin = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                'Content-Typre': 'application/json',
            },
        };
        try {
            const { data } = await axios.post(
                `${BACKEND}/login`,
                { email, password },
                config
            );
            localStorage.setItem('authToken', data.token);
            history.push('/');
        } catch (error) {
            setError(error.response.data.error);
            setError('');
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };
    return (
        <div className='center'>
            <form onSubmit={handleLogin} className='login-screen__form'>
                <h3 className='login-screen__title'>Login</h3>
                {error && <span className='error-message'>{error}</span>}
                <div className='form-group'>
                    <label htmlFor='email'>Email:</label>
                    <div>
                        <input
                            type='email'
                            require
                            id='email'
                            placeholder='Please enter your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password: </label>

                    <Link to='/forgotpassword'>Forgot Password</Link>
                    <div>
                        <input
                            type='password'
                            require
                            placeholder='Please enter your password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <button type='submit'>LOG IN</button>
            </form>
        </div>
    );
};
export default LoginScreen;

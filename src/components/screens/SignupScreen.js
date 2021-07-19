import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-route-dom';
import './Signup.css';

const SignupScreen = ({ history }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();

        const config = {
            header: {
                'Content-Type': 'application/json',
            },
        };

        if (password !== confirmPassword) {
            setPassword = '';
            setConfirmPassword = '';
            setTimeout(() => {
                setError('');
            }, 5000);
            return setError('Password not match');
        }
        try {
            const { data } = await axios.post(
                'signup',
                { username, email, password },
                config()
            );

            localStorage.setItem('authToken', data.token);
            history.push('/');
        } catch (err) {
            setError(err.response.data.error);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };
    return (
        <div className='signup-screen'>
            <form onSubmit={handleSignup} className='signup-screen__form'>
                <h3 className='signup-screen__title'>Signup</h3>
                {error && <span className='error-message'>{error}</span>}
                <div className='form-group'>
                    <label htmlFor='username'>Username: </label>
                    <input
                        type='text'
                        require
                        id='name'
                        placeholder='Please enter username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email: </label>
                    <input
                        type='email'
                        require
                        id='email'
                        placeholder='Please enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password: </label>
                    <input
                        type='password'
                        require
                        id='password'
                        placeholder='Please enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='confirmPassword'>ConfirmPassword: </label>
                    <input
                        type='confirmPassword'
                        require
                        id='confirmPassword'
                        placeholder='Please enter confirmPassword'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
            </form>
        </div>
    );
};
export default SignupScreen;

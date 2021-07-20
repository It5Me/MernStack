import { useState } from 'react';
import axios from 'axios';
// import { Link } from 'react-route-dom';
import './SignupScreen.css';
import { BACKEND } from '../../config';

const SignupScreen = ({ history }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
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
                `${BACKEND}/signup`,
                { username, email, password },
                config
            );

            console.log('data');
            console.log('data', { data });

            localStorage.setItem('authToken', data.token);
            history.push('/');
        } catch (error) {
            setError(error.response.data.error);
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
                        id='username'
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
                        type='password'
                        require
                        id='confirmPassword'
                        placeholder='Please enter confirmPassword'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button typr='submit' className='btn btn-primary'>
                    Submit
                </button>
            </form>
        </div>
    );
};
export default SignupScreen;

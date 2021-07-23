import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BACKEND } from '../../config';
const ResetPasswordScreen = ({ match }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();

        const config = {
            headers: { 'Content-Type': 'application/josn' },
        };

        if (password !== confirmPassword) {
            setPassword('');
            setConfirmPassword('');
            setTimeout(() => {
                setError('');
            }, 5000);
            return setError('Password not match');
        }

        try {
            const { data } = await axios.put(
                `${BACKEND}/passwordreset/${match.params.resetToken}`,
                { password },
                config
            );
            console.log(data);
            setSuccess(data.data);
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };
    return (
        <div className='resetpassword-screen'>
            <form onClick={handleResetPassword}>
                <h3>ResetPassword</h3>
                <div className='form-group'>
                    <label htmlFor='password'>New Password</label>
                    <input
                        type='password'
                        required
                        id='password'
                        placeholder='Enter New Password'
                        autoComplete='true'
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <div className='form-group'>
                    <labe htmlFor='confirmpassword'>Confirm New Password</labe>
                    <input
                        type='password'
                        require
                        id='confirmpassword'
                        placeholder='Enter Confirm New Password'
                        autoComplete='true'
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                    />
                </div>
                <button type='submit'>Reset Password</button>
            </form>
        </div>
    );
};
export default ResetPasswordScreen;

import { useState } from 'react';
import axios from 'axios';
import { BACKEND } from '../../config';
const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const handleForgotpassword = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const { data } = await axios.post(
                `${BACKEND}/forgotpassword`,
                { email },
                config
            );
            console.log(data);
            setSuccess(data.data);
        } catch (error) {
            setError(error.response.data.error);
            setEmail('');
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    return (
        <>
            <p>
                Please enter the email address you register your account with.
                We will send you reset password confirmation to this email
            </p>
            {error && <span>{error}</span>}
            {success && <span>{success}</span>}
            <form onSubmit={handleForgotpassword}>
                <label htmlFor='email'>Email:</label>
                <input
                    type='email'
                    require
                    id='email'
                    placeholder='Email Address'
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <button type='submit'>send Email</button>
            </form>
        </>
    );
};
export default ForgotPasswordScreen;

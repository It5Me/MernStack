import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-route-dom';
import './Signup.css';

const SignupScreen = () => {
    return (
        <div className='register-screen'>
            <form className='register-screen__form'>
                <h3 className='register-screen__title'>Register</h3>
                <div className='form-group'>
                    <label htmlFor='username'></label>
                </div>
            </form>
        </div>
    );
};

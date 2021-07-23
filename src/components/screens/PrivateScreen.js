import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND } from '../../config';

const PrivateScreen = ({ history }) => {
    const [privateData, setPrivateData] = useState('');
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchPrivateData = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(
                        'authToken'
                    )}`,
                },
            };
            try {
                const { data } = await axios.get(`${BACKEND}/private`, config);
                console.log(data.data);
                setPrivateData(data.data);
            } catch (error) {
                localStorage.removeItem('authToken');
                // console.log(error.message);
                setError('You are not authorized please login');
            }
        };

        fetchPrivateData();
    }, []);
    const logoutHandler = () => {
        localStorage.removeItem('authToken');
        history.push('/login');
    };
    return error ? (
        <span>{error}</span>
    ) : (
        <>
            <div style={{ background: 'green', color: 'white' }}>
                {privateData}
            </div>
            <button type='submit' onClick={logoutHandler}>
                Logout
            </button>
        </>
    );
};

export default PrivateScreen;

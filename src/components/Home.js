import React from 'react';
import { Button } from '@material-ui/core'
import { logoutInitiate } from '../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';


function Home(props) {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user)
    const btnstyle = { margin: '8px 0', backgroundColor: '#9900cc', color: 'white' }
    const handleAuth = () => {
        console.log("going to logout")
        if (currentUser) {
            dispatch(logoutInitiate())
        }

    }
    return (
        <div>
            welcome to home page
            <Button type='submit' variant="contained" style={btnstyle} onClick={handleAuth}>Logout</Button>
        </div>
    );
}

export default Home;
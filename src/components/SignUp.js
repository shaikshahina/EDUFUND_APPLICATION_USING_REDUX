import React, { useRef, useState, useEffect, useContext, createContext, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import { useHistory, Link } from "react-router-dom"
import { registerInitiate } from '../redux/actions/userActions';

const SignUp = (props) => {
    const [state, setState] = useState({
        email: '',
        password: '',
        userName: '',
    })
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user)
    const history = useHistory();

    useEffect(() => {
        if (currentUser) {
            history.push("/");
        }
    }, [currentUser, history])

    const inputChange = (e) => {
        const { name, value } = e.target;

        setState(prevState => ({
            ...state,
            [name]: value
        })
        )
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(registerInitiate(state.email, state.password, state.userName))
        setState({
            email: '',
            password: '',
            userName: '',
        })

    }
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#9900cc' }
    const marginTop = { marginTop: 5 }
    const btnstyle = { margin: '8px 0', backgroundColor: '#9900cc', color: 'white' }

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>

                </Grid>
                <form onSubmit={submitHandler}>
                    <TextField fullWidth label='Name' name="userName" placeholder="Enter your name" vlaue={state.userName} onChange={inputChange} />
                    <TextField fullWidth label='Email' name="email" placeholder="Enter your email" vlaue={state.email} onChange={inputChange} />
                    <TextField fullWidth label='Password' name="password" placeholder="Enter your password" vlaue={state.password} onChange={inputChange} />
                    {/* <TextField fullWidth label='Confirm Password' placeholder="Confirm your password" /> */}
                    {/* <FormControl component="fieldset" style={marginTop}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" style={{ display: 'initial' }}>
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl> */}
                    {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date"
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider> */}

                    <Button type='submit' variant='contained' color='primary' style={btnstyle}>Sign up</Button>
                </form>

            </Paper>
        </Grid>
    );
}

export default SignUp;
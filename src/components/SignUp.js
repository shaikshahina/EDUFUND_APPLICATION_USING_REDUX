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
        gender: '',
    })
    const msgStyle = { color: 'red' }
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const userName = useRef()
    const email = useRef()
    const password = useRef()
    const [selectedDate, setSelectedDate] = useState("")
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

    const validateInput = () => {
        const fields = [
            {
                name: 'userName',
                value: state.userName,
                message: 'User Name should not be blank.'
            },
            {
                name: 'email',
                value: state.email,
                message: 'Email should not be blank.'
            },
            {
                name: 'password',
                value: state.password,
                message: 'Password should not be blank.'
            }
        ];
        const isNotFilled = fields.some(field => {
            if (field.value.trim() === '') {
                setErrorMsg(field.message);
                if (field.name === "userName") {
                    userName.current.focus()
                }
                else if (field.name === "email") {
                    email.current.focus()
                }
                else {
                    password.current.focus()
                }

                return true;
            }
            setErrorMsg('');
            return false;
        })
        return isNotFilled
    }
    const submitHandler = (e) => {
        e.preventDefault();
        const isInValid = validateInput();
        if (!isInValid) {
            setSuccessMsg("You're good to go!");
            dispatch(registerInitiate(state.email, state.password, state.userName))

            setState({
                email: '',
                password: '',
                userName: '',
            })
        }
        else {
            setSuccessMsg('');

        }

    }
    const handleDate = (date) => {
        setSelectedDate(date)
    }

    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#9900cc' }
    const marginTop = { marginTop: 5 }
    const btnstyle = { margin: '8px 0', backgroundColor: '#9900cc', color: 'white' }

    return (
        <Grid>

            <Paper style={paperStyle}>
                <Grid style={msgStyle}>{successMsg}
                    {errorMsg}
                </Grid>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>

                </Grid>
                <form onSubmit={submitHandler}>
                    <TextField fullWidth label='Name' name="userName" placeholder="Enter your name" ref={userName} vlaue={state.userName} onChange={inputChange} />
                    <TextField fullWidth label='Email' name="email" placeholder="Enter your email" vlaue={state.email} ref={email} onChange={inputChange} />
                    <TextField fullWidth label='Password' name="password" placeholder="Enter your password" vlaue={state.password} ref={password} onChange={inputChange} />
                    <FormControl component="fieldset" style={marginTop}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" style={{ display: 'initial' }}>
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            value={selectedDate}
                            onChange={handleDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>

                    <Button type='submit' variant='contained' color='primary' style={btnstyle}>Sign up</Button>
                </form>

            </Paper>
        </Grid>
    );
}

export default SignUp;
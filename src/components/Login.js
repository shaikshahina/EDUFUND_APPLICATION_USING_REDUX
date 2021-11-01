import React, { useRef, useState, useEffect } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { loginInitiate } from '../redux/actions/userActions';



const Login = ({ handleChange }) => {
    const [state, setState] = useState({
        email: '',
        password: '',
    })
    const msgStyle = { color: 'red' }
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const email = useRef()
    const password = useRef()
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user)
    const history = useHistory();

    useEffect(() => {
        if (currentUser) {
            history.push("/");
        }
    }, [currentUser, history])

    const submitHandler = (e) => {
        e.preventDefault();
        const isInValid = validateInput();
        if (!isInValid) {
            setSuccessMsg("You're good to go!");
            dispatch(loginInitiate(state.email, state.password));
            setState({
                email: '',
                password: '',
            })
        }
        else {
            setSuccessMsg('');

        }


    }

    const validateInput = () => {
        const fields = [
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
                if (field.name === "email") {
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

    const inputChange = (e) => {
        const { name, value } = e.target;

        setState(prevState => ({
            ...state,
            [name]: value
        })
        )
    }
    const paperStyle = { padding: 20, height: '65vh', width: 300, margin: "0 auto" }
    const avatarStyle = { backgroundColor: '#9900cc' }
    const btnstyle = { margin: '8px 0', backgroundColor: '#9900cc', color: 'white' }
    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid style={msgStyle}>{successMsg}
                    {errorMsg}
                </Grid>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Sign In </h2>
                </Grid>
                <form onSubmit={submitHandler}>
                    <TextField fullWidth label='Email' name="email" placeholder="Email Address" ref={email} vlaue={state.email} onChange={inputChange} />
                    <TextField fullWidth label='Password' type = "password" name="password" placeholder="Password" ref={password} vlaue={state.password} onChange={inputChange} />

                    <FormControlLabel
                        control={
                            <Checkbox
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Remember me"
                    />
                    <Button type='submit' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                </form>
                <Typography >
                    <Link href="#" >
                        Forgot password ?
                    </Link>
                </Typography>
                <Typography > Do you have an account ?
                    <Link href="#" onClick={() => handleChange("event", 1)} >
                        Sign Up
                    </Link>
                </Typography>
            </Paper>

        </Grid>
    );
}

export default Login;
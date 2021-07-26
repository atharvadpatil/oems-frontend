import React, { useState } from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';
import Copyright from './copyright'

//IMAGE
import study3 from '../images/study3.svg';

//MUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import indigo from '@material-ui/core/colors/indigo';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    image: {
        backgroundImage: `url(${study3})`,
        backgroundRepeat: 'repeat',
        backgroundColor: indigo[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '92vh',
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    spacing: {
        margin: theme.spacing(3),
    },
}));

export default function SignIn() {

    const history = useHistory();
    const initialFormData = Object.freeze({
        email: '',
        password: '',
    });

    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        console.log(formData);

        axiosInstance
            .post(`auth/login/`, {
                email: formData.email,
                password: formData.password,
            })
            .then((res) => {
                localStorage.setItem('access_token', res.data.user_data.tokens.access);
                localStorage.setItem('refresh_token', res.data.user_data.tokens.refresh);

                axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');

                history.push('/');
                //console.log(res);
                //console.log(res.data);
            })
            .catch(err => { console.log(err) });;
    };

    const classes = useStyles();

    return (
        <Container maxWidth="xl" disableGutters={true} className={classes.image}>
            <Grid container component="main" spacing={0} direction="row" alignItems="center" justify="center">
                <Grid item className={classes.spacing}>
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}></Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleSubmit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}

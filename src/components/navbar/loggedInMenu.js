import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil'
import { userData, isLoggedIn } from '../../atoms';
import axiosInstance from '../../axios';

//MUI
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';

// Will be displayed after log in
export default function LMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [user, setUser] = useRecoilState(userData);
    const setLogin = useSetRecoilState(isLoggedIn);

    const history = useHistory();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        setAnchorEl(null);
        axiosInstance.post('auth/logout', {
			"refresh": localStorage.getItem('refresh_token'),
		})
        .then((res) => {
            console.log(res);
            setUser({});
            setLogin(false);
            localStorage.clear();
            axiosInstance.defaults.headers['Authorization'] = null;
            history.push('/login');
        })
        .catch(err => { 
            console.log(err)
        });
    };

    return (
        <>
            <Box mr={2}>
                {user.user_type === "teacher" ? <Button variant="outlined" style={{textTransform: 'capitalize'}} color="inherit" href="/">
                                                    Create Class
                                                </Button>
                                            :
                                                <Button variant="outlined" style={{textTransform: 'capitalize'}} color="inherit" href="/">
                                                    Join Class
                                                </Button>
                }
            </Box>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{ padding: 0, margin: 0 }}>
                <Avatar alt={user.name} src={user.profile_picture} />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Update Avatar</MenuItem>
                <MenuItem onClick={handleClose}>Change Password</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </>
    );
}

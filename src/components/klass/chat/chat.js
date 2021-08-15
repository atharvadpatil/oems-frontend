import React, { useEffect, useRef } from 'react'
import ChatMsg from './ChatMsg';

//MUI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

const Chat = () => {

    const classes = useStyles();

    const messagesEndRef = useRef(null)
    const chat = useRef(null)

    const scrollToBottom = () => {
        console.log(chat.current.clientHeight);
        console.log(window.innerHeight);
        if (chat.current.clientHeight > window.innerHeight) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }
    }

    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }

    useEffect(() => {
        scrollToBottom()
    }, []);

    return (
        <div ref={chat} >
            <ChatMsg
                avatar={''}
                sentBy={'Tony Stark'.toUpperCase().toUpperCase()}
                messages={[
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, praesentium?',
                ]}
                timestamp={'Thursday, 9:30 PM'}
            />

            <Divider style={{ marginTop: "20px" }} />

            <Box style={{ marginTop: "5px", padding: "10px" }}>
                <Box mt={2} display="flex" justifyContent="center" alignItems="center">
                    <div className={classes.margin}>
                        <Grid container spacing={3} alignItems="flex-end">
                            <Grid item style={{ minWidth: "65vw" }}>
                                <TextField
                                    variant="outlined"
                                    id="message"
                                    label="Message"
                                    name="message"
                                    size="small"
                                    fullWidth
                                    // onChange={handleChange}
                                    // error={nameerror}
                                />
                            </Grid>
                            <Grid item style={{ paddingLeft: 0 }}>
                                <IconButton style={{ margin: 0, padding: 0 }}>
                                    <SendIcon color="primary" fontSize="large" />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </div>
                </Box>
                <Box style={{ display: 'flex', justifyContent: 'center' }} >
                    <Chip label="Scroll to Top" color="primary" component="a" clickable onClick={scrollToTop} style={{ marginTop: "10px" }} />
                </Box>
                <div ref={messagesEndRef}/>
            </Box>
        </div>
    );
}

export default Chat;
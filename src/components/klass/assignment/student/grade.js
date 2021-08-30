import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../../axios';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { assignmentStudentDrawerId, userData, currentAssignmentId } from '../../../../atoms';
import { format } from 'date-fns';



//MUI
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Box from '@material-ui/core/Box';
import { Button, Divider, List, Typography } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import DescriptionIcon from '@material-ui/icons/Description';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        width: 500,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Grade = () => {
    const classes = useStyles();
    const setIndex = useSetRecoilState(assignmentStudentDrawerId);
    const assignmentId = useRecoilValue(currentAssignmentId);
    const user = useRecoilValue(userData);
    const [ad, setAd] = useState([]);
    const [rd, setRd] = useState([]);
    const dense = false;

    //get assignment details
    function getAssignmentDetails() {
        axiosInstance.get(`assignment/${assignmentId}/${user.id}/submitted`)
            .then((res) => {
                setRd(res.data['Response_Details']);
                setAd(res.data['Assignment_Details']);
                console.log(res.data);
            })
    }

    useEffect(() => {
        getAssignmentDetails()
    }, [])

    //Upload file
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFile, setIsFile] = useState(false);
    const [openState, setOpenState] = useState(false);
    const openDialog = () => {
        setOpenState(true);
    }

    const closeDialog = () => {
        setOpenState(false);
    }


    const handleChange = (e) => {
        setSelectedFile(e.target.files[0]);
        console.log(e.target.files[0]);
        console.log(selectedFile);
        if (e.target.files[0]) {
            setIsFile(true);
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        let form_data =new FormData();
        form_data.append('submission_file', selectedFile);
        console.log(form_data);
        axiosInstance.put(`assignment/${rd.id}/update-response`, form_data)
        .then((res)=>{
            console.log(res);
            closeDialog();
            window.location.reload();
        })
        .catch(err => console.log(err));
    }


    return (
        <div>
            {/* <button onClick={()=>setIndex(1)}>Go back to complated assign list</button>
            <h1>Grade</h1> */}
            <Box display="flex" onClick={() => setIndex(1)}>
                <ChevronLeftIcon color="primary" />
                <Typography color="primary">
                    back
                </Typography>
            </Box>
            <Box m={0} pt={3} width="50%">
                <Box pb={2} display="flex" justifyContent="space-between">
                    <Box>
                        <Typography variant="h4">
                            {ad.name}
                        </Typography>
                        <Typography>
                            {ad.due_on && `Due on ${format(new Date(ad.due_on), "MMM dd, yyyy, HH:mm")}`}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography>
                            Marks
                        </Typography>
                        <Typography>
                            {ad.total_marks}
                        </Typography>
                    </Box>
                </Box>
                <Box pb={2}>
                    <Typography>
                        Instructions:
                    </Typography>
                    <Typography>
                        {ad.instructions}
                    </Typography>
                </Box>
                <Box pb={2}>
                    <Typography>
                        Questions File:
                    </Typography>
                    <List dense={dense}>
                        {ad.ques_file ?
                            (
                                <Link href={`http://127.0.0.1:8000${ad.ques_file}`} target="_blank" style={{ textDecoration: "None" }}>
                                    {/* not responsive  */}
                                    <Paper style={{ marginTop: "10px" }}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar style={{ backgroundColor: "white" }}>
                                                    <DescriptionIcon color="primary" />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                // how to get name of file
                                                primary={ad.ques_file && ad.ques_file.split("/").pop()}
                                            />
                                        </ListItem>
                                    </Paper>
                                </Link>
                            )
                            :
                            (
                                <Typography variant="overline" display="block" gutterBottom>
                                    No Question File
                                </Typography>
                            )
                        }
                    </List>
                </Box>
                <Divider></Divider>
                <Box pt={2}>
                    <Box display="flex">
                        <Typography variant="h6">
                            Your Work  :
                        </Typography>
                        <Typography variant="h6">
                            {rd.submission_status}
                        </Typography>
                    </Box>
                    <Link href={`http://127.0.0.1:8000${rd.submission_file}`} target="_blank" style={{ textDecoration: "None" }}>
                        {/* not responsive  */}
                        <Paper style={{ marginTop: "10px" }}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar style={{ backgroundColor: "white" }}>
                                        <DescriptionIcon color="primary" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={rd.submission_file && rd.submission_file.split("/").pop()}
                                />
                            </ListItem>
                        </Paper>
                    </Link>
                </Box>
                <Box pt={1}>
                    <Typography>
                        {rd.submited_date && `Submitted on ${format(new Date(rd.submited_date), "MMMM dd,yyyy HH:mm")}`}
                    </Typography>
                </Box>
                <Box pt={1} display="flex" justifyContent="space-between">
                    <Box>
                        <Typography>
                            Marks:
                        </Typography>
                        <Typography>
                            {rd.marks}
                        </Typography>
                    </Box>
                    <Box>
                        {rd.isGraded ? (<Button variant="contained" disable>Update</Button>):
                        (
                        <Button 
                            variant="contained"
                            color="primary"
                            onClick={openDialog}
                        >
                            Update
                        </Button>
                        )
                        }
                    </Box>
                </Box>
                <Box pt={1}>
                    <Typography>
                        Remark:
                    </Typography>
                    <Typography>
                        {rd.remark}
                    </Typography>
                </Box>
            </Box>


        {/* upload dialog */}
        <Dialog
                open={openState}
                TransitionComponent={Transition}
                keepMounted
                onClose={closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Upload File</DialogTitle>
                <DialogContent>
                    <input
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="submit" onClick={closeDialog} variant="contained" >
                        Close
                    </Button>
                    {isFile ?
                        (<Button type="submit" onClick={handleSubmit} variant="contained" color="primary">
                            SUBMIT
                        </Button>)
                        :
                        (<Button variant="contained" disabled>
                            SUBMIT
                        </Button>
                        )
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Grade;
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../../axios';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { assignmentTeacherDrawerId, currentAssignmentId } from '../../../../atoms';
import { format } from 'date-fns';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

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
import { TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';

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
        marginTop: 10,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const TeacherAssignmentDetails = () => {
    const classes = useStyles();
    const assignmentId = useRecoilValue(currentAssignmentId);
    const setIndex = useSetRecoilState(assignmentTeacherDrawerId);
    const [ad, setAd] = useState([]);
    const dense = false;

    // get assignment Details
    function getAssignmentDetails(){
        axiosInstance.get(`assignment/${assignmentId}/teacher`)
        .then((res)=>{
            setAd(res.data);
            console.log(res.data);
            setMarks(res.data.total_marks);
            // setDue(format(res.data.due_on, "yyyy-MM-dd'T'HH:mm:ss.SSSSSSxxx"));
        })
    }

    useEffect(() => {
        getAssignmentDetails()
    }, [])

    //change assignment details
    const [openState, setOpenState] = useState(false);
    const openDialog = () => {
        setOpenState(true);
    }

    const closeDialog = () => {
        setOpenState(false);
    }

    const [selectedQuesFile, setSelectedQuesFile] = useState(null);
    const [isFile, setIsFile] = useState(false);
    const [name, setName] = useState("");
    const [instructions, setInstructions] = useState("");
    const [marks, setMarks] = useState(0);
    const [due, setDue] = useState(new Date());

    const handleDue=(date)=>{
        setDue(date);
    }

    const handleFile = e =>{
        if(e.target.files[0]){
            setSelectedQuesFile(e.target.files[0]);
            setIsFile(true);
        }
    }

    const handleSubmit = e =>{
        e.preventDefault();
        let form_data = new FormData();
        if(name!==""){
            form_data.append('name', name);
        }
        else{
            form_data.append('name', ad.name);
        }

        if(instructions!==""){
            form_data.append('instructions', instructions);
        }
        else{
            form_data.append('instructions', ad.instructions);
        }
        
        form_data.append('total_marks', marks);
        form_data.append('due_on', format(due, "yyyy-MM-dd'T'HH:mm:ss.SSSSSSxxx"));
        if(isFile){
            form_data.append('ques_file', selectedQuesFile);
        }
        axiosInstance.put(`assignment/${assignmentId}/update-assignment`, form_data)
        .then((res)=>{
            console.log(res);
            closeDialog();
            window.location.reload();
        })
        .catch(err => console.log(err));

    }

    return ( 
        <div>
            {/* <h1>Assignment Details</h1>
            <button onClick={()=>setIndex(0)}>Go back to assignemnt list</button> */}
            <Box display="flex" onClick={()=>setIndex(0)}>
                <ChevronLeftIcon color="primary" />
                <Typography color="primary">
                    back
                </Typography>
            </Box>
            <Box m={0} pt={3} maxWidth={650}>
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
                        { ad.ques_file ? 
                            (
                                <Link href={`http://127.0.0.1:8000${ad.ques_file}`} target="_blank" style={{ textDecoration: "None" }}>
                                    {/* not responsive  */}
                                    <Paper style={{ marginTop: "10px"}}>
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
                <Box pt={3}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={openDialog}
                    >
                        Update Assignment
                    </Button>
                </Box>
            </Box>

            {/* update dialog */}
            <Dialog
                open={openState}
                TransitionComponent={Transition}
                keepMounted
                onClose={closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Create Assignment</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="name"
                            label="Name"
                            type="text"
                            id="name"
                            placeholder={ad.name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="instructions"
                            label="Instructions"
                            type="textarea"
                            id="instructions"
                            placeholder={ad.instructions}
                            onChange={(e)=>setInstructions(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            name="marks"
                            label="Marks"
                            type="number"
                            id="marks"
                            placeholder={ad.marks}
                            onChange={(e)=>setMarks(e.target.value)}
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker
                                required
                                fullWidth
                                margin="normal"
                                id="due"
                                label="Due Date"
                                value={due}
                                onChange={handleDue}
                                KeyboardButtonProps={{
                                    'aria-label': 'change start_time',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <Box mt={3}>
                            <label>Question File:</label>
                            <br></br>
                            <input
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={handleFile}
                            />
                        </Box>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" onClick={closeDialog} variant="contained" >
                        Close
                    </Button>
                    <Button type="submit" onClick={handleSubmit} variant="contained" color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
     );
}
 
export default TeacherAssignmentDetails;
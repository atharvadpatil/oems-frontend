import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../../axios';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { assignmentTeacherDrawerId, currentResponseId } from '../../../../atoms';
import { format } from 'date-fns';

//MUI
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Box from '@material-ui/core/Box';
import { Button, Divider, Typography } from '@material-ui/core';
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
import { TextField } from '@material-ui/core';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ResponseDetails = () => {
    const setIndex = useSetRecoilState(assignmentTeacherDrawerId);
    const responseId = useRecoilValue(currentResponseId);
    const [rd, setRd] = useState([])

    //get response details
    function getResponseDeatils(){
        axiosInstance.get(`assignment/${responseId}/response`)
        .then((res)=>{
            setRd(res.data);
            console.log(res.data);
        })
    }

    useEffect(() => {
        getResponseDeatils()
    }, [])

    //add grade
    const [openState, setOpenState] = useState(false);
    const openDialog = () => {
        setOpenState(true);
    }

    const closeDialog = () => {
        setOpenState(false);
    }

    const [marks, setMarks] = useState(0);
    const [remark, setRemark] = useState("");

    const handleSubmit = e =>{
        e.preventDefault();
        let form_data = new FormData();
        form_data.append("response_id", responseId);
        form_data.append("marks_scored", marks);
        if(remark!==""){
            form_data.append("remark", remark);
        }

        axiosInstance.post(`assignment/grade-assignment`, form_data)
        .then((res)=>{
            console.log(res.data);
            closeDialog();
            setIndex(2);
        })
    }


    return ( 
        <div>
            {/* <h1>Response Details</h1>
            <button onClick={()=>setIndex(2)}>Go back to response list</button> */}
            <Box display="flex" onClick={() => setIndex(2)}>
                <ChevronLeftIcon color="primary" />
                <Typography color="primary">
                    back
                </Typography>
            </Box>
            <Box m={0} pt={2} maxWidth={650}>
                <Typography variant="h5">
                    Student Response
                </Typography>
                <Divider></Divider>
                <Box pt={2}>
                    <Box>
                        <Typography>
                            Name: {rd.name}
                        </Typography>
                        <Typography>
                            Email: {rd.email}
                        </Typography>
                    </Box>
                    <Box pt={2}>
                        <Typography variant="h6">
                            {rd.submission_status}
                        </Typography>
                    </Box>
                    <Box pt={2}>
                        <Typography variant="h6">
                            Submission File:
                        </Typography>
                    </Box>
                    <Link href={`http://127.0.0.1:8000${rd.submission_file}`} target="_blank" style={{ textDecoration: "None" }}>
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
                <Box pt={1} pb={2}>
                    <Typography>
                        {rd.submited_date && `Submitted on ${format(new Date(rd.submited_date), "MMMM dd,yyyy HH:mm")}`}
                    </Typography>
                </Box>
                <Divider></Divider>
                <Box pt={3}>
                    <Button
                        variant="outlined" 
                        color="primary"
                        onClick={openDialog}
                     >
                        Add Grade
                    </Button>
                </Box>
            </Box>
            {/* grade dialog */}
            <Dialog
                open={openState}
                TransitionComponent={Transition}
                keepMounted
                onClose={closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Add Grade</DialogTitle>
                <DialogContent>
                    <form>
                    <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            name="marks"
                            label="Marks"
                            type="number"
                            id="marks"
                            onChange={(e)=>setMarks(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="remark"
                            label="Remark"
                            type="text"
                            id="remarks"
                            onChange={(e)=>setRemark(e.target.value)}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" onClick={closeDialog} variant="contained" >
                        Close
                    </Button>
                    <Button type="submit" onClick={handleSubmit} variant="contained" color="primary">
                        ADD
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
     );
}
 
export default ResponseDetails;
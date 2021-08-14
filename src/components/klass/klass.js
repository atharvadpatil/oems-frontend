import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { userData, currentClassId } from '../../atoms';
import { useHistory, useParams } from 'react-router-dom';
import axiosInstance from '../../axios';

//MUI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        "aria-controls": `scrollable-auto-tabpanel-${index}`
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.paper
    }
}));

export default function Klass() {

    const { classId } = useParams();
    const [currentKlassId, setCurrentKlassId] = useRecoilState(currentClassId);
    setCurrentKlassId(classId);

    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="Chat" {...a11yProps(0)} />
                    <Tab label="Shared Folder" {...a11yProps(1)} />
                    <Tab label="Quiz" {...a11yProps(2)} />
                    <Tab label="Assignment" {...a11yProps(3)} />
                    <Tab label="Class Members" {...a11yProps(4)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <>
                    <div>CHAT</div>
                    <div>{classId}</div>
                    <div>{currentKlassId}</div>
                </>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Shared Folder
            </TabPanel>
            <TabPanel value={value} index={2}>
                Quiz
            </TabPanel>
            <TabPanel value={value} index={3}>
                Assignment
            </TabPanel>
            <TabPanel value={value} index={4}>
                Class Members
            </TabPanel>
        </div>
    );
}

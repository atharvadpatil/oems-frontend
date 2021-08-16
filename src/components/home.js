import { Container, Divider, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import bannerlogo from '../images/home/bannerlogo.png';
import study from '../images/home/study.jpg'
import study2 from '../images/home/study2.jpg'
import chat from '../images/home/chat.svg'
import folder from '../images/home/folder.svg'
import quiz from '../images/home/quiz.svg'
import assignment from '../images/home/assignment.svg'



const useStyles = makeStyles((theme) => ({
    con1 :{
        textAlign : "center",
        marginTop: "120px"
    },
    con2 :{
        paddingLeft:"24px",
        paddingRight:"24px",
        textAlign: 'center'
    },
    con3:{
        padding: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            marginTop:24,
        marginLeft: 10,
        marginRight:10
        },
        [theme.breakpoints.up('sm')]: {
            marginTop:60,
        marginLeft: 60,
        marginRight:60
        },
        [theme.breakpoints.up('md')]: {
        marginTop:120,
        marginLeft: 150,
        marginRight:150
        }, 
    },
    con4 :{
        paddingLeft:"24px",
        paddingRight:"24px",
        textAlign: 'left',
        width: '100%',
    },
    img:{
        border: 0,
        display: 'block',
        margin: 0,
        width: '100%',
    },
    changefontSize:{
        [theme.breakpoints.down('xs')]: {
            fontSize:24
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: 32
        },
        [theme.breakpoints.up('md')]: {
            fontSize: 36
        },
    },
    changefontSize1:{
        [theme.breakpoints.down('xs')]: {
            fontSize:36
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: 40
        },
        [theme.breakpoints.up('md')]: {
            fontSize: 45
        },
    }
  }));

const infoarray1 = [
    {
        'logo': 'https://edu.google.com/assets/icons/pages/main/classroom/all-in-one-place.svg',
        'title': "All-in-one place",
        'body' : 'Bring all your learning tools together and manage multiple classes in one central destination.'
    },
    {
        'logo': 'https://edu.google.com/assets/icons/pages/main/classroom/easy-to-use.svg',
        'title': "Easy to use",
        'body' : 'Anyone in your school community can get up and running with Classroom in minutes.'
    },
    {
        'logo': 'https://edu.google.com/assets/icons/pages/main/classroom/built-for-collaboration.svg',
        'title': "Built for collaboration",
        'body' : 'Work simultaneously in the same document with the whole class or connect face-to-face with Google Meet.'
    },
    {
        'logo': 'https://edu.google.com/assets/icons/pages/main/classroom/access-from-anywhere.svg',
        'title': "Access from anywhere",
        'body' : 'Empower teaching and learning from anywhere, on any device, and give your class more flexibility and mobility.'
    }
]

const infoarray2=[
    {
        'id': 1,
        'head':'CHAT',
        'title': 'Save time and simplify everyday tasks',
        'logo': chat,
        'body':'Switch from class to assignment to student in just a few clicks.Keep grading consistent and transparent with rubrics displayed alongside student work'
    },
    {
        'id': 2,
        'head':'QUIZ',
        'title': 'Enhance student learning experiences',
        'logo': quiz,
        'body':'Keep everyone on track with student to-do and teacher to-review pages, and due dates that automatically appear on student calendars when classwork is created.Allow students to snap and submit a picture of their paper homework quickly and easily with improved image capturing'
    },
    {
        'id': 3,
        'head':'ASSIGNMENT',
        'title': 'Operate with ease using tools for visibility, insights, and control',
        'logo': assignment,
        'body':'Access Classroom audit logs right from the Admin console to investigate events in depth and pinpoint performance or security issues'
    },
    {
        'id': 4,
        'head':'FOLDER',
        'title': 'Stay secure and compliant',
        'logo': folder,
        'body':'Ensure only account holders with a unique sign-in can access a Google for Education domain, plus restrict all class activity to class members only'
    }
]

const Home = () => {

    const classes = useStyles();

    const dir = useMediaQuery('(min-width:960px)') ? 'row' : 'column-reverse'

    return ( 
        <Container>
            <div className={classes.con1}>
                <img src={bannerlogo}></img>
                <br></br>
                <Typography variant='h3' className={classes.changefontSize1}>
                    Where teaching and learning become
                </Typography>
                <Typography variant='h3'className={classes.changefontSize1}>
                    easy
                </Typography>
                <br></br>
                <Typography variant='body1'>
                    Online Education Management System is all-in-one place for teaching and learning. 
                    Our easy-to-use and secure
                </Typography>
                <Typography variant='body1'>
                    tool helps educators manage, measure, and enrich learning experiences.
                </Typography>
                <br></br>
                <Typography variant='h6'>
                    This project build by <a href='https://github.com/VirajPatidar'>Viraj Patidar</a> and <a href='https://github.com/atharvadpatil'>Atharva Patil</a>
                </Typography>
                <br></br>
                <Button variant="outlined" color="primary" href='https://github.com/'>Source Code</Button>
            </div>
            <Box justifyContent="center" mt={12} p={1}>
                <Grid container>
                    {infoarray1.map((info)=>(
                        <Grid item key={info.logo} xs={12} sm={6} md={3} className={classes.con2}>
                            <img src={info.logo}></img>
                            <Typography variant='h6'>
                                <Box fontWeight="fontWeightRegular">
                                {info.title}
                                </Box>
                            </Typography>
                            <br></br>
                            <Typography>
                                <Box fontWeight="fontWeightLight">
                                    {info.body}
                                </Box> 
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <div className={classes.con3}>
                <img className={classes.img} src={study}></img>
            </div>
            <Box p={1} mt={6}>
                {infoarray2.map((info)=>
                info.id % 2 !== 0 
                ? 
                (
                    <Box pt={12} pb={12} style={{backgroundColor:"#e8eaf6"}}>
                        <Grid container key={info.id}>
                            <Grid item sm={12} md={6} style={{paddingLeft: "48px"}}>
                                <img src={info.logo} width="100%" ></img>
                            </Grid>
                            <Grid item sm={12} md={6} className={classes.con4} >
                                <Typography>
                                    {info.head}
                                </Typography>
                                <br></br>
                                <Typography variant='h4' className={classes.changefontSize}>
                                        <Box fontWeight="fontWeightRegular">
                                            {info.title}
                                        </Box>
                                    </Typography>
                                    <br></br>
                                    <Typography>
                                        <Box fontWeight="fontWeightLight">
                                            {info.body}
                                        </Box> 
                                    </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                )
                :
                (
                    <Box pt={12} pb={12}>
                        <Grid container key={info.id} direction={dir}>
                            <Grid item sm={12} md={6} className={classes.con4}>
                                <Typography>
                                    {info.head}
                                </Typography>
                                <br></br>
                                <Typography variant='h4' className={classes.changefontSize}>
                                        <Box fontWeight="fontWeightRegular">
                                            {info.title}
                                        </Box>
                                    </Typography>
                                    <br></br>
                                    <Typography>
                                        <Box fontWeight="fontWeightLight">
                                            {info.body}
                                        </Box> 
                                    </Typography>
                            </Grid>
                            <Grid item sm={12} md={6} style={{paddingRight: "48px"}}>
                                <img src={info.logo} width="100%" ></img>
                            </Grid>
                        </Grid>
                    </Box>
                )
                )}
                
            </Box>
            <Box className={classes.con3}>
                <Typography variant='h4' className={classes.changefontSize} >
                    <Box fontWeight={350}>
                        "The function of education is to teach one to think intensively and to think critically. Intelligence plus character – that is the goal of true education"
                    </Box>
                </Typography>
                <br></br>
                <Typography variant="h6">
                    <Box fontWeight={500}>
                        -   Martin Luther King
                    </Box>
                </Typography>
            </Box>
            <Box mt={12} p={1}>
                <Grid container alignItems="center">
                    <Grid item sm={12} md={6}>
                        <img src={study2} width="100%"></img>
                    </Grid>
                    <Grid item sm={12} md={6}>
                        <Typography variant='h3' className={classes.changefontSize}>
                            <Box pl={3} pt={4} fontWeight={350}>
                                Use OEMS as your daily learning platform and achieve success
                            </Box>
                        </Typography>
                        <Typography variant='body1'>
                            <Box pl={3} pt={3} fontWeight={350}>
                                To explore more features of OEMS please create a account
                            </Box>
                        </Typography>
                        <Box pl={3} pt={3}>
                            <Button pl={3} pt={3} variant="outlined" color="primary">SignUp</Button>
                        </Box>
                        
                    </Grid>
                </Grid>
            </Box>
            <Box mt={6} p={1}>
               <Grid container justifyContent="center">
                   <Grid item style={{display: "flex"}}>
                       <Box pr={3} pt={4}>
                            <Typography>
                                Follow us
                            </Typography>
                        </Box>
                        <Box pt={4} pr={2}>
                            <FacebookIcon onClick={() =>  window.location.href='https://www.facebook.com/'}/>
                        </Box>
                        <Box pt={4} pr={2}>
                            <InstagramIcon onClick={() =>  window.location.href='https://www.instagram.com/'} />
                        </Box>
                        <Box pt={4} pr={2}>
                            <TwitterIcon onClick={() =>  window.location.href='https://twitter.com/'} />
                        </Box>
                        <Box pt={4} pr={2}>
                            <YouTubeIcon onClick={() =>  window.location.href='https://www.youtube.com/'} />
                        </Box>
                   </Grid>
                </Grid> 
            </Box>
            <Divider></Divider>
            {/* <Box style={{display: "flex"}} mt={5} mb={5}>
                <Typography varient="subtitle1" className={classes.con2}>
                    OEMS
                </Typography>
                <Typography className={classes.con2}>
                    Privacy
                </Typography>
                <Typography className={classes.con2}>
                    Terms
                </Typography>
            </Box> */}
        </Container>
     );
}
 
export default Home;
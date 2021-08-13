import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { userData, isLoggedIn } from '../atoms';
import axiosInstance from '../axios';

//MUI 
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'
import Box from '@material-ui/core/Box';
import { CardMedia } from '@material-ui/core';

function ClassCard({ klass }) {

    function getRandomImage() {
        return `https://source.unsplash.com/featured/?nature/${Math.floor(Math.random() * 100)}`
    }

    return (
        <div>
            <Card raised={true}>
                <CardHeader
                    action={
                        <IconButton>
                            {/* <IconButton onClick={() => handleDelete(klass.id)}> */}
                            <DeleteOutlined />
                        </IconButton>
                    }
                    title={klass.class_name}
                    subheader={klass.teacher_name}
                />
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Study"
                        height="200"
                        image={getRandomImage()}
                        title="Study"
                    />
                    <CardContent>
                        
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}


export default function Dashboard() {

    const [classes, setClasses] = useState([]);
    const user = useRecoilValue(userData)
    const log = useRecoilValue(isLoggedIn)

    useEffect(() => {
        axiosInstance
            .get(`class/${user.id}`)
            .then((res) => {
                console.log(res);
                setClasses(res.data.classes)
            })
            .catch(err => {
                console.log(err)
            });
    }, [])

    // const handleDelete = async (id) => {
    //     await axios.delete('url' + id, {
    //         payload
    //     })
    //     const newClasses = classes.filter(c => c.id != c)
    //     setClasses(newClasses)
    // }

    return (
        <Box mt={4}>
            <Container>
                <Grid container spacing={3}>
                    {classes.map(c => (
                        <Grid item xs={12} md={6} lg={4} key={c.class_id}>
                            {/* <ClassCard note={c} handleDelete={handleDelete} /> */}
                            <ClassCard klass={c} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}
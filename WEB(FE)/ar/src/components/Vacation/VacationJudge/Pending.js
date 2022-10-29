import React, { useState } from 'react'

import { Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import moment from 'moment';

const Pending = ({user}) => {
    const [User, setUser] = useState(user);
    const [Startdate, setStartdate] = useState(moment(User.Startdate).format('YYYY-MM-DD'));
    const [Enddate, setEnddate] = useState(moment(User.Enddate).format('YYYY-MM-DD'));

    return (
        <>
            <Box
                sx={{
                    mx : 70,
                    p: 1,
                    width : 350,
                    borderRadius: 2,
                }}
            >
                <Paper
                    elevation={3}
                    justifycontent="center"
                >
                    <Typography variant="h4" align='center' gutterBottom>
                        내 휴가
                    </Typography><br/>
                    <Typography variant="body1" align='center' gutterBottom>
                        출발일 : {Startdate}
                    </Typography><br/>
                    <Typography variant="body1" align='center' gutterBottom>
                        도착일 : {Enddate}
                    </Typography><br/>
                    <Typography variant="body1" align='center' gutterBottom>
                        휴가내용 : {User.Content}
                    </Typography>
                </Paper>
            </Box>
            
        </>
    )
}

export default Pending;
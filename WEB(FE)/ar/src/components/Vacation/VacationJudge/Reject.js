import React from 'react'

import baby_ogu_sad from '../../../static/image/baby-ogu-sad.png'
import { Box, Paper } from '@mui/material';
import { Typography } from 'antd';

const Reject = () => {
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
                    <Typography variant="h3">
                        거절되었습니다.
                    </Typography>
                    <img
                        src={baby_ogu_sad}
                        alt=""
                    />
                </Paper>   
            </Box>
            
        </>
    )
}

export default Reject
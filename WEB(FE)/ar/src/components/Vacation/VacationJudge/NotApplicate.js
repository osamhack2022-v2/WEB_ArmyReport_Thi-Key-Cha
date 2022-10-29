import React from 'react'

import baby_ogu_running from '../../../static/image/baby-ogu-running.png'
import { Paper, Typography } from '@mui/material';
import styled from 'styled-components';

const ApplicateDesign = styled.div`
    display : block;
    width : 90%;
`;

const NotApplicate = () => {
    return (
        <ApplicateDesign>
            <div>
                <Paper elevation={3}>
                    <Typography variant="h2" gutterBottom>
                        신청한 휴가가 없습니다..
                    </Typography>
                    <img
                        src={baby_ogu_running}
                        alt=""
                    />
                </Paper>
            </div>
        </ApplicateDesign>   
    )
}

export default NotApplicate;
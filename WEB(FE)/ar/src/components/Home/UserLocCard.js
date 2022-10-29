import React, { useState } from 'react';
import styled from 'styled-components';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



const UserLocCard = ({User}) => {
  const [user, setUser] = useState({User}.User);
  console.log(user);
  return (
    <>
      { user.IsVacation && 
        <Card>
            <CardContent className='user-info'>
                <Typography variant="h6">
                휴가
                </Typography>
                <Typography variant="body2">
                <span>계급 : {user.Class}</span> 
                <span>이름 : {user.Name}</span> 
                <br />
                </Typography>
            </CardContent>
        </Card>
      }
      { !user.IsVacation &&
        <Card>
            <CardContent className='user-info'>
                <Typography variant="body2">
                <span>계급 : {user.Class}</span> 
                <br/>
                <span>이름 : {user.Name}</span> 
                <br/>
                <span>장소 : {user.Located}</span>
                </Typography>
            </CardContent>
            <CardActions className="command-btn">
                <Button size="small">복귀</Button>
                <Button size="small">집합</Button>
            </CardActions>
        </Card>
      }
    </>
  );
};

export default UserLocCard;

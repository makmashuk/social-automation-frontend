import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router'
import Alert from '@mui/material/Alert';

function success() {
    const router = useRouter();
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
        >
            <Card sx={{ width: 400, textAlign: 'center' }}>
                <CardContent>
                    <Alert severity="success">   Succefully Logged In.</Alert>

                    <Typography variant="h5" component="div">
                    </Typography>
                    <br />
                    <Button onClick={(e) => router.push('/dashboard')} size="small">Go To Dashboard</Button>
                </CardContent>

            </Card>
        </Box>
    )
}

export default success
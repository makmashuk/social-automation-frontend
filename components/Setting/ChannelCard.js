import styles from '../../styles/Setting.module.scss'
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { createFbSetting, getFacebookLoginUrl, getFbSetting } from '../../services/settingApi'
import { useEffect } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Alert from '@mui/material/Alert';

const validationSchema = yup.object({
    client_id: yup
        .number('Enter your App Client Id')
        .required('Client id is required'),
    client_secret: yup
        .string('Enter your App Client Secret')
        .required('Client Secret is required'),
});

const initial = {
    client_id: '',
    client_secret: '',
    redirect_url: ''
}
export default function ChannelCard() {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {

        async function fetchData() {
            const response = await getFbSetting();
            const settingData = response.data?.data;
            formik.setValues(settingData);
            settingData.client_id === '' ? setIsConnected(false) : setIsConnected(true);

        }
        fetchData();

    }, [])
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleFbLogin = () => {
        getFacebookLoginUrl().then(res => {
            window.open(res.data.data.facebook, '_blank');
        });
    }

    const formik = useFormik({
        initialValues: initial,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const data = await createFbSetting(values);
            console.log(data);
        },
    });



    return (
        <>
            <div className={styles.channelCard}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><linearGradient id="Ld6sqrtcxMyckEl6xeDdMa" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#2aa4f4" /><stop offset="1" stopColor="#007ad9" /></linearGradient><path fill="url(#Ld6sqrtcxMyckEl6xeDdMa)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z" /><path fill="#fff" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z" /></svg>

                <Typography variant="h6" gutterBottom component="div">
                    Facebook
                </Typography>
                <Typography variant="caption" gutterBottom component="div">
                    Pages/Group
                </Typography>
                <Button sx={{ mt: 2 }} onClick={handleClickOpen} variant="outlined" size="small">
                    {isConnected ? "View Setting" : "Create App"}
                </Button>
                {isConnected? ( <Button onClick={handleFbLogin}>Login Access</Button>) : ''}


            </div>

            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Update Facebook App Setting"}</DialogTitle>
                <DialogContent style={{ minHeight: '40vh', margin: '1em' }}>
                    <form autoComplete="off" onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2} padding={2}>
                            <Grid item xs={6}>
                                <TextField
                                    fullwidth="true"
                                    size="small"
                                    id="client_id"
                                    name="client_id"
                                    label="client_id"
                                    variant="outlined"
                                    value={formik.values.client_id}
                                    onChange={formik.handleChange}
                                    error={formik.touched.client_id && Boolean(formik.errors.client_id)}
                                    helperText={formik.touched.client_id && formik.errors.client_id}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullwidth="true"
                                    size="small"
                                    id="client_secret"
                                    name="client_secret"
                                    label="client_secret"
                                    variant="outlined"
                                    type="password"
                                    value={formik.values.client_secret}
                                    onChange={formik.handleChange}
                                    error={formik.touched.client_secret && Boolean(formik.errors.client_secret)}
                                    helperText={formik.touched.client_secret && formik.errors.client_secret}
                                />
                            </Grid>
                            {isConnected && (<Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="redirect_url"
                                    name="redirect"
                                    label="redirect"
                                    size="small"
                                    variant="outlined"
                                    disabled
                                    value={formik.values.redirect_url}
                                    InputProps={
                                        {
                                            endAdornment: <InputAdornment
                                                onClick={() => { navigator.clipboard.writeText(formik.values.redirect_url) }}
                                                position="end">
                                                <IconButton
                                                    aria-label="Copy redirect Url"
                                                    size="small"
                                                    edge="end"
                                                >
                                                    <ContentCopyIcon />
                                                </IconButton>
                                            </InputAdornment>,
                                        }}


                                />
                            </Grid>)}
                            <Grid item xs={12}>
                                <Button type="submit" color="primary" fullWidth variant="contained" >
                                    {isConnected ? "Update" : "Create"}
                                </Button>
                            </Grid>

                        </Grid>

                    </form>
{/* 
                    <Alert variant="outlined" severity="success">
                        {message}
                    </Alert> */}






                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}
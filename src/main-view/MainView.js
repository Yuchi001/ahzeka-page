import React, {Fragment, useRef, useState} from 'react';
import {Alert, Paper, Snackbar, Stack, TextField, Typography} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import Divider from "@mui/material/Divider";
import {theme_main, theme_paper} from "../utils/theme/theme";
import {useFormik} from "formik";
import {formSchema} from "./MainView.schema";
import {ZodError} from "zod";
import * as emailjs from "emailjs-com";

export const MainView = () => {
    const [openSentStatus, setOpenStatus] = useState({opened: false, success: false});
    const formRef = useRef();
    const [loading, setLoading] = useState(false);
    const formikForm = useFormik({
        initialValues: {
            email: "",
            name: "",
            phone: "",
            message: "",
        },
        onSubmit: (values, e) => {
            setLoading(true);
            emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID,
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
                formRef.current,
                process.env.REACT_APP_EMAILJS_USER_ID)
                .then((result) => {
                    setOpenStatus({ opened: true, success: true});
                    formikForm.resetForm();
                })
                .catch((error) => {
                    setOpenStatus({ opened: false, success: false});
                }).finally(() => setLoading(false));
        },
        validate: (values) => {
            try {
                formSchema.parse(values);
            } catch (error){
                if (error instanceof ZodError) return error.formErrors.fieldErrors;
            }
        }
    });

    const errorChild = () => {
        const errors = Object.values(formikForm.errors);
        for (let i = 0; i < errors.length; i++) {
            const current = errors[i][0];
            if (errors[i]) return <Alert sx={{ paddingX: -4, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} severity="error">{current}</Alert>
        }
        return <Fragment />
    }

    const hasError = () => {
        const errors = Object.values(formikForm.errors);
        for (let i = 0; i < errors.length; i++) {
            const current = errors[i][0];
            if (current) return true;
        }
        return false;
    }

    return <form ref={formRef} onSubmit={formikForm.handleSubmit} style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper variant="outlined" sx={{ height: '90%', width: '60%', borderRadius: "5px", background: theme_paper }}>
            <Stack sx={{ borderRadius: "5px 5px 0px 0px", background: theme_main }} color="white" height="10%" alignItems="center" justifyContent="center">
                <Typography fontWeight="bold" fontSize="1.6rem">Send me an email</Typography>
            </Stack>
            <Divider />
            <Stack paddingY={2} paddingX={4}>
                <Stack width="100%" alignItems="center" justifyContent="center" spacing={1}>
                    <Stack width="100%" direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                        <TextField required error={!!(formikForm.errors.name && formikForm.touched.name)} value={formikForm.values.name} onChange={formikForm.handleChange} name="name" fullWidth label="Name" id="name" />
                        <TextField required error={!!(formikForm.errors.email && formikForm.touched.email)} type="email" value={formikForm.values.email} onChange={formikForm.handleChange} name="email" fullWidth label="E-mail" id="email" />
                        <TextField error={!!(formikForm.errors.phone && formikForm.touched.phone)} type="text" value={formikForm.values.phone} onChange={formikForm.handleChange} name="phone" fullWidth label="Phone number" id="phone" />
                    </Stack>
                    <TextField required error={!!(formikForm.errors.message && formikForm.touched.message)} label="Message" value={formikForm.values.message} onChange={formikForm.handleChange} name="message" id="message" sx={{ "& .MuiInputBase-input" : {
                            height : `${hasError() ? 40 : 45}vh !important`,
                        }, }} fullWidth multiline rows={1} />
                    <LoadingButton loading={loading} color="primary" type="submit" variant="contained" fullWidth>Send</LoadingButton>
                    {errorChild()}
                </Stack>
            </Stack>
        </Paper>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openSentStatus?.opened} autoHideDuration={6000} onClose={() => setOpenStatus((past) => ({ opened: false, success: past.success }))}>
            <Alert
                onClose={() => setOpenStatus((past) => ({ opened: false, success: past.success }))}
                severity={openSentStatus?.success ? "success" : "error"}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {openSentStatus?.success ? "Successfully sent an e-mail!" : "Something went wrong!"}
            </Alert>
        </Snackbar>
    </form>
}
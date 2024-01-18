import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Link  from 'next/link';

import CustomTextField from '../../../src/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

import { createUser } from "../../../utils/api_functions"

interface registerType {
    title?: string;
    subtitle?: JSX.Element | JSX.Element[];
    subtext?: JSX.Element | JSX.Element[];
  }

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const handleClick = (event:any) => {
        createUser({name, email, password})
    }
    
    const handleName= (event: any) => {
        setName(event.target.value)
    }
    
    const handleEmail = (event: any) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event: any) => {
        setPassword(event.target.value)
    }

    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            <Box>
                <Stack mb={3}>
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='name' mb="5px">Name</Typography>
                    <CustomTextField id="name" variant="outlined" fullWidth onChange={(e: any) => handleName(e)}/>

                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Email Address</Typography>
                    <CustomTextField id="email" variant="outlined" fullWidth onChange={(e: any) => handleEmail(e)}/>

                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Password</Typography>
                    <CustomTextField id="password" type="password" variant="outlined" fullWidth onChange={(e: any) => handlePassword(e)}/>
                </Stack>
                <Button 
                color="primary" 
                variant="contained" 
                size="large" 
                fullWidth 
                // component={Link} 
                // href="/authentication/login"
                onClick={e => handleClick(e)}>
                    Sign Up
                </Button>
            </Box>
            {subtitle}
        </>
    );
}

export default AuthRegister;

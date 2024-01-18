import { useState, useEffect } from 'react';
import { Box, InputLabel, TextField } from '@mui/material';
import { startBEEFREE, BEEFREE } from '../../../utils/beefree_functions';
import Login2 from "../../../pages/authentication/login/index"
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react';

export default function BEEFREEContainer({type, heading}) {
    const [session, setSession] = useState(null)
    const router = useRouter();

    useEffect(() => {
        getSession()
            .then(res => {
                setSession(res)
            });
        console.log(session)
    }, [])

    if (!session) {
        return (
            <Login2 />
        )
    }
    
    startBEEFREE({user: session.user, type, template_id: router.query.template_id})

    const handleFileChange = (event) => {
        const templateFile = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function () {
            let templateString = reader.result;
            let template = JSON.parse(templateString);
            BEEFREE.load(template)
        };

        reader.readAsText(templateFile);
    }

    return (
        <div>
            <h1>{heading}</h1>
            <Box id="bee-container" sx={{ height: "1000px", marginBottom: "10px" }}></Box>
            {
                type == "filemanager" ?
                    <div></div> 
                    :
                    <div>
                        <p>Utilize our one of many <a href='https://docs.beefree.io/methods-and-events/' target='_blank'>Methods and Events</a> to provide users with a smooth experience.</p>
                        <InputLabel shrink>Upload JSON Template</InputLabel>
                        <TextField type="file" onChange={e => handleFileChange(e)}/>
                    </div>
            }
        </div>
        
    )
    
}
import { useEffect, useState } from "react";
import FullLayout from '../../src/layouts/full/FullLayout';
import { getDesigns, deleteDesigns } from '../../utils/api_functions';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import moment from 'moment'
import Login2 from "../authentication/login/index"

import logo from '../../public/images/BEE/Beefree_symbol.png'
import {
    Button,
    Link,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Checkbox
} from '@mui/material';



export default function MyDesigns() {
    const [session, setSession] = useState(null)
    const [designs, setDesigns] = useState([]);
    const [checkedDesigns, setCheckDesigns] = useState([])
    const router = useRouter();

    useEffect(() => {
        getSession()
            .then(res => {
                setSession(res);
                if (res) {
                    getDesigns({ user: res.user })
                        .then(res => {
                            setDesigns(res.results)
                        });
                }
            })

        console.log({ designs })
    }, [])


    if (!session) {
        return (
            <Login2 />
        )
    }

    function handleImageClick(event, item) {
        event.preventDefault();
        router.push(`/beefree/${item.type}?template_id=${item.id}`)
    }

    function handleCheckChange(event, item) {
        // event.preventDefault();
        if (event.target.checked) (
            setCheckDesigns([...checkedDesigns, item])
        ); else if (event.target.checked == false) {
            setCheckDesigns(checkedDesigns.filter(checked =>
                checked.id !== item.id
            ))
        };
    }

    async function handleDeleteDesigns(event) {
        event.preventDefault();
        await deleteDesigns(checkedDesigns)
            .then(() => {
                setDesigns(designs.filter(design => !checkedDesigns.includes(design)))
            })
        setCheckDesigns([]);
    }

    return (
        <div>
            <h1>Allow users to create and edit multiple saved email, page, or popup designs.</h1>
            {
                designs && designs.length > 0 ?
                    <div>
                        <p>Do NOT be alarmed by the images are appearing as the Beefree logo. Our paid plans, provide an <a href="https://docs.beefree.io/message-services-api-reference/#image" target='_blank'>API to get images of the template</a> design.</p>
                        <ImageList cols={4} gap={20} rowHeight={300}>
                            {designs.map(item =>
                                <Button key={item.id}>
                                    <ImageListItem sx={{ border: 0.25, borderColor: 'secondary.main' }}>
                                        <img
                                            src={item.image_url ? `${item.image_url}` : `http://localhost:3000/${logo.src}`}
                                            alt={item.id}
                                            onError={e => e.target.src = `http://localhost:3000/${logo.src}`}
                                            loading="lazy"
                                            onClick={e => handleImageClick(e, item)}
                                        />
                                        <ImageListItemBar
                                            title={item.type}
                                            subtitle={`last updated ${moment(item.updated_date).format("MMM Do, h:mm a")}`}
                                            actionIcon={
                                                <Checkbox
                                                onChange={e => handleCheckChange(e, item)}
                                                />
                                            }
                                        />
                                    </ImageListItem>
                                </Button>
                            )
                            }
                        </ImageList>
                        {checkedDesigns.length > 0 ? <Button variant="contained" onClick={e => handleDeleteDesigns(e)}>Delete</Button> : <span></span>}
                    </div>
                    :
                    <div>
                        No saved designs.
                    </div>
            }
        </div>
    )
}

MyDesigns.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};
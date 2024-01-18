import router from "next/router";
import { signIn } from "next-auth/react";

const createUser = ({name, email, password}) => {
    // console.log({name, email, password})
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "displayname": name,
        "email": email,
        "password": password
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/register/`, requestOptions)
        .then(response => response.json())
        .then(result => {
            signIn("credentials", {username: result.user.email, password})
        })
        .catch(error => console.error({error}));
}

const createTemplate = ({user, json, html, type, template_id}) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "user_id": user.id,
        type,
        json,
        html
    });

    if (template_id) {
        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
    
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/templates/${template_id}/`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("Template successfully updated!")
                console.log(result)
            })
            .catch(error => console.error({error}));
    } else {
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
    
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/templates/`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("Template successfully created!")
                console.log(result)
                router.push(`/bee/${result.type}?template_id=${result.id}`)
            })
            .catch(error => console.error({error}));
    }

}

const getDesigns = async ({user}) => {
    let designs;
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/templates/?user=${user.id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            designs = result
        })
        .catch(error => console.error({error}));
    
    return designs;
}

const getSingleDesign = async (id) => {
    let design;
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/templates/${id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            design = result
        })
        .catch(error => console.error({error}));
    
    return design;
}

const deleteDesigns = async (items) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    await items.forEach(async (item) => {
        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/templates/${item.id}`, requestOptions)
            .then(response => console.log(response))
            .catch(error => console.error({error}));
    })

    return;
}

export { createUser, 
    createTemplate, 
    getDesigns,
    getSingleDesign,
    deleteDesigns }

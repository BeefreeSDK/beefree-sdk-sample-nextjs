import BeefreeSDK from '@beefree.io/sdk'
import { getSingleDesign } from './api_functions'
import { beefree_config } from './beefree_configuration';


const getEnvVariable = (name, value) => {
    if (name === "email" && value === "clientId") {
        return process.env.NEXT_PUBLIC_BEEFREE_EMAIL_CLIENT_ID
    }
    else if (name === "email" && value === "secretKey") {
        return process.env.NEXT_PUBLIC_BEEFREE_EMAIL_SECRET_KEY
    }
    else if (name === "page" && value === "clientId") {
        return process.env.NEXT_PUBLIC_BEEFREE_PAGE_CLIENT_ID
    }
    else if (name === "page" && value === "secretKey") {
        return process.env.NEXT_PUBLIC_BEEFREE_PAGE_SECRET_KEY
    }
    else if (name === "popup" && value === "clientId") {
        return process.env.NEXT_PUBLIC_BEEFREE_POP_UP_CLIENT_ID
    }
    else if (name === "popup" && value === "secretKey") {
        return process.env.NEXT_PUBLIC_BEEFREE_POP_UP_SECRET_KEY
    }
    else if (name === "filemanager" && value === "clientId") {
        return process.env.NEXT_PUBLIC_BEEFREE_FILE_MANAGER_CLIENT_ID
    }
    else if (name === "filemanager" && value === "secretKey") {
        return process.env.NEXT_PUBLIC_BEEFREE_FILE_MANAGER_SECRET_KEY
    }
}

let BEEFREE;
const startBEEFREE = ({user, type, template_id}) => {
    // fetching saved template
    let template_to_load = {};
    if (template_id) {
        getSingleDesign(template_id)
            .then(res => template_to_load = res.json);
    }

    // setting SDK client-side configuration to an object
    const beefreeConfig = beefree_config({user, type, template_id})

    const token_params = {
        client_id: getEnvVariable(type, "clientId"),
        client_secret: getEnvVariable(type, "secretKey"),
        uid: user.id
    };

    fetchToken(token_params)
        .then((token) => {
            const beefreeEditor = new BeefreeSDK(token); // setting variable to new SDK class from @beefree.io/sdk package
            beefreeEditor.start(beefreeConfig, template_to_load); // starting SDK
            BEEFREE = beefreeEditor; // you can export BEEFREE to use in other parts of the codebase
        })
}

// it is best to call https://auth.getbee.io/loginV2 server-side. this is currently implemented client-side for demo purposes
const fetchToken = async (token_params) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      client_id: token_params.client_id,
      client_secret: token_params.client_secret,
      uid: token_params.uid,
    });

    return await fetch("https://auth.getbee.io/loginV2", {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    }) 
      .then((response) => response.json())
      .catch((error) => console.error(error));
}

export { startBEEFREE, BEEFREE }
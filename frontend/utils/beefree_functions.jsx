import BeePlugin from '@beefree.io/sdk'
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
    const beefreeEditor = new BeePlugin();

    const beefreeConfig = beefree_config({user, type, template_id})

    const token = {
        client_id: getEnvVariable(type, "clientId"),
        client_secret: getEnvVariable(type, "secretKey")
    };

    let template_to_load = {};
    if (template_id) {
        getSingleDesign(template_id)
            .then(res => template_to_load = res.json);
    }

    beefreeEditor.getToken(token.client_id, token.client_secret)
        .then(async () => {
            await beefreeEditor.start(beefreeConfig, template_to_load);
            BEEFREE = beefreeEditor;
        })
}

export { startBEEFREE, BEEFREE }
import fileDownload from 'js-file-download';
import { createTemplate } from './api_functions';


const saveAsTemplate = (filename, content) => {
    fileDownload(new Blob([content], { type: 'text/plain;charset=utf-8' }), filename)
}

// DEFINE FUNCTIONS FOR Beefree SDK CONFIG HERE




const beefree_config = ({user, type, template_id}) => {
    return {
        uid: user.id, // DO NOT DELETE
        container: "bee-container", // DO NOT DELETE
        onSave: (json, html) => createTemplate({user, json, html, type, template_id}),
        onSend: (html) => saveAsTemplate("template.html", html),
        /* you can ultilize the onSend functin to email a rendered version of the html i.e. https://www.emailjs.com/docs/rest-api/send/
        for purposes of this project, we are just downloading an html file, allowing you to view the html as a webpage */
        onSaveAsTemplate: (json) => saveAsTemplate("template.json", json),
        onError: (error) => console.error({error}),
    
        // MAKE EDITS TO YOUR Beefree SDK CONFIG HERE



    }
}

export { beefree_config }
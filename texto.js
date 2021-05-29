
const axios = require('axios');

var data = {
    "documents": [
    {
         id : "1",
         language : "es",
         text : "Había momentos, reflexionó Samakro, en los que algo en su vida se sentía vagamente como un fragmento de la historia personal que se repitió. También hubo momentos en que no hubo vaguedad alguna al respecto. Hoy fue uno de los últimos. Volando el Springhawk en el sistema de casas colmena Paataatus de Nettehi. Volando por el mismo vector de aproximación que habían utilizado durante la incursión punitiva con el almirante Ar’alani. Volando sin tener idea de lo que les esperaba. Solo que esta vez no tenían al Vigilant ni a las otras naves del grupo de trabajo de Ar’alani. Esta vez, iban a entrar solos. “Prepárate para la fuga”, Thrawn llamó con calma desde su silla de mando. Samakro miró alrededor del puente, su larga experiencia le permitió evaluar el estado de ánimo de los oficiales con solo mirarlos. Se notaba que estaban tensos por las mismas razones que él. Pero no vio pánico ni dudas serias. Habían estado con Thrawn el tiempo suficiente para confiar en que él los ayudaría a superar el lío al que los estaba llevando." 
    },
    {
         id : "2",
         language : "es",
         text : "A lo lejos, Samakro se preguntó si habían tenido la misma confianza cuando él era el comandante del Springhawk ."


    }
    ]
}
var direccion = "https://servicioanalisistexto.cognitiveservices.azure.com/text/analytics/v3.0/entities/recognition/general"

axios.post(direccion, data, {
    headers : {
        "Ocp-Apim-Subscription-Key" :"8b4c7829af844bc699425c01e131246a",
        "Content-Type" : "application/json"
    }
} )

.then(respuesta => { console.log(respuesta.data)} ) 
.catch(error => { console.log(respuesta.error)} );


const accionesRespuesta = [
    ("este texto es", console.log(data))
]

console.log( "Hola, ¿Cuál es tu duda?" );

var pregunta = "¿que dice aqui?";

function deteccion( texto, callback ){
    var datosDeteccion = [{ "Text": texto }];
    var direccionDeteccion = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=';
    axios.post( direccionDeteccion, datosDeteccion, {
        headers : {
            'Ocp-Apim-Subscription-Key': '58f9f4075c9c46bca61a78cfc71a45b6',
            'Ocp-Apim-Subscription-Region' : 'southcentralus',
            'Content-Type' : 'application/json'  
        }
    })
    
    .then( respuesta => { callback( respuesta.data[0].language, texto ) } )
    .catch( error => console.log( error ));
}

function traduccion( idioma, texto ){
    switch( texto ){
        case "A lo lejos, Samakro se preguntó si habían tenido la misma confianza cuando él era el comandante del Springhawk":
            var respuestaIdioma = [ { "Text": accionesRespuesta[5] } ];
            break;
        case "A lo lejos, Samakro se preguntó si habían tenido la misma confianza cuando él era el comandante del Springhawk":
            var respuestaIdioma = [ { "Text": accionesRespuesta[1] } ];
            break;
    }
    var direccionTraduccion = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to='+idioma;
    axios.post( direccionTraduccion, respuestaIdioma, {
        headers : {
            'Ocp-Apim-Subscription-Key': '8b4c7829af844bc699425c01e131246a',
            'Ocp-Apim-Subscription-Region' : 'southcentralus',
            'Content-Type' : 'application/json'  
        }
    })
    .then( respuesta => console.log( respuesta.data[0].translations[0].text ))
    .catch( error => console.log( error ));
}
deteccion( pregunta, traduccion );
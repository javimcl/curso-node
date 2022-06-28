
import 'dotenv/config'
import { inquirerMenu, leerInput, listarLugares, pausa } from "./helpers/inquirer.js"
import { Busquedas } from "./models/busquedas.js";

//console.log(process.env.MAPBOX_KEY)

const main = async () => {

    const busquedas = new Busquedas();
    let opt = '';


    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                
                //Mostrar mensaje
                const termino = await leerInput('Ciudad: ');
                 //Buscar los lugares
                const lugares = await busquedas.ciudad(termino);
                 //Seleccionar el lugar
                const id = await listarLugares(lugares);
                if (id === '0') continue;

                //Guardar en DB
                
                const lugarSeleccionado = lugares.find(lugar => lugar.id === id);                                      
                busquedas.agregarHistorial(lugarSeleccionado.nombre);
                //Clima
                const clima = await busquedas.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lng);                

                //Mostrar los resultados

                console.clear();
                console.log("\n Informacion de la cuidad\n".green)
                console.log("Ciudad:", lugarSeleccionado.nombre.green)
                console.log("Lat:", lugarSeleccionado.lat)
                console.log("Lng:", lugarSeleccionado.lng)
                console.log("Temperatura:", clima.temp)
                console.log("Minima:", clima.min)
                console.log("Maxima:", clima.max)
                console.log("Como esta el clima:", clima.desc.green)

                break;
            case 2:
               busquedas.historialCapitalizado.forEach((lugar,i) => {
                    const idx = `${i + 1}.`.green;
                    console.log(`${idx} ${lugar}`);
                })

                break;

            default:
                break;
        }

        await pausa();

    } while (opt !== 0);

}

main();
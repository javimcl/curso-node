import colors from 'colors';
import { guardarDB, leerBd } from './helpers/guardarArchivo.js';
import { confirmar, inquirerMenu, leerInput, listadoTareasBorrar, mostrarListadoCheckList, pausa } from './helpers/inquirer.js';
import { Tarea } from './models/tarea.js';
import { Tareas } from './models/tareas.js';

console.clear();

const main = async () => {

    let opt = ''
    const tareas = new Tareas();

    const tareaBd = leerBd();

    if (tareaBd) {
        //Establecer las tareas
        tareas.cargarTareasFromArray(tareaBd);


    }

    do {
        // Imprimir el menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // Crear opcion
                const desc = await leerInput('Descripcion:')
                tareas.crearTarea(desc);

                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
               tareas.toggleCompletadas(ids)
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('Estas seguro');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }


                break;
            default:
                break;
        }


        guardarDB(tareas.listadoArr);

        await pausa();



    } while (opt !== 0);

}

main();
import fs from 'fs';

const archivo = './db/data.json';

const guardarDB = (data)=> { 

    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerBd = () => {
    console.log('pasa')
    if (!fs.existsSync(archivo)) {
        return null;        
    }

    console.log('pasa')

    const info = fs.readFileSync(archivo, { encoding: 'utf-8'});
    const data = JSON.parse(info)

    console.log(data)

    return data;
}


export {
    guardarDB,
    leerBd
}
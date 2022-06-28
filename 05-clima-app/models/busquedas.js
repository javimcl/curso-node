import fs from 'fs'
import axios from "axios";
import { info } from 'console';


class Busquedas {

    historial = [];
    dbPath = './db/database.json'

    constructor() {
        this.leerBd();
        //this.cargarHistorialFromArray(data)

    }

    get historialCapitalizado() {
        return this.historial.map(lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map(p=> p[0].toUpperCase() + p.substring(1));
            return palabras.join(' ');
        });
    }

    get paramsMapBox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }

    }

    get paramsWeatherMap() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'lang': 'es',
            'units': 'metric'
        }

    }

    async ciudad(lugar = '') {

        //peticion http
        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
            params: this.paramsMapBox
        })
        const resp = await instance.get();
        //const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/madrid.json?limit=5&language=es&access_token=pk.eyJ1IjoiamF2aW1jbCIsImEiOiJjbDR4OXplYmowMWY4M2ZxYzNiZG51d3RhIn0.TPuJsl9hBkdptGwB50fYYQ');
        return resp.data.features.map(lugar => ({
            id: lugar.id,
            nombre: lugar.place_name,
            lng: lugar.center[0],
            lat: lugar.center[1]
        }));
    } cath(error) {
        return [];
    }

    async climaLugar(lat, lon) {
        try {
            //instancia axios
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWeatherMap, lat, lon }
            })
            // respuesta resp.data
            const resp = await instance.get();
            return {
                desc: resp.data.weather[0].description,
                min: resp.data.main.temp_min,
                max: resp.data.main.temp_max,
                temp: resp.data.main.temp
            }
        } catch (error) {
            console.log(error)
        }
    }

    agregarHistorial(lugar = '') {

        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return;
        }
        this.historial.unshift(lugar.toLocaleLowerCase());
        this.guardarDb();

    }

    guardarDb() {
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerBd() {
        //debe existir
        console.log('p1')
        if (!fs.existsSync(this.dbPath)) {
            return;
        }

        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' })
        const data = JSON.parse(info);
        this.historial = data.historial;
    }

}

export {
    Busquedas
}
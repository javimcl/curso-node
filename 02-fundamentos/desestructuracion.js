

const deadpool = {
    nombre: 'wade',
    apellido: 'winston',
    poder: 'Regeneacion',
    getNombre () {
        return `${this.nombre} ${this.apellido}`
    }
}

//console.log(deadpool.getNombre())

// const nombre = deadpool.nombre;
// const apellido = deadpool.apellido;
// const poder = deadpool.poder;

function imprimeHeroe({nombre, apellido, poder, edad = 0}) {    
    console.log(nombre, apellido, poder, edad);
}

//imprimeHeroe(deadpool);


const heroes = ['Deadpool', 'Superman', 'Batman'];

//const h1 = heroes[0];
//const h2 = heroes[1];
//const h3 = heroes[2];

//const [h1,h2,h3] = heroes;

const [, ,h3] = heroes;

console.log(h3);

const empleados = [
    {
        id: 1,
        nombre: 'Fernando'
    },
    {
        id: 2,
        nombre: 'Linda'
    },
    {
        id: 3,
        nombre: 'Karen'
    },
]

const salarios = [
    {
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        salario: 1500
    }
];


const getEmpleado = (id, callback) => {
    const empleado = empleados.find(e => e.id === id)
    if (empleado) {
        callback(null, empleado);
    } else {
        return callback(`Empleado con id ${id} no existe`);
    }

}

getEmpleado(1, (err, empleado) => {
    if (err) {
        console.log('ERROR!')
        return console.log(err)
    }
    console.log('Empleador existe!');
    console.log(empleado)
});





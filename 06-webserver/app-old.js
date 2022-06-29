

const http = require('http');

http.createServer((req, res) => {

    // console.log(req);

    res.setHeader('Content-Disposition', 'attachment; filename=lista.csv')
    res.writeHead(200, { 'Content-type': 'application/csv' })

    res.write('id, nombre');
    res.write('1, Javier');
    res.write('2, Maria');
    res.write('3, Juan');
    res.write('4, Pedro');
    res.end();

})
    .listen(8080);

console.log('Escuchando el puerto', 8080);
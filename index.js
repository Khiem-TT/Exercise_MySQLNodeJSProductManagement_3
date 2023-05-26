let http = require('http');
let mysql = require('mysql');
let fs = require("fs");


let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Bncvznczvzz1411',
    database: 'dbTest'
});

connection.connect(err => {
    if (err) console.log(err.stack);
    console.log('Connect success');
});

let server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('./view.html', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let sqlShow = `select * from products;`;
                let html = '';
                connection.query(sqlShow, (err, result) => {
                    if (err) {
                        console.log(err.message);
                    } else {
                        result.forEach((value, index) => {
                            html += `<tr>`;
                            html += `<td>${index + 1}</td>`;
                            html += `<td>${value.name}</td>`;
                            html += `<td>${value.price}</td>`;
                            html += `</tr>`;
                        });
                        data = data.replace('{list-products}', html);
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.write(data);
                        res.end();
                    }
                });
            }
        });
    }
});

server.listen(8080, () => {
    console.log('http://localhost:8080');
});
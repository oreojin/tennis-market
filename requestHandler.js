import mariadb from './database/connect/mariadb.js';
import fs from 'fs';

const main_view = fs.readFileSync('./main.html', 'utf-8');
const orderlist_view = fs.readFileSync('./order_list.html');

function main(res) {
  console.log('main');

  mariadb.query('SELECT * FROM product', (err, rows) => {
    console.log(rows);
  });

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(main_view);
  res.end();
}

function redRacket(res) {
  fs.readFile('./img/redRacket.png', (err, data) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    res.end();
  });
}
function blueRacket(res) {
  fs.readFile('./img/blueRacket.png', (err, data) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    res.end();
  });
}
function blackRacket(res) {
  fs.readFile('./img/blackRacket.png', (err, data) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    res.end();
  });
}

function order(res, productId) {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  mariadb.query(
    'INSERT INTO orderlist VALUES (' + productId + ", '" + new Date().toLocaleDateString() + "');",
    (err, rows) => {
      console.log(rows);
    }
  );

  res.write('order page');
  res.end();
}

function orderlist(res) {
  console.log('orderlist');

  res.writeHead(200, { 'Content-Type': 'text/html' });

  mariadb.query('SELECT * FROM orderlist', (err, rows) => {
    res.write(orderlist_view);

    rows.forEach((el) => {
      res.write(`<tr><td>${el.product_id}</td><td>${el.order_date}</td></tr>`);
    });

    res.write('</table>');
    res.end();
  });
}

const handle = {};
handle['/'] = main;
handle['/order'] = order;
handle['/orderlist'] = orderlist;

handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

export default handle;

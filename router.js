export const route = (pathname, handle, res, productId) => {
  console.log(`pathname : ${pathname}`);

  if (typeof handle[pathname] === 'function') {
    handle[pathname](res, productId);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('404 Not Found');
    res.end();
  }
};

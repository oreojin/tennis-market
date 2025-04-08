import http from 'http';

export const start = (route, handle) => {
  const onRequest = (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;
    const queryData = url.searchParams;

    route(pathname, handle, res, queryData.get('productId'));
  };

  http.createServer(onRequest).listen(8080);
};

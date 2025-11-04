const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:5000",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    })
  );
  app.use(
    createProxyMiddleware("/api2", {
      target: "http://localhost:5000",
      changeOrigin: true,
      pathRewrite: { "^/api2": "" },
    })
  );
};

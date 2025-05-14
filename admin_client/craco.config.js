const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  //   webpack: {
  //     configure: (webpackConfig) => {
  //       console.log("@@@", webpackConfig);
  //       webpackConfig.module.rules.push({
  //         test: /\.less$/,
  //         use: [
  //           "style-loader",
  //           "css-loader",
  //           {
  //             loader: "less-loader",
  //             options: {
  //               lessOptions: {
  //                 modifyVars: { "@primary-color": "#00b96b" }, // 覆盖变量
  //                 javascriptEnabled: true,
  //               },
  //             },
  //           },
  //         ],
  //       });
  //       return webpackConfig;
  //     },
  //   },
};

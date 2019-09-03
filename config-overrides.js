const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const { override, fixBabelImports, addLessLoader } = require('customize-cra');


module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#52c41a ',
      '@link-color': '#52c41a  ',
      '@success-color': '#52c41a ',
    },
  }),
);
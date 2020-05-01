const { override, fixBabelImports, addLessLoader, adjustStyleLoaders } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'true',
  }),

  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#00ce6c',
      'border-radius-base': '2px',
    },
  }),

  adjustStyleLoaders(({ use: [, css, , resolve, processor] }) => {
		delete css.options.localIdentName
	})
);

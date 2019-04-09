export default {
  context:'window',
  moduleContext:'window',
  input: 'dist/index.js',
  output: {
    file: 'dist/bundle/maf-dosi.ngxerrors.umd.js',
    format: 'umd',
    name: 'ngxerrors',
    sourcemap: true,
    exports: 'named',
    globals: {
      'typescript': 'ts'
    }
  }
};

module.exports = {
    collectCoverage: true,
    roots: ['<rootDir>/tests'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/tests/.*|(\\.|/)(test))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  }
// const {compilerOptions} = require('./tsconfig');
// const {pathsToModuleNameMapper} = require('ts-jest/utils');
// const {compilerOptions} = require('./tsconfig');
// import {pathsToModuleNameMapper} from 'ts-jest/utils';
// import {compilerOptions} from './tsconfig';

module.exports = {
  verbose: true,
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'json'],
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
    // '^.+\\.(ts|tsx)?$': 'babel-jest'
    '^.+\\.(ts|tsx)?$': 'ts-jest'
  },
  testEnvironment: './test/custom-jest-environment.js',
  moduleNameMapper: {
    '^@modules(.*)$': '<rootDir>/src/modules/$1',
    '^@hooks(.*)$': '<rootDir>/src/modules/hooks/$1',
    '^@components(.*)$': '<rootDir>/src/components/$1',
    '^@interface(.*)$': '<rootDir>/src/interface/$1',
    '^@layouts(.*)$': '<rootDir>/layouts/$1',
    '^@container(.*)$': '<rootDir>/src/container/$1',
    '^@pages(.*)$': '<rootDir>/pages/$1',
    '^@styles(.*)$': '<rootDir>/styles/$1',
    '^@public(.*)$': '<rootDir>/public/$1',
    '^@api(.*)$': '<rootDir>/src/api/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js'
  },
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  testMatch: ['<rootDir>/**/*.test.(js|jsx|ts|tsx)', '<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  modulePaths: ['<rootDir>']
};

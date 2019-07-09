#!/usr/bin/env node

/**
 * 命令行工具
 */
var program = require('commander');
var _console = require('../lib/util/console');
var lib = require('../lib/index.js')

program
    .version('0.0.1');

program.on('--help', function () {
    _console.notice('  功能列表:');
    _console.debug('hahah');
    _console.show('啊大大大大大大大大大大大大大');
})

program
    .command('moveFile [moveFile] [filePath]')
    .description('移动文件[moveFile]到[filePath]')
    .action((moveFile, filePath) => {
        lib.moveFile(moveFile, filePath);
    })

program
    .command('moveFileBack [moveFile] [filePath]')
    .description('从[filePath]移动文件[moveFile]到当前目录')
    .action((moveFile, filePath) => {
        lib.moveFileBack(moveFile, filePath);
    })


program.parse(process.argv);
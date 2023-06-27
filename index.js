require('./mirai')
process.on('unhandledRejection', (reason, promise) =>console.log('Unhandled Rejection at:', promise, 'reason:', reason));
process.on('uncaughtException', (err, origin) =>console.error('Unhandled Exception occurred: ', err));
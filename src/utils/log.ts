export class Log {
  error = function (data: any, additionalData?: any): void {
    console.log('\x1b[40m%s\x1b[0m', data, additionalData ? additionalData : '');
  };
  info = function (data: any, additionalData?: any): void {
    console.log('\x1b[32m%s\x1b[0m', data, additionalData ? additionalData : '');
  };
  package = function (data: any, additionalData?: any): void {
    console.log('\x1b[34m%s\x1b[0m', data, additionalData ? additionalData : '');
  };
  warn = function (data: any, additionalData?: any) {
    console.log('\x1b[31m%s\x1b[0m', data, additionalData ? additionalData : '');
  };
  emphasize = function (data: any, additionalData?: any) {
    console.log('\x1b[35m%s\x1b[0m', data, additionalData ? additionalData : '');
  };
}
export const log: Log = new Log();

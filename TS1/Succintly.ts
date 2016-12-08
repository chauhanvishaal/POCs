module Succintly {

    export class Logger {
        log(message: string): void {
            if(typeof window.console !== 'undefined'){
                window.console.log( 'TypeScript generated msg: ' + message);
            }

        }
    }
}


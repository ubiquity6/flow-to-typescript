import commandLineArgs from 'command-line-args';
import { convert } from './lib';
import * as fs from 'fs';
import * as path from 'path';

const optionDefinitions = [
//  { name: 'verbose', alias: 'v', type: Boolean },
  { name: 'src', type: String, multiple: true, defaultOption: true },
  { name: 'emitSrc', type: Boolean, defaultValue: true },
  { name: 'emitTypes', type: Boolean, defaultValue: true }
//  { name: 'timeout', alias: 't', type: Number }
]

const options = commandLineArgs(optionDefinitions)

console.log("options:", options);

if(options.src) {
    options.src.forEach((src:string) => {
        console.log("processing ", src);

        let flowSource = fs.readFileSync(src, 'uft-8');
        var tsSource = convert(flowSource, src, {
            no_emit : !options.emitSrc
        });
    })
}
else {
       
}

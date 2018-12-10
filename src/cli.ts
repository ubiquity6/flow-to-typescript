import commandLineArgs from 'command-line-args';
import { convert } from './index';
import * as fs from 'fs';
import * as path from 'path';
import { writeDeclaration } from './typelib';

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
        var tsSource = convert(src, {
            no_emit : !options.emitSrc
        });

        if(options.emitTypes) {
            console.log("emitting types");
            writeDeclaration(tsSource, src.replace('.js', 'd.ts'));
        }
    })
}
else {
       
}

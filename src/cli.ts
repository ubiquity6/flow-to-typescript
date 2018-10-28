import commandLineArgs from 'command-line-args';
import { convert } from './index';

const optionDefinitions = [
//  { name: 'verbose', alias: 'v', type: Boolean },
  { name: 'src', type: String, multiple: true, defaultOption: true },
//  { name: 'timeout', alias: 't', type: Number }
]

const options = commandLineArgs(optionDefinitions)

if(options.src) {
    options.src.forEach(src => {
        console.log("processing ", src);
        convert(src, {});
    })
}
else {
       
}

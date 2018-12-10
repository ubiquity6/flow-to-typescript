import { ConvertOptions, convert } from ".";
var PluginError = require('plugin-error');

var PLUGIN_NAME = 'gulp-flow-to-typescipt';

import {Transform} from 'readable-stream';
import path from 'path';

export function gulp(options: ConvertOptions) {
    if (!options) {
        options = {};
    }

    return new Transform({
        objectMode: true,
        transform: function (file, enc, callback) {
            if (file.isNull()) {
                return callback(null, file);
            }

            function doReplace(this: any) {
                if (file.isStream()) {
                    this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));

                }

                if (file.isBuffer()) {
                    const parsedpath = path.parse(file.path);
                    console.log("PARSING:", file.path, parsedpath.ext);
                      
                    if(parsedpath.ext === '.js') {
                        // assume it is a flow file.
                     //   console.log("PARSING:", file.path);
                        const outtxt= convert(String(file.contents), file.filepath, {
                            no_emit: true
                        });
                        file.contents = new Buffer(outtxt);


                        //let filePath = path.parse(file.path);
                        //filePath.base = filePath.base.replace(path.extname(file.path), 'ts');
                        // format the path back into an absolue
                        //file.path = path.format(filePath);
                        
                        parsedpath.ext = '.ts';
                        delete parsedpath.base;
                        //console.log(parsedpath);
                        file.path = path.format(parsedpath);
                        //console.log("RESULT:", file.path);
                    }
                   
                    callback(null, file);
                }
            }

            doReplace();
        }
    });
};

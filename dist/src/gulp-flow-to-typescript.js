"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
var PluginError = require('plugin-error');
var PLUGIN_NAME = 'gulp-flow-to-typescipt';
const readable_stream_1 = require("readable-stream");
const path_1 = __importDefault(require("path"));
function gulp(options) {
    if (!options) {
        options = {};
    }
    return new readable_stream_1.Transform({
        objectMode: true,
        transform: function (file, enc, callback) {
            if (file.isNull()) {
                return callback(null, file);
            }
            function doReplace() {
                if (file.isStream()) {
                    this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
                }
                if (file.isBuffer()) {
                    const parsedpath = path_1.default.parse(file.path);
                    console.log("PARSING:", file.path, parsedpath.ext);
                    if (parsedpath.ext === '.js') {
                        // assume it is a flow file.
                        //   console.log("PARSING:", file.path);
                        const outtxt = _1.convert(String(file.contents), file.filepath, {
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
                        file.path = path_1.default.format(parsedpath);
                        //console.log("RESULT:", file.path);
                    }
                    callback(null, file);
                }
            }
            doReplace();
        }
    });
}
exports.gulp = gulp;
;
//# sourceMappingURL=gulp-flow-to-typescript.js.map
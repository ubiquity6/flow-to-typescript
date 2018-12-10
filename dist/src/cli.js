"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_line_args_1 = __importDefault(require("command-line-args"));
const lib_1 = require("./lib");
const fs = __importStar(require("fs"));
const optionDefinitions = [
    //  { name: 'verbose', alias: 'v', type: Boolean },
    { name: 'src', type: String, multiple: true, defaultOption: true },
    { name: 'emitSrc', type: Boolean, defaultValue: true },
    { name: 'emitTypes', type: Boolean, defaultValue: true }
    //  { name: 'timeout', alias: 't', type: Number }
];
const options = command_line_args_1.default(optionDefinitions);
console.log("options:", options);
if (options.src) {
    options.src.forEach((src) => {
        console.log("processing ", src);
        let flowSource = fs.readFileSync(src, 'uft-8');
        var tsSource = lib_1.convert(flowSource, src, {
            no_emit: !options.emitSrc
        });
    });
}
else {
}
//# sourceMappingURL=cli.js.map
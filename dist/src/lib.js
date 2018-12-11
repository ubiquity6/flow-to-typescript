"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prettier = __importStar(require("prettier"));
const fs_1 = __importDefault(require("fs"));
const converters_1 = require("./converters");
/**
 *
 * @param srctxt {string} source code. pass in null to just load from srcpath
 * @param srcpath {string} source path. used to figure out name of file.
 * @param options {ConvertOptions}
 */
function convert(srctxt, srcpath, options) {
    var parserSrc = (text, { flow }) => {
        const ast = flow(text);
        // convert "type" imports to normal imports. todo: improve: use /// <reference> which is the actual equivalent
        ast.body.filter(e => e.type === "ImportDeclaration" && e.importKind === "type").forEach(e => e.importKind = "value");
        ast.body.filter(e => e.type === "ExportNamedDeclaration" && e.exportKind === "type").forEach(e => e.exportKind = "value");
        recurseFindTypes(ast.body, {
            TypeCastExpression: converters_1.convertTypeCastExpression,
            //      TypeCastExpression: removeTypeCastExpressions,
            TypeParameter: converters_1.convertTypeParameter,
            TypeAnnotation: converters_1.convertTypeAnnotation,
            AnyTypeAnnotation: converters_1.convertAnyTypeAnnotation,
            VoidTypeAnnotation: converters_1.convertVoidTypeAnnotation,
            ObjectTypeProperty: converters_1.convertObjectTypeProperty,
            ImportSpecifier: converters_1.convertImportSpecifier,
            InterfaceDeclaration: converters_1.convertInterfaceDeclaration
        });
        if (options.dump_ast) {
            fs_1.default.writeFileSync(srcpath.replace(".js", ".ast"), JSON.stringify(ast, null, 4));
        }
        return ast;
    };
    function recurseFindTypes(obj, visitors) {
        if (options.print_types)
            console.log("type:", obj.type, " at ", obj.loc ? obj.loc.start.line : "unknown");
        if (visitors[obj.type]) {
            visitors[obj.type](obj);
        }
        for (var k in obj) {
            const child = obj[k];
            if (child && child.type) {
                recurseFindTypes(child, visitors);
            }
            if (child && typeof child === 'object' && child[0] !== undefined) { // is array 
                child.filter(o => o.type).forEach(o => recurseFindTypes(o, visitors));
            }
        }
    }
    // legacy api
    if (!srctxt) {
        srctxt = fs_1.default.readFileSync(srcpath, 'utf-8');
    }
    // capture flow ast
    const result = prettier.format(srctxt, {
        parser: parserSrc
    });
    if (!options.no_emit) {
        fs_1.default.writeFileSync(srcpath.replace(".js", ".ts"), result);
    }
    return result;
}
exports.convert = convert;
function analyseref(srcpath, options) {
    var parserSrc = (text, { typescript }) => {
        const ast = typescript(text);
        if (options.dump_ast) {
            fs_1.default.writeFileSync(srcpath.replace(".ts", ".ast"), JSON.stringify(ast, null, 4));
        }
        return ast;
    };
    const srctxt = fs_1.default.readFileSync(srcpath, 'utf-8');
    // capture typescript ast
    const result = prettier.format(srctxt, {
        parser: parserSrc
    });
    return result;
}
exports.analyseref = analyseref;
//# sourceMappingURL=lib.js.map
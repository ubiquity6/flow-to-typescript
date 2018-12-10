import * as prettier from 'prettier';
import fs from 'fs';

import {ASTEntry}  from './asttypes';
import { convertTypeCastExpression, convertTypeParameter, convertTypeAnnotation, convertAnyTypeAnnotation, convertVoidTypeAnnotation, convertObjectTypeProperty, convertImportSpecifier } from './converters';

export type ConvertOptions = {
  dump_ast? : boolean
  no_emit? : boolean
  print_types?: boolean
}
/**
 * 
 * @param srctxt {string} source code. pass in null to just load from srcpath
 * @param srcpath {string} source path. used to figure out name of file.
 * @param options {ConvertOptions}
 */
export function convert(srctxt:string|null, srcpath: string, options : ConvertOptions) {


  var parserSrc: prettier.CustomParser = (text : string, { flow }) => {
    const ast : prettier.AST = flow(text);

    // convert "type" imports to normal imports. todo: improve: use /// <reference> which is the actual equivalent
    ast.body.filter(e => e.type === "ImportDeclaration" && e.importKind === "type").forEach(e => e.importKind = "value");
    ast.body.filter(e => e.type === "ExportNamedDeclaration" && e.exportKind === "type").forEach(e => e.exportKind = "value");
    
    recurseFindTypes(ast.body, {
      TypeCastExpression: convertTypeCastExpression,
//      TypeCastExpression: removeTypeCastExpressions,
      TypeParameter: convertTypeParameter,
      TypeAnnotation: convertTypeAnnotation,
      AnyTypeAnnotation: convertAnyTypeAnnotation,
      VoidTypeAnnotation: convertVoidTypeAnnotation,
      ObjectTypeProperty: convertObjectTypeProperty,
      ImportSpecifier: convertImportSpecifier
    });

    

    if(options.dump_ast) {
      fs.writeFileSync(srcpath.replace(".js", ".ast"), JSON.stringify(ast, null, 4));
    }

    return ast;
  }

  function recurseFindTypes(obj: ASTEntry, visitors: {[key:string] : (obj:ASTEntry) => void}) {
    if(options.print_types)
      console.log("type:", obj.type, " at ", obj.loc? obj.loc.start.line : "unknown")
    if(visitors[obj.type]) {
      visitors[obj.type](obj);
    }
    for(var k in obj) {
      const child = obj[k];
      if(child && child.type) {
        recurseFindTypes(child as ASTEntry, visitors);      
      }
      if(child && typeof child === 'object' && child[0] !== undefined) { // is array 
        child.filter(o=> o.type).forEach(o => recurseFindTypes(o, visitors));
      }
    }
  }


  // legacy api
  if(!srctxt) {
    srctxt = fs.readFileSync(srcpath, 'uft-8');
  }


  // capture flow ast
  const result = prettier.format(srctxt, {
    parser : parserSrc
  });

  if(!options.no_emit) {
    fs.writeFileSync(srcpath.replace(".js", ".ts"), result);
  }

  return result;
}


export function analyseref(srcpath: string, options : ConvertOptions) {


  var parserSrc: prettier.CustomParser = (text : string, { typescript }) => {
    const ast : prettier.AST = typescript(text);

    if(options.dump_ast) {
      fs.writeFileSync(srcpath.replace(".ts", ".ast"), JSON.stringify(ast, null, 4));
    }

    return ast;
  }

  const srctxt = fs.readFileSync(srcpath, 'utf-8');

  // capture typescript ast
  const result = prettier.format(srctxt, {
    parser : parserSrc
  });

  return result;
}

import * as prettier from 'prettier';
import fs from 'fs';

export type convertOptions = {
  dump_ast? : boolean
  no_emit? : boolean
  print_types?: boolean
}
export function convert(srcpath: string, options : convertOptions) {


  let srcast: any;
  var parserSrc: prettier.CustomParser = (text : string, { flow }) => {
    const ast : prettier.AST = flow(text);

    // convert "type" imports to normal imports. todo: improve: use /// <reference> which is the actual equivalent
    ast.body.filter(e => e.type === "ImportDeclaration" && e.importKind === "type").forEach(e => e.importKind = "value");

    recurseFindTypes(ast.body, {TypeCastExpression: removeTypeCastExpressions});
    srcast = ast;

    return ast;
  }

  type ASTEntry = {
    type: string,
    range: any,
    loc: any
  }

  type TypeCastExpression = ASTEntry &  {
    expression : ASTEntry,
    typeAnnotation: ASTEntry
  }

  function recurseFindTypes(obj: ASTEntry, visitors: {[key:string] : (obj:ASTEntry) => void}) {
    if(options.print_types)
      console.log("type:", obj.type)
    for(var k in obj) {
      const child = obj[k];
      if(child && child.type) {
        if(visitors[child.type]) {
          visitors[child.type](child);
        }
        recurseFindTypes(child as ASTEntry, visitors);      
      }
      if(child && typeof child === 'object' && child[0] !== undefined) { // is array 
        child.filter(o=> o.type).forEach(o => recurseFindTypes(o, visitors));
      }
    }
  }

  function removeTypeCastExpressions(o: ASTEntry) {
    const obj = o as TypeCastExpression;
    // substitute body with contents of expression.
    delete obj.typeAnnotation;
    const expression = obj.expression;
    delete obj.expression;
    Object.assign(obj, expression);
  }

  const srctxt = fs.readFileSync(srcpath, 'utf-8');

  // capture flow ast
  const result = prettier.format(srctxt, {
    parser : parserSrc
  });

  if(options.dump_ast) {
    fs.writeFileSync(srcpath.replace(".js", ".ast"), JSON.stringify(srcast, null, 4));
  }

  if(!options.no_emit) {
    fs.writeFileSync(srcpath.replace(".js", ".ts"), result);
  }

  return result;
}


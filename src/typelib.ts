import * as ts from "typescript";

export function writeDeclaration(source: string, outfile: string) {
    let result = ts.transpileModule(source, {
        compilerOptions: { 
            module: ts.ModuleKind.CommonJS,
            declaration: true,
            emitDeclarationOnly: true,
            outFile: outfile
           }
      });
      console.log(JSON.stringify(result));
      
}
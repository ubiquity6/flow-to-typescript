import * as ts from "typescript";


function transpileModule(input, transpileOptions) {
    var diagnostics = [];
    var options = transpileOptions.compilerOptions ? ts.fixupCompilerOptions(transpileOptions.compilerOptions, diagnostics) : ts.getDefaultCompilerOptions();
    options.isolatedModules = true;
    // transpileModule does not write anything to disk so there is no need to verify that there are no conflicts between input and output paths.
    options.suppressOutputPathCheck = true;
    // Filename can be non-ts file.
    options.allowNonTsExtensions = true;
    // We are not returning a sourceFile for lib file when asked by the program,
    // so pass --noLib to avoid reporting a file not found error.
    options.noLib = true;
    // Clear out other settings that would not be used in transpiling this module
    options.lib = undefined;
    options.types = undefined;
    options.noEmit = undefined;
    options.noEmitOnError = undefined;
    options.paths = undefined;
    options.rootDirs = undefined;
    options.declaration = true;
    options.composite = undefined;
    options.declarationDir = undefined;
    options.out = undefined;
    options.outFile = undefined;
    // We are not doing a full typecheck, we are not resolving the whole context,
    // so pass --noResolve to avoid reporting missing file errors.
    options.noResolve = true;
    // if jsx is specified then treat file as .tsx
    var inputFileName = transpileOptions.fileName || (options.jsx ? "module.tsx" : "module.ts");
    var sourceFile = ts.createSourceFile(inputFileName, input, options.target); // TODO: GH#18217
    if (transpileOptions.moduleName) {
        sourceFile.moduleName = transpileOptions.moduleName;
    }
    if (transpileOptions.renamedDependencies) {
        sourceFile.renamedDependencies = ts.createMapFromTemplate(transpileOptions.renamedDependencies);
    }
    var newLine = ts.getNewLineCharacter(options);
    // Output
    var outputText;
    var sourceMapText;
    var declarationText;
    // Create a compilerHost object to allow the compiler to read and write files
    var compilerHost = {
        getSourceFile: function (fileName) { return fileName === ts.normalizePath(inputFileName) ? sourceFile : undefined; },
        writeFile: function (name, text) {
            if (ts.fileExtensionIs(name, ".map")) {
                ts.Debug.assertEqual(sourceMapText, undefined, "Unexpected multiple source map outputs, file:", name);
                sourceMapText = text;
            }
            if (ts.fileExtensionIs(name, ".d.ts")) {
                ts.Debug.assertEqual(declarationText, undefined, "Unexpected multiple declaration outputs, file:", name);
                declarationText = text;
            }
            else {
                ts.Debug.assertEqual(outputText, undefined, "Unexpected multiple outputs, file:", name);
                outputText = text;
            }
        },
        getDefaultLibFileName: function () { return "lib.d.ts"; },
        useCaseSensitiveFileNames: function () { return false; },
        getCanonicalFileName: function (fileName) { return fileName; },
        getCurrentDirectory: function () { return ""; },
        getNewLine: function () { return newLine; },
        fileExists: function (fileName) { return fileName === inputFileName; },
        readFile: function () { return ""; },
        directoryExists: function () { return true; },
        getDirectories: function () { return []; }
    };
    var program = ts.createProgram([inputFileName], options, compilerHost);
    if (transpileOptions.reportDiagnostics) {
        ts.addRange(/*to*/ diagnostics, /*from*/ program.getSyntacticDiagnostics(sourceFile));
        ts.addRange(/*to*/ diagnostics, /*from*/ program.getOptionsDiagnostics());
    }
    // Emit
    program.emit(/*targetSourceFile*/ undefined, /*writeFile*/ undefined, /*cancellationToken*/ undefined, /*emitOnlyDtsFiles*/ undefined, transpileOptions.transformers);
    return { outputText: outputText, diagnostics: diagnostics, sourceMapText: sourceMapText, declarationText: declarationText };
}


export function writeDeclaration(source: string, outfile: string) {
    let result = transpileModule(source, {
        compilerOptions: { 
            module: ts.ModuleKind.CommonJS,
            declaration: true,
            //outFile: outfile,
            //declarationDir
           }
      });
    
      console.log(JSON.stringify(result));
      
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function removeTypeCastExpressions(o) {
    const obj = o;
    // substitute body with contents of expression.
    delete obj.typeAnnotation;
    const expression = obj.expression;
    delete obj.expression;
    Object.assign(obj, expression);
}
exports.removeTypeCastExpressions = removeTypeCastExpressions;
function removeTypeParameterDefault(e) {
    const obj = e;
    delete obj.default;
}
exports.removeTypeParameterDefault = removeTypeParameterDefault;
function convertTypeTypeAnnotationToTSTypeReference(e) {
    if (e.type !== 'TypeAnnotation') {
        throw new Error("wrong");
    }
    const r = e.typeAnnotation;
    if (r.type !== 'GenericTypeAnnotation') {
        console.log("convertTypeTypeAnnotationToTSTypeReference: dont know this one:", r.type);
    }
    r.type = "TSTypeReference";
    r.typeName = r.id;
    delete r.id;
    return r;
}
exports.convertTypeTypeAnnotationToTSTypeReference = convertTypeTypeAnnotationToTSTypeReference;
function convertTypeParameter(e) {
    const obj = e;
    const ts = e;
    removeTypeParameterDefault(e); // don't think typescript supports default args for generics.
    e.type = "TSTypeParameter";
    if (obj.bound) {
        ts.constraint = obj.bound;
        ts.constraint = convertTypeTypeAnnotationToTSTypeReference(obj.bound);
        delete obj.bound;
    }
}
exports.convertTypeParameter = convertTypeParameter;
function convertTypeAnnotation(e) {
    e.type = "TSTypeAnnotation";
}
exports.convertTypeAnnotation = convertTypeAnnotation;
function convertTypeCastExpression(e) {
    e.type = "TSAsExpression";
}
exports.convertTypeCastExpression = convertTypeCastExpression;
function convertAnyTypeAnnotation(e) {
    e.type = "TSAnyKeyword";
}
exports.convertAnyTypeAnnotation = convertAnyTypeAnnotation;
function convertVoidTypeAnnotation(e) {
    e.type = "TSVoidKeyword";
}
exports.convertVoidTypeAnnotation = convertVoidTypeAnnotation;
function convertObjectTypeProperty(e) {
    var ot = e;
    // right now, we just want to strip variance.
    delete ot.variance;
    // check if it's a constructor signature
    if (ot.key && ot.key.type == "Identifier") {
        var id = ot.key;
        if (id.name === "constructor" && ot.value.type === "FunctionTypeAnnotation") {
            // flow likes to put void return types on constructors.
            // typescript does not.
            var ctorFunction = ot.value;
            if (ctorFunction.returnType.type === "VoidTypeAnnotation")
                delete ctorFunction.returnType;
        }
    }
}
exports.convertObjectTypeProperty = convertObjectTypeProperty;
function convertImportSpecifier(e) {
    var ot = e;
    // typescript doens't do type only imports in this way.
    if (ot.importKind === "type") {
        delete ot.importKind;
    }
}
exports.convertImportSpecifier = convertImportSpecifier;
//# sourceMappingURL=converters.js.map
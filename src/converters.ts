import { ASTEntry, TypeCastExpression, TypeParameter, TSTypeParameter, ObjectTypeProperty, ImportSpecifier, Identifier, FunctionTypeAnnotation } from "./asttypes";

export function removeTypeCastExpressions(o: ASTEntry) {
    const obj = o as TypeCastExpression;
    // substitute body with contents of expression.
    delete obj.typeAnnotation;
    const expression = obj.expression;
    delete obj.expression;
    Object.assign(obj, expression);
}

export function removeTypeParameterDefault(e: ASTEntry) {
    const obj = e as TypeParameter;
    delete obj.default;
}

export function convertTypeTypeAnnotationToTSTypeReference(e: ASTEntry): ASTEntry {
    if (e.type !== 'TypeAnnotation') {
        throw new Error("wrong");
    }
    const r = (e as any).typeAnnotation;
    if (r.type !== 'GenericTypeAnnotation') {
        console.log("convertTypeTypeAnnotationToTSTypeReference: dont know this one:", r.type);
    }
    r.type = "TSTypeReference";
    r.typeName = r.id;
    delete r.id;
    return r;
}

export function convertTypeParameter(e: ASTEntry) {
    const obj = e as TypeParameter;
    const ts = e as TSTypeParameter;
    removeTypeParameterDefault(e); // don't think typescript supports default args for generics.
    e.type = "TSTypeParameter";
    if (obj.bound) {
        ts.constraint = obj.bound;
        ts.constraint = convertTypeTypeAnnotationToTSTypeReference(obj.bound);
        delete obj.bound;
    }
}

export function convertTypeAnnotation(e: ASTEntry) {
    e.type = "TSTypeAnnotation";
}

export function convertTypeCastExpression(e: ASTEntry) {
    e.type = "TSAsExpression";
}

export function convertAnyTypeAnnotation(e: ASTEntry) {
    e.type = "TSAnyKeyword";
}

export function convertVoidTypeAnnotation(e: ASTEntry) {
    e.type = "TSVoidKeyword";
}

export function convertObjectTypeProperty(e: ASTEntry) {
    var ot = e as ObjectTypeProperty
    // right now, we just want to strip variance.
    delete ot.variance;

    // check if it's a constructor signature
    if(ot.key && ot.key.type == "Identifier") {
        var id = ot.key as Identifier;
        if(id.name === "constructor" && ot.value.type === "FunctionTypeAnnotation") {
            // flow likes to put void return types on constructors.
            // typescript does not.
            var ctorFunction = ot.value as FunctionTypeAnnotation;
            if(ctorFunction.returnType.type === "VoidTypeAnnotation")
                delete ctorFunction.returnType;
        }
    }
}

export function convertImportSpecifier(e: ASTEntry) {
    var ot = e as ImportSpecifier
    // typescript doens't do type only imports in this way.
    if (ot.importKind === "type") {
        delete ot.importKind;
    }
}

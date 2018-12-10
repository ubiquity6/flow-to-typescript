
export type ASTEntry = {
    type: string,
    range: any,
    loc: any
}

export type TypeCastExpression = ASTEntry & {
    expression: ASTEntry,
    typeAnnotation: ASTEntry
}


export type TypeParameter = ASTEntry & {
    type: "TypeParameter",
    bound: ASTEntry,
    variance: ASTEntry,
    default: ASTEntry
}

export type TSTypeParameter = ASTEntry & {
    type: "TSTypeParameter",
    constraint: ASTEntry,
}

export type ObjectTypeProperty = ASTEntry & {
    type: "ObjectTypeProperty",
    key: ASTEntry,
    value: ASTEntry,
    method: boolean,
    optional: boolean,
    static: boolean,
    proto: boolean
    variance: ASTEntry
    kind: any
}

export type ImportSpecifier = ASTEntry & {
    type: "ImportSpecifier",
    imported: ASTEntry,
    local: ASTEntry,
    importKind: "type" | "value"
}


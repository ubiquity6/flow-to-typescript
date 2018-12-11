
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

export type Identifier = ASTEntry & {
    type: "Identifier",
    name: string,
    typeAnnotation: ASTEntry,
    optional: boolean
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



export type FunctionTypeAnnotation = ASTEntry & {
    type: "FunctionTypeAnnotation",
    params: ASTEntry[],
    returnType: ASTEntry,
    rest: any, // ?
    typeParameters: any// ?
}

export type InterfaceDeclaration = ASTEntry & {
    type: "InterfaceDeclaration",
    id: ASTEntry,
    typeParameters: Array<ASTEntry>, //?
    body: ObjectTypeAnnotation
    extends: Array<ASTEntry>
}

export type ObjectTypeAnnotation = ASTEntry & {
    type: "ObjectTypeAnnotation",
    exact: boolean,
    properties: Array<ASTEntry>
    indexers: Array<ASTEntry>,
    callProperties: Array<ASTEntry>,
    internalSlots: Array<ASTEntry>
}

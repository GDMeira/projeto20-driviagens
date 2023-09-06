const notFound = (item = "item") => {
    return {type: 'notFound', message: `Não foi possível encontrar essa(e) ${item}`};
}

const conflict = (item = "item") => {
    return {type: 'conflict', message: `Ocorreu um conflito ao processar essa(e) ${item}`};
}

const unprocessableEntity = (item = "item") => {
    return {type: 'unprocessableEntity', message: `Essa(e) ${item} é inválido.`};
}

export const error = {
    conflict,
    notFound,
    unprocessableEntity,
    
}
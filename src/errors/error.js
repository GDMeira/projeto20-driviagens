import httpStatus from "http-status";

const notFound = (msg = "Não foi possível encontrar o parâmetro requisitado.") => {
    return {
        type: 'notFound', 
        message: msg,
        statusCode: httpStatus.NOT_FOUND
    };
}

const conflict = (msg = "Ocorreu um conflito, essa entrada já existe.") => {
    return {
        type: 'conflict', 
        message: msg,
        statusCode: httpStatus.CONFLICT
    };
}

const unprocessableEntity = (msg = "Dados de entrada não estão no formato esperado.") => {
    return {
        type: 'unprocessableEntity', 
        message: msg,
        statusCode: httpStatus.UNPROCESSABLE_ENTITY
    };
}

const badRequest = (msg = "Requisição inválida.") => {
    return {
        type: 'badRequest', 
        message: msg,
        statusCode: httpStatus.BAD_REQUEST
    };
}

const internalError = (msg = "Erro interno do servidor.") => {
    return {
        type: 'internalError', 
        message: msg,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR
    };
}

export const error = {
    conflict,
    notFound,
    unprocessableEntity,
    badRequest,
    internalError,
    
}
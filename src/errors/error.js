

const conflict = (item = "item") => {
    return {type: 'conflict', message: `Essa(e) ${item} já existe.`};
}

export const error = {
    conflict,

}
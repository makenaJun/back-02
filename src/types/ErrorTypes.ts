export type ErrorResponseType = {
    errorsMessages: ErrorType[],
}

export type ErrorType = {
    message: string,
    field: string
}

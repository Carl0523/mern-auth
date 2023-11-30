const notFound = (request, response, next) => {
    response.status(404);
    const error = new Error(`Not Found - ${request.originalUrl}`);
    next(error);
}

const errorHandler = (error, request, response, next) => {
    let statusCode = response.statusCode === 200 ? 500 : response.statusCode;
    let message = error.message;

    if (error.name === 'CastError' && error.kind === 'ObjectId')
    {
        statusCode = 404;
        message = 'Resource not found';
    }

    response.status(statusCode).json(
        {
            message,
            stack: process.env.NODE_ENV === 'production' ? null : error.stack,
        }
    )
}

export {notFound, errorHandler};

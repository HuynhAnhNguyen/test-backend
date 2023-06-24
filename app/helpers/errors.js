const handle = promise => {
    return promise.then(data => [null, data]).catch(error => [error, undefined]);
};
class BadRequestError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}


module.exports = {
    handle,
    BadRequestError,
    getOffset,
    emptyOrRows
}
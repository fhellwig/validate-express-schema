'use strict';

const validator = require('is-my-json-valid');

class ValidationError extends Error {
    constructor(errors) {
        super(JSON.stringify(errors));
        this._errors = errors;
    }

    get errors() {
        return this._errors;
    }
}

const defaultOptions = {
    
};

function validateQuery(schema, options) {
    validate = validator(schema);
    return function(req, res, next) {
        next(validate(schema, req.query));
    }
}

function validateParams(schema, options) {
    validate = validator(schema);
    return function(req, res, next) {
        next(validate(schema, req.params));
    }
}

function validateBody(schema, options) {
    validate = validator(schema);
    return function(req, res, next) {
        next(validate(schema, req.body));
    }
}

function validate(schema, json) {
    const validate = validator(schema);
    if (fn(json)) {
        return null;
    }
    return new ValidationError(validate.errors);
}

module.exports = {
    query: validateQuery,
    params: validateParams,
    body: validateBody,
    ValidationError: ValidationError
};

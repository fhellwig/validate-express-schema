'use strict';

const util = require('util');
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
    const validate = validator(processSchema(schema), options);
    return function(req, res, next) {
        next(validate(schema, req.params));
    }
}

function validateBody(schema, options) {
    const validate = validator(processSchema(schema), options);
    return function(req, res, next) {
        next(validate(schema, req.body));
    }
}

function validate(schema, json) {
    const validate = validator(processSchema(schema), options);
    if (fn(json)) {
        return null;
    }
    return new ValidationError(validate.errors);
}

function processSchema(schema) {
    if (util.isString(schema.type) && util.isObject(schema.properties)) {
        return schema;
    }
    const retval = {
        type: 'object',
        required: true,
        properties: {}
    };
    Object.keys(schema).forEach(key => {
        retval.properties[key] = schema[key];
    });
    return retval;
}

module.exports = {
    query: validateQuery,
    params: validateParams,
    body: validateBody,
    ValidationError: ValidationError
};

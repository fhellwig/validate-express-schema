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
    const fn = validator(processSchema(schema), options);
    return function(req, res, next) {
        next(validate(fn, req.query));
    }
}

function validateParams(schema, options) {
    const fn = validator(processSchema(schema), options);
    return function(req, res, next) {
        next(validate(fn, req.params));
    }
}

function validateBody(schema, options) {
    const fn = validator(processSchema(schema), options);
    return function(req, res, next) {
        next(validate(fn, req.body));
    }
}

function validate(fn, json) {
    if (fn(json)) {
        return null;
    }
    return new ValidationError(fn.errors);
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

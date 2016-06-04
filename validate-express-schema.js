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

// Copied from Dmitri Voronianski's is-my-schema-valid
const formats = {
    'mongo-object-id': /^[a-fA-F0-9]{24}$/i,
    'alpha': /^[A-Z]+$/i,
    'alphanumeric': /^[0-9A-Z]+$/i,
    'numeric': /^[-+]?[0-9]+$/,
    'hexadecimal': /^[0-9A-F]+$/i,
    'hexcolor': /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i,
    'decimal': /^[-+]?([0-9]+|\.[0-9]+|[0-9]+\.[0-9]+)$/,
    'float': /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/,
    'int': /^(?:[-+]?(?:0|[1-9][0-9]*))$/,
    'base64': /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i,
    'uuid': /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
    'data-uri': /^\s*data:([a-z]+\/[a-z0-9\-\+]+(;[a-z\-]+\=[a-z0-9\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i
};

function validate(schema, options) {
    const fn = {};
    options = processOptions(options);
    if (schema.params) {
        fn.params = validator(processSchema(schema.params), options);
    }
    if (schema.query) {
        fn.query = validator(processSchema(schema.query), options);
    }
    if (schema.body) {
        fn.body = validator(processSchema(schema.body), options);
    }
    return function(req, res, next) {
        if (fn.params && !fn.params(req.params)) {
            return next(new ValidationError(fn.params.errors));
        }
        if (fn.query && !fn.query(req.query)) {
            return next(new ValidationError(fn.query.errors));
        }
        if (fn.body && !fn.body(req.body)) {
            return next(new ValidationError(fn.body.errors));
        }
        next();
    }
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
    Object.assign(retval.properties, schema);
    return retval;
}

function processOptions(options) {
    const retval = {
        formats: {}
    };
    Object.assign(retval, options);
    Object.assign(retval.formats, formats);
    return retval;
}

validate.ValidationError = ValidationError;

module.exports = validate;

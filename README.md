# validate-express-schema

Validates the params, query, and body of an express request according to a JSON schema.

Version: 1.0.6

```
npm install --save validate-express-schema
```

Uses the [is-my-json-valid](https://github.com/mafintosh/is-my-json-valid) package. It also uses the additional formats from the [is-my-schema-valid](https://github.com/voronianski/is-my-schema-valid) package.

## Usage

```javascript
const validate = require(validate-express-schema);

const schema = {
    params: {
        type: 'object',
        required: true,
        properties: {
            userId: {
                type: 'integer',
                required: true,
                format: 'uuid'
            }
        }
    },
    body: {
        type: 'object',
        required: true,
        properties: {
            username: {
                type: 'string',
                required: true
            }
        }
    }
};

app.put('/users:userId', validate(schema), (req, res) => {
    ...
});
```

### Shortcut

You can simply specify the properties in the schema object:

```javascript
const equivalentSchema = {
    params: {
        userId: {
            type: 'integer',
            required: true,
            format: 'uuid'
        }
    },
    body: {
        username: {
            type: 'string',
            required: true
        }
    }
};
```

If the schema does not have a `type` property, then the schema is created from the object keys.

## API

The `validate-express-schema` package exports one middleware generator functions and one exception object:

```
validate(schema [, options])
ValidationError
```

Calling the middleware generator functions returns a middleware function that validates the request params, query, and body objects. Validation errors result in `next(ValidationError)` being called. The `ValidationError` object has an `errors` property that lists the validation errors.

The `options` are as specified in the [is-my-json-valid](https://github.com/mafintosh/is-my-json-valid) package.

## License

The MIT License (MIT)

Copyright (c) 2016 Frank Hellwig

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

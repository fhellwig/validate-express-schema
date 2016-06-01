# validate-express-schema

Validates the query, params, and body of an express request according to a JSON schema.

```
npm install --save validate-express-schema
```

Uses the [is-my-json-valid](https://github.com/mafintosh/is-my-json-valid) package.

## Usage

```javascript
const validate = require(validate-express-schema);

const paramsSchema = {
    type: 'object',
    required: true,
    properties: {
        userId: {
            type: 'integer',
            required: true
        }
    }
}

const bodySchema = {
    type: 'object',
    required: true,
    properties: {
        username: {
            type: 'string',
            required: true
        }
    }
};

app.put('/users:userId', validate.params(paramsSchema), validate.body(bodySchema), (req, res) => {
    ...
});
```

### API

The `validate-express-schema` package exports three middleware generator functions and one exception object:

    query(schema [, options])
    params(schema [, options])
    body(schema [, options])
    ValidationError

Calling one of the three middleware generator functions returns a middleware function that validates the request query, params, and body objects.
Validation errors result in `next(ValidationError)` being called.
The `ValidationError` object has an `errors` property that lists the validation errors.

The `options` are as specified in the [is-my-json-valid](https://github.com/mafintosh/is-my-json-valid) package.

## License

The MIT License (MIT)

Copyright (c) 2016 Frank Hellwig

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

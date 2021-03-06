'use strict';

const joi = require('@hapi/joi');

const schemas = {
  test: joi.object({
    name: joi.string().required(),
  }),
  echo: joi.object({
    payload: joi.required(),
  }),
};

async function validate(schema, data) {
  if (data === undefined)
    throw new Error('Data to validation are not received');
  if (!joi.isSchema(schema)) {
    throw new Error(`Invalid schema: ${JSON.stringify(schema)}`);
  }

  return schema
    .validateAsync(data)
    .then(validData => [null, validData])
    .catch(err => {
      const wrongParam = err.details[0].context.label;
      const errorMsg = `Invalid param - ${wrongParam}`;
      return [new Error(errorMsg)];
    });
}

module.exports = { schemas, validate };

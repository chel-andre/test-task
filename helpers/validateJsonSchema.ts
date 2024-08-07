import { expect } from '@playwright/test';
import Ajv from 'ajv';

export async function validateJsonSchema(body: object) {
    const ajv = new Ajv();
    const valid = ajv.validate(Array.isArray(body) ? peopleSchema : personSchema, body);
    expect(valid).toBe(true);
}

const personSchema = {
    'type': 'object',
    'properties': {
        'age': {
            'type': 'number',
            'minimum': 0,
        },
        'favorite_color': {
            'type': 'string',
        },
        'fname': {
            'type': 'string',
        },
        'lname': {
            'type': 'string',
        },
    },
    'required': ['age', 'favorite_color', 'fname', 'lname'],
    'additionalProperties': false,
};

const peopleSchema = {
    'type': 'array',
    'items': personSchema,
};

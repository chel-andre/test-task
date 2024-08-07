import { test, expect } from '@playwright/test';
import { validateJsonSchema } from '../helpers/validateJsonSchema';
import { buildPeopleUrl, deleteAllPeople } from '../helpers/apiHelper';
import { generatePerson } from '../helpers/randomDataHelper';

test.describe('API Testing', () => {
    test('POST Request - Create person Positive', async ({ request }) => {
        const person = generatePerson();
        const response = await request.post(buildPeopleUrl(''), { data: person });
        expect(response.status()).toBe(201);
        const message = await response.text();
        expect(message).toBe(`Record ${person.fname} successfully created`);
    });

    test('GET Request - Get all people', async ({ request }) => {
        const response = await request.get(buildPeopleUrl(''));
        expect(response.status()).toBe(200);
        const body = await response.json();
        await validateJsonSchema(body);
    });

    test('POST Request - Create person Negative - the same name exists', async ({ request }) => {
        const getResponse = await request.get(buildPeopleUrl(''));
        const people = await getResponse.json();
        const firstName = people[0].fname;
        const person = generatePerson({ name: firstName });
        const postResponse = await request.post(buildPeopleUrl(''), { data: person });
        expect(postResponse.status()).toBe(406);
        const body = await postResponse.json();
        expect(body.detail).toBe(`Peron with first name ${firstName} already exists`); // не Peron, а Person
    });

    test('POST Request - Create person Negative - age as string', async ({ request }) => {
        const person = generatePerson({ ageType: 'string' });
        const response = await request.post(buildPeopleUrl(''), { data: person });
        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.detail).toBe(`'${person.age}' is not of type 'integer' - 'age'`);
    });

    test('POST Request - Create person Negative - negative age', async ({ request }) => {
        const person = generatePerson({ ageType: 'negative' });
        const response = await request.post(buildPeopleUrl(''), { data: person });
        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.detail).toBe(`'${person.age}' must be greater or equal '0'`); // age не может быть меньше нуля, с точки зрения здравого смысла
    });

    test('GET Request - Get person Positive', async ({ request }) => {
        const person = generatePerson();
        await request.post(buildPeopleUrl(''), { data: person });
        const firstName = person.fname;
        const response = await request.get(buildPeopleUrl(firstName));
        expect(response.status()).toBe(200);
        const body = await response.json();
        await validateJsonSchema(body);
        expect(body).toStrictEqual(person); // иногда попадаются персоны с одинаковыми именами + не находит только что созданного
    });

    test('GET Request - Get person Negative - person does not exist', async ({ request }) => {
        const firstName = 'nameDoesNotExist';
        const response = await request.get(buildPeopleUrl(firstName));
        expect(response.status()).toBe(404);
        const body = await response.json();
        expect(body.detail).toBe(`Person with first name ${firstName} not found`);
    });

    test('DELETE Request - Delete person Positive', async ({ request }) => {
        const person = generatePerson();
        await request.post(buildPeopleUrl(''), { data: person });
        const firstName = person.fname;
        const response = await request.delete(buildPeopleUrl(firstName));
        expect(response.status()).toBe(200);
        const message = await response.text();
        expect(message).toBe(`${firstName} successfully deleted`);
    });

    test('DELETE Request - Delete person Negative - person does not exist', async ({ request }) => {
        const firstName = 'nameDoesNotExist';
        const response = await request.delete(buildPeopleUrl(firstName));
        expect(response.status()).toBe(404);
        const body = await response.json();
        expect(body.detail).toBe(`Person with first name ${firstName} not found`);
    });

    test('PUT Request - Update person Positive', async ({ request }) => {
        const personToCreate = generatePerson();
        await request.post(buildPeopleUrl(''), { data: personToCreate });
        const firstName = personToCreate.fname;
        const personToUpdate = generatePerson();
        const response = await request.put(buildPeopleUrl(firstName), { data: personToUpdate });
        expect(response.status()).toBe(200);
        const body = await response.json();
        await validateJsonSchema(body);
        expect(body).toStrictEqual(personToUpdate);
    });

    test('PUT Request - Update person Negative - empty fname', async ({ request }) => {
        const personToCreate = generatePerson();
        await request.post(buildPeopleUrl(''), { data: personToCreate });
        const firstName = personToCreate.fname;
        const personToUpdate = generatePerson({ name: '' });
        const response = await request.put(buildPeopleUrl(firstName), { data: personToUpdate });
        expect(response.status()).toBe(400); // fname не может быть пустым
    });

    test.afterAll(async ({ request }) => {    
        await deleteAllPeople(request);      
    });
});

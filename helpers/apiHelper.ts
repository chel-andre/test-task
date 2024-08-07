import { APIRequestContext } from '@playwright/test';
import { testConfig } from '../testConfig';

export const buildPeopleUrl = (path: string) => `${testConfig.baseApiUrl}people/${path}`;

export async function deleteAllPeople(request: APIRequestContext) {
    const response = await request.get(buildPeopleUrl(''));
    const people = await response.json();

    await Promise.all(people.map((person) => request.delete(buildPeopleUrl(person.fname))));
}

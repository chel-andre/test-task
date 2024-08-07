const names = ['John', 'Emma', 'Michael', 'Sophia', 'William', 'Olivia', 'James', 'Ava', 'Robert', 'Isabella', 'David', 'Mia', 'Joseph', 'Emily', 'Daniel', 'Charlotte', 'Matthew', 'Amelia', 'Christopher', 'Evelyn'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson'];
const colors = ['red','green', 'blue', 'yellow', 'pink', 'orange', 'purple'];

type AgeType = 'default' | 'negative' | 'string';

export const getRandomName = () => getRandomElementFromArray(names);

export const getRandomLastName = () => getRandomElementFromArray(lastNames);

export const getRandomAge = (maxValue = 99) => Math.floor(Math.random() * maxValue);

export const getRandomColor = () => getRandomElementFromArray(colors);

function getRandomElementFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

export function generatePerson(options?: { name?: string; ageType?: AgeType }) {
    const { name, ageType = 'default' } = options ?? {};

    const firstName = name || getRandomName();
    const lastName = getRandomLastName();
    const color = getRandomColor();
    let age: any = getRandomAge();

    if (ageType === 'negative') {
        age = -age;
    } else if (ageType === 'string') {
        age = age.toString();
    }

    return {
        fname: firstName,
        lname: lastName,
        age: age,
        favorite_color: color,
    };
}

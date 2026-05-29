import { expect, test as base } from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

type usersData = {
    firstName: string,
    lastName: string,
    zipCode: string
}

type csvFixture = {
    usrData: usersData[];
}

export const dataTest = base.extend<csvFixture>({
    // eslint-disable-next-line no-empty-pattern
    usrData: async ({ }, use) => {
        const fileContent = fs.readFileSync('./src/gui/data/userdata.csv', 'utf-8');
        const usersdata: usersData[] = parse(fileContent, {
            columns: true,
            skip_empty_lines: true
        }) as usersData[];
        console.table(usersdata);
        await use(usersdata);
    }
});

export{expect};
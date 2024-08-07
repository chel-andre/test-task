import { test, expect } from '@playwright/test';
import { MainPage } from '../pageObjects/mainPage';
import { testConfig } from '../testConfig';

const expectedHeaderText = 'REST API Using Python Flask and Swagger';

test('verify main page', async ({ page, context }) => {
    const mainPage = new MainPage(page);
    await mainPage.goto();
    await mainPage.verifyHeader(expectedHeaderText);
  
    const [swaggerUiPage] = await Promise.all([
        context.waitForEvent('page'),
        await mainPage.clickOnSwaggerUiLink(),
    ]);
    await swaggerUiPage.waitForLoadState();
    await expect(swaggerUiPage.url()).toBe(`${testConfig.baseUiUrl}api/ui/`);

    const [swaggerJsonPage] = await Promise.all([
        context.waitForEvent('page'),
        await mainPage.clickOnSwaggerJsonLink(),
    ]);
    await swaggerJsonPage.waitForLoadState(); 
    await expect(swaggerJsonPage.url()).toBe(`${testConfig.baseUiUrl}api/swagger.json`);
});

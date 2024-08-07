import { expect, type Locator, type Page } from '@playwright/test';

export class MainPage {
    readonly page: Page;
    readonly header: Locator;
    readonly swaggerUiLink: Locator;
    readonly swaggerJsonLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = page.locator('h1');
        this.swaggerUiLink = page.locator('a', { hasText: 'Swagger UI' });
        this.swaggerJsonLink = page.locator('a', { hasText: 'Swagger JSON is here' });
    }

    async goto() {
        await this.page.goto('');
    }

    async verifyHeader(header: string) {
        await expect(this.header).toHaveText(header);
    }

    async clickOnSwaggerUiLink() {
        await this.swaggerUiLink.click();
    }

    async clickOnSwaggerJsonLink() {
        await this.swaggerJsonLink.click();
    }
}

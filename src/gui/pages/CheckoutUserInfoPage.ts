import { Page, Locator, errors } from "@playwright/test";
import { ElementUtil } from '../../utils/ElementUtil';
import { CheckoutOverviewPage } from "./CheckoutOverviewPage";

/**
 * Every page class need 3 thing 
 * //1. Page locator/object/OR:
 * //2. Page construcator
 * //3. page method
 */

export class CheckoutUserInfoPage {

    //1. Page locator/object/OR:
    private readonly page: Page;
    private readonly eleUtil;

    private readonly fNameTextbox: Locator;
    private readonly lNameTextbox: Locator;
    private readonly zipTextbox: Locator;
    private readonly continueBtn: Locator;
    private readonly errorFirstnameBlank: Locator;

    //2. Page construcator
    constructor(page: Page) {
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.fNameTextbox = page.getByRole('textbox', { name: 'First Name' });
        this.lNameTextbox = page.getByRole('textbox', { name: 'Last Name' });
        this.zipTextbox = page.getByRole('textbox', { name: 'Zip/Postal Code' });
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
        this.errorFirstnameBlank = page.getByRole('heading', { name: 'Error: First Name is required', level: 3 });
    }

    //3. page method

    async fillFirstName(firstName: string): Promise<void> {
        await this.eleUtil.fill(this.fNameTextbox, firstName);
        console.log("Filled First Name " + firstName);
    }

    async fillLastName(lastName: string): Promise<void> {
        await this.eleUtil.fill(this.lNameTextbox, lastName);
        console.log("Filled Last Name " + lastName);
    }

    async fillZipCode(zip: string): Promise<void> {
        await this.eleUtil.fill(this.zipTextbox, zip);
        console.log("Filled Zip Code " + zip);
    }

    async clickContinueBtn(): Promise<CheckoutOverviewPage> {
        await this.eleUtil.click(this.continueBtn, { force: true, timeout: 5000 });
        return new CheckoutOverviewPage(this.page);
    }

    async getFirstNameError(): Promise<string|null>{
        let text:string|null = await this.eleUtil.getText(this.errorFirstnameBlank);
        console.log("Got text from error message : "+text);
        return text;
    }

}
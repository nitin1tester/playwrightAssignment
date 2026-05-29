import { Page, Locator } from '@playwright/test';
import { ElementUtil } from '../../utils/ElementUtil';
import {InventoryPage} from './InventoryPage';

/**
 * Every page class need 3 thing 
 * //1. Page locator/object/OR:
 * //2. Page construcator
 * //3. page method
 */

export class LoginPage {
    //1. Page locator/object/OR:
    private readonly page: Page;
    private readonly eleUtil;
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;
    private readonly warningMsg: Locator;

    //2. Page construcator
    constructor(page: Page) {
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.username = page.getByRole('textbox', { name: 'Username' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.warningMsg = page.getByRole('heading', { name: 'Epic sadface: Username and password do not match any user in this service', level: 3 });
    }

    //3. page method
    /**
     * nagigate to Login Page
     */
    async goToLoginPage(baseURL : string|undefined) {
        await this.page.goto(baseURL+'');
    }

    /**
     * 
     * @param email string
     * @param password string
     */
    async doLogin(username: string, password: string):Promise<InventoryPage> {
        await this.eleUtil.fill(this.username, username);
        await this.eleUtil.fill(this.password, password);
        await this.eleUtil.click(this.loginBtn, { force: true, timeout: 5000 });
        return new InventoryPage(this.page);
    }
    /**
     * 
     * @returns String or null
     */
    async getInvalidLoginMessage(): Promise<string | null> {
        const errorMsg = await this.eleUtil.getText(this.warningMsg);
        console.log('Invlid login warning message: ' + errorMsg);
        return errorMsg;
    }

}
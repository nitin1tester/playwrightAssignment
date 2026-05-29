import { Page, Locator } from '@playwright/test';
import { ElementUtil } from '../../utils/ElementUtil';
import {  CheckoutUserInfoPage} from './CheckoutUserInfoPage';

/**
 * Every page class need 3 thing 
 * //1. Page locator/object/OR:
 * //2. Page construcator
 * //3. page method
 */

export class UserCartPage {

    //1. Page locator/object/OR:
    private readonly page: Page;
    private readonly eleUtil;

    private readonly UserCartCheckoutBtn:Locator;

    //2. Page construcator
    constructor(page:Page) {
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.UserCartCheckoutBtn = page.getByRole('button', { name: 'Checkout' });
    }

    //3. page method

    async clickOnUserCartCheckoutBtn():Promise<CheckoutUserInfoPage>{
        await this.eleUtil.click(this.UserCartCheckoutBtn,{force:true,timeout:5000});
        return new CheckoutUserInfoPage(this.page);
    }

}


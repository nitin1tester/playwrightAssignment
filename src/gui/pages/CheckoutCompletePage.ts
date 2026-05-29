import { Page, Locator } from '@playwright/test';
import { ElementUtil } from '../../utils/ElementUtil';
import {InventoryPage} from './InventoryPage';

/**
 * Every page class need 3 thing 
 * //1. Page locator/object/OR:
 * //2. Page construcator
 * //3. page method
 */

export class CheckoutCompletePage {

    //1. Page locator/object/OR:
    private readonly page: Page;
    private readonly eleUtil;

    private readonly backHomeBtn:Locator;
    private readonly orderConfirmationMsg:Locator;

    //2. Page construcator
    constructor(page:Page) {
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.backHomeBtn = page.getByRole('button', { name: 'Back Home' });
        this.orderConfirmationMsg = page.getByRole('heading', { name: 'Thank you for your order!', level: 2 });

    }

    //3. Page method

    async clickOnUserCartCheckoutBtn():Promise<InventoryPage>{
        await this.eleUtil.click(this.backHomeBtn,{force:true,timeout:5000});
        return new InventoryPage(this.page);
    }

    async isOrderConfirmationMsgVisible():Promise<boolean>{
        const isOrderConfirmedFlag:boolean = await this.eleUtil.isVisible(this.orderConfirmationMsg);
        console.log('is order confirmed : ' + isOrderConfirmedFlag);
        return isOrderConfirmedFlag;
    }

}
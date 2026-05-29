import { Page, Locator } from '@playwright/test';
import { ElementUtil } from '../../utils/ElementUtil';
import { CheckoutCompletePage } from './CheckoutCompletePage';

/**
 * Every page class need 3 thing 
 * //1. Page locator/object/OR:
 * //2. Page construcator
 * //3. page method
 */

export class CheckoutOverviewPage {

    //1. Page locator/object/OR:
    private readonly page: Page;
    private readonly eleUtil;

    private readonly finishBtn:Locator;

    //2. Page construcator
    constructor(page:Page) {
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.finishBtn = page.getByRole('button', { name: 'Finish' });
    }

    //3. page method

    async clickFinishBtn():Promise<CheckoutCompletePage>{
        await this.eleUtil.click(this.finishBtn,{force:true,timeout:5000});
        return new CheckoutCompletePage(this.page);
    }

}
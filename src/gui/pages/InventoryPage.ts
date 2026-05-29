/* eslint-disable quotes */
import { Page, Locator } from '@playwright/test';
 import { ElementUtil } from '../../utils/ElementUtil';
import { UserCartPage } from './UserCartPage';


/**
 * Every page class need 3 section 
 * //1. Page locator/object/OR:
 * //2. Page construcator
 * //3. page method
 */

export class InventoryPage {


    //1. Page locator/object/OR:
    private readonly page: Page;
    private readonly eleUtil;

    private readonly hamburgerBtn;
    private readonly logoutBtn;
    private readonly leftMenuCancelBtn:Locator;
    private readonly addToCart;
    private readonly productNamesList:Locator;
    private readonly inventoryItem:Locator;
    private readonly shoppingCartBadge:Locator;
    private readonly itemNotFoundLabel:Locator;
    private readonly shoppingCartBtn:Locator;



    //2. Page construcator
    constructor(page: Page) {
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.hamburgerBtn = page.getByRole('button', { name: 'Open Menu' });
        this.logoutBtn = page.getByRole('link', { name: 'Logout' });
        this.leftMenuCancelBtn = page.getByRole('button', { name: 'Close Menu' });
        this.addToCart = page.locator(`[data-test="add-to-cart-sauce-labs-backpack"]`);
        this.inventoryItem = page.locator(`.inventory_item`);
        this.productNamesList = page.locator(`.inventory_item_name`);
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.itemNotFoundLabel = page.getByText('ITEM NOT FOUND', { exact: true });
        this.shoppingCartBtn = page.locator('[data-test="shopping-cart-link"]');
    }


    //3. page method

    async getAllProducts(): Promise<string[]> {
        const products =
            await this.productNamesList.allTextContents();
        const prodList = products.map(product => product.trim());
        console.log("this is product list => "+prodList);
        return prodList;
    }

    async addProductToCart(productName: string):Promise<void> {
        await this.inventoryItem
            .filter({
                has: this.page.locator(
                    '.inventory_item_name',
                    { hasText: productName }
                )
            })
            .locator('button')
            .click();
    }

    async isCartBadgeVisible():Promise<boolean>{
        const flag = await this.eleUtil.isVisible(this.shoppingCartBadge);
        console.log('is Cart Badge visible '+ flag);
        return true;
    }

    async clickOnHanburgerBtn():Promise<void>{
        await this.eleUtil.click(this.hamburgerBtn,{force:true,timeout:5000});
    }

    async isLogoutBtnVisible():Promise<boolean>{
        const flag =  await this.eleUtil.isVisible(this.logoutBtn);
        console.log("is logout button visible -: "+ flag);
        return flag;
    }

    async clickLeftMenuCancelBtn():Promise<void>{
        await this.eleUtil.click(this.leftMenuCancelBtn,{force:true,timeout:5000});
    }

    async gotoURL(url:string):Promise<void>{
        await this.eleUtil.gotoUrl(url);
    }

    async isItemNotFoundlabelVisible():Promise<boolean>{
        const flag = await this.eleUtil.isVisible(this.itemNotFoundLabel);
        console.log("is Item not visible label found : " + flag);
        return flag;
    }
    async clickOnShoppingCartBtn():Promise<UserCartPage>{
        await this.eleUtil.click(this.shoppingCartBtn,{force:true,timeout:5000});
        return new UserCartPage(this.page);
    }









    




}




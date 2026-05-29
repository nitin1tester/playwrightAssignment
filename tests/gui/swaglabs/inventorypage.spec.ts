import { test,expect} from '../../../src/gui/fixtures/baseFixtures';
import {NoDataFoundError, } from '../../../src/gui/error/custom-error';

test('Verify Successfully add product to cart @smoke', async({inventoryPage})=>{
    const productList = await inventoryPage.getAllProducts();
    try {
        if (productList.length === 0) {
            throw new NoDataFoundError('no product found on page');
        } 
        await inventoryPage.addProductToCart(productList[0]);
    }catch(error){
        console.log('Product handing fail due to error: >> ' + error);
        throw error;
    }
    const isCartBadgeVisibleFlag:boolean = await inventoryPage.isCartBadgeVisible();
    expect(isCartBadgeVisibleFlag).toBeTruthy;
});

test('Verify Open Invalid Product URL', async({inventoryPage})=>{
    await inventoryPage.gotoURL('https://www.saucedemo.com/inventory-item.html?id=999');
    const isItemNotFoundVisibleFlag:boolean = await inventoryPage.isItemNotFoundlabelVisible();
    expect(isItemNotFoundVisibleFlag).toBeTruthy;
});
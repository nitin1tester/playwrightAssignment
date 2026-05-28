import { test, expect } from '../../../src/gui/fixtures/baseFixtures';
import { NoDataFoundError, } from '../../../src/gui/error/custom-error'
import { UserCartPage } from '../../../src/gui/pages/UserCartPage';
import { CheckoutUserInfoPage } from "../../../src/gui/pages/CheckoutUserInfoPage";
import { CheckoutOverviewPage } from "../../../src/gui/pages/CheckoutOverviewPage";
import { CheckoutCompletePage } from "../../../src/gui/pages/CheckoutCompletePage";
import fs from 'fs';
import { parse } from "csv-parse/sync";
import { LoggerHelper } from '../../../src/utils/logger';

//schema/type of user data fields
type usersData = {
    firstName: string,
    lastName: string,
    zipCode: string
}
const fileContent = fs.readFileSync('./src/gui/data/userdata.csv', 'utf-8');
const usersdata: usersData[] = parse(fileContent, {
    columns: true,
    skip_empty_lines: true
}) as usersData[];
console.table(usersdata);
for (const user of usersdata) {
    test(`Positive: Complete checkout flow ${user.firstName} `, async ({ inventoryPage }) => {
        console.table(user);
        let productList = await inventoryPage.getAllProducts();
        try {
            if (productList.length === 0) {
                throw new NoDataFoundError("no product found on page");
            }
            await inventoryPage.addProductToCart(productList[0]);
        } catch (error) {
            console.log("Product handling fail due to error: >> " + error);
            throw error;
        }
        const isCartBadgeVisibleFlag: boolean = await inventoryPage.isCartBadgeVisible();
        expect(isCartBadgeVisibleFlag).toBe(true);
        let userCartPage: UserCartPage = await inventoryPage.clickOnShoppingCartBtn();
        let checkoutUserInfoPage: CheckoutUserInfoPage = await userCartPage.clickOnUserCartCheckoutBtn();
        await checkoutUserInfoPage.fillFirstName(user.firstName);
        await checkoutUserInfoPage.fillLastName(user.lastName);
        await checkoutUserInfoPage.fillZipCode(user.zipCode);
        let checkoutOverviewPage: CheckoutOverviewPage = await checkoutUserInfoPage.clickContinueBtn();
        let checkoutCompletePage: CheckoutCompletePage = await checkoutOverviewPage.clickFinishBtn();
        let isOrderConfirmed = await checkoutCompletePage.isOrderConfirmationMsgVisible();
        expect(isOrderConfirmed).toBe(true);

    })
}

test('Negative: Verify if first name is mandatory field and error message found', {
    annotation:
        [
            { type: 'epic', description: 'EPIC 123 - checkout page for userdetail validation' },
            { type: 'feature', description: 'checkout page feature' },
            { type: 'stroy', description: 'checkout page stroy' },
            { type: 'severity', description: 'Medium' },
            { type: 'owner', description: 'Nitin Rastogi' }
        ]
}, async ({ inventoryPage }) => {
    let productList = await inventoryPage.getAllProducts();
    try {
        if (productList.length === 0) {
            throw new NoDataFoundError("no product found on page");
        }
        await inventoryPage.addProductToCart(productList[0]);
    } catch (error) {
        console.log("Product handing fail due to error: >> " + error);
        throw error;
    }
    const isCartBadgeVisibleFlag: boolean = await inventoryPage.isCartBadgeVisible();
    expect(isCartBadgeVisibleFlag).toBe(true);
    let userCartPage: UserCartPage = await inventoryPage.clickOnShoppingCartBtn();
    let checkoutUserInfoPage: CheckoutUserInfoPage = await userCartPage.clickOnUserCartCheckoutBtn();
    await checkoutUserInfoPage.fillLastName("R");
    await checkoutUserInfoPage.fillZipCode("123123");
    await checkoutUserInfoPage.clickContinueBtn();
    const errorFirstName: string | null = await checkoutUserInfoPage.getFirstNameError();
    expect(errorFirstName).toEqual("Error: First Name is required");
})
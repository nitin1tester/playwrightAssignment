import { Page, Locator } from '@playwright/test';
import { LoggerHelper} from '../utils/logger'

type flexibleLocator = string | Locator;

export class ElementUtil{

    private page: Page;
    private defaultTimeOut: number = 30000;


    constructor(page: Page, timeOut: number = 30000) {
        this.page = page;
        this.defaultTimeOut = timeOut;
    }

    /**
     * this method to convert the string to Locator else it will return the semantic based locators on the basis of given index
     * @param locator 
     * @param index
     * @returns 
     */
    private getLocator(locator: flexibleLocator, index?: number): Locator {
        if (typeof locator === 'string') {
            if (index) {
                return this.page.locator(locator).nth(index);
            }
            else { 
                return this.page.locator(locator).first();
            }
        }
        else {
            if (index) {
                return locator.nth(index);
            }
            else { 
                return locator.first();
            }
        }
    }

    /**
     * Click on an element
     * @param locator 
     * @param options
     * @param index
     */
    async click(locator: flexibleLocator, options?: { force?: boolean;  timeout?:number}, index?: number): Promise<void>{
        await this.getLocator(locator, index).click({
            force: options?.force,
            timeout: options?.timeout || this.defaultTimeOut
        });

        console.log(`Clicked on element : ${locator}`);
        LoggerHelper.debug(`Clicked on element : ${locator}`);
    }
    

    /**
     * Double clock on element
     * @param locator
     */
    async doubleClick(locator: flexibleLocator): Promise<void>{
        await this.getLocator(locator).dblclick({
            timeout:  this.defaultTimeOut
        });
        console.log(`Double Clicked on element : ${locator}`);
        LoggerHelper.debug(`Double Clicked on element : ${locator}`);
    }

    /**
     * Right Click on element
     * @param locator 
     */
    async rightClick(locator: flexibleLocator): Promise<void>{
        await this.getLocator(locator).click({
            button: 'right',
            timeout:  this.defaultTimeOut
        });
        console.log(`Right Clicked on element : ${locator}`);
        LoggerHelper.debug(`Right Clicked on element : ${locator}`);
    }


    /**
     * Fill text into an input field
     * @param locator 
     * @param text 
     */
    async fill(locator: flexibleLocator, text: string): Promise<void>{
        await this.getLocator(locator).fill(text, { timeout: this.defaultTimeOut });
        console.log(`Filled text : ${text} into element : ${locator}`);
        LoggerHelper.debug(`Filled text : ${text} into element : ${locator}`)

    }

    /**
     * Type text with delay (default delay: 500 ms)
     * @param locator 
     * @param text 
     * @param delay 
     */
    async type(locator: flexibleLocator, text: string, delay:number = 500): Promise<void>{
        await this.getLocator(locator).pressSequentially(text, { delay, timeout: this.defaultTimeOut });
        console.log(`Typed text as human : ${text} into element : ${locator}`);
        LoggerHelper.debug(`Typed text as human : ${text} into element : ${locator}`);
    }


    async clear(locator: flexibleLocator): Promise<void>{
        await this.getLocator(locator).clear({ timeout: this.defaultTimeOut });
        console.log(`cleared the element : ${locator}`);
        LoggerHelper.debug(`cleared the element : ${locator}`);

    }


    /**
     * Get text context of an element
     */
    async getText(locator: flexibleLocator): Promise<string | null> {
        const text = await this.getLocator(locator).textContent({ timeout: this.defaultTimeOut });
        return text;
    }


    /**
     * Get text context of an element
     */
    async getInnerText(locator: flexibleLocator): Promise<string> {
        const text = await this.getLocator(locator).innerText({ timeout: this.defaultTimeOut });
        return text.trim();
    }

    /**
     * Get attribute value of an element
     */
    async getAttributeValue(locator: flexibleLocator, attributeName: string): Promise<string | null>{
        return await this.getLocator(locator).getAttribute(attributeName);
    }

    /**
     * Get input(entered) value of an element(text field)
     */
    async getInputValue(locator: flexibleLocator): Promise<string | null>{
        return await this.getLocator(locator).inputValue({ timeout: this.defaultTimeOut });
    }


    /**
     * Get all text content from multiple elements
     */
    async getAllInnerTexts(locator: flexibleLocator) : Promise<string[]>{
        return await this.getLocator(locator).allInnerTexts();
    }


    //============================ Element Visibility & State Check ================//

   /**
     * check element is hidden
     */
    async isVisible(locator: flexibleLocator, index?: number): Promise<boolean>{
        return await this.getLocator(locator, index).isVisible({timeout: this.defaultTimeOut});
    }

    /**
     * check element is hidden
     */
    async isHidden(locator: flexibleLocator): Promise<boolean>{
        return await this.getLocator(locator).isHidden({timeout: this.defaultTimeOut});
    }

    /**
     * check element is enabled
     */
    async isEnabled(locator: flexibleLocator): Promise<boolean>{
        return await this.getLocator(locator).isEnabled({timeout: this.defaultTimeOut});
    }

    /**
     * check element is disabled
     */
    async isDisabled(locator: flexibleLocator): Promise<boolean>{
        return await this.getLocator(locator).isDisabled({timeout: this.defaultTimeOut});
    }

    /**
     * check element is checked (radio/checkbox)
     */
    async isChecked(locator: flexibleLocator): Promise<boolean>{
        return await this.getLocator(locator).isChecked({timeout: this.defaultTimeOut});
    }

    /**
     * check element is checked (radio/checkbox)
     */
    async isEditable(locator: flexibleLocator): Promise<boolean>{
        return await this.getLocator(locator).isEditable({timeout: this.defaultTimeOut});
    }

    //====================wait utils===========//

    /**
     * wait for element to be visible
     */
     async waitForElementVisible(locator: flexibleLocator, timeout: number = 5000): Promise<boolean> {
        try {
            await this.getLocator(locator).waitFor({ state: 'visible', timeout });
            console.log('waited for element to be visible ');
            LoggerHelper.debug('waited for element to be visible ');
            return true;
        }
        catch {
            LoggerHelper.error('waited for element to be visible but element is not found');
            return false;
            
        }
     }
    
    /**
     * wait for element to be attached to DOM
     */
     async waitForElementAttached(locator: flexibleLocator, timeout: number = 5000): Promise<boolean> {
        try {
            await this.getLocator(locator).waitFor({ state: 'attached', timeout });
            console.log('waited for element to be visible ');
            LoggerHelper.debug('waited for element to be visible ')
            return true;
        }
        catch {
            LoggerHelper.error('waited for element to be visible but element is not found');
            return false;
        }
     }
    
    /**
     * wait for page load state
     */
    async waitForPageLoad(state: 'load' | 'domcontentloaded' | 'networkidle' = 'load'): Promise<void> {
        await this.page.waitForLoadState(state);
        console.log(`waitd for page load state: ${state}`);
        LoggerHelper.debug(`waitd for page load state: ${state}`);
    }


    /**
     * wait for a specific timeout (static)
     */
    async sleep(timeout: number): Promise<void>{
        await this.page.waitForTimeout(timeout);
        console.log(`waited for ${timeout} ms`);
        LoggerHelper.debug(`waited for ${timeout} ms`);
    }

    /**
     * navigate to a given url
     * @param url
     */
    async gotoUrl(url: string): Promise<void>{
        await this.page.goto(url, {
            waitUntil: 'load',
            timeout: this.defaultTimeOut
        });
        console.log(`navigated to url : ${url}`);
        LoggerHelper.debug(`navigated to url : ${url}`);
    }


    //********************Drop Down Utils/Select Based Drop Downs ****************/
    async selectByText(locator: flexibleLocator, text: string) {
        await this.getLocator(locator).selectOption({ label: text }, { timeout: this.defaultTimeOut });
        console.log(`selected option ${text} from drop down ${locator}`);
        LoggerHelper.debug(`selected option ${text} from drop down ${locator}`);
    }

    async selectByValue(locator: flexibleLocator, value: string) {
        await this.getLocator(locator).selectOption({ value: value }, { timeout: this.defaultTimeOut });
        console.log(`selected option ${value} from drop down ${locator}`);
        LoggerHelper.debug(`selected option ${value} from drop down ${locator}`);
    }

    async selectByIndex(locator: flexibleLocator, index: number) {
        await this.getLocator(locator).selectOption({ index: index }, { timeout: this.defaultTimeOut });
        console.log(`selected option ${index} from drop down ${locator}`);
        LoggerHelper.debug(`selected option ${index} from drop down ${locator}`);
    }

    


}
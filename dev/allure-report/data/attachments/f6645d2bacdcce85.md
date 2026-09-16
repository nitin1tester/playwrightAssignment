# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: gui/swaglabs/checkoutpage.spec.ts >> Negative: Verify if first name is mandatory field and error message found
- Location: tests/gui/swaglabs/checkoutpage.spec.ts:50:1

# Error details

```
Error: locator.textContent: Test ended.
Call log:
  - waiting for getByRole('heading', { name: 'Error: First Name is required', level: 3 }).first()

```

# Test source

```ts
  22  |      */
  23  |     private getLocator(locator: flexibleLocator, index?: number): Locator {
  24  |         if (typeof locator === 'string') {
  25  |             if (index) {
  26  |                 return this.page.locator(locator).nth(index);
  27  |             }
  28  |             else { 
  29  |                 return this.page.locator(locator).first();
  30  |             }
  31  |         }
  32  |         else {
  33  |             if (index) {
  34  |                 return locator.nth(index);
  35  |             }
  36  |             else { 
  37  |                 return locator.first();
  38  |             }
  39  |         }
  40  |     }
  41  | 
  42  |     /**
  43  |      * Click on an element
  44  |      * @param locator 
  45  |      * @param options
  46  |      * @param index
  47  |      */
  48  |     async click(locator: flexibleLocator, options?: { force?: boolean;  timeout?:number}, index?: number): Promise<void>{
  49  |         await this.getLocator(locator, index).click({
  50  |             force: options?.force,
  51  |             timeout: options?.timeout || this.defaultTimeOut
  52  |         });
  53  | 
  54  |         console.log(`Clicked on element : ${locator}`);
  55  |         LoggerHelper.debug(`Clicked on element : ${locator}`);
  56  |     }
  57  |     
  58  | 
  59  |     /**
  60  |      * Double clock on element
  61  |      * @param locator
  62  |      */
  63  |     async doubleClick(locator: flexibleLocator): Promise<void>{
  64  |         await this.getLocator(locator).dblclick({
  65  |             timeout:  this.defaultTimeOut
  66  |         });
  67  |         console.log(`Double Clicked on element : ${locator}`);
  68  |         LoggerHelper.debug(`Double Clicked on element : ${locator}`);
  69  |     }
  70  | 
  71  |     /**
  72  |      * Right Click on element
  73  |      * @param locator 
  74  |      */
  75  |     async rightClick(locator: flexibleLocator): Promise<void>{
  76  |         await this.getLocator(locator).click({
  77  |             button: 'right',
  78  |             timeout:  this.defaultTimeOut
  79  |         });
  80  |         console.log(`Right Clicked on element : ${locator}`);
  81  |         LoggerHelper.debug(`Right Clicked on element : ${locator}`);
  82  |     }
  83  | 
  84  | 
  85  |     /**
  86  |      * Fill text into an input field
  87  |      * @param locator 
  88  |      * @param text 
  89  |      */
  90  |     async fill(locator: flexibleLocator, text: string): Promise<void>{
  91  |         await this.getLocator(locator).fill(text, { timeout: this.defaultTimeOut });
  92  |         console.log(`Filled text : ${text} into element : ${locator}`);
  93  |         LoggerHelper.debug(`Filled text : ${text} into element : ${locator}`);
  94  | 
  95  |     }
  96  | 
  97  |     /**
  98  |      * Type text with delay (default delay: 500 ms)
  99  |      * @param locator 
  100 |      * @param text 
  101 |      * @param delay 
  102 |      */
  103 |     async type(locator: flexibleLocator, text: string, delay:number = 500): Promise<void>{
  104 |         await this.getLocator(locator).pressSequentially(text, { delay, timeout: this.defaultTimeOut });
  105 |         console.log(`Typed text as human : ${text} into element : ${locator}`);
  106 |         LoggerHelper.debug(`Typed text as human : ${text} into element : ${locator}`);
  107 |     }
  108 | 
  109 | 
  110 |     async clear(locator: flexibleLocator): Promise<void>{
  111 |         await this.getLocator(locator).clear({ timeout: this.defaultTimeOut });
  112 |         console.log(`cleared the element : ${locator}`);
  113 |         LoggerHelper.debug(`cleared the element : ${locator}`);
  114 | 
  115 |     }
  116 | 
  117 | 
  118 |     /**
  119 |      * Get text context of an element
  120 |      */
  121 |     async getText(locator: flexibleLocator): Promise<string | null> {
> 122 |         const text = await this.getLocator(locator).textContent({ timeout: this.defaultTimeOut });
      |                                                     ^ Error: locator.textContent: Test ended.
  123 |         return text;
  124 |     }
  125 | 
  126 | 
  127 |     /**
  128 |      * Get text context of an element
  129 |      */
  130 |     async getInnerText(locator: flexibleLocator): Promise<string> {
  131 |         const text = await this.getLocator(locator).innerText({ timeout: this.defaultTimeOut });
  132 |         return text.trim();
  133 |     }
  134 | 
  135 |     /**
  136 |      * Get attribute value of an element
  137 |      */
  138 |     async getAttributeValue(locator: flexibleLocator, attributeName: string): Promise<string | null>{
  139 |         return await this.getLocator(locator).getAttribute(attributeName);
  140 |     }
  141 | 
  142 |     /**
  143 |      * Get input(entered) value of an element(text field)
  144 |      */
  145 |     async getInputValue(locator: flexibleLocator): Promise<string | null>{
  146 |         return await this.getLocator(locator).inputValue({ timeout: this.defaultTimeOut });
  147 |     }
  148 | 
  149 | 
  150 |     /**
  151 |      * Get all text content from multiple elements
  152 |      */
  153 |     async getAllInnerTexts(locator: flexibleLocator) : Promise<string[]>{
  154 |         return await this.getLocator(locator).allInnerTexts();
  155 |     }
  156 | 
  157 | 
  158 |     //============================ Element Visibility & State Check ================//
  159 | 
  160 |    /**
  161 |      * check element is hidden
  162 |      */
  163 |     async isVisible(locator: flexibleLocator, index?: number): Promise<boolean>{
  164 |         return await this.getLocator(locator, index).isVisible({timeout: this.defaultTimeOut});
  165 |     }
  166 | 
  167 |     /**
  168 |      * check element is hidden
  169 |      */
  170 |     async isHidden(locator: flexibleLocator): Promise<boolean>{
  171 |         return await this.getLocator(locator).isHidden({timeout: this.defaultTimeOut});
  172 |     }
  173 | 
  174 |     /**
  175 |      * check element is enabled
  176 |      */
  177 |     async isEnabled(locator: flexibleLocator): Promise<boolean>{
  178 |         return await this.getLocator(locator).isEnabled({timeout: this.defaultTimeOut});
  179 |     }
  180 | 
  181 |     /**
  182 |      * check element is disabled
  183 |      */
  184 |     async isDisabled(locator: flexibleLocator): Promise<boolean>{
  185 |         return await this.getLocator(locator).isDisabled({timeout: this.defaultTimeOut});
  186 |     }
  187 | 
  188 |     /**
  189 |      * check element is checked (radio/checkbox)
  190 |      */
  191 |     async isChecked(locator: flexibleLocator): Promise<boolean>{
  192 |         return await this.getLocator(locator).isChecked({timeout: this.defaultTimeOut});
  193 |     }
  194 | 
  195 |     /**
  196 |      * check element is checked (radio/checkbox)
  197 |      */
  198 |     async isEditable(locator: flexibleLocator): Promise<boolean>{
  199 |         return await this.getLocator(locator).isEditable({timeout: this.defaultTimeOut});
  200 |     }
  201 | 
  202 |     //====================wait utils===========//
  203 | 
  204 |     /**
  205 |      * wait for element to be visible
  206 |      */
  207 |      async waitForElementVisible(locator: flexibleLocator, timeout: number = 5000): Promise<boolean> {
  208 |         try {
  209 |             await this.getLocator(locator).waitFor({ state: 'visible', timeout });
  210 |             console.log('waited for element to be visible ');
  211 |             LoggerHelper.debug('waited for element to be visible ');
  212 |             return true;
  213 |         }
  214 |         catch {
  215 |             LoggerHelper.error('waited for element to be visible but element is not found');
  216 |             return false;
  217 |             
  218 |         }
  219 |      }
  220 |     
  221 |     /**
  222 |      * wait for element to be attached to DOM
```
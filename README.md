## Get started
1. Get a free API Key at https://fixer.io/product


2. Clone the repository:

    ```
    git clone https://github.com/mjorma/currency-converter
    ```

3. Replace the key in the custom label file:


4. Create a scratch org and provide it with an alias:

    ```
    sfdx force:org:create -s -f config/project-scratch-def.json -a currency-converter
    ```

5. Push the app to your scratch org:

    ```
    sfdx force:source:push
    ```

## About the curreny converter

The currency converter uses the fixer.io api to calculate the conversion between euro and other currencies. The lwc is available for the lightning homepage and the utility bar. I recommend to create a utility item (width 520px) to use the component flexible. 

 ![Utility Item](https://github.com/mjorma/currency-converter/blob/feature/add-currency-converter/currency_converter.png?raw=true)

The quick action buttons can be used to select the most traded currencies. Other currencies can be selected via the dropdown. Since only the euro input variable is available in the free key, editing the base currency is disabled.
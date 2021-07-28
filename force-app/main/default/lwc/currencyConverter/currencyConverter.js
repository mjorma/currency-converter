import { LightningElement, track } from 'lwc'
import getCurrencyRates from '@salesforce/apex/CurrencyConverter.getCurrencyRates'

export default class CurrencyConverter extends LightningElement {

    @track rates = []
    @track amount = 1
    @track baseCurrency = ''
    @track targetCurrency = ''
    @track convertedValue
    @track currencies = [];
    
    // some quick actions for common currencies 
    get basicConvertOps() {
        return [
          { label: "EUR", value: "EUR" },
          { label: "USD", value: "USD" },
          { label: "JPY", value: "JPY" }
        ];
    }

    // call apex class imperatively 
    getRates = () => {
        getCurrencyRates({baseCurrency: this.baseCurrency})
            .then(data => {
                for (let currency in data) {
                    if (data.hasOwnProperty(currency)) {
                        this.rates = [...this.rates, { currency, value: data[currency]}];
                        this.currencies = [...this.currencies, { label: currency , value: currency}];
                    }
                }
            })
            .catch(error => console.error(error))
    }

    connectedCallback() {
        this.getRates()
    }

    handleInputChange(e) {
        this[e.target.name] = e.target.value;
        this.convertedValue = null;
        this.calculateConversion(e);
    }


    handleAmountChange(e) {
        this[e.target.name] = e.target.value;
        this.convertedValue = null;
        this.calculateConversion(e);
    }

    calculateConversion(e) {

        e.preventDefault();

        const targetRate = this.rates.find(r => r.currency === this.targetCurrency)
        
        if (this.baseCurrency && this.targetCurrency) {
            if (targetRate) {
                this.convertedValue = this.amount * targetRate.value
            }
        }
    }
}
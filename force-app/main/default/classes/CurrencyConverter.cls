/**
 * This class is called from the currencyConverter lwc to display the currency conversion
 * between two currencies. Unfortunately the free key only allows Euro as the base currency.
 */

public with sharing class CurrencyConverter {

    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getCurrencyRates(String baseCurrency) {
        Map<String, Object> rates = new Map<String, Object>();

        Http http = new Http();
        HttpRequest request = new HttpRequest();
        // unfortunately the free key does not provide SSL encryption 
        request.setEndpoint('http://data.fixer.io/api/latest?access_key=' + Label.FIXER_KEY);
        request.setMethod('GET');
        HttpResponse response = http.send(request);

        if (response.getStatusCode() == 200) {
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());

            rates = (Map<String, Object>) results.get('rates');
        }
        
        return rates;
    }
}
@isTest
public class CurrencyConverterTest {
    @isTest
    static void testFixerIoCallout(){
        StaticResourceCalloutMock mock = new StaticResourceCalloutMock();
        mock.setStaticResource('fixerIoMock');
        mock.setStatusCode(200);
        mock.setHeader('Content-Type', 'application/json;charset=UTF-8');
        // Set the mock callout mode
        Test.setMock(HttpCalloutMock.class, mock);
        // Call the method that performs the callout
        Map<String, Object> rates = CurrencyConverter.getCurrencyRates('EUR');
        // Verify response
        System.assertEquals(7, rates.size());
    }
}
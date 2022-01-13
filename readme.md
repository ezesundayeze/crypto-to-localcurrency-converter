## Crypto to local currency price converter

## Functions

<dl>
<dt><a href="#getPrice">getPrice(cryptoCurrency, baseCurrency)</a> ⇒</dt>
<dd></dd>
<dt><a href="#getLocalCurrencyPrice">getLocalCurrencyPrice(coinSymbol, localRatePerUSD, localCurrency)</a> ⇒</dt>
<dd></dd>
</dl>

<a name="getPrice"></a>

## getPrice(cryptoCurrency, baseCurrency) ⇒
**Kind**: global function  
**Returns**: the exchange rate value  

| Param | Description |
| --- | --- |
| cryptoCurrency | is the cryptocurrency you intend to convert e.g bitcoin |
| baseCurrency | is the fiat currency you intend to compare it's price with, e.g USD |

<a name="getLocalCurrencyPrice"></a>

## getLocalCurrencyPrice(coinSymbol, localRatePerUSD, localCurrency) ⇒
**Kind**: global function  
**Returns**: this function returns a numberic value or an error.  

| Param | Type | Description |
| --- | --- | --- |
| coinSymbol | <code>\*</code> | the symbol of the currency you want to see the price. Make sure it's an id from our supported coin or fron coingecko. an e.g is bitcoin |
| localRatePerUSD | <code>\*</code> | in case you want to enter the rate manually or set the rate by yourself you can set it with this parameter |
| localCurrency | <code>\*</code> | here you enter your localcurrency symbol with USD as a prefix, for example for NGN you will enter USDNGN |


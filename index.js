import { CoinGeckoClient } from 'coingecko-api-v3';
import fs from "fs";
import axios from "axios";
import { join } from 'path';
import  Validator from 'validatorjs';
import customValidation from "./validation.js";

const client = new CoinGeckoClient({
    timeout: 10000,
    autoRetry: true,
});

/**
 * 
 * @param cryptoCurrency is the cryptocurrency you intend to convert e.g bitcoin
 * @param baseCurrency is the fiat currency you intend to compare it's price with, e.g USD
 * @returns the exchange rate value
 */

async function getPrice(cryptoCurrency, baseCurrency) {

    const simple = client.simplePrice({ vs_currencies: baseCurrency, ids: cryptoCurrency });
    return await simple;
}

/**
 * 
 * @param {*} coinSymbol the symbol of the currency you want to see the price. Make sure it's an id from our supported coin or fron coingecko. an e.g is bitcoin. Here is the endpoint https://api.coingecko.com/api/v3/coins/list
 * @param {*} localRatePerUSD in case you want to enter the rate manually or set the rate by yourself you can set it with this parameter
 * @param {*} localCurrency here you enter your localcurrency symbol with USD as a prefix, for example for NGN you will enter USDNGN
 * @returns this function returns a numberic value or an error.
 */
async function getLocalCurrencyPrice(coinSymbol, localRatePerUSD, localCurrency) {
    //validation 
    let validation = new Validator({ 
        coinSymbol, 
        localCurrency, 
        localRatePerUSD 
    }, customValidation.getLocalCurrencyPrice);

    if (!validation.passes()) {
        throw new Error(JSON.stringify(validation.errors))
    }

    const cryptoPriceInUSD = (await getPrice(coinSymbol, "USD"))[coinSymbol].usd;
    console.log(USDToLocalCurrency(cryptoPriceInUSD, localRatePerUSD))
    return USDToLocalCurrency(cryptoPriceInUSD, localRatePerUSD, localCurrency)
}

const USDToLocalCurrency = (currencyValueInUSD, customLocalRatePerUSD, localCurrencySymbol = null) => {
    if (localCurrencySymbol == null) {
        return (currencyValueInUSD * customLocalRatePerUSD).toLocaleString()
    } else {
        const currencyRate = getLocalCurrencyRate(localCurrencySymbol);
        return (currencyValueInUSD * currencyRate).toLocaleString()
    }
}

const getLocalCurrencyRate = async (currency) => {
    if (currency.substring(0, 3) !== "USD") {
        throw new Error("Currency symbol must start with USD, e.g USDNGN for Naira")
    }
    const currencyLayer = await axios.get("http://api.currencylayer.com/live?access_key=aa3054c9c44c1dc6ad41095f59f563b6&format=1");
    return currencyLayer.data.quotes[currency];
}

export default getLocalCurrencyPrice;


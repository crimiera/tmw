/**
 * Project Name: Kickoff
 * @description The Kickoff boilerplate js file
 * @author The Kickoff team
 *
 * Need help using JSDoc? Find out more at http://usejsdoc.org/
 */

// their code e.g. npm modules
import ready from 'lite-ready'; // https://github.com/nicbell/liteready
import svg4everybody from 'svg4everybody'; // https://github.com/jonathantneal/svg4everybody
import axios from 'axios'
// Global libs that don't return a value
import 'console';
import 'kickoff-welcome.js'; // The Kickoff message in the js console. Remove it if you like :)

// our code
// import moduleTest from './modules/module-test'; // this is a test, uncomment the line below to try it

// DOM ready code goes in here
ready(() => {
    svg4everybody({
        polyfill: true, // polyfill <use> elements for External Content
    });

		function html_unescape(s) {
				var div = document.createElement("div");
				div.innerHTML = s;
				return div.textContent || div.innerText; 
		}

		const USD = document.getElementById("bit-usd")
		const GBP = document.getElementById("bit-gbp")

		USD.innerHTML = "Loading..."
		GBP.innerHTML = "Loading..."

		const getBitcoinUSD = axios({
				method: 'get',
				url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
				withCredentials: false
		}).then(response => response.data);

		const convertToGBP = axios({
				method: 'get',
				url: 'https://openexchangerates.org/api/latest.json?app_id=242ea76d0c784a6abb12ca429467b288',
				withCredentials: false
		}).then(response => response.data);
		
		Promise.all([getBitcoinUSD, convertToGBP]).then(([resultFromUSD, resultFromGBP]) => {
			USD.innerHTML = `${html_unescape(resultFromUSD.bpi.USD.symbol)}${resultFromUSD.bpi.USD.rate}`;
			GBP.innerHTML = `${html_unescape("&pound") } ${(resultFromUSD.bpi.USD.rate_float*resultFromGBP.rates.GBP).toFixed(4) }`
		})
		.catch(error => {
			USD.innerHTML = "Error";
			GBP.innerHTML = "Error";
		})

});
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
import async from 'async'
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



    let app = { "title": "TMW - Test" };

    (function(app) {

        function html_unescape(s) {
            var div = document.createElement("div");
            div.innerHTML = s;
            return div.textContent || div.innerText; // IE is different
        }

        const USD = document.getElementById("bit-usd")
        const GBP = document.getElementById("bit-gbp")

        USD.innerHTML = "Loading..."
        GBP.innerHTML = "Loading..."


        const getBitcoinUSD = function(callback) {

            axios({
								method: 'get',
								url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
								withCredentials: false
						})
						.then(function(response) {

								callback(null, response.data)
						})
						.catch(function(error) {
								callback("Error getting Bitcoin/USD Rate");
						});

        }

        const convertToGBP = function(callback) {

					axios({
							method: 'get',
							url: 'https://openexchangerates.org/api/latest.json?app_id=242ea76d0c784a6abb12ca429467b288',
							withCredentials: false
					})
					.then(function(response) {

							callback(null, response.data)
					})
					.catch(function(error) {
							console.log(error)
							callback("Error getting USD/GBP Rate");
					});
        }

        async.parallel([
						getBitcoinUSD,
						convertToGBP
				],
				function(err, results) {

						if (err) {
								GBP.innerHTML = err
								USD.innerHTML = err
						} else {
								USD.innerHTML = `${html_unescape(results[0].bpi.USD.symbol)}${results[0].bpi.USD.rate}`;
								GBP.innerHTML = `${html_unescape("&pound") } ${(results[0].bpi.USD.rate_float*results[1].rates.GBP).toFixed(4) }`
						}
				});

    })(window)
    // moduleTest(); // this is a test, uncomment this line to try it
});
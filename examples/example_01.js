require("dotenv").load();

const path = require("path");
const { SimpleGA, Request, MetricFilter } = require("../index.js");

(async function() {
	var analytics = new SimpleGA(path.join(__dirname, "../key.json"));

	var request = new Request()
		.select("pagepath","pagetitle","pageviews")
		.from(process.env.GA_VIEW_ID)
		.where("pagepath").not().equals("/")
		.during("2018-07-23","2018-07-25")
		.orderDesc("pageviews")
		.results(100)

	try {
		var data = await analytics.run(request);
		console.log(data);
	} catch (err) {
		console.error(err);
	}
})();

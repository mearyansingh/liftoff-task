const express = require("express");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set("view engine", "ejs");

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static("public")); //for static files

app.get("/", function (req, res) {
	const day = date.getDate();
	res.render("list", {
		listTitle: day,
		newListItems: items,
		activeRoute: '/'
	});
});

app.post("/", function (req, res) {
	const item = req.body.newItem;
	if (req.body.list === "Work") {
		workItems.push(item);
		res.redirect("/work");
	} else {
		items.push(item);
		res.redirect("/");
	}
});

app.get("/work", function (req, res) {
	res.render("list",
		{
			listTitle: "Work List",
			newListItems: workItems,
			activeRoute: '/work'
		});
});

app.get("/about", function (req, res) {
	res.render("about", {
		activeRoute: '/about'
	});
});

app.listen(3000, function () {
	console.log("running on port 3000.");
});

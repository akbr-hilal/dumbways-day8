const express = require("express");
const app = express();
const port = 5000;

app.set("view engine", "hbs"); //Set hbs
app.use("/assets", express.static(__dirname + "/assets"));
app.use(express.urlencoded({ extended: false }));

let isLogin = true;
let dataProject = [
    {
        title: "Road Trip Apps Mobile",
        description:
            "UI/UX Design Road Trip Apps Ini merupakan UI/UX Design pertama saya menggunakan Figma. Saya membuat UI/UX Design terinspirasi dari berbagai macam aplikasi terutama aplikasi perjalanan.",
        nodeJs: "fa-brands fa-node-js",
        reactJs: "fa-brands fa-react",
        laravel: "fa-brands fa-laravel",
        duration: "3 Bulan",
        startDate: "12 Januari 2022",
        endDate: "5 Februari 2022",
    },
];

app.get("/", function (req, res) {
    let data = dataProject.map(function (items) {
        return {
            ...items,
            isLogin,
        };
    });

    res.render("index", { isLogin, projects: data });
});

app.get("/del-project/:index", function (req, res) {
    let index = req.params.index;
    dataProject.splice(index, 1);

    res.redirect("/");
});

app.get("/add-project", function (req, res) {
    res.render("add-project");
});

app.post("/add-project", function (req, res) {
    console.log(req.body);

    let data = req.body;

    data = {
        title: data.titleProject,
        startDate: data.startDateProject,
        endDate: data.endDateProject,
        description: data.descriptionProject,
        nodeJs: data.checkNodeJS,
        reactJs: data.checkReactJS,
        angular: data.checkAngularJS,
        laravel: data.checkLaravel,
        image: data.imageProject,
    };

    dataProject.push(data);
    res.redirect("/");
});

app.get("/project-detail/:index", function (req, res) {
    let index = req.params.index;
    console.log(index);

    let project = dataProject[index];

    console.log(project);
    res.render("project-detail", project);
});

app.get("/contact", function (req, res) {
    res.render("contact");
});

// function getDistanceTime(startDate, endDate) {
//     let start = new Date(startDate);
//     let end = new Date(endDate);

//     if (start > end) {
//         alert("Error Your Date");
//     } else if (start < end) {
//         distance = new Date(end - start);
//     }

//     let distanceDay = Math.floor(distance / (1000 * 3600 * 24));
//     let distanceMonth = Math.floor(distanceDay / 31);

//     console.log(distanceDay);

//     duration =
//         distanceMonth <= 0 ? distanceDay + " Hari" : distanceMonth + " Bulan";

//     console.log(duration);
// }

app.listen(port, function (req, res) {
    console.log(`Server berjalan di port ${port}`);
});

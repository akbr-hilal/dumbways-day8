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
        endDate: "05 Februari 2022",
    },
];

app.get("/", function (req, res) {
    let data = dataProject.map(function (items) {
        return {
            ...items,
            start_Date: getFullTime(new Date(items.startDate)),
            end_Date: getFullTime(new Date(items.endDate)),
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

app.get("/edit-project/:index", function (req, res) {
    let index = req.params.index;
    console.log(index);

    let edit = dataProject[index];
    console.log(edit);

    res.render("edit-project", { isLogin: isLogin, edit, name: index });
});
app.post("/edit-project/:index", function (req, res) {
    let data = req.body;
    let index = req.params.index;

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
        duration: getDistanceTime(
            new Date(data.startDateProject),
            new Date(data.endDateProject)
        ),
    };

    dataProject[index] = data;
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
        duration: getDistanceTime(
            new Date(data.startDateProject),
            new Date(data.endDateProject)
        ),
    };

    dataProject.push(data);
    res.redirect("/");
});

app.get("/project-detail/:index", function (req, res) {
    let index = req.params.index;
    console.log(index);
    let project = dataProject[index]
    let startDate = getFullTime(new Date(dataProject[index].startDate))
    let endDate = getFullTime(new Date(dataProject[index].endDate))
    console.log(project);
    res.render("project-detail", {project: project, startDate, endDate });
});

app.get("/contact", function (req, res) {
    res.render("contact");
});

function getFullTime(waktu) {
    let month = [
        "Januari",
        "Febuari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];
    let date = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
    ];

    let dateIndex = waktu.getDate();
    let monthIndex = waktu.getMonth();
    let year = waktu.getFullYear();

    let fullTime = `${date[dateIndex]} ${month[monthIndex]} ${year}`;
    return fullTime;
}

function getDistanceTime(startDate, endDate) {
    let start = new Date(startDate);
    let end = new Date(endDate);
    let getTime = end - start;

    let distanceDay = Math.floor(getTime / (1000 * 3600 * 24));
    let distanceMonth = Math.floor(distanceDay / 31);

    duration =
        distanceMonth <= 0 ? distanceDay + " Hari" : distanceMonth + " Bulan";

    if (start > end) {
        alert("Error Your Date");
    } else if (start < end) {
        return `${duration}`;
    }
}

app.listen(port, function (req, res) {
    console.log(`Server berjalan di port ${port}`);
});

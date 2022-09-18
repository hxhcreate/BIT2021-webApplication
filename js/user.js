var online = false;
function storage_set(key, value) {
    if (online)
        ;
    else
        localStorage.setItem(key, value);
}
function storage_get(key, value) {
    if (online)
        ;
    else
        return localStorage.getItem(key);
}
function storage_rm(key) {
    if (online)
        ;
    else
        localStorage.removeItem(key);
}
var next_page = "";
function load_user() {
    var action = getUrlParam("action");

    var returnpage = "home";
    if (action == "login") {
        var user = getUrlParam("user");
        var pwd = getUrlParam("pwd");
        var data = JSON.parse(storage_get(user));
        if (data == null) {
            setInfo("The user does not exist!");
            returnpage = "login";
        } else if (data.pwd == pwd) {
            setInfo("Login successfully!");
            localStorage.setItem("cur", user);
            returnpage = "home";
        } else {
            setInfo("Password invalid!");
            returnpage = "login";
        }
    } else if (action == "logon") {
        var user = getUrlParam("user");
        var pwd = getUrlParam("pwd");
        var pwd2 = getUrlParam("pwd2");
        if (pwd != pwd2) {
            setInfo("The two passwords are inconsistent.");
            returnpage = "logon";
        } else {
            var pwd0 = storage_get(user);
            if (pwd0 == null) {
                var info = {
                    "pwd": pwd,
                    "articleID": 0
                }
                storage_set(user, JSON.stringify(info));
                setInfo("<br>You have successfully registered into geek space!</br><br>Please complete your profile.</br>");
                localStorage.setItem("cur", user);
                returnpage = "profile";
            } else {
                setInfo("There is a conflict in the user name!");
                returnpage = "logon";
            }
        }
    } else if (action == "logout") {
        storage_rm("cur");
        setInfo("Log out successfully!");
        returnpage = "home";
    } else if (action == "profile") {
        var user = getUrlParam("user");
        var old = JSON.parse(storage_get(user));
        var profile = {
            "pwd": old.pwd,
            "articleID": old.articleID,
            "firstName": getUrlParam("firstName"),
            "lastName": getUrlParam("lastName"),
            "email": getUrlParam("email"),
            "phone": getUrlParam("phone"),
            "occupation": getUrlParam("occupation"),
            "address": getUrlParam("address"),
            "country": getUrlParam("country"),
            "state": getUrlParam("state")
        }
        storage_set(user, JSON.stringify(profile));
        setInfo("User info set successfully!");
        returnpage = "home";
    }

    var root = getRootPath();
    switch (returnpage) {
    case "login":
        next_page = root + "log_register/login.html"
        document.getElementById("n_page").innerHTML = "login";
        break;
    case "logon":
        next_page = root + "log_register/register.html"
        document.getElementById("n_page").innerHTML = "register";
        break;
    case "profile":
        next_page = root + "log_register/Account.html"
        document.getElementById("n_page").innerHTML = "profile";
        break;
    case "home":
    default:
        next_page = root + "index.html"
        document.getElementById("n_page").innerHTML = "home";
        break;
    }

    intervalid = setInterval("fun()", 1000);

}
var i = 2;
var intervalid;
function fun() {
    if (i == 0) {
        location.href = next_page;
        clearInterval(intervalid);
    }
    document.getElementById("time").innerHTML = i;
    i--;
}
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    var strValue = "";
    if (r != null) {
        strValue = decodeURIComponent(r[2]);
    }
    return strValue;
}
function getRootPath() {
    var curWwwPath = window.location.href;
    var parent = curWwwPath.split("/");
    parent.reverse();
    if (parent[1] == "level2" || parent[1] == "blogmgr")
        return "../../";
    else if (parent[0] == "index.html" && parent[1] != "blog")
        return "./"
    else
        return "../"
}

function setInfo(info) {
    document.getElementById("info").innerHTML = info;
}
function getcur() {
    return localStorage.getItem("cur");
}
function getuser(user) {
    return JSON.parse(localStorage.getItem(user));
}

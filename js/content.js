var user = getUrlParam("user");
var id = getUrlParam("id");
var Userinfo = getuser(user);

var content_O = {
    user: user,
    articleID: id
};
var content = JSON.stringify(content_O);
// $.ajax({
//     url: "./blogmgr.html",
//     type: "get",
//     data: {
//         "action": "view",
//         "content": content
//     },
//     dataType: "json",
//     success: function(data) {
//         alert(data.msg);
//     }
// })
var result = blogmgr("view", content);

var article = JSON.parse(JSON.parse(result).content);
$(".blog-title").prepend(article.user);
$(".blog-post-title").text(article.title);
$(".blog-post-meta").text(article.synosis);
$('title').html('Geek Blog--' + article.title);
var converter = new showdown.Converter({'tables':'true'});
// text = prompt("Input:");
text = article.md;
html = converter.makeHtml(text);
$("#markdown").html(html);
// document.getElementById("markdown").innerHTML = html;
$("#markdown").html(html);

$("#author_name").text(Userinfo.firstName + " " + Userinfo.lastName);
$("#author_job").text(Userinfo.occupation);
$("#author_phone").text(Userinfo.phone);
$("#author_email").text(Userinfo.email);
$("#author_location").text(Userinfo.address);
$("#author_nationality").text(Userinfo.country + ", " + Userinfo.state);

function more(index) {
    var next = Number(id) + index;
    if (next > 0 && next < getuser(user).articleID)
        location.href = getRootPath() + "blog/blogmgr/content.html?user=" + user + "&id=" + next;
    else
        alert("NO MORE BLOGS!");
}

function dopost() {
    var cur = getcur();
    if (cur == null) {
        var next = confirm("Please login before blogging!")
        if (next) {
            window.open(getRootPath() + "log_register/login.html", "_blank"/*, "scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes"*/
            );
        }
        return false;
    }
    var Userinfo = getuser(cur);
    var articleID = Userinfo.articleID + 1;
    var content = {};
    content["user"] = cur;
    content["articleID"] = articleID;
    content["title"] = $("#post_title").val();
    content["tags"] = $("#post_tags").val();
    content["synosis"] = $("#post_synosis").val();
    content["md"] = $("#post_md").val();
    content["time"] = new Date().getTime();
    var result = blogmgr("post", JSON.stringify(content));
    var res_o = JSON.parse(result);
    alert(res_o.msg);
    location.href = getRootPath() + "blog/blogmgr/content.html?user=" + cur + "&id=" + articleID;
    return false;
}

function fileImport() {
    var selectedFile = document.getElementById('inputfile').files[0];
    var reader = new FileReader();
    reader.readAsText(selectedFile);
    reader.onload = function() {
        $("#post_md").val(this.result);
    }
}

function load_blog() {
    var result = JSON.parse(blogmgr("list", "{}"));
    
    if (result.msg == "success") {
        var list = JSON.parse(result.content);
        for (var i = 0;i<list.length;i++) {
            var article = JSON.parse(JSON.parse(blogmgr("view", JSON.stringify(list[i]))).content);
            var d = new Date(article.time);
            var add = "<div class=\"col-md-6\"><div class=\"row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative\"><div class=\"col p-4 d-flex flex-column position-static\"><strong class=\"d-inline-block mb-2 text-success\">"+
            article.user
            + "</strong><h3 class=\"mb-0\">" +
            article.title
            + "</h3><div class=\"mb-1 text-muted\">" +
            d.toLocaleDateString()
            + "</div><p class=\"card-text mb-auto\">" +
            article.synosis
            + "</p><a href=\"" +
            getRootPath() + "blog/blogmgr/content.html?user=" + article.user + "&id=" + article.articleID
            + "\" class=\"stretched-link\">Continue reading</a></div></div></div>";

            $("#blog_list").append(add);
        }
    }
}
var online = false;
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    var strValue = "";
    if (r != null) {
        strValue = unescape(r[2]);
    }
    return strValue;
}
function setInfo(info) {
    document.getElementById("result").innerHTML = info;
}
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
function blogmgr(action, content) {
    var json = JSON.parse(content);
    var user = json.user;
    var id = json.articleID;
    if (action == "post") {
        storage_set(user + "%#" + id, content);
        var result = {
            "msg": "Success!",
            "content": "{}"
        };
        UserBlogUpdate(user);

        var list = JSON.parse(storage_get("@blog_list"));
//         if (list == null) {
//             list = "[{\"user\":\"" + user + "\",\"articleID\":\"" + id + "\"}]";
//             storage_set("@blog_list", list);
//         } else {
//             var index = {
//                 "user": user,
//                 "articleID": id
//             };
//             list.push(JSON.stringify(index));
//         }
        if (list == null)
        list = []
        list.push({
                "user": user,
                "articleID": id
            });
        storage_set("@blog_list", JSON.stringify(list));
        
    } else if (action == "view") {
        var storage = storage_get(user + "%#" + id);
        if (storage == null)
            var result = {
                "msg": "The acticle required is not found!",
                "content": "{}"
            };
        else
            var result = {
                "msg": "success",
                "content": storage
            };
    } else if (action == "list") {
        var list = storage_get("@blog_list");
        if (list == null)
            var result = {
                "msg": "No article found!",
                "content": "{}"
            };
        else
            var result = {
                "msg": "success",
                "content": list
            };
    }
    var result_s = JSON.stringify(result);
    if (online)
        setInfo(result_s);
    else
        return result_s;
}

function load_blogmgr() {
    var action = getUrlParam("action");
    var content = decodeURIComponent(getUrlParam("content"));
    online = true;
    blogmgr(action, content);
}
function UserBlogUpdate(cur) {
    var usr_info = storage_get(cur);
    var usr_info_o = JSON.parse(usr_info);
    usr_info_o["articleID"] = usr_info_o["articleID"] + 1;
    storage_set(cur, JSON.stringify(usr_info_o));
}

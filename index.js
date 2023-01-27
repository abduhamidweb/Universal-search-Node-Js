// console.clear();
let fs = require('fs');
let http = require("http");
let path = require('path');
let url = require("url");
let qs = require('querystring');
let posts = JSON.parse(fs.readFileSync("posts.json", "utf8"));
let port = 3000;
const server = http.createServer((req, res) => {
    try {
        let query = url.parse(req.url)
        let sorov = qs.parse(query.query);
        let id = req.url.split("/")[2];
        let list = [];
        if (req.method == "GET") {
            if (id) {
                res.end(JSON.stringify(posts.filter((e) => e.id == id)[0]));
            } else {
                if (query.pathname == "/posts") {
                    for (let post of posts) {
                        let check = 0;
                        for (let i in sorov) {
                            if ("" + post[i] == sorov[i]) check += 1;
                        }
                        if (check == Object.keys(sorov).length) list.push(post)
                    }
                }
                res.end(JSON.stringify(list));
            }
        }
    } catch (error) {
        console.log(error);
    }
});
server.listen(port, console.log(port));
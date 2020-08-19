let http = require('http')
let fs=require('fs')
let url=require('url')
let template=require('art-template')
let server = http.createServer()
var comments=
[
    {
        name:'yasuo',
        say:'not run',
        datetime:2016
    },
    {
        name:'zed',
        say:'yes',
        datetime:2017

    }
]
server.on('request',function (req,res){
    var requrl=url.parse(req.url,true)
    var pathname=requrl.pathname
    if(pathname==='/'){
        fs.readFile('./views/index.html',(err,data)=>{
            if(err){
                console.log(err.message)
                return res.end('404')
            }
            var htmlStr=template.render(data.toString(),{
                comments
            })
            res.end(htmlStr)
            // res.end(data)
        })
    }else if (pathname==='/post'){
        fs.readFile('./views/post.html',(err,data)=>{
            if(err){
                console.log(err.message)
                return res.end("404")
            }
            res.end(data)
        })
    }else if(pathname==='/pinglun'){
        // console.log('shoudao ')
        // res.end(JSON.stringify(requrl.query))
        var com=requrl.query
        com.datetime='2018'
        comments.push(com)
      
        res.statusCode=302
        res.setHeader('Location','/')
        res.end()
    }
    // res.end('401')
})
server.listen(3007,function(){
    console.log("this serve is running at http://127.0.0.1:3007")
})
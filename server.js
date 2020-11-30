const express = require('express')
const app = express()
const port = 3000

const users = [
    {id:1,name:"user 1"},
    {id:2,name:"user 2"},
    {id:3,name:"user 3"},
    {id:4,name:"user 4"},
    {id:5,name:"user 5"},
    {id:6,name:"user 6"},
    {id:7,name:"user 7"},
    {id:8,name:"user 8"},
    {id:9,name:"user 9"},
    {id:10,name:"user 10"},
]



app.get('/users', paginateMW(users),(req, res) => {
    
    res.json(res.paginateMW)
    // let page = parseInt(req.query.page)
    // let limit = parseInt(req.query.limit)

    // let startIndex = (page-1)*limit
    // let endIndex = page * limit
    
    // let result = {}
    
    // if(endIndex < users.length){
    //     result.next = {
    //         page: page +1,
    //         limit: limit
    //     }
    // }

    // if(startIndex > 0){
    //     result.prev = {
    //         page: page-1,
    //         limit: limit
    //     }
    // }

    // result.result = users.slice(startIndex,endIndex)
    // res.json(result)
})

function paginateMW(model){
    return (req,res,next) =>{
        
        let page = parseInt(req.query.page)
        let limit = parseInt(req.query.limit)

        let startIndex = (page-1)*limit
        let endIndex = page * limit
        
        let result = {}
        
        if(endIndex < model.length){
            result.next = {
                page: page +1,
                limit: limit
            }
        }

        if(startIndex > 0){
            result.prev = {
                page: page-1,
                limit: limit
            }
        }

        result.result = model.slice(startIndex,endIndex)

        res.paginateMW = result
        next()
    }
}


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast') 

const path = require('path')
const express= require('express')
const hbs=require('hbs')
const { rmSync } = require('fs')

const dirPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

const app= express()
const port=process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views',viewsPath)
app.use(express.static(dirPath))
hbs.registerPartials(partialPath)

// app.get('',(req,res)=>{
//     res.send('<h1>Weather</h1>')
// })

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather',
        name: 'sanjay'
    })
})

// app.get('/help',(req,res)=>{
//     res.send({
//         name:'sanjay',
//         age:20
//     })
// })

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'sanjay'
    })
})

// app.get('/about',(req,res)=>{
//     res.send('about')
// })

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name: 'sanjay'
    }) 
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must enter address'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
        if (error ) {
            return res.send({ error })
        }
        // console.log('Data',data)
        forecast(latitude,longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
            // console.log(location)
            // console.log(forecastData)
        })
    })
   
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'help page not found',
        name: 'sanjay'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'page not found',
        name: 'sanjay'
    })
})

app.listen(port,()=>{
    console.log('server is set to port'+port)
})


const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoUrl = require('./utils/geoUrl')
const forecast = require('./utils/forecast')


const publicDirectoryPath = path.join(__dirname,'../public') // path to our static HTML file which was {index.html,help.html,about.html} and are replaced by {index.hbs,help.hbs,about.hbs} to work dynamically such as setting a header and footer for every webpage present in our project (because if we add it in saperate file it'll be timeconsuming and header or footer can be slightly displaced) 

//NOTE : We are using this public folder beacuse it contains static css file

const app = express()
const port = 3000

 app.use(express.static(publicDirectoryPath))    // serve our static file using express.static() which will serve our path to index.html and will render index.html on first page 

const viewPath = (path.join(__dirname, './templates/views' ))
const partialsPath = path.join(__dirname,'./templates/partials')

app.set('view engine','hbs') // we are using a template engine which will do dynamic things which html can't do . By default we need to assign all our hbs work in a folder view which must be present adjacent to app.js

app.set('views',viewPath)// we can also change our directory where our temlates (.hbs) are present by assigning a const to the path here it's viewPath and then setting it using app.set

hbs.registerPartials(partialsPath)// we are regitering our partials path using hbs module

app.get('',(req,res)=>{
    res.render('index',{
        title :'Weather App',
        name :'Dipanshu'
    })  //this render method will render your dynamic site by using template engine (hbs)
})

app.get('/about',(req,res)=>{
    res.render('about',{   // through this object we can assign properties to our (.hbs) templates 
        title : 'About me',
        name : 'Dipanshu'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help',
        name :'Dipanshu',
        message : 'Need help?'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'Please provide the address'
        })
    }

    geoUrl(req.query.address,(error,data)=>{
        if(error){
            return res.send({
                error : 'oops something went wrong'
            })
        }
        forecast(data.latitude,data.longitude,(error,forecastData)=>{
                if(error){
                    return res.send({
                        error : 'error'
                    })
                }
                res.send({
                    forecast : forecastData
                })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error :'enter the product'
        })    
    }
    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title :'Go back to help page!',
        name :'Dipanshu'
    })
})

app.get('*',(req,res)=>{  // '*' this wildcard character means that it's for all pages which are not present in sites and we placed it last because first express will check from starting if the route is not present before this '*' and a genuine route it'll render this route's file so we place it last   
    res.render('404',{
        title : '404',
        name : 'Dipanshu'
    })
})


app.listen(port,()=>{
    console.log('Server is running!!')
})
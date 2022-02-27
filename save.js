const express = require('express')
let fs = require('fs')
const { finished } = require('stream')
const app = express()

const port = 3000

app.listen(port, () => console.log('Listening at http://localhost:${PORT}'))

const data_line = []
const data_color_line = []
const data_square = []
const data_color_square = []
const data_rectangle = []
const data_color_rectangle = []
const data_polygon = []
const data_color_polygon = []
    
const j_line = JSON.stringify(data_line)
const j_c_line = JSON.stringify(data_color_line)
const j_square = JSON.stringify(data_square)
const j_c_square = JSON.stringify(data_color_square)
const j_rectangle = JSON.stringify(data_rectangle)
const j_c_rectangle = JSON.stringify(data_color_rectangle)
const j_polygon = JSON.stringify(data_polygon)
const j_c_polygon = JSON.stringify(data_color_polygon)

const saveData = {
    jsonData1 : [],
    jsonData2 : [],
    jsonData3 : [],
    jsonData4 : [],
    jsonData5 : [],
    jsonData6 : [],
    jsonData7 : [],
    jsonData8 : []
}

saveData.jsonData1 = j_line
saveData.jsonData2 = j_c_line
saveData.jsonData3 = j_square
saveData.jsonData4 = j_c_square
saveData.jsonData5 = j_rectangle
saveData.jsonData6 = j_c_rectangle
saveData.jsonData7 = j_polygon
saveData.jsonData8 = j_c_polygon


const jsonData = JSON.stringify(saveData,null,2)
fs.writeFile('buffer_all.json',saveData,finished)
/*
const saveData1 = (data_line) =>{
    const jsonData1 = JSON.stringify(data_line)
}

const saveData2 = (data_color_line) =>{
    const jsonData2 = JSON.stringify(data_color_line)
}

const saveData3 = (data_square) =>{
    const jsonData3 = JSON.stringify(data_square)
}

const saveData4 = (data_color_square) =>{
    const jsonData4 = JSON.stringify(data_color_square)
}

const saveData5 = (data_rectangle) =>{
    const jsonData5 = JSON.stringify(data_rectangle)
}

const saveData6 = (data_color_rectangle) =>{
    const jsonData6 = JSON.stringify(data_color_rectangle)
}

const saveData7 = (data_polygon) =>{
    const jsonData7 = JSON.stringify(data_polygon)
}

const saveData8 = (data_color_polygon) =>{
    const jsonData8 = JSON.stringify(data_color_polygon)
}
*/
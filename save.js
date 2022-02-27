const express = require('express')
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

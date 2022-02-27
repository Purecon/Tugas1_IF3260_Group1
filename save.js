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
const data
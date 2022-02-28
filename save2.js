jsonData = {
    jsonData1 : [],
    jsonData2 : [],
    jsonData3 : [],
    jsonData4 : [],
    jsonData5 : [],
    jsonData6 : [],
    jsonData7 : [],
    jsonData8 : []

}
const data_line = []
const data_color_line = []
const data_square = []
const data_color_square = []
const data_rectangle = []
const data_color_rectangle = []
const data_polygon = []
const data_color_polygon = []

    for(var i=0;i<data_line.length;i++){
        jsonData.jsonData1.push(data_line[i]);
    }
    for(var i=0;i<data_color_line.length;i++){
        jsonData.jsonData2.push(data_color_line[i]);
    }
    for(var i=0;i<data_square.length;i++){
        jsonData.jsonData3.push(data_square[i]);
    }
    for(var i=0;i<data_color_square.length;i++){
        jsonData.jsonData4.push(data_color_square[i]);
    }
    for(var i=0;i<data_rectangle.length;i++){
        jsonData.jsonData5.push(data_rectangle[i]);
    }
    for(var i=0;i<data_color_rectangle.length;i++){
        jsonData.jsonData6.push(data_color_rectangle[i]);
    }
    for(var i=0;i<data_polygon.length;i++){
        jsonData.jsonData7.push(data_polygon[i]);
    }
    for(var i=0;i<data_color_polygon.length;i++){
        jsonData.jsonData8.push(data_color_polygon[i]);
    }

    //Save
    localStorage.setItem('Buffer_List',JSON.stringify(jsonData));
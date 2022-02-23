"use strict";

function main() {
  // Get A WebGL context
  var canvas = document.querySelector("#canvas");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }

  //Get edit options
  var edit_index = 0
  var m = document.getElementById("editmenu");
  m.addEventListener("click", function() {
    edit_index = m.selectedIndex;
  });

  //Tempat menyimpan posisi TEMP
  var rectangles = [];

  //Clear data
  var c = document.getElementById("clearButton")
  c.addEventListener("click", function(){
    rectangles=[]
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  });

  //Click listener
  // const mouseLocation = gl.getUniformLocation(program, "u_mouse");
  let mouseX = 0;
  let mouseY = 0;

  function setMousePosition(e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = rect.height - (e.clientY - rect.top) - 1;
    if(edit_index==1 && mouseClicked){
      for(var i in rectangles){
        //DEBUG
        //console.log(rectangles[i])
  
        //For each element
        var rect_loop = rectangles[i]["vertex"]
        for(var j in rect_loop){
          var selisih_x = Math.abs(mouseX-rect_loop[j][0])
          var selisih_y = Math.abs(mouseY-rect_loop[j][1])
          
          if(selisih_x<10 && selisih_y<10){
            var width = rectangles[i]["size"][0]
            var height = rectangles[i]["size"][1]
            var new_width = 0
            var new_height = 0
            if(j==0){
              //DEBUG
              //console.log("Near vertex kiri bawah",rect_loop[j])

              //update size
              new_width = rectangles[i]["vertex"][1][0]-mouseX
              new_height = rectangles[i]["vertex"][2][1]-mouseY
              rectangles[i]["size"] = [new_width,new_height] 
              //update coordinate tengah
              rectangles[i]["coordinates"][0] = mouseX+new_width/2 
              rectangles[i]["coordinates"][1] = mouseY+new_height/2
              drawScene();
            }
            else if(j==1){
              //DEBUG
              //console.log("Near vertex kanan bawah",rect_loop[j])

              //update size
              new_width = mouseX-rectangles[i]["vertex"][0][0]
              new_height = rectangles[i]["vertex"][3][1]-mouseY
              rectangles[i]["size"] = [new_width,new_height] 
              //update coordinate tengah
              rectangles[i]["coordinates"][0] = mouseX-new_width/2 
              rectangles[i]["coordinates"][1] = mouseY+new_height/2
              drawScene();
            }
            else if(j==2){
              //DEBUG
              //console.log("Near vertex kiri atas",rect_loop[j])

              //update size
              new_width = rectangles[i]["vertex"][3][0]-mouseX
              new_height = mouseY-rectangles[i]["vertex"][0][1]
              rectangles[i]["size"] = [new_width,new_height] 
              //update coordinate tengah
              rectangles[i]["coordinates"][0] = mouseX+new_width/2 
              rectangles[i]["coordinates"][1] = mouseY-new_height/2
              drawScene();
            }
            else if(j==3){
              //DEBUG
              //console.log("Near vertex kanan atas",rect_loop[j])

              //update size
              new_width = mouseX-rectangles[i]["vertex"][2][0]
              new_height = mouseY-rectangles[i]["vertex"][1][1]
              rectangles[i]["size"] = [new_width,new_height] 
              //update coordinate tengah
              rectangles[i]["coordinates"][0] = mouseX-new_width/2 
              rectangles[i]["coordinates"][1] = mouseY-new_height/2
              drawScene();
            }
          }
        }
      }
    }
  }
  canvas.addEventListener('mousemove', setMousePosition);

  var mouseClicked = false;
  canvas.addEventListener("mousedown", function(event){
    mouseClicked = true;
    console.log("Clicked",mouseX,mouseY)
    if(edit_index==0){
      rectanglesProcess(mouseX,mouseY);
    }
  });
  
  canvas.addEventListener("mouseup", function(event){
    mouseClicked = false;
  });

  // Compile dan link shader yang akan digunakan
  var program = createProgramFromScripts(gl, ["vertex-shader-2d", "fragment-shader-2d"]);

  // look up where the vertex data needs to go.
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  var colorAttributeLocation = gl.getAttribLocation(program, "a_color");

  // look up uniform locations
  var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

  var positionBuffer = gl.createBuffer();
  var colorBuffer = gl.createBuffer();

  //Setup UI slider
  //Create slider
  var size = [100,100]
  setupSlider("#width", {value: size[0], slide: updateSize(0), max: gl.canvas.width });
  setupSlider("#height", {value: size[1], slide: updateSize(1), max: gl.canvas.height});
  //Check update
  function updateSize(index) {
    return function(event, ui) {
      size[index] = ui.value;
      drawScene();
    };
  }

  //Draw cet
  function drawRectangle(item, index)
  {
    //DEBUG
    //console.log("Rectangle:",item);

    var rect_posx = item["coordinates"][0];
    var rect_posy = item["coordinates"][1];

    // Create a buffer to put three 2d clip space points in
    // var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    var width = item["size"][0]
    var height = item["size"][1]
    var half_width = width/2
    var half_height = height/2
    // Simpan vertex
    item["vertex"] = [[rect_posx-half_width,rect_posy-half_height],
                      [rect_posx+half_width,rect_posy-half_height],
                      [rect_posx-half_width,rect_posy+half_height],
                      [rect_posx+half_width,rect_posy+half_height]]
    setRectangle(gl,item["vertex"][0][0],item["vertex"][0][1],width,height);
    
    // Create a buffer for the colors.
    // var colorBuffer = gl.createBuffer();
    // Bind the color buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    //Set warna
    var r1 = item["colors"][0];
    var b1 = item["colors"][1];
    var g1 = item["colors"][2];
    setColors(gl,r1,b1,g1);
    
    //DEBUG
    //console.log("Data rectangle:",rectangles)

    drawImage();
  }

  //Click handler for square
  function rectanglesProcess(positionX,positionY) {
    //Simpan rectangles
    var rectangle = [];
    //titik pusat yang di-klik
    rectangle["coordinates"] = [positionX,positionY];
    //Color random TEMP
    var r1 = Math.random();
    var b1 = Math.random();
    var g1 = Math.random();
    rectangle["colors"] = [r1,b1,g1];
    //Size
    rectangle["size"] = [size[0],size[1]];
    rectangles.push(rectangle);  
    drawScene();
  }

  function drawScene(){
    //Draw setiap rectangle
    rectangles.forEach(drawRectangle);
  }

  //Draw the image
  function drawImage(){
    resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    // gl.clearColor(0, 0, 0, 0);
    //gl.clear(gl.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
        positionAttributeLocation, size, type, normalize, stride, offset);

    // set the resolution
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    // Turn on the color attribute
    gl.enableVertexAttribArray(colorAttributeLocation);

    // Bind the color buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    // Tell the color attribute how to get data out of colorBuffer (ARRAY_BUFFER)
    var size = 4;          // 4 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      colorAttributeLocation, size, type, normalize, stride, offset);

    // draw
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 6;
    gl.drawArrays(primitiveType, offset, count);
  }
}


// Fill the buffer with the values that define a rectangle.
function setRectangle(gl, x, y, width, height) {
    var x1 = x;
    var x2 = x + width;
    var y1 = y;
    var y2 = y + height;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
       x1, y1,
       x2, y1,
       x1, y2,
       x1, y2,
       x2, y1,
       x2, y2,
    ]), gl.STATIC_DRAW);
}

// Fill the buffer with colors for the 2 triangles
// that make the rectangle.
// Note, will put the values in whatever buffer is currently
// bound to the ARRAY_BUFFER bind point
function setColors(gl,r1,b1,g1) {
  // Pick 2 random colors.
  // var r1 = Math.random();
  // var b1 = Math.random();
  // var g1 = Math.random();
  // var r2 = Math.random();
  // var b2 = Math.random();
  // var g2 = Math.random();

  gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(
        [ r1, b1, g1, 1,
          r1, b1, g1, 1,
          r1, b1, g1, 1,
          r1, b1, g1, 1,
          r1, b1, g1, 1,
          r1, b1, g1, 1]),
      gl.STATIC_DRAW);
}

// WebGL Utils
function createProgramFromScripts(
    gl, shaderScriptIds, opt_attribs, opt_locations, opt_errorCallback) {
  const shaders = [];
  for (let ii = 0; ii < shaderScriptIds.length; ++ii) {
    shaders.push(createShaderFromScript(
        gl, shaderScriptIds[ii], gl[defaultShaderType[ii]], opt_errorCallback));
  }
  return createProgram(gl, shaders, opt_attribs, opt_locations, opt_errorCallback);
  }
  
  function createProgram(
    gl, shaders, opt_attribs, opt_locations, opt_errorCallback) {
  const errFn = opt_errorCallback || error;
  const program = gl.createProgram();
  shaders.forEach(function(shader) {
    gl.attachShader(program, shader);
  });
  if (opt_attribs) {
    opt_attribs.forEach(function(attrib, ndx) {
      gl.bindAttribLocation(
          program,
          opt_locations ? opt_locations[ndx] : ndx,
          attrib);
    });
  }
  gl.linkProgram(program);
  
  // Check the link status
  const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
      // something went wrong with the link
      const lastError = gl.getProgramInfoLog(program);
      errFn('Error in program linking:' + lastError);
  
      gl.deleteProgram(program);
      return null;
  }
  return program;
  }
  
  function resizeCanvasToDisplaySize(canvas, multiplier) {
    multiplier = multiplier || 1;
    const width  = canvas.clientWidth  * multiplier | 0;
    const height = canvas.clientHeight * multiplier | 0;
    if (canvas.width !== width ||  canvas.height !== height) {
      canvas.width  = width;
      canvas.height = height;
      return true;
    }
    return false;
  }
  
  function createShaderFromScript(
    gl, scriptId, opt_shaderType, opt_errorCallback) {
  let shaderSource = '';
  let shaderType;
  const shaderScript = document.getElementById(scriptId);
  if (!shaderScript) {
    throw ('*** Error: unknown script element' + scriptId);
  }
  shaderSource = shaderScript.text;
  
  if (!opt_shaderType) {
    if (shaderScript.type === 'x-shader/x-vertex') {
      shaderType = gl.VERTEX_SHADER;
    } else if (shaderScript.type === 'x-shader/x-fragment') {
      shaderType = gl.FRAGMENT_SHADER;
    } else if (shaderType !== gl.VERTEX_SHADER && shaderType !== gl.FRAGMENT_SHADER) {
      throw ('*** Error: unknown shader type');
    }
  }
  
  return loadShader(
      gl, shaderSource, opt_shaderType ? opt_shaderType : shaderType,
      opt_errorCallback);
  }
  
  const defaultShaderType = [
    'VERTEX_SHADER',
    'FRAGMENT_SHADER',
  ];
  
  function loadShader(gl, shaderSource, shaderType, opt_errorCallback) {
    const errFn = opt_errorCallback || error;
    // Create the shader object
    const shader = gl.createShader(shaderType);
  
    // Load the shader source
    gl.shaderSource(shader, shaderSource);
  
    // Compile the shader
    gl.compileShader(shader);
  
    // Check the compile status
    const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
      // Something went wrong during compilation; get the error
      const lastError = gl.getShaderInfoLog(shader);
      errFn('*** Error compiling shader \'' + shader + '\':' + lastError + `\n` + shaderSource.split('\n').map((l,i) => `${i + 1}: ${l}`).join('\n'));
      gl.deleteShader(shader);
      return null;
    }
  
    return shader;
  }
  
  function error(msg) {
    if (topWindow.console) {
      if (topWindow.console.error) {
        topWindow.console.error(msg);
      } else if (topWindow.console.log) {
        topWindow.console.log(msg);
      }
    }
  }

  // WebGL UI
  // Setup UI
  const gopt = getQueryParams();
  function setupSlider(selector, options) {
    var parent = document.querySelector(selector);
    if (!parent) {
      // like jquery don't fail on a bad selector
      return;
    }
    if (!options.name) {
      options.name = selector.substring(1);
    }
    return createSlider(parent, options); // eslint-disable-line
  }
  
  //Create slider
  function createSlider(parent, options) {
    var precision = options.precision || 0;
    var min = options.min || 0;
    var step = options.step || 1;
    var value = options.value || 0;
    var max = options.max || 1;
    var fn = options.slide;
    var name = gopt["ui-" + options.name] || options.name;
    var uiPrecision = options.uiPrecision === undefined ? precision : options.uiPrecision;
    var uiMult = options.uiMult || 1;
  
    min /= step;
    max /= step;
    value /= step;
  
    //gman widget
    parent.innerHTML = `
      <div class="gman-widget-outer">
        <div class="gman-widget-label">${name}</div>
        <div class="gman-widget-value"></div>
        <input class="gman-widget-slider" type="range" min="${min}" max="${max}" value="${value}" />
      </div>
    `;
    var valueElem = parent.querySelector(".gman-widget-value");
    var sliderElem = parent.querySelector(".gman-widget-slider");
  
    function updateValue(value) {
      valueElem.textContent = (value * step * uiMult).toFixed(uiPrecision);
    }
  
    updateValue(value);
  
    function handleChange(event) {
      var value = parseInt(event.target.value);
      updateValue(value);
      fn(event, { value: value * step });
    }
  
    sliderElem.addEventListener('input', handleChange);
    sliderElem.addEventListener('change', handleChange);
  
    return {
      elem: parent,
      updateValue: (v) => {
        v /= step;
        sliderElem.value = v;
        updateValue(v);
      },
    };
  }
  
  //Query params 
  function getQueryParams() {
    var params = {};
    if (window.hackedParams) {
      Object.keys(window.hackedParams).forEach(function(key) {
        params[key] = window.hackedParams[key];
      });
    }
    if (window.location.search) {
      window.location.search.substring(1).split("&").forEach(function(pair) {
        var keyValue = pair.split("=").map(function(kv) {
          return decodeURIComponent(kv);
        });
        params[keyValue[0]] = keyValue[1];
      });
    }
    return params;
  }

main();
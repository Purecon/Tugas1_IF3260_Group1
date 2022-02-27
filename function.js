var m = document.getElementById("mymenu");

m.addEventListener("click", function() {
   cindex = m.selectedIndex;
    });

var a = document.getElementById("Button1")
a.addEventListener("click", function(){
numPolygons++;
numIndices[numPolygons] = 0;
start[numPolygons] = index;
render();
});

canvas.addEventListener("mousedown", function(event){
    t  = vec2(2*event.clientX/canvas.width-1,
       2*(canvas.height-event.clientY)/canvas.height-1);
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(t));

    t = vec4(colors[cindex]);

    gl.bindBuffer( gl.ARRAY_BUFFER, cBufferId );
    gl.bufferSubData(gl.ARRAY_BUFFER, 16*index, flatten(t));

    numIndices[numPolygons]++;
    index++;
} );


gl.viewport( 0, 0, canvas.width, canvas.height );
gl.clearColor( 0.8, 0.8, 0.8, 1.0 );
gl.clear( gl.COLOR_BUFFER_BIT );


//
//  Load shaders and initialize attribute buffers
//
var program = initShaders( gl, "vertex-shader", "fragment-shader" );
gl.useProgram( program );

var bufferId = gl.createBuffer();
gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
gl.bufferData( gl.ARRAY_BUFFER, 8*maxNumVertices, gl.STATIC_DRAW );
var vPos = gl.getAttribLocation( program, "vPosition" );
gl.vertexAttribPointer( vPos, 2, gl.FLOAT, false, 0, 0 );
gl.enableVertexAttribArray( vPos );

var cBufferId = gl.createBuffer();
gl.bindBuffer( gl.ARRAY_BUFFER, cBufferId );
gl.bufferData( gl.ARRAY_BUFFER, 16*maxNumVertices, gl.STATIC_DRAW );
var vColor = gl.getAttribLocation( program, "vColor" );
gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
gl.enableVertexAttribArray( vColor );


function render() {

gl.clear( gl.COLOR_BUFFER_BIT );

for(var i=0; i<numPolygons; i++) {
    gl.drawArrays( gl.TRIANGLE_FAN, start[i], numIndices[i] );
}
}
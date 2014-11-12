var document = window.document;
var pop = 0;
var d = new Date();
var time;
var old=0;
var buffer="";
function print(stuff) {
  time = d.getTime();
  if (time-old>2000){
      old=time
  //return undefined;
  window.requestAnimationFrame(function () {
    pop++;
    document.getElementById("note").innerHTML = pop;
    document.getElementById("log").innerHTML = document.getElementById("log").innerHTML +buffer;
      buffer="";
  });
  }else{
     buffer=buffer+stuff +"<br>" + stuff;
  }
}
//print("gogogogogoggo")
function myFunction() {
  cls();
  var isDrawing = true;
  var lines = document.getElementById("myText").value.split("\n");
  var bits = [];
  var E, Y, X;
  E = Y = X = 0;
  var pos2 = [];
  var pos1 = [];
  var drawtodate = false;
  var drawLock = false;
  var gline = [];
  //print(lines)
  for (var w = 0; w < lines.length; w++) {

    bits[bits.length] = lines[w].split(" ");
  }
  //print(bits.length)
  for (var i = 0; i < bits.length; i++) { //for LINE    
    //print("  "+bits[i]+"  ")
    //print(drawtodate)
    //print(bits[i])
    print("sdfgsdfsdfsdfsdfssdfdsfdsfdsdfs");
    if (bits[i][0].toLowerCase() == "g0") {
      print("sdfgsdfsdfsdfsdfssdfdsfdsfdsdfs");
      print(bits[i]);
      if (bits[i][1].toLowerCase() == "e-1") {
        isDrawing = false;
        drawtodate = false;
        print("not drawing");
      } else if (bits[i][1].toLowerCase() == "e0") {
        isDrawing = true;
        drawtodate = false;
        print("drawing");
      } else {
        for (var z = 0; z < bits[i].length; z++) {
          if (bits[i][z].charAt(0).toLowerCase() == "y") {
            pos1[1] = bits[i][z].replace("y", "").replace("Y", "");
          } else if (bits[i][z].charAt(0).toLowerCase() == "x") {
            pos1[0] = bits[i][z].replace("x", "").replace("X", "");
          } else if (bits[i][z].charAt(0).toLowerCase() == "e") {
            pos1[2] = bits[i][z].replace("e", "").replace("E", "");
          }
        }
        drawLock = false;
        drawtodate = false;
      }
    }
    if (bits[i][0].toLowerCase() == "g1") {
      drawLock = true;
      
      if (drawtodate === false) {
        drawtodate = true;
        for (var z = 0; z < bits[i].length; z++) {
          //print("test")
          //print(bits[i][z])

          if (bits[i][z].charAt(0).toLowerCase() == "y") {
            pos2[1] = bits[i][z].replace("y", "").replace("Y", "");
          } else if (bits[i][z].charAt(0).toLowerCase() == "x") {
            pos2[0] = bits[i][z].replace("x", "").replace("X", "");
          } else if (bits[i][z].charAt(0).toLowerCase() == "e") {
            pos2[2] = bits[i][z].replace("e", "").replace("E", "");
          }
        }
        //print(pos1+"<br>"+pos2)
      } else if (isDrawing) {
        for (var z = 0; z < bits[i].length; z++) {
          if (bits[i][z].charAt(0).toLowerCase() == "y") {
            pos1[1] = bits[i][z].replace("y", "").replace("Y", "");
          } else if (bits[i][z].charAt(0).toLowerCase() == "x") {
            pos1[0] = bits[i][z].replace("x", "").replace("X", "");
          } else if (bits[i][z].charAt(0).toLowerCase() == "e") {
            pos1[2] = bits[i][z].replace("e", "").replace("E", "");
          }
        }
        drawtodate = false;
      }



      drawtodate=true//make pos1 update next

    } else {
      //document.getElementById("demo").innerHTML =[bits[i],i];
    }
    gline = [pos1, pos2, i];
    if (drawLock) {
      print ("DRAWING THAT")
      window.setTimeout(drawLineLater(gline, isDrawing), 1);
    } else {
      print("NOT DRAWING THAT");
    }
  }
  pop = 0;
}
var drawLineLater = function(gline, isDrawing) {
  return function() {drawline(gline, isDrawing);};
};
//parseFloat(x);

var count = 0;
var Pos1 = [];
var Pos2 = [];

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var center = [0, 0];
var scale = [10, 10];
var drop = false;
cls();

function cls() {
  ctx.clearRect(0, 0, c.width, c.height);
  center = [0, 0];
  scale = [10, 10];
  drop = false;
  for (var i = 0; i < 1000; i = i + 10) {
    drawline([[i, 0], [i, 400]], true);
    drawline([[0, i], [400, i]], true);
  }
  drop = true;
}

function drawline(gline, isDrawing) {
  //alert(gline);
  if (isDrawing) {
    count = count + 1;
    var pos1 = gline[0];
    var pos2 = gline[1];
    if (drop) {
      scale[0] = document.getElementById("sx").value;
      scale[1] = document.getElementById("sy").value * -1;//-1 accounts for the flit on Y axis add check box for both!
      center[0] = document.getElementById("px").value;
      center[1] = document.getElementById("py").value;

      print("asdasd");
      print(scale);
      print(center);
    }
    Pos1 = [(parseFloat(pos1[0]) * scale[0]) + parseFloat(center[0]), (parseFloat(pos1[1]) * scale[1]) + parseFloat(center[1])];
    Pos2 = [(parseFloat(pos2[0]) * scale[0]) + parseFloat(center[0]), (parseFloat(pos2[1]) * scale[1]) + parseFloat(center[1])];
    if (drop) {
      print(Pos1);
    }
    //print("X1__"+Pos1[0]+"Y1__"+Pos1[1]+",X2__"+Pos2[0]+"Y2__"+Pos2[1]+"line:"+count)
    //setTimeout(function(){, 1)

    ctx.moveTo(Pos1[0], Pos1[1]);
    ctx.lineTo(Pos2[0], Pos2[1]);
    ctx.stroke();
  }
}

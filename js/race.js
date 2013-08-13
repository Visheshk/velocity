var c1speed = 0, c2speed = 0, update = 0, c1speedDisp = 0 ,c2speedDisp = 0, pause = 0, car2Motion = 0, cameraView = 1;
var trees = new Layer();
var cars = new Layer();
var buttons = new Layer();


      var hitOptions = {
        segments: true,
        stroke: true,
        fill: true,
        tolerance: 15
      };

      /*function stopCar(carNo){
        if (carNo == 1){
          c1speed = 0;
          document.getElementById('zoomVal').innerHTML = c1speed;
          car1s.content = c1speed;
        }
        if (carNo == 2){
          c2speed = 0;
          document.getElementById('zoomVal').innerHTML = c2speed;
          car2s.content = c2speed;
        }
      }*/

      $('#scale').change(function(evt) { 
          c1speed = evt.target.valueAsNumber;
          document.getElementById('zoomVal').innerHTML = c1speed;
          car1s.content = c1speed;
          update = 1;
      });
      $('#scale2').change(function(evt) { 
          c2speed = evt.target.valueAsNumber;
          document.getElementById('zoomVal2').innerHTML = c2speed;
          car2s.content = c2speed;
          update = 1;
      });

      trees.activate();
      var tree = new Raster('tree');
      tree.position = new Point(10, 10);
      for (var i = 0; i < 7; i++) {
        var copy = tree.clone();
        copy.position.x += 2 * i * copy.bounds.width;
      }

      var tree2 = tree.clone();
      tree2.position = new Point(10, 400);
      for (var i = 0; i < 7; i++) {
        var copy = tree2.clone();
        copy.position.x += 2 * i * copy.bounds.width;
      }

      buttons.activate();
      var p = new Rectangle(new Point(500, 40), new Point(550, 80));
      var pauseB = new Path.RoundRectangle(p, 2);
      pauseB.name = 'pause';
      pauseB.fillColor = '#ffffff';
      pauseB.strokeColor = '#222222';
      pauseBT = new PointText(new Point(510, 65)); // pause Button Text
      pauseBT.name = 'pauseText';
      pauseBT.fillColor = 'black';
      pauseBT.content = 'Pause';
      
      cars.activate();
      var car1, car1s;
      /*var c1 = new Rectangle(new Point(100, 100), new Point(200, 150));
      car1 = new Path.RoundRectangle(c1, 5);*/
      car1 = new Raster('car1');
      car1.position = new Point(125, 175);
      car1.name = 'car1';
      car1.fillColor = '#cccccc';
      car1.strokeColor = '#222222';
      car1s = new PointText(new Point(120, 180));
      car1s.name = 'car1s';
      car1s.fillColor = 'white';
      car1s.content = c1speed;

      var car2, car2s;
      var c2 = new Rectangle(new Point(100, 225), new Point(200, 275));
      //car2 = new Path.RoundRectangle(c2, 5);*/
      car2 = new Raster('car2');
      car2.position = new Point(125, 300);
      car2.name = 'car2';
      car2.fillColor = '#ddeedd';
      car2.strokeColor = '#222222';
      car2s = new PointText(new Point(120, 305));
      car2s.name = 'car2s';
      car2s.fillColor = 'white';
      car2s.content = c1speed;
      car2.visible = false;
      car2s.visible = false;

      buttons.activate();
      butt2 = new Path.RoundRectangle(c2, 5);
      butt2.position = car2.position;
      butt2.position.x = 125;
      butt2.name = 'car2';
      butt2.fillColor = '#ddeedd';
      butt2.strokeColor = '#222222';
      butt2s = new PointText(new Point(90, 305));
      butt2s.name = 'car2s';
      butt2s.fillColor = 'black';
      butt2s.content = 'Toggle car 2';

      var cb = new Rectangle(new Point(500, 80), new Point(550, 120));
      var cButt = new Path.RoundRectangle(cb, 2);
      cButt.name = 'pause';
      cButt.fillColor = '#ffffff';
      cButt.strokeColor = '#222222';
      cButtT = new PointText(new Point(505, 105)); // pause Button Text
      cButtT.name = 'cameraText';
      cButtT.fillColor = 'black';
      cButtT.content = 'Camera';
      
      var rect2 = new Path.Rectangle(new Point(590, 0), new Point(810, 130));
      rect2.fillColor = 'white';
      rect2.strokeWidth = 5;
      rect2.strokeColor = 'grey';
      //Camera view set up here
      var rect = new Path.Rectangle(new Point(590, 0), new Point(810, 130));
      var camera1 = new Layer(rect);
      camera1.activate();
      camera1.clipped = true;
      camera1.opacity = 0.8;
      
      var trees3 = new Group();
      trees3.opacity = 0.8;
      var tree3 = tree2.clone();
      tree3.position = new Point(10, 60);
      trees3.addChild(tree3);

      for (var i = 0; i < 20; i++) {
        var copy = tree3.clone();
        copy.position.x += 2 * i * copy.bounds.width;
        trees3.addChild(copy);
      }
      trees3.bounds.x = rect.bounds.x - car2.bounds.x;
      
      trees3.scale(-1, -1);
      trees3.rotate(180, rect.bounds.center);
      var carSide = new Raster('car-s');
      carSide.position = new Point(10, 110);
      carSide.opacity = 0.9;
      carSide.bounds.x = trees3.bounds.x + trees3.bounds.width - car2.bounds.x - carSide.bounds.width;
      console.log(trees3.bounds.x + trees3.bounds.width);
      camera1.visible = false;

    //Camera 2 view set up here
      var rect3 = rect.clone();
      var camera2 = new Layer(rect3);
      //camera2.clipped = true;
      camera2.opacity = 0.8;
      camera2.activate();
      
      var trees4 = new Group();
      trees4.opacity = 0.8;
      var tree4 = tree2.clone();
      tree4.position = new Point(10, 60);
      trees4.addChild(tree4);

      for (var i = 0; i < 20; i++) {
        var copy = tree4.clone();
        copy.position.x += 2 * i * copy.bounds.width;
        trees4.addChild(copy);
      }
      trees4.bounds.x = rect.bounds.x - car1.bounds.x;
      
      var car2Side = new Raster('car-s2');
      car2Side.position = new Point(10, 110);
      car2Side.opacity = 0.9;
      console.log(trees4.bounds.x + trees4.bounds.width);
      camera2.visible = true;

      toggleCar2();

      function toggleCar2(){
        if(car2.visible == false){
          car2.visible = true;
          car2s.visible = true;
          butt2.position.y += 100;
          butt2s.position.y += 100;
          car2Motion = 1;
        }
        else{
          car2.visible = false;
          car2s.visible = false;
          butt2.position.y -= 100;
          butt2s.position.y -= 100; 
          car2Motion = 0;
        }
      }

      function togglePause(){
        if(pause == 0){
          pause = 1;
          pauseBT.content = 'Play';
        }
        else if (pause == 1){
          pause = 0;
          pauseBT.content = 'Pause';
        }
      }

      function toggleCamera(){
        if(cameraView == 0){
          camera2.visible = true;
          camera1.visible = false
          cameraView = 1;
        }
        else if(cameraView = 1){
          camera2.visible = false;
          camera1.visible = true;
          cameraView = 0;

        }
      }

      function onMouseMove(event){
        var hitResult = project.hitTest(event.point, hitOptions);
        var obj;
        //butt2.fillColor = '#ddeedd';
        //pauseB.fillColor = '#ffffff';
        buttons.selected = false;
        if (hitResult){
          obj = hitResult.item;
        }
        if(obj == butt2 || obj == pauseB || obj == cButt){
          //obj.fillColor = '#ffeedd';
          obj.selected = 'true';
        }

      }

      function onMouseDown(event){
        var hitResult = project.hitTest(event.point, hitOptions);
        var obj;
        if (hitResult){
          obj = hitResult.item;
        }
        if(obj == butt2){
          toggleCar2();
        }
        else if (obj == pauseB){
          togglePause();
        }
        else if (obj == cButt){
          toggleCamera();
        }
      }

      function updateCamera(){
        trees3.bounds.x = rect.bounds.x + rect.bounds.width - trees3.bounds.width + car1.bounds.x;
        carSide.bounds.x = trees3.bounds.x + trees3.bounds.width - car2.bounds.x - carSide.bounds.width;  
        if (car2Motion == 0){
          carSide.visible = false;
        }
        else if (car2Motion == 1){
          carSide.visible = true;
        }

        trees4.bounds.x = rect.bounds.x - car2.bounds.x;
        car2Side.bounds.x = trees4.bounds.x + car1.bounds.x;
        //car2Side.bounds.x = 
      }

      function updateSpeed(){
        car1.right = car1.bounds.x + car1.bounds.width;
        car1.left = car1.bounds.x;

        car2.right = car2.bounds.x + car2.bounds.width;
        car2.left = car2.bounds.x;

        if(car2Motion == 1){
          if(car1.right >= car2.left && car1.left <= car2.right){
            c1speedDisp = c1speed - c2speed;
            c2speedDisp = (-1) * c1speedDisp;
            car1s.content = c1speedDisp;
            car2s.content = c2speedDisp;
          }
          else{
            car1s.content = c1speed;
            car2s.content = c2speed;
          }
        }
        else if (car2Motion == 0){
          car1s.content = c1speed;
        }
      }

      function moveCar(carN){
        if(carN == 1){
          car1.position.x += (c1speed / 3);
          car1s.position.x = car1.position.x + 40;
          if (car1.position.x > project.view.bounds.width){
            car1.position.x = 0;
            
          }
          else if (car1.position.x < 0){
            car1.position.x = project.view.bounds.width;
          }


        }
        else if (carN == 2 && car2Motion == 1) {
          car2.position.x += (c2speed / 3);
          car2s.position.x = car2.position.x + 40;
    
          if (car2.position.x > project.view.bounds.width){
            car2.position.x = 0;
            
          }
          else if (car2.position.x < 0){
            car2.position.x = project.view.bounds.width;
          }
        }
        updateSpeed();
      }

      function onFrame(event) {
        if (update == 1){
          update = 0;
          //car1.position.x = 125;
          //car1s.position.x = 120;
        }
        if(pause == 0){
          moveCar(1);
          moveCar(2);
        }
        updateCamera();
        
      }

      // Reposition the paths whenever the window is resized:
      /*function onResize(event) {
        layer.position = view.center;
      }*/
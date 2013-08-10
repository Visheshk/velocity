var c1speed = 0, c2speed = 0, update = 0, c1speedDisp = 0 ,c2speedDisp = 0, pause = 0, car2Motion = 0;
var trees = new Layer();
var cars = new Layer();
var buttons = new Layer();


      var hitOptions = {
        segments: false,
        stroke: false,
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
      butt2.position.x = 125;
      butt2.name = 'car2';
      butt2.fillColor = '#ddeedd';
      butt2.strokeColor = '#222222';
      butt2s = new PointText(new Point(90, 255));
      butt2s.name = 'car2s';
      butt2s.fillColor = 'black';
      butt2s.content = 'Toggle car 2';


            
      
      
      //camera1.bounds = rect;
      
      var rect = new Path.Rectangle(new Point(590, 0), new Point(810, 130));
      
      
      var camera1 = new Layer(rect);
      camera1.clipped = true;
      camera1.opacity = 1;
      var rect2 = new Path.Rectangle(new Point(595, 5), new Point(805, 125));
      //rect2.scale(0.8);
      rect2.fillColor = 'white';
      //rect2.opacity = 1;
      rect2.strokeWidth = 15;
      rect2.strokeColor = 'grey';
      
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
      trees3.bounds.x = rect.bounds.x - car1.bounds.x;
      
      trees3.scale(-1, -1);
      trees3.rotate(180, rect.bounds.center);
      console.log(trees3.bounds.x + trees3.bounds.width - rect.bounds.x - rect.bounds.width, rect.bounds.x, car1.bounds.x + car1.bounds.width);
      //trees3.bounds.x = rect.bounds.x - car1.bounds.x;
      //console.log(trees3.bounds.x, rect.bounds.x, car1.bounds.x);
      //trees3.bounds.x = rect.bounds.x - car1.bounds.x;
      //console.log(trees3.bounds.x, rect.bounds.x, car1.bounds.x);
      //var c3 = car2.clone();
      //c3.position = camera1.bounds.center;
      



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

      function onMouseMove(event){
        var hitResult = project.hitTest(event.point, hitOptions);
        var obj;
        //butt2.fillColor = '#ddeedd';
        //pauseB.fillColor = '#ffffff';
        buttons.selected = false;
        if (hitResult){
          obj = hitResult.item;
        }
        if(obj == butt2 || obj == pauseB){
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
        if (obj == pauseB){
          togglePause();
        }
      }

      function updateCamera(){
        //trees3.bounds.x = camera1.bounds.x - car1.bounds.x;
        //console.log(trees3.bounds.x, camera1.bounds.x, car1.bounds.x);
        //trees3.visible = false;
        //trees3.bounds.x = rect.bounds.x - car1.bounds.x;
        //trees3.scale(-1, -1);
        //trees3.rotate(180, rect.bounds.center);
        //trees3.visible = true;
        trees3.bounds.x = rect.bounds.x + rect.bounds.width - trees3.bounds.width + car1.bounds.x;
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
        else if (carN == 2) {
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
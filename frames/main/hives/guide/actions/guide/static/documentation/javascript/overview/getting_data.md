In order to get information from your Leap Motion detector you need

* a Leap Motion Detector plugged into your computer
* the Leap Motion software installed. (leapd, a websocket service)

Once this is established, you need to interact with the data coming from the hardware via leapd.
This site covers interactions based on the javascript API library that binds Leap Motion data
to a javascript code that listens for this data to stream to it.

There are three ways to access this data:

1. Call Leap.loop, as shown in this jsfiddle.
2. Create a controller and passively listen for frame events.
3. Create a controller and actively call controller.frame() when you want motion data.

### 1. Adding a listener to frames via Leap.loop

Leap.loop(handler) allows you to skip creating a controller instance.

``` javascript
Leap.loop(function(frameInstance){
  ...
  });
```

### 2. Event listening from a Controller

if you listen to a controllers' events each and every frame will be broadcast from the Leap detector to your handler.

``` javascript
  var my_controller = new Leap.Controller({enableGestures: true});
  // see Controller documentaion for option details
  my_controller.on('frame', function(frame_instance){ ... });
  my_controller.connect();
```

### 3. Polling a Leap.Controller (probably the best way)

Polling will allow you to get one (or more) frames from the controller's stack, whenever and as often or rarely as you wish.

``` javascript
  var my_controller = new Leap.Controller({enableGestures: true});

  my_controller.on('connect', function(){
    setInterval(function(){
      var frame = my_controller.frame();
    }, 500);
  });

  my_controller.connect();
```

This has several potential advantages:

* You can control the number of measurements yourself; you might only need 10 frames of information per second,
* so why do six times as much processing? tying your polling to your rendering is more efficient since there may be no
 value to getting more than one frame per render cycle.
* You can get the best sample out of several measurements. You can sample the last 8 frames,
and get the one with the most pointers/fingers/hands and use that to drive your application.
* You can stay informed as to changes in state if the user disconnects their Leap Motion hardware.

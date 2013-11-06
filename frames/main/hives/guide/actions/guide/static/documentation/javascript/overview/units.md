All distances are expressed in millimeters, as a float. If you want to get relative (percent) measurements,
use the InteractionBox.normalizePoint method. See the Leap.InteractionBox documentation for axis orientation.

All angles are measured in Radians. To convert to degrees, multiply by 180/Math.PI.

All time/timestamp measurements are given in milliseconds; 1,000,000 milliseconds = 1 second.
Timestamps are relative measures of time since the Leap Motion controller started.

Frame indexes reflect the LIFO nature of the Leap.Controller's frames collection.

* my_controller.frames(0) == my_controller.frames() == the most recent frame.
* my_controller.frames(1) is the previous frame
* my_controller.frames(2) is two frames ago

and so on. Keep in mind that frames are constantly being pushed onto the stack,
so my_controller(2) will be a different frame in a few milliseconds.
When in doubt use frame.id to identify/compare frames.

All coordinates/positions are returned as an array of three distances (see above).
See [Leap.InteractionBox](#Leap.InteractionBox) for methods on normalizing/denormalizing coordinates.
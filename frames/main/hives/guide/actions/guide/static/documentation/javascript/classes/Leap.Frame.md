A collection of state information fed back from the Leap Motion hardware. A frame is the "root" data unit;
it contains all the positional data that streams from the Leap Motion detector,
[Fingers/Tools/Pointables](#pointable) at a given instant in time.

See [Getting Frames from your Leap Motion controller](#/overview/getting_data) for documentation on getting frame
information.

#### A note on `Frame.Fingers`, `Frame.pointable`, and `Frame.tools`:

![Pointables Venn](/images/pointables/pointables.png)

`Frame.fingers`', `Frame.tools` and  `Frame.pointable` are different collections of  instances of
the [Leap.Pointable](#Leap.Pointable) base class. (there is no special Leap.Tools or Leap.Fingers classs.)
* The `Frame.pointables` collections contains all the pointables whether they are fingers or tools -- from both hands.
* The `Frame.tools` collections and the `Frame.fingers` collections are exclusive; there is no pointer which can be
  found in both the fingers collection <i>and</i> the tools collection
* All pointables in these root collections are concatenations of data fromm `Frame.hands` and can be found in the `frame.hands` properties..</li>
* Any of these collections *can be empty*, if the user's hands/fingers/tools aren't picked up by the Leap Motion controller.
* All [Fingers/Tools/Pointables](#pointable) from both hands are stored with no ordering in these root level collections.
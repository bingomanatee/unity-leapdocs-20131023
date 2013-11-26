The Gesture class represents a recognized movement by the user. The Leap watches the activity within its field of view for certain movement patterns typical of a user gesture or command. For example, a movement from side to side with the hand can indicate a swipe gesture, while a finger poking forward can indicate a screen tap gesture. When the Leap recognizes a gesture, it assigns an ID and adds a Gesture object to the frame gesture list. For continuous gestures, which occur over many frames, the Leap updates the gesture by adding a Gesture object having the same ID and updated properties in each subsequent frame. Important: Recognition for each type of gesture must be enabled; otherwise no gestures are recognized or reported. Subclasses of Gesture define the properties for the specific movement patterns recognized by the Leap.

The Gesture subclasses for include:

#### CircleGesture

A circular movement by a finger

#### SwipeGesture

A straight line movement by the hand with fingers extended

#### ScreenTapGesture

A forward tapping movement by a finger

#### KeyTapGesture

A downward tapping movement by a finger

#### Number of gestures produced

Circle and swipe gestures are continuous and these objects can have a state of start, update, and stop.

The screen tap gesture is a discrete gesture. The Leap only creates a single ScreenTapGesture object appears for each tap and it always has a stop state.

### Getting Gesture instances from a Frame object

You can get a list of gestures from the Frame gestures array. You can also use the `Frame.gesture(stringId)` method to
find a gesture in the current frame using an ID value obtained in a previous frame. In the latter case note
that as `Frame.gesture(id)` will always return a Gesture object you will need to inspect its
[validity](#/overview/validity) in case the gesture is no longer being made.
Valid and Invalid function return results
Any function which returns an instance object (Pointable, Frame, Hand,...) will ALWAYS return an object, even under conditions where returning an object is impossible. (bad parameters, your hands aren't in front of the detector, etc.) Instead of returning false, null, or throwing an error, an invalid instance will be returned.

This means you will want to examine the `valid` property of all returned objects. Its a boolean property and all Leap
instances have one.
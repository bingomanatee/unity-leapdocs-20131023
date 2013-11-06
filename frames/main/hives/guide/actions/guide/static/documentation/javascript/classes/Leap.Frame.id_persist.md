<a name="Leap.Frame_pointable_persistence" class="anchor"></a>
#### Pointable ID persistence

Note that ID values persist across frames, but only until tracking of a particular object is lost.

If tracking of a tool/finger/pointable is lost and subsequently regained,
the new [Leap.Pointable](#Leap.Pointable) object representing that tool may have a different ID
than that representing the tool in an earlier frame.


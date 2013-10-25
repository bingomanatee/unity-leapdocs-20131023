using UnityEngine;
using System.Collections;
using Leap;

public class FrontFingerFinder
{

	/**
	 * This statid function will return the front (highest Z) most finger from the hands.
	 * 
	 * NOTE: will ALWAYS  return a finger -- when there is no valid frontmost, it returns the invalid finger.
	 * check the .isValid property of the returned finger.
	 */
	
	public static Finger FindFrontFinger (Frame frame)
	{
		
		Finger front = Finger.Invalid;
		
		if (frame.IsValid) {
			foreach (Hand h in	frame.Hands) {
				if (h.IsValid && h.Fingers.Count > 0) {
					Finger h_front = h.Fingers.Frontmost;
					if (!front.IsValid) {
						front = h_front;
					} else if (front.StabilizedTipPosition.ToUnity ().z < h_front.StabilizedTipPosition.ToUnity ().z) {
						front = h_front;
					}
				}
			}
		}
		
		return front;
		
	}
}

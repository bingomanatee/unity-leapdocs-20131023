using UnityEngine;
using System.Collections;
using Leap;

public class LeapManager : MonoBehaviour
{
	public GameObject cursor;
	private Controller leapController;
	private static LeapManager manager;
	private static LightedPodium lockedPodium = null;
	// Use this for initialization
	void Start ()
	{
		manager = this;
	}
	
	// Update is called once per frame
	void Update ()
	{
		MoveCursor ();
		
		HighlightCursorTarget();
	}
	
	public static bool PodiumLocked(LightedPodium podium){
		return podium == lockedPodium;
	}
	
	public static bool PodiumLocked(){
		return lockedPodium != null;
	}
	
	public static void lockPodium (LightedPodium podium){
		
		if (!lockedPodium ){ // must unlock first
			lockedPodium = podium;
		}
	}
	
	public static void unlockPodium(){
		lockedPodium = null;
	}
	
	private string CleanRots (Finger finger)
	{
		Vector3 rot = finger.Direction.ToUnity ();
		
		int x = (int)(rot.x * 10);
		int y = (int)(rot.y * 10);
		int z = (int)(rot.z * 10);
		
		return " X: " + x .ToString () + ", Y: " + y.ToString () + ", Z: " + z.ToString ();
	}
	
	private void HighlightCursorTarget(){
		
		if( CursorScript.Cast(cursor).myTarget != null){
			PodiaTarget.Cast(CursorScript.Cast (cursor).myTarget).Target();
		}
		
	}
		
	private void MoveCursor ()
	{
				
		if (null == leapController) {
			leapController = new Controller ();   
		}
		if (null == leapController)
			return;
		
		Frame frame = leapController.Frame ();
		
				CursorScript.Cast (cursor).MoveByFrame(frame);

	}
}

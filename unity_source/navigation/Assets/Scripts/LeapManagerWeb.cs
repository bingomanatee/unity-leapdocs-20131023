using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class LeapManagerWeb : MonoBehaviour
{
	public GameObject cursor;
	private static LeapManagerWeb manager;
	private static LightedPodium lockedPodium = null;
	public GameObject ceilingLight, fillLight, topLight;
	private float CEILING_LIGHT_MAX_INTENSITY, FILL_LIGHT_INTENSITY, TOP_LIGHT_INTENSITY;
	private const float LIGHT_GROW = 0.1f;
	// Use this for initialization
	private float time = 0;
	private const float HEARTBEAT = 3.0f;
	public List<Vector3> fingers;
	public int finger_count = 0;
	private Vector3 current_finger = new Vector3 (0, 0, 0);
	private float IB_DEPTH = 0, IB_WIDTH = 0, IB_HEIGHT = 0;
	
	private const float GO_PAUSE = 0.25f;
	
	private static float goTime = 0;
	public static string goTo = "";
	
	void Start ()
	{
		CEILING_LIGHT_MAX_INTENSITY = LightCast (ceilingLight).intensity;
		LightCast (ceilingLight).intensity = CEILING_LIGHT_MAX_INTENSITY / 100f;
		FILL_LIGHT_INTENSITY = LightCast (fillLight).intensity;
		LightCast (fillLight).intensity = FILL_LIGHT_INTENSITY / 100f;
		TOP_LIGHT_INTENSITY = LightCast (topLight).intensity;
		LightCast (topLight).intensity = TOP_LIGHT_INTENSITY / 100f;
		manager = this;
		
		TellWeb ("unity started");
	}
	
	// Update is called once per frame
	void Update ()
	{
		
		if (Time.time - time > HEARTBEAT) {
			TellWeb ("unity running");
			time = Time.time;
		}
		
		HighlightCursorTarget ();
			
		BringUpHouseLights ();
		
		if(goTime > 0 && (Time.time - goTime > GO_PAUSE)){
			TellWeb("GO " + goTo);
			goTime = 0;
			lockedPodium = null;
			LightedPodium.targetedPodium = null;
		}
	}
	
	public static void Go(string gt){
		goTo = gt;
		goTime = Time.time;
	}
	
	private void BringUpHouseLights ()
	{
		if (LightCast (ceilingLight).intensity < CEILING_LIGHT_MAX_INTENSITY) {
			LightCast (ceilingLight).intensity += LIGHT_GROW;
		}
		if (LightCast (fillLight).intensity < FILL_LIGHT_INTENSITY) {
			LightCast (fillLight).intensity += LIGHT_GROW;
		}
		if (LightCast (topLight).intensity < TOP_LIGHT_INTENSITY) {
			LightCast (topLight).intensity += LIGHT_GROW;
		}
	}
	
	public static bool PodiumLocked (LightedPodium podium)
	{
		return podium == lockedPodium;
	}
	
	public static bool PodiumLocked ()
	{
		return lockedPodium != null;
	}
	
	public static void TellWeb (string s)
	{
		//Debug.Log ("TellWeb " + s);
		Application.ExternalCall ("HearSomethingFromUnity", s);	
	}
	//access data (and print it)
	void accessData (JSONObject obj, string context)
	{
		
		if (context == "root") {
			fingers = new List<Vector3> ();
		}
		
		switch (obj.type) {
		case JSONObject.Type.OBJECT:
			for (int i = 0; i < obj.list.Count; i++) {
				string key = (string)obj.keys [i];
				JSONObject j = (JSONObject)obj.list [i];
				accessData (j, key);
			}
			break;
			
		case JSONObject.Type.ARRAY:
			// inferring structure from nested array
			foreach (JSONObject j in obj.list) {
				if (context == "hands") {
					accessData (j, "hand");
				} else if (context == "hand") {
					accessData (j, "finger");
				} else if (context == "finger") {
					accessData (j, "finger.value");
				} else {
					accessData (j, context);
				}
			}
			break;
			
		case JSONObject.Type.STRING:
			Debug.Log (obj.str);
			break;
			
		case JSONObject.Type.NUMBER:
			JSONNumber (obj, context);
			break;
			
		case JSONObject.Type.BOOL:
			//Debug.Log (obj.b);
			break;
			
		case JSONObject.Type.NULL:
		//	Debug.Log ("NULL");
			break;
 
		}
	}
	
	private void JSONNumber (JSONObject obj, string context)
	{
		//	TellWeb ("NUMBER context: " + context);
		
		if (context == "width") {
			IB_WIDTH = obj.n;
		} else if (context == "height") {
			IB_HEIGHT = obj.n;
		} else if (context == "depth") {
			IB_DEPTH = obj.n;
		} else {	
			//	TellWeb ("finger value: " + context);
			switch (finger_count) {
			case 0:
				current_finger.x = obj.n;
				break;
							
			case 1: 
				current_finger.y = obj.n;
				break;
							
			case 2: 
				current_finger.z = obj.n;
				fingers.Add (current_finger);
				current_finger = new Vector3 (0, 0, 0);
				++finger_count;
				break;
			} // end finger count switch
			++finger_count;
		}

		//	Debug.Log (obj.n);
	}

	public void ListenWeb (string s)
	{
		try {
			fingers.Clear ();
			finger_count = 0;
			JSONObject j = new JSONObject (s);
			accessData (j, "root");
			//TellWeb (fingers.Count.ToString () + " fingers found");
			
			//	TellWeb ("Height: " + IB_HEIGHT.ToString ());
			//	TellWeb ("Width: " + IB_WIDTH.ToString ());
			//	TellWeb ("Depth: " + IB_DEPTH.ToString ());
		} catch (UnityException ex) {
			TellWeb ("OOPS!" + ex.ToString ());
		}
		ProcessFingers ();
	}
	
	void ProcessFingers ()
	{
		
		if (fingers.Count < 1) {
			return;
		}
		
		// TellWeb("processing fingers" + finger_count.ToString());
		Vector3 nearestFinger = fingers [0];
		
		foreach (Vector3 finger in fingers) {
			if ((nearestFinger.z < finger.z)) {
				nearestFinger = finger;
			}
		}
		// Debug.Log ("moving cursor to " + nearestFinger.ToString());
		CursorScript.Cast (cursor).MoveByFinger (nearestFinger, new Vector3 (IB_WIDTH, IB_HEIGHT, IB_DEPTH));
		TellWeb ("frame done");
	}
	
	public static Light LightCast (GameObject gobj)
	{ 
		return (Light)gobj.GetComponent ("Light");
	}
	
	public static void lockPodium (LightedPodium podium)
	{
		
		if (!lockedPodium) { // must unlock first
			lockedPodium = podium;
			PageMessage ("UnityDocTopic", podium.messageWhenLocked);
		}
		
	}
	
	private  static void PageMessage (string fn, string msg)
	{
		Application.ExternalCall (fn, msg);
	}
	
	public static void unlockPodium ()
	{
		lockedPodium = null;
	}
	
	private void HighlightCursorTarget ()
	{
		
		if (CursorScript.Cast (cursor).myTarget != null) {
			PodiaTarget target = PodiaTarget.Cast (CursorScript.Cast (cursor).myTarget);
			target.Target();
			LightedPodium targetedPodium = LightedPodium.Cast(target.podium);
			if (target != null){
				//TellWeb("Targeting " + targetedPodium.LabelText());
			}
		} else {
			LightedPodium.targetedPodium = null;
		}
		
	}
		
}

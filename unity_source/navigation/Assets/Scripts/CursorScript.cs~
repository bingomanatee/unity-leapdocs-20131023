using UnityEngine;
using System.Collections;
using Leap;

public class CursorScript : MonoBehaviour
{
	const float Z_OFFSET = 5f;
	const float Y_OFFSET = 1f;
	public const float X_SCALE = 0.15f;
	public const float Y_SCALE = 0.2f;
	public const float Z_SCALE = 0.2f;
	public const float ROT_Y_SCALE = 90f * 1f;
	public const float ROT_X_SCALE = -90f * 1f;
	
	public GameObject myTarget;

	// Use this for initialization
	void Start ()
	{
	
	}
	
	public static CursorScript Cast (GameObject g)
	{
		return (CursorScript)g.GetComponent ("CursorScript");
	}
	
	// Update is called once per frame
	void Update ()
	{
		myTarget = Target ();
	}
	
	private GameObject Target ()
	{
		Vector3 fwd = transform.TransformDirection (Vector3.forward);
		RaycastHit hit;
		bool isHit = Physics.Raycast (transform.position, fwd, out hit);
		if (isHit && (hit.collider.gameObject != null) && PodiaTarget.isPodiaTarget (hit.collider.gameObject)) {
			//		print ("There is a podia target in front of the object!" + hit.collider.gameObject.name);
			return hit.collider.gameObject;
		} else {
			return null;
		}
		
	}
	
	public void MoveByFrame (Frame frame)
	{
		GameObject cursor = gameObject;
		
		if (frame.IsValid) {
			Finger finger = FrontFingerFinder.FindFrontFinger (frame);
			if (finger.IsValid) {
				Vector3 position = finger.StabilizedTipPosition.ToUnity ();
				position.y -= frame.InteractionBox.Height / 2;
				position.x *= X_SCALE;
				position.z *= Z_SCALE;
				position.y *= Y_SCALE;
				position.z += Z_OFFSET;
				position.y += Y_OFFSET;
				cursor.transform.localPosition = position;
				cursor.transform.localRotation = Quaternion.identity;
				//	Debug.Log ("Rotation:" + CleanRots (finger));
				// x = Sqrt(finger.Direction.ToUnity ().y) * ROT_X_SCALE
				//var rot = new Vector3 (0, Sqrt(finger.Direction.ToUnity ().x) * ROT_Y_SCALE, 0);
			//	cursor.transform.Rotate (rot);
				//	Debug.Log ("cursor position: " + position.ToString ());
			}
			
		}
	}
	
	public float Sqrt(float n){
		if (n < 0) {
			return Mathf.Sqrt (-1 * n) * -1;
		} else {
			return Mathf.Sqrt (n);
		}
	}
}

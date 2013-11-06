using UnityEngine;
using System.Collections;


public class LightedPodium : MonoBehaviour
{
	
	const float CENTER_LIGHT_MIN = 0.125f;
	const float CENTER_LIGHT_MAX = 3.5f;
	const float SIDE_LIGHT_MIN = 0f;
	const float SIDE_LIGHT_MAX = 5f;
	const float BRIGHTEN = 0.15f;
	const float LOCK_TIME = 0.75f;
	const float MAX_INTENSITY = 15f;
	public Light centerLight;
	public Light leftLight;
	public Light rightLight;
	public Light frontLight;
	private float intensity = 0f;
	public static LightedPodium targetedPodium = null;
	public GameObject label;
	private Color LABEL_OFF_COLOR = new Color (0.25f, 0.25f, 0.25f, 0.5f);
	private Color LABEL_ON_COLOR = new Color (1, 1, 1, 0.5f);
	public string messageWhenLocked = "podia clicked";
	private float timeOfFirstTarget = 0;
	private bool isTargeted = false;
	
	[SerializeField]
	public string goKey ="unknown";
	// Use this for initialization
	void Start ()
	{
		isTargeted = false;
		TextMeshCast (label).color = LABEL_OFF_COLOR;
		
		centerLight.intensity = CENTER_LIGHT_MAX;
		leftLight.intensity = SIDE_LIGHT_MAX;
		rightLight.intensity = leftLight.intensity;
	}
	
	// Update is called once per frame
	void Update ()
	{
		if (LeapManagerWeb.PodiumLocked ()) { // any podium is locked
			return;
		} else if (targetedPodium == this) { // this podium is targted
			
			if (isTargeted == false) { // first time targted
				LeapManagerWeb.TellWeb(Time.time.ToString() + " targeting podium " + LabelText());
				StartLighting ();
			} else if (TargetedTime () > LOCK_TIME) { // last time targeted
				LeapManagerWeb.TellWeb("going to " + LabelText());
				LeapManagerWeb.Go( goKey);
				Lock ();
			} else { // continue to light
				Brighten();
			}
			
		} else { // this podium is not targeted
			
			if (isTargeted == true) {
				LeapManagerWeb.TellWeb (Time.time.ToString() + " unfocusing " + LabelText());
				// was targeted
				TextMeshCast (label).color = LABEL_OFF_COLOR;
				isTargeted = false;
			}
			
			Dim ();
		}
	}
	
	public string LabelText(){
		return ((TextMesh) this.label.GetComponent("TextMesh")).text;
	}
	
	private void Brighten(){
		intensity = MAX_INTENSITY * Mathf.InverseLerp(timeOfFirstTarget, timeOfFirstTarget + LOCK_TIME, Time.time);
		AdjustLightIntensity();
	}
	
	private float TargetedTime ()
	{
		return Time.time - timeOfFirstTarget;	
	}
	
	private void Dim ()
	{
		if (intensity > 0.001) {
			intensity *= 0.95f;
		} else {
			intensity = 0;
		}
		AdjustLightIntensity ();
	}
	
	private void AdjustLightIntensity ()
	{
		centerLight.intensity = Mathf.Lerp (CENTER_LIGHT_MIN, CENTER_LIGHT_MAX, Mathf.Min (MAX_INTENSITY, intensity) / MAX_INTENSITY);
		leftLight.intensity = Mathf.Lerp (SIDE_LIGHT_MIN, SIDE_LIGHT_MAX, Mathf.Max (0, Mathf.Min (MAX_INTENSITY, intensity)) / MAX_INTENSITY);
		rightLight.intensity = leftLight.intensity;
	}
	
	private void StartLighting ()
	{
		isTargeted = true;
		timeOfFirstTarget = Time.time;
	}

	private void Lock ()
	{
		LeapManagerWeb.lockPodium (this);
		TextMeshCast (label).color = LABEL_ON_COLOR;
		intensity = MAX_INTENSITY;
		AdjustLightIntensity ();
	}
	
	public static TextMesh TextMeshCast (GameObject g)
	{
		return (TextMesh)g.GetComponent ("TextMesh");
	}
	
	private float CENTER_LIGHT_RANGE ()
	{
		return CENTER_LIGHT_MAX - CENTER_LIGHT_MIN;
	}

	private float SIDE_LIGHT_RANGE ()
	{
		return SIDE_LIGHT_MAX - SIDE_LIGHT_MIN;
	}
	
	public static LightedPodium Cast (GameObject g)
	{
		return (LightedPodium)g.GetComponent ("LightedPodium");
	}
	
	public void Targeted ()
	{
		//Debug.Log ("increasing intensity");
		targetedPodium = this;
	}
}

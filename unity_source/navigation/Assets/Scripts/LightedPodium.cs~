using UnityEngine;
using System.Collections;

public class LightedPodium : MonoBehaviour
{
	
	const float CENTER_LIGHT_MIN = 0.125f;
	const float CENTER_LIGHT_MAX = 10.5f;
	const float SIDE_LIGHT_MIN = 0f;
	const float SIDE_LIGHT_MAX = 5f;
	public Light centerLight;
	public Light leftLight;
	public Light rightLight;
	public Light frontLight;
	private float intensity = 0f;
	
	private static LightedPodium targetedPodium = null;

	// Use this for initialization
	void Start ()
	{
	}
	
	// Update is called once per frame
	void Update ()
	{
		if (targetedPodium == this) {
			intensity += 0.5f;
		} else if (intensity > 0) {
			intensity *= 0.95f;
		} else {
			intensity = 0;
		}
		/*	if (centerLight == null) return;
		if (Mathf.RoundToInt(Time.time * 10 % 10) > 5) {
			centerLight.intensity = CENTER_LIGHT_MAX;
		} else {
			centerLight.intensity = CENTER_LIGHT_MIN;
		}
		
		if (leftLight == null) return;
		if (Mathf.RoundToInt(Time.time * 20 % 10) > 5) {
			leftLight.intensity = SIDE_LIGHT_MIN;
		} else {
			leftLight.intensity = SIDE_LIGHT_MAX;
		} */
		
		if (centerLight) {
			centerLight.intensity = CENTER_LIGHT_RANGE () * Mathf.Min (20f, intensity) / 20f + CENTER_LIGHT_MIN;
		}
		
		if (leftLight) {
			leftLight.intensity = SIDE_LIGHT_RANGE () * Mathf.Max (0, Mathf.Min (10f, intensity - 2)) / 10f + SIDE_LIGHT_MIN;
	
			if (rightLight) {		
				rightLight.intensity = leftLight.intensity;
			}
		
		}
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

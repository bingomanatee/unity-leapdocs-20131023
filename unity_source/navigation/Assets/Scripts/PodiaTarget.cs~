using UnityEngine;
using System.Collections;

public class PodiaTarget : MonoBehaviour
{
	
	public GameObject podium;
	
	// Use this for initialization
	void Start ()
	{
	
	}
	
	// Update is called once per frame
	void Update ()
	{
	
	}
	
	public void Target ()
	{
		LightedPodium.Cast(podium).Targeted();
	}
	
	public static PodiaTarget Cast (GameObject g)
	{
		return g.GetComponent ("PodiaTarget") as PodiaTarget;
	}
	
	public static bool isPodiaTarget(GameObject g){
		return (g.GetComponent ("PodiaTarget")) != null;
	}
}

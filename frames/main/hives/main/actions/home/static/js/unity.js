var config = {
    width: 960,
    height: 600,
    params: { enableDebugging: "0" }

};
var u = new UnityObject2(config);

jQuery(function () {

    var $missingScreen = jQuery("#unityPlayer").find(".missing");
    var $brokenScreen = jQuery("#unityPlayer").find(".broken");
    $missingScreen.hide();
    $brokenScreen.hide();

    u.observeProgress(function (progress) {
        switch (progress.pluginStatus) {
            case "broken":
                $brokenScreen.find("a").click(function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    u.installPlugin();
                    return false;
                });
                $brokenScreen.show();
                break;
            case "missing":
                $missingScreen.find("a").click(function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    u.installPlugin();
                    return false;
                });
                $missingScreen.show();
                break;
            case "installed":
                $missingScreen.remove();
                break;
            case "first":
                break;
        }
    });
    u.initPlugin(jQuery("#unityPlayer")[0], "/unity/home/unity.unity3d");
});

var MAX_MESSAGES = 100;

var messages = 0;

function SaySomethingToUnity(message)
{
    u.getUnity().SendMessage("LeapManager", "ListenWeb", message);
}

function HearSomethingFromUnity(says){
    if (++messages < MAX_MESSAGES){
        console.log('unity says ', says);
    }
}
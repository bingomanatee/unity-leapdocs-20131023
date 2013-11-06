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

var unity_working = false;
function SaySomethingToUnity(message) {
    unity_working = true;
    if ($('html').offset().top < 200){ // if scrolling has begun we don't send more messages from the cursor.
        u.getUnity().SendMessage("LeapManager", "ListenWeb", message);
    }
}

// called by Unity engine
function HearSomethingFromUnity(says) {
    if (says == 'frame done') {
        unity_working = false;
    } else if (/^GO/.test(says)){
        if (GoSection){
            controller.disconnect();
            GoSection(says.replace(/^GO /, ''));
        }
    } else {
        console.log('unity says ', says);
    }
}
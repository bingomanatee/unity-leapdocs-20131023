(function () {
    var controller = new Leap.Controller();
    console.log('controller made', controller);
    controller.on('error', function (err) {
        console.log('leap error: ', err);
    })
    controller.on('connect', function () {
        console.log('connection made');
    });
    var errr = false;
    controller.on('frame', function (frame) {
        if (errr) return;
        if (frame.valid) {
            var out = {hands: []}

            for (var h = 0; h < frame.hands.length; ++h) {

                var hand = frame.hands[h];

                if (hand.valid) {
                    var out_hand = []; // an array of fingers.

                    for (var f = 0; f < hand.fingers.length; ++f) {
                        var finger = hand.fingers[f];
                        if (finger.valid) {
                            var stp = finger.stabilizedTipPosition;
                            out_hand.push(stp);
                        }
                    }
                    if (out_hand.length){

                        out.hands.push(out_hand);
                    }
                }
            }
            if (!out.hands.length) return;

            try{
                var ib = frame.interactionBox;

                out.width = ib.width;
                out.height = ib.height;
                out.depth = ib.depth;

                SaySomethingToUnity(JSON.stringify(out));
            } catch(e){
                console.log('error:', out, e);
                errr = e;
            }
        }
    });
    controller.connect();
})(window);
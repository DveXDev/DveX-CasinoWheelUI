let Wheel = null;
const SegmentsList = [];
const Formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});
let segColor = "#000";

function AddSegment(text, segColorOverride = '#000', textFillStyle = '#000') {
    segColor = segColorOverride ? segColorOverride : segColor === '#FFF' ? '#000' : '#FFF';
    SegmentsList.push({ fillStyle: segColor, text, textFillStyle });
}

function CreateWheel() {
    Wheel = new Winwheel({
        numSegments: SegmentsList.length, // Number segments
        outerRadius: 512, // The size of the wheel.
        centerX: 512, // Used to posion on the bckground correctly.
        centerY: 512,
        textFontSize: 28, // Fontze.
        segments: SegmentsList, // Copy the array.
        rotationAngle: ((SegmentsList.length - 2) * (360 / SegmentsList.length)),
        // of the animation
        animation: {
            type: "spinToStop",
            duration: 15,
            spins: 2,
            callbackFinished: () => {},
        },
    });
};

function CalculatePrize(Slot, Duration) {
    if (!Wheel) return console.log("Wheel not found..");
    Wheel.animation.duration = Duration || 15;
    const IDx = (Slot * (360 / SegmentsList.length));
    const StopAt = IDx + ((360 / SegmentsList.length) / 2) + 1;
    Wheel.rotationAngle = 0;
    Wheel.animation.stopAngle = StopAt;
    Wheel.animation.spins = Math.floor(Math.random() * (4 - 2 + 1) + 2);
    Wheel.startAnimation();
};

window.addEventListener("DOMContentLoaded", (Event) => {
    gsap.registerPlugin();
});

window.addEventListener("message", function (Event) {
    let Data = Event.data;
    let Action = Data.Action;
    if (Action == 'DoWheel') {
        CalculatePrize(Data.Slot, Data.Speed);
    }
});

// 0
addSegment('LOSE', '#000', '#000');
// 1
addSegment('$1,000', '#F2ED52');
// 2
addSegment('LOSE', '#000', '#000');
// 3
addSegment('$5,000', '#526FF2');
// 4
addSegment('LOSE', '#000', '#000');
// 5
addSegment('$2,000','#F2ED52');
// 6
addSegment('LOSE', '#000', '#000');
// 7
addSegment('$10,000', '#526FF2');
// 8
addSegment('LOSE', '#000', '#000');
// 9
addSegment('$1,000', '#F2ED52');
// 10
addSegment('LOSE', '#000', '#000');
// 11
addSegment('$1,000', '#F2ED52');
// 12
addSegment('LOSE', '#000', '#000');
// 13
addSegment('$2,000', '#F2ED52');
// 14
addSegment('LOSE', '#000', '#000');
// 15
addSegment('$20,000', '#E852F2');
// 16
addSegment('LOSE', '#000', '#000');
// 17
addSegment('$1,000', '#F2ED52');
// 18
addSegment('LOSE', '#000', '#000');
// 19
addSegment('$50,000','#E852F2');
// 20
addSegment('LOSE', '#000', '#000');
// 21
addSegment('$1,000', '#F2ED52');
// 22
addSegment('LOSE', '#000', '#000');
// 23
addSegment('GT86', '#FF0221');

let Wheel = null;
const SegmentsList = [];
const Formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});


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

const segments = [];
let segColor = '#000';
const addSegment = (text, segColorOverride = '#000', textFillStyle = '#000') => {
  segColor = segColorOverride ? segColorOverride : segColor === '#FFF' ? '#000' : '#FFF';
  segments.push({ fillStyle: segColor, text, textFillStyle });
}
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
let theWheel = null;
const createWheel = () => {
  theWheel = new Winwheel({
    'numSegments'  : segments.length,         // Number of segments
    'outerRadius'  : 512,       // The size of the wheel.
    'centerX'      : 512,       // Used to position on the background correctly.
    'centerY'      : 512,
    'textFontSize' : 28,        // Font size.
    'segments'     : segments,
    'rotationAngle': ((segments.length - 2) * (360 / segments.length)),
    'animation' :               // Definition of the animation
    {
      'type'     : 'spinToStop',
      'duration' : 15,
      'spins'    : 2,
      'callbackFinished' : () => {},
    }
  });
}
createWheel();
const calculatePrize = (stopAtIdx, duration) => {
  theWheel.animation.duration = duration || 15;
  // This formula always makes the wheel stop somewhere inside prize 3 at least
  // 1 degree away from the start and end edges of the segment.
  const idx = (stopAtIdx * (360 / segments.length));
  //        let stopAt = (idx + Math.floor((Math.random() * ((360 / segments.length) - 2))));

  const stopAt = idx + ((360 / segments.length) / 2) + 1;
  theWheel.rotationAngle = 0;
  // Important thing is to set the stopAngle of the animation before stating the spin.
  theWheel.animation.stopAngle = stopAt;
  theWheel.animation.spins = Math.floor(Math.random() * (4 - 2 + 1) + 2);
  // May as well start the spin from here.
  theWheel.startAnimation();
}
// setTimeout(() => {
//   calculatePrize(1, 3);
// }, 1000);
// setTimeout(() => {
//   calculatePrize(1, 15);
// }, 5000);

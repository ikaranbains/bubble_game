// Make bubbles dynamically
function makeBubbles() {
    var clutter = "";

    for (let i = 1; i < 169; i++) {
        var rn = Math.floor(Math.random() * 10);
        clutter += `<div class="bubble">${rn}</div>`;
    }

    document.querySelector("#pbtm").innerHTML = clutter;
}

// Increasing score functionality
var score = 0;
function increaseScore() {
    const scoreval = document.querySelector("#scoreval");
    score += 10;
    scoreval.innerHTML = score;
}

// Generating Random Hit Numbers
var hitrn = 0;
function getNewHit() {
    const hit = document.querySelector("#hitval");
    hitrn = Math.floor(Math.random() * 10);
    hit.innerHTML = hitrn;
}

// Timer Functionality
var timer = 60;
function runTimer() {
    var timerInt = setInterval(function () {
        if (timer > 0) {
            timer--;
            document.querySelector("#timerval").innerHTML = timer;
        }
        else {
            clearInterval(timerInt);
            gsap.to("#overlay", {
                scale: 1,
                ease: Power3.out,
                duration: .3
            });
            document.querySelector("#scoredisp").innerHTML = `Score: ${score}`;
        }
    }, 1000)
}


// Event Bubbling 
document.querySelector("#pbtm").addEventListener("click", function (dets) {
    var clickedNum = dets.target.innerHTML;
    clickedNum = Number.parseInt(clickedNum);
    if (clickedNum == hitrn) {
        increaseScore();
        makeBubbles();
        getNewHit();
    }
});

// play again button
document.querySelector("#btn").addEventListener("click", function () {
    gsap.to("#overlay", {
        scale: 0,
        ease: Power3.out,
        duration: .3,
        onComplete: resetGame
    });
})


// Game Reset
function resetGame() {
    timer = 60;
    var timerInt = setInterval(function () {
        if (timer > 0) {
            timer--;
            document.querySelector("#timerval").innerHTML = timer;
        }
        else {
            clearInterval(timerInt);
        }
    }, 1000);

    score = 0;
    document.querySelector("#scoreval").innerHTML = score;

    getNewHit();
    makeBubbles();
}

// Heading Animation
function headingAnimation() {
    gsap.to(".letter", {
        y: "0",
        ease: "power3",
        duration: .5,
        stagger: .1
    });
}

window.addEventListener("load", headingAnimation());

makeBubbles();
runTimer();
getNewHit();
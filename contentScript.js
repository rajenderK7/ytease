// TODO: Check Ambient Mode

let sliderContainer, slider;

const createControls = () => {
    const controlsExist = document.getElementsByClassName("ytease-controls")[0];

    if (!controlsExist) {
        const ytContainer = document.getElementById("player-container-outer");
        const yteaseControls = document.createElement("div");

        yteaseControls.className = "ytease-controls";
        yteaseControls.style.cssText = `
                margin: 5px 0px;
                padding: 8px;
                width: auto;
                display: flex;
                justify-content: start;
                align-items: center;
                background-color: #E5E5E5;
                border-radius: 16px;
                color: black;
            `;

        yteaseControls.appendChild(createSlider());
        ytContainer.appendChild(yteaseControls);
    } else {
        setPlaybackRate(slider.value);
    }
}

const createSlider = () => {
    if (sliderContainer) return sliderContainer;
    sliderContainer = document.createElement("div");
    sliderContainer.style.cssText = `
            display: flex;
            align-items: center;
            width: 100%;
        `

    slider = document.createElement("input");
    slider.type = "range"
    slider.min = 0.25;
    slider.max = 5.0;
    slider.step = 0.25;
    slider.value = 1.0;
    slider.oninput = () => {
        sliderInfo.innerHTML = "Playback speed: " + slider.value + "x";
        setPlaybackRate(slider.value);
    };

    const sliderInfo = document.createElement("p");
    sliderInfo.style.cssText = `
            font-size: 13px;
            font-weight: bold;
            min-width: 130px;
        `
    sliderInfo.innerHTML = "Playback speed: " + slider.value + "x";

    sliderContainer.appendChild(sliderInfo);
    sliderContainer.appendChild(slider);
    return sliderContainer;
}

const setPlaybackRate = (playbackRate) => {
    playbackRate = parseFloat(playbackRate);
    if (playbackRate > 5.0) return;
    const videoPlayer = document.getElementsByClassName("video-stream html5-main-video")[0];
    videoPlayer.playbackRate = playbackRate;
}

chrome.runtime.onMessage.addListener((msg, sender, res) => {
    if (msg.type === "NEW") {
        createControls();
    }
})
// TODO: Check Ambient Mode

(() => {
    const createControls = () => {
        const controlsExist = document.getElementsByClassName("ytease-controls")[0];

        if (!controlsExist) {
            const ytContainer = document.getElementById("player-container-outer");
            const yteaseControls = document.createElement("div");

            yteaseControls.className = "ytease-controls";
            yteaseControls.style.cssText = `
                padding: 10px 0px;
                width: 100%;
                display: flex;
                align-items: center;
                border-bottom: 0.5px solid gray;
            `;

            yteaseControls.appendChild(createSlider());
            ytContainer.appendChild(yteaseControls);
        }
    }

    const createSlider = () => {
        const sliderContainer = document.createElement("div");
        sliderContainer.style.cssText = `
            display: flex;
            align-items: center;
            color: white;
        `

        const slider = document.createElement("input");
        slider.type = "range"
        slider.min = 0.25;
        slider.max = 5.0;
        slider.step = 0.25;
        slider.value = 1.0;
        slider.oninput = () => {
            sliderInfo.innerHTML = "Playback speed: " + slider.value + "x";
            setPlaybackRate(slider.value);
        };

        const sliderInfo = document.createElement("h2");
        sliderInfo.style.cssText = `marging-right: 15px; min-width: 155px`
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
})();
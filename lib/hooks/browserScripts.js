export const youTubeSkip = `
(function () {
  var style = document.createElement("style");
  style.type = "text/css";
  style.appendChild(
    document.createTextNode(
      ".ytp-ad-image-overlay, .ytp-ad-overlay-slot {display: none;}"
    )
  );
  document.head.appendChild(style);

  const callback = (mutationRecords, observer) => {
    const removeAds = () => {
      var skipBtn = document.querySelector("button.ytp-ad-skip-button");
      if (skipBtn) skipBtn.click();
      var ad = document.querySelector(".ytp-ad-player-overlay");
      if (ad) {
        var video = document.querySelector("video");
        if (video) {
          video.currentTime = video.duration;
        }
        if (skipBtn) {
          skipBtn.click();
        }
      }
    };
    removeAds();
  };

  const observer = new MutationObserver(callback);

  const options = {
    childList: true,
    subtree: true,
  };

  const startObservation = (targetNode) => {
    if (targetNode) {
      observer.observe(targetNode, options);
    }
  };

  const target = document.documentElement;
  startObservation(target);
})();
`;

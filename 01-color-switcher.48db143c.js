const t={bcgColor:document.querySelector("body"),startButton:document.querySelector("button[data-start]"),stopButton:document.querySelector("button[data-stop]")};let o=null;t.startButton.addEventListener("click",(()=>{o=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3),t.startButton.disabled=!0,t.stopButton.disabled=!1})),t.stopButton.addEventListener("click",(()=>{clearInterval(o),t.startButton.disabled=!1,t.stopButton.disabled=!0}));
//# sourceMappingURL=01-color-switcher.48db143c.js.map
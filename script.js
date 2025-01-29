const addItem = async (item) => {
    await randomDelay();
    let div = document.createElement("div");
    div.innerHTML = item;

    // Apply random colors to messages
    const randomColor = () => {
        const colors = ['#00ff00', '#ff0000', '#ffff00', '#00ffff'];
        return colors[Math.floor(Math.random() * colors.length)];
    };
    div.style.color = randomColor();

    // Apply scaling animation to some important messages
    if (item === "Initializing HackPuff... Now reading your data") {
        div.style.animation = "scale-up 0.5s ease-in-out";
    }

    // Styling to prevent overlap
    div.style.display = "block";
    div.style.marginTop = "10px";
    div.style.position = "relative"; // Fix stacking issue

    document.body.append(div);

    // Hide button and "Hello User" when the first message appears
    if (item === "Initializing HackPuff... Now reading your data") {
        document.querySelector(".glow-on-hover").style.display = "none";  // Hide button
        document.getElementById("hello-user").style.display = "none";  // Hide "Hello User"
    }
};

const randomDelay = () => {
    return new Promise((resolve) => {
        let timeout = 1 + 6 * Math.random();
        setTimeout(() => {
            resolve();
        }, timeout * 1000);
    });
};

async function main() {
    let t = setInterval(() => {
        let last = document.body.getElementsByTagName("div");
        last = last[last.length - 1];
        if (last && last.innerHTML.endsWith("...")) {
            last.innerHTML = last.innerHTML.slice(0, last.innerHTML.length - 3);
        } else if (last) {
            last.innerHTML = last.innerHTML + ".";
        }
    }, 100);

    let text = [
        "Initializing HackPuff... Now reading your data",
        "Reading your Files...",
        "Password files Detected...",
        "Sending all passwords and personal files to My Server...",
        "Cleaning up..."
    ];

    for (const item of text) {
        await addItem(item);
    }

    await randomDelay();
    clearInterval(t);

    // **Play Sound when Cleaning up is displayed**
    if (text.includes("Cleaning up...")) {
        const cleanupSound = new Audio("little-alien-142498.mp3"); // Replace with your sound URL
        cleanupSound.play();
    }

    // Delay before clearing screen
    await randomDelay();
    document.body.innerHTML = ""; // Clears everything

    // **Change Background Image**
    document.body.style.background = "url('matrix-hacker-background.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";

    // Display final message
    let finalMessage = document.createElement("div");
    finalMessage.innerHTML = "Thank you for your Data";
    finalMessage.style.color = "white";
    finalMessage.style.fontSize = "30px";
    finalMessage.style.textAlign = "center";
    finalMessage.style.marginTop = "20%";
    document.body.append(finalMessage);
}

// Attach event listener to button
document.querySelector(".glow-on-hover").addEventListener("click", () => {
    document.querySelector(".glow-on-hover").disabled = true; // Prevent multiple clicks
    main();
});

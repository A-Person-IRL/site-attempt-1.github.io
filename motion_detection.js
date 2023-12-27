let video, canvas, context, cap, frame, src, gray, prevGray, motion, alertMode;

function onOpenCvReady() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    alertMode = false; // Variable to track the mode

    cap = new cv.VideoCapture(video);

    // Initialize variables for motion detection
    motion = new cv.Mat();
    src = new cv.Mat();
    gray = new cv.Mat();
    prevGray = new cv.Mat();

    // Start the motion detection loop
    requestAnimationFrame(processVideo);
}

function processVideo() {
cap.read(src);

    // Convert the frame to grayscale
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

    // Perform motion detection (you can replace this with a more advanced algorithm)
    if (prevGray.cols > 0) {
        cv.absdiff(prevGray, gray, motion);
        cv.threshold(motion, motion, 30, 255, cv.THRESH_BINARY); // Adjust the threshold value

        // Log motion Mat to the console
        console.log(motion.data8S);

        // Check if motion is detected in alarm mode
        if (cv.countNonZero(motion) > 1000) {
            handleMotionDetection();
        } else {
            handleNoMotion();
        }
    }

    // Display the result on the canvas
    cv.imshow(canvas, motion);

    // Update the previous frame
    prevGray.delete();

    // Prepare for the next iteration
    prevGray = gray.clone();

    // Call the next frame
    requestAnimationFrame(processVideo);
}

function handleMotionDetection() {
    // Change the background color to red
    document.body.style.backgroundColor = 'red';

    // Check if motion is detected in alarm mode
    if (alertMode) {
        showAlarmAlert();
    }
}

function handleNoMotion() {
    // Change the background color back to white
    document.body.style.backgroundColor = 'white';
}

function showAlarmAlert() {
    // Display a simple alert on the screen (you can customize this)
    const alertBox = document.getElementById('alertBox');
    alertBox.textContent = 'ALERT!';
    alertBox.style.fontSize = '36px';
    alertBox.style.color = 'red';

    // Remove the alert after a short delay (you can adjust the duration)
    setTimeout(() => {
        alertBox.textContent = '';
    }, 2000);
}

function toggleMode() {
    alertMode = !alertMode; // Toggle between passive watch mode and alarm mode
    updateModeText();
    updateButtonText();
}

function updateModeText() {
    const modeText = document.getElementById('modeText');
    modeText.textContent = `Mode: ${alertMode ? 'Alarm' : 'Passive Watch'}`;
}

function updateButtonText() {
    const toggleButton = document.getElementById('toggleButton');
    toggleButton.textContent = `Switch to ${alertMode ? 'Passive Watch' : 'Alarm'} Mode`;
}

// Open the video stream when the page loads
document.addEventListener('DOMContentLoaded', () => {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((error) => {
            console.error('Error accessing the camera: ', error);
        });
});

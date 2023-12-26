let video, canvas, context, cap, frame, src, gray, prevGray, motion;

function onOpenCvReady() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    
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
        cv.threshold(motion, motion, 50, 255, cv.THRESH_BINARY);
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

import cv2
import numpy as np

def estimate_motion(video_path):
    cap = cv2.VideoCapture(video_path)

    # Read the first frame
    ret, prev_frame = cap.read()
    if not ret:
        print("Failed to read video")
        cap.release()
        return

    prev_gray = cv2.cvtColor(prev_frame, cv2.COLOR_BGR2GRAY)

    # Create some random colors for visualization
    color = np.random.randint(0, 255, (100, 3))

    # Prepare to draw the tracks
    mask = np.zeros_like(prev_frame)

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Calculate dense optical flow
        flow = cv2.calcOpticalFlowFarneback(prev_gray, gray, None, 0.5, 3, 15, 3, 5, 1.2, 0)

        # Compute the magnitude and angle of the 2D vectors
        magnitude, angle = cv2.cartToPolar(flow[..., 0], flow[..., 1])

        # Update the color according to the angle of motion
        mask[..., 0] = angle * 180 / np.pi / 2

        # Update the brightness according to the magnitude of motion
        mask[..., 2] = cv2.normalize(magnitude, None, 0, 255, cv2.NORM_MINMAX)

        # Convert HSV to RGB (for visualization)
        rgb = cv2.cvtColor(mask, cv2.COLOR_HSV2BGR)

        # Display the result
        cv2.imshow('frame', cv2.add(frame, rgb))
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

        prev_gray = gray

    cap.release()
    cv2.destroyAllWindows()

# Replace 'path/to/your/video.mp4' with the path to your video file
estimate_motion('C:\\TruAd\\blender\\Justin.mp4')

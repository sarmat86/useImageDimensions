import "./App.css";

import { useImageDimensions } from "./hooks/useImageDimensions";

function App() {
  const { imageDimensions, setFileInputEvent, isPending } =
    useImageDimensions();

  return (
    <>
      <div>
        <h2>useImageDimensions</h2>
        <div style={{ marginBottom: 20 }}>
          {imageDimensions
            ? `width: ${isPending ? "..." : imageDimensions.width} height: ${
                isPending ? "..." : imageDimensions.height
              }`
            : "Upload image to check its dimension"}
        </div>
      </div>
      <input
        type="file"
        name="image"
        accept="image/png, image/jpeg"
        onChange={setFileInputEvent}
      />
    </>
  );
}

export default App;

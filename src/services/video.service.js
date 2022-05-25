const { bundle } = require('@remotion/bundler');
const { getCompositions, renderMedia } = require('@remotion/renderer');

module.exports = {
  /**
   * 
   * @param {String} text 
   * @param {String} shape
   * @param {*} onProgress 
   * @returns 
   */
  generateVideo: async (text, shape, onProgress) => {
    // The composition you want to render
    const compositionId = `${shape}-dev-machine`;

    console.log(`=> Generation of ${compositionId}`)
 
    // Create a webpack bundle of the video.
    // You only have to do this, you can reuse the bundle.
    const bundleLocation = await bundle(require.resolve('../video/index.tsx'));
 
    // Parametrize the video by passing arbitrary props to your component.
    const inputProps = { text };
 
    // Extract all the compositions you have defined in your project
    // from the webpack bundle.
    const comps = await getCompositions(bundleLocation, {
      // You can pass custom input props that you can retrieve using getInputProps()
      // in the composition list. Use this if you want to dynamically set the duration or
      // dimensions of the video.
      inputProps,
    });

    // Select the composition you want to render.
    const composition = comps.find((c) => c.id === compositionId);
 
    // Ensure the composition exists
    if (!composition) {
      throw new Error(`No composition with the ID ${compositionId} found`);
    }
 
    return renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation: `out/${shape}-video.mp4`,
      inputProps,
      onProgress,
    });
  }
}

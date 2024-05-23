/**
 * The function `dataURLtoBlob` converts a data URL to a Blob object and provides the Blob through a
 * callback function.
 *
 * @param dataUrl The `dataUrl` parameter in the `dataURLtoBlob` function is a string that represents a
 * data URL. Data URLs are URLs that contain data, such as base64 encoded images or other resources,
 * directly within the URL string.
 * @param callback The `callback` parameter is a function that will be called once the operation is
 * completed. It takes a `Blob` object as its argument. You can pass a function to the `dataURLtoBlob`
 * function as the `callback` parameter to handle the `Blob` object once it is created
 */
export function dataURLtoBlob(dataUrl: string, callback: (blob: Blob) => void) {
  var req = new XMLHttpRequest();

  req.open('GET', dataUrl);
  req.responseType = 'arraybuffer'; // Can't use blob directly because of https://crbug.com/412752

  req.onload = function fileLoaded(e) {
    // If you require the blob to have correct mime type
    var mime = this.getResponseHeader('content-type');

    callback(new Blob([this.response], { type: mime || undefined }));
  };

  req.send();
}

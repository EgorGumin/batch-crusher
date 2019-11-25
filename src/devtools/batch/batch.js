export function isBatch(call) {
  let postData = call.request.postData;
  return postData && postData.mimeType.includes("boundary=batch");
}

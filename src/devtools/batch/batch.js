export class Batch {
  constructor(source, calls) {
    this.source = source;
    this.calls = calls;
  }
}

export function createBatch(call) {
  if (isBatch(call)) {
    const requestData = call.request.postData.text;
    const contentTypeHeader = call.request.headers.find(
      header => header.name === "content-type"
    );
    const valueOfContentTypeHeader = contentTypeHeader.value;
    const requests = parseRequest(requestData, valueOfContentTypeHeader);
    const calls = {
      requests
    };
    const batch = new Batch(call, calls);
    return batch;
  } else {
    return null;
  }
}

export function isBatch(call) {
  let postData = call.request.postData;
  return postData && postData.mimeType.includes("boundary=batch");
}

function parseRequest(requestData, contentTypeHeader) {
  const headers = contentTypeHeader.split("boundary=");
  const boundary = headers[headers.length - 1];
  const splitData = requestData.split(`--${boundary}`);
  splitData.shift();
  splitData.pop();

  const batchRequests = splitData.map(data => {
    const dataSegments = data.trim().split("\r\n\r\n");
    const batchRequest = createBatchRequest(dataSegments);
    return batchRequest;
  });
  return batchRequests;
}

class BatchRequest {
  constructor(type, url, headers, unparsed) {
    this.type = type ? type : null;
    this.url = url ? url : null;
    this.headers = headers ? headers : null;
    this.unparsed = unparsed ? unparsed : null;
  }
}

function createBatchRequest(segments) {
  let unableToParse = segments.length === 0 || segments.length > 3;
  if (unableToParse) {
    return new BatchRequest(null, null, null, segments.join("\n"));
  } else {
    const mainSegment = segments[1];
    const [type, url] = mainSegment.split(" ");
    const batch = new BatchRequest(type, url);
    return batch;
  }
}

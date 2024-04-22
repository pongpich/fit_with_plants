import { Storage } from "aws-amplify";

function createCanvas(img, maxSize) {
  const canvas = document.createElement('canvas');
  if (img.width > img.height) {
   const widthMain = img.width > maxSize ? maxSize : img.width;
   const scaleFactorMain = widthMain / img.width;
   canvas.width = widthMain;
   canvas.height = img.height * scaleFactorMain;
  } else {
   const heightMain = img.height > maxSize ? maxSize : img.height;
   const scaleFactorMain = heightMain / img.height;
   canvas.width = img.width * scaleFactorMain;
   canvas.height = heightMain;
  }
  return canvas
 }

 function readFileAsync(file) {
  return new Promise((resolve, reject) => {
   let reader = new FileReader();
   reader.onload = () => {
    resolve(reader.result);
   };
   reader.onerror = reject;
   reader.readAsDataURL(file);
  })
 }

 function loadImgAsync(imgSrc) {
  return new Promise((resolve, reject) => {
   let img = new Image();
   img.onload = () => {
    resolve(img);
   };
   img.onerror = reject;
   img.src = imgSrc;
  })
 }
 
function imgToBlobAsync(img, canvas) {
  return new Promise((resolve, reject) => {
   const ctxMain = canvas.getContext('2d');
   ctxMain.drawImage(img, 0, 0, canvas.width, canvas.height);
   ctxMain.canvas.toBlob(async (blob) => {
    resolve(blob)
   }, 'image/*');
  })
 }

export async function s3Upload(file, customPrefix) {
  const filename = `${customPrefix}`;   
  // Read the image
  const imgSrc = await readFileAsync(file);
  const img = await loadImgAsync(imgSrc);
   
  // From the image and a canvas (for the resize), 
  // generate a blob to be uploaded
  const canvas = createCanvas(img, 500);

  const imgBlob = await imgToBlobAsync(img, canvas);
  const stored = await Storage.put(filename, imgBlob, {
    contentType: file.type
  });

  const secure_url = await Storage.get(stored.key);

  return {
    public_id: stored.key,
    secure_url
  };
}

export async function s3Download(key) {
  const secure_url = await Storage.get(key);

  return secure_url;
}

export function s3DownloadPromise(public_id) {
  return new Promise(async (resolve) => {
    const secure_url = await Storage.get(public_id);
    resolve(secure_url);
  })
}

export async function s3Remove(key) {
  const result = await Storage.remove(key);

  return result;
}

export async function s3ListKeys(path) {
  const keyList = await Storage.list(path);

  return keyList;
}

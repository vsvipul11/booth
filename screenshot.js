function resizeCanvas(origCanvas, width, height) {
    let resizedCanvas = document.createElement("canvas");
    let resizedContext = resizedCanvas.getContext("2d");

    if (screen.width < screen.height)
    {
        var w = height * (height / width);
        var h = width * (height / width);
        var offsetX = -(height - width);
    }
    else
    {
        var w = width;
        var h = height;
        var offsetX = 0;
    }

    resizedCanvas.height = height;
    resizedCanvas.width = width;
    // screenshot border
    resizedContext.lineWidth = 10;
    
    resizedContext.strokeRect(0, 0, resizedCanvas.width,resizedCanvas.height);
   
    resizedContext.globalCompositeOperation='destination-over';
    
    resizedContext.imageSmoothingEnabled = false;
    resizedContext.globalAlpha = 1.0;


   
  
  

    resizedContext.drawImage(origCanvas, offsetX, 0, w, h);
    resizedCanvas.style.imageRendering = "optimizeQuality"; // or "optimizeSpeed"

    
    return resizedCanvas.toDataURL();
}
// end of resizeCanvas function
 
document.getElementById("start-button").addEventListener("click", function() {
    setTimeout(function() {
    document.querySelector("video").pause();
    // set bg gray color on click of sreeen capture button
    var Model = document.getElementById("myModelBg");
    Model.style.display= "block";
    let aScene = document.querySelector("a-scene").components.screenshot.getCanvas("perspective");
    let frame = captureVideoFrame("video", "png");
    aScene = resizeCanvas(aScene, frame.width, frame.height);
    frame = frame.dataUri;
    mergeImages([frame, aScene]).then(b64 => {
    document.getElementById("results").style.display="block"
    var img = document.getElementById("results").innerHTML = '<img src="'+b64+ '" id="img" class="img-fluid" style="width:100vw ; height: 100vh ;)"/>'
    if(img)
    {  
        let link = document.getElementById("descarga-link", "jpeg");

        
    }
    console.log("screenshot taken");
});
}, 10000); // 10 seconds timeout
});




function captureVideoFrame(video, format, width, height)
    {
        if (typeof video === 'string')
        {
            video = document.getElementById('arjs-video');
        }

        format = format || 'jpeg';

        if (!video || (format !== 'png' && format !== 'jpeg'))
        {
            return false;
        }

        var canvas = document.createElement("CANVAS");

        canvas.width = width || video.videoWidth;
        canvas.height = height || video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        var dataUri = canvas.toDataURL('image/' + format);
        var data = dataUri.split(',')[1];
        var mimeType = dataUri.split(';')[0].slice(5)

        var bytes = window.atob(data);
        var buf = new ArrayBuffer(bytes.length);
        var arr = new Uint8Array(buf);

        for (var i = 0; i < bytes.length; i++)
        {
            arr[i] = bytes.charCodeAt(i);
        }

        var blob = new Blob([ arr ], { type: mimeType });
        return { blob: blob, dataUri: dataUri, format: format, width: canvas.width, height: canvas.height };
    }
//end of captureVideoFrame function

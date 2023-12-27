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
    resizedContext.strokeStyle="white";
    resizedContext.strokeRect(0, 0, resizedCanvas.width,resizedCanvas.height);

    // add text watermark 
    // resizedContext.fillStyle.border = "100px solid red;";
    resizedContext.font = "bold 16px Arial";
    resizedContext.stroke = "white"
    resizedContext.globalCompositeOperation='destination-over';
    resizedContext.fillText("Captured by",380,560);

    // add image watermark
    var img_logo = document.getElementById('watermark');
    img_logo.setAttribute('crossOrigin', 'anonymous');
  
    console.log(img_logo)

    resizedContext.drawImage(origCanvas, offsetX, 0, w, h);
    // set image watermark in screenshot 350, 550 define  logo position and 80 and 35 used for logo  width and height
    resizedContext.fillText("Vossle", 383, 580)
    console.log(resizeCanvas);
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

        // create button to save screenshot
        

        // var button = document.createElement("button");
        // button.innerHTML= "save"
        // button.setAttribute("id", "save")
        // document.getElementById("results").appendChild(button)

        // document.getElementById("save").addEventListener("click", function() {
        // // unset bg gray color on click of sreeen save button  
        // Model.style.display= "none";

        // // genrate filename randomly
        // let fileName = Math.random().toString(26).slice(2); 
        // //create download link screenshot
        // link.setAttribute("download", fileName);
        // link.setAttribute("href", b64);
        // link.click();

        // // enable the sreenshot button functionality on save button
        // document.getElementById("photo-button").disabled = false;
        // // hide the current screnshot when user click on save button
        //     document.getElementById("results").style.display="none";

        // })
        // end create button to save screenshot

        // create a href tag to save screenshot
        // var a = document.createElement("a");
        // a.setAttribute("id", "descarga-link")
        // a.setAttribute("href", "#") 
        // document.getElementById("results").appendChild(a)
        // end create a href tag to save screenshot

        // hide the current screenshot on both button exit and save
        // var btn_hide_img = document.createElement("img");
        // btn_hide_img.innerHTML= "exit";
        // btn_hide_img.setAttribute("src", "end.png")
        // btn_hide_img.setAttribute("id", "hide")
        // document.getElementById("results").appendChild(btn_hide_img)

        // var btn_share_img = document.createElement("img");
        //btn_share_img.innerHTML= "share";
        // btn_share_img.setAttribute("src", "share.png")
        // btn_share_img.setAttribute("id", "share-img")
        
        
        // btn_share_img.addEventListener('click', event => { 
        //     share();
        //     console.log("running")
        // });
        
        // function share()
        // {
        //     fetch(b64)
        //     .then(function(response) {
        //     return response.blob()
        //     })
        //     .then(function(blob) {
        //     console.log("running in function")
        //     var file = new File([blob], "vossle-logo.png", {type: 'image/png'});
        //     var filesArray = [file];

        //     if(navigator.canShare && navigator.canShare({ files: filesArray })) {
        //         navigator.share({
        //         title: 'Share this image to :',
        //         files: filesArray
        //         });
        //     }
        //     })
        // }
        
        // document.getElementById("hide").addEventListener("click", function() {
        //     // code for exit button
        //     // unset bg gray color on click of sreeen exit button 
        //     Model.style.display= "none";
        //     document.getElementById("results").style.display="none";
        //     // code for save button
        //     document.getElementById("photo-button").disabled = false;
        // // console.log("results", results);
        // })
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
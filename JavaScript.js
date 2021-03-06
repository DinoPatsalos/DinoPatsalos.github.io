var originalImage = null;
var greyImage= null;
var redImage= null;
var thresholdImage= null;
var imgCanvas = document.getElementById("canvas");

function upload(){
    
    //alert("image uploaded");
    
    var input = document.getElementById("fInput")
    
    originalImage = new SimpleImage(input);
    greyImage = new SimpleImage(input);
    redImage = new SimpleImage(input);
    thresholdImage = new SimpleImage(input);
    
    
    originalImage.drawTo(imgCanvas);
    
    getDimensions();
     
}

function doGrey(){
    
   // alert("Greyscale filter applied");
    
    if (imageIsLoaded(greyImage)){
        clearCanvas();
        filterGrey();
        greyImage.drawTo(imgCanvas);
    }
}

function doRed(){
    //alert("Red filter applied");
    
    if (imageIsLoaded(redImage)){
        clearCanvas();
        filterRed();
        redImage.drawTo(imgCanvas);
    }
}

function doThreshold(){
    //alert("Custom image filter applied");
    
    if (imageIsLoaded(thresholdImage)){
        clearCanvas();
        filterThreshold();
        thresholdImage.drawTo(imgCanvas);
    }
}

function reset(){
    //alert("Image reset to original");
    
    if(imageIsLoaded(originalImage)){
        
        originalImage.drawTo(imgCanvas);
        
        greyImage = new SimpleImage(originalImage);
        redImage = new SimpleImage(originalImage);
        customImage = new SimpleImage(originalImage);
        
    }
    
}

function imageIsLoaded(image){
    
    if  (image == null || !image.complete()){
        
        alert("Image not loaded yet, getting ahead of yourself there!");
        return false;
    
    }
    
    else {
        
        //alert("Image loadeded correctly, preparing filter.")
        return true;
    }
}

function filterGrey(){
    
    for (var pixel of greyImage.values()){
        var avgRGB = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
        
        pixel.setRed(avgRGB);
        pixel.setGreen(avgRGB);
        pixel.setBlue(avgRGB);
     }
     
}

function filterRed(){
    
    for (var pixel of redImage.values()){
        var avgRGB = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
        
        if(avgRGB<128){
            
            pixel.setRed(avgRGB*2);
            pixel.setGreen(0);
            pixel.setBlue(0);   
        }
        
        else{
        pixel.setRed(255);
        pixel.setGreen((avgRGB*2)-255);
        pixel.setBlue((avgRGB*2)-255);
            
        }
        
     }
     
}

function filterThreshold(){
    
    var t = 100;
    
    for (var pixel of thresholdImage.values()){
        var avgRGB = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
        
        if (avgRGB<=t){
        
            pixel.setRed(0);
            pixel.setGreen(0);
            pixel.setBlue(0);
            
        }
        
        else{
            pixel.setRed(255);
            pixel.setGreen(255);
            pixel.setBlue(255);
        }
        
     } 
}

function clearCanvas(){
    
var Context = imgCanvas.getContext("2d");
    
Context.clearRect(0,0,imgCanvas.width,imgCanvas.height);
    
}

function getDimensions(){
    
    //for some reason creating a new simpleImage here lets me use the getWidth and getHeight without a problem. Not doing so results in the output being 'undefined'
    var img = new SimpleImage(originalImage);
    var width = img.getWidth();
    
    var height = img.getHeight();

document.getElementById("dimensions").innerHTML = " Image dimensions: "+width+" x "+height;

    
}
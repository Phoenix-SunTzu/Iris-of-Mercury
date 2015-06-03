/**
 * Created by hopkinsj on 5/29/2015.
 */
var imgSource = "img/TestImage01.jpg";
var IsZoning = false;
var editorMaxWidth, nativeWidth, nativeHeight, displayedCompression, displayedWidth, displayedHeight;

var HotZone = {
    "top": 0,
    "left": 0,
    "height": nativeHeight,
    "width": nativeWidth,
    "compression": 1
};

$(document).ready(function(){
    editorMaxWidth = parseInt($("#HotZoner").css("max-width")); // Fit the image to the max-width of the editor

    $("<img/>") // Make in memory copy of image to avoid css issues
        .attr("src", imgSource)
        .load(function() {
            nativeWidth = this.width;   // Note: $(this).width() will not
            nativeHeight = this.height; // work for in memory images.

            if(nativeWidth > editorMaxWidth){
                HotZone.compression = editorMaxWidth / nativeWidth;
                displayedWidth = nativeWidth * HotZone.compression;
                displayedHeight = nativeHeight * HotZone.compression;
                $("#HotZoner").css({"width": displayedWidth, "height": displayedHeight});
                $("#SourceImage").attr({"xlink:href": imgSource, "height": displayedHeight, "width": displayedWidth});
            }else{
                displayedCompression = 1;
                $("#HotZoner").css({"width": nativeWidth, "height": nativeHeight});
                $("#SourceImage").attr({"xlink:href": imgSource, "height": nativeHeight, "width": nativeWidth});
            }
            $("#HotZonedImage").attr({"xlink:href": imgSource, "height": nativeHeight, "width": nativeWidth});
        });

    $("#HotZoner").mousedown(handleMouseDown).mouseup(handleMouseUp);
});

function handleMouseDown(e) {
    IsZoning = true;
    HotZone.left = parseInt(e.offsetX / HotZone.compression);
    HotZone.top = parseInt(e.offsetY / HotZone.compression);
}
function handleMouseUp(e) {
    if(IsZoning) {
        var xEndX = parseInt(e.offsetX / HotZone.compression);
        if(xEndX > HotZone.left) {
            HotZone.width = xEndX - HotZone.left;
        }
        else{
            HotZone.width = HotZone.left - xEndX;
            HotZone.left = xEndX;
        }

        var xEndY = parseInt(e.offsetY / HotZone.compression);
        if(xEndY > HotZone.top) {
            HotZone.height = xEndY - HotZone.top;
        }
        else{
            HotZone.height = HotZone.top - xEndY;
            HotZone.top = xEndY;
        }
        IsZoning = false;

        // TODO: Replace with "while dragging" render of the rectangle, rather than this "after dragging finishes" render model.
        $("#HotZoneArea").attr({"x": HotZone.left * HotZone.compression, "y": HotZone.top * HotZone.compression, "width": HotZone.width * HotZone.compression, "height": HotZone.height * HotZone.compression});

        // Display the image with the updated HotZone specification
        var xImgWidthLimit = $("#HotZonedImageDisplay").width();
        var xImgHeightLimit = $("#HotZonedImageDisplay").height();

        var xLeft = (HotZone.width >= xImgWidthLimit) ? HotZone.left : Math.max(HotZone.left - (xImgWidthLimit - HotZone.width) / 2, 0);
        var xTop = (HotZone.height >= xImgHeightLimit) ? HotZone.top : Math.max(HotZone.top - (xImgHeightLimit - HotZone.height) / 2, 0);
        var xWidth = (HotZone.width >= xImgWidthLimit) ? HotZone.width : xImgWidthLimit;
        var xHeight = (HotZone.height >= xImgHeightLimit) ? HotZone.height : xImgHeightLimit;

        $("#HotZonedImageDisplay")[0].setAttribute("viewBox", xLeft + ", " + xTop + ", " + xWidth + ", " + xHeight);

    }
}

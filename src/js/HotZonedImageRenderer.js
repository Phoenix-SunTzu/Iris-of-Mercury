$("img[hotzone]").ready(function(){

    var xImgWidthLimit = $(this).width();
    var xImgHeightLimit = $(this).height();

    var xLeft = (HotZone.width >= xImgWidthLimit) ? HotZone.left : Math.max(HotZone.left - (xImgWidthLimit - HotZone.width) / 2, 0);
    var xTop = (HotZone.height >= xImgHeightLimit) ? HotZone.top : Math.max(HotZone.top - (xImgHeightLimit - HotZone.height) / 2, 0);
    var xWidth = (HotZone.width >= xImgWidthLimit) ? HotZone.width : xImgWidthLimit;
    var xHeight = (HotZone.height >= xImgHeightLimit) ? HotZone.height : xImgHeightLimit;

    $("#HotZonedImageDisplay")[0].setAttribute("viewBox", xLeft + ", " + xTop + ", " + xWidth + ", " + xHeight);
});

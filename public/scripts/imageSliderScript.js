var imagesData = [];
var indexImage = 0;


$(document).ready(function () {
	$('#myImage').mousemove(
		function (event) {
			var x = event.clientX - $(this).offset().left;
			var columnWidth = $('#myImage').outerWidth() / imagesData.length;
			var column = Math.floor(x / columnWidth);
			indexImage = column;
			$('#myImage').attr('src', $(imagesData[column].event_html).attr("src"));

			$.each(imagesData[column], function(i) {
				$('#myContent').empty();
				$('#myContent').append("<p><br><b> Datetime: " +(imagesData[column].event_display_date).split(",")[0] + ", " + (imagesData[column].event_display_date).split(",")[1] + "</b></a>");
			});
		}
	);

	// When the user clicks on the thumbnail displayed by the image slider, it opens the Wayback Machine capture for that memento in a new tab
	$('#myImage').click(function(event) {
		var x = event.clientX - $(this).offset().left;
		var columnWidth = $('#myImage').outerWidth() / imagesData.length;
		var column = Math.floor(x / columnWidth);

		window.open(imagesData[column].event_link);
	});

	/*var curJSONFileName= "timemapsumjson_"+collectionsList[parseInt(location.search.split("=")[1])-1].replace(/[^a-z0-9]/gi, '').toLowerCase();

	$.ajax({
		url: curJSONFileName+'.json',
		dataType: 'json',
		success: function(data) {
			$.each(data, function (index, obj) {
				if($(obj.event_html).attr("src").indexOf("notcaptured") < 0){
					imagesData.push(obj);
				}
			});
			$('#myImage').attr('src', $(imagesData[0].event_html).attr("src"));
			slideImage(0);
		}
	});*/

	console.log(imagesData);

	$('#sliderNext').click(function() {
		slideImage(1)
	});

	$('#sliderPrev').click(function() {
		slideImage(-1)
	});
});

function drawImageSlider(data) {
	imagesData = [];
	indexImage = 0;
	$.each(data, function (index, obj) {
		if($(obj.event_html).attr("src").indexOf("notcaptured") < 0) {
			imagesData.push(obj);
		}
	});
	$('#myImage').attr('src', $(imagesData[0].event_html).attr("src"));
	slideImage(0);

	$('.tabContentWrapper').waitForImages(function() {
		$(".tabContentWrapper").show();
		$("#busy-loader").hide();
		// setTimeout(function(){
		// 	console.log("timed out now, will show the tabed content")
		// 	$(".tabContentWrapper").show();  /* now that all the 3 visualization graphs are initialized and images are got to clinet side and ready to be rendered, 										now unhiding the tab content */
		// 	$("#busy-loader").hide();
		// }, 2000);
	});
}

/**
* Displays the appropriate thumbnail in the slider. Called on page load to display the thumbnail at index of 0
* Also called whenever the user moves the slider to a different thumbmail.
*
* @param step - Index of the thumbnail to be displayed. 
**/
var slideImage = function(step) {
	if ( step == undefined ) {
		//console.log("step is undefined now");
		step = 1;
	}
	var indx = $('#myImage:visible').index('#myImage');


	if ( step != 0 ) {
		$('#myImage:visible').show();
	}

	indexImage = indexImage + step;

	if ( indexImage >= imagesData.length ) {
		indexImage = 0;

	} else if ( indexImage < 0 ) {
		indexImage = imagesData.length - 1;
	}
	//If step == 0, we don't need to do any fadein our fadeout
	if ( step != 0 ) {
		$('#myImage:eq(' + indx + ')').show();
	}

	console.log(indexImage);
	$('#myImage').attr('src', $(imagesData[indexImage].event_html).attr("src"));
	$.each(imagesData[indexImage], function(i) {
		$('#myContent').empty();
		$('#myContent').append("<p><br><b> Datetime: " + (imagesData[indexImage].event_display_date).split(",")[0] + ", " + (imagesData[indexImage].event_display_date).split(",")[1] + "</b></p>");
	});
};
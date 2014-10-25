
function transformSmallmanRatio(officers, totalSmallman){
	var smallmanRatio = [];
	var totalOfficers = 0;
	var restOfSmallman = totalSmallman;
	for (var i = 0;i < officers.length;i++)totalOfficers += officers[i];

	for (var i = 0;i < officers.length-1;i++){
		smallmanRatio.push(Math.ceil(totalSmallman*officers[i]/totalOfficers));
		restOfSmallman -= smallmanRatio[smallmanRatio.length-1];
	}
	smallmanRatio.push(restOfSmallman);
	return smallmanRatio;

}

function mapToPNG(index){
	switch (index){
		case 0:return "mayor";
		case 1:return "country-head";
		case 2:return "country-delegate";
		case 3:return "city-councilor";
		case 4:return "county-head";
		case 5:return "county-delegate";
		case 6:return "area-head";
		case 7:return "area-delegate";
		case 8:return "village-head";
	}

}

function mapToPosition(index){
	switch (index){
		case 0:return "直轄市長";
		case 1:return "縣(市)長";
		case 2:return "縣(市)議員";
		case 3:return "直轄市議員";
		case 4:return "鄉(鎮、市)長";
		case 5:return "鄉(鎮、市)民代表";
		case 6:return "原住民區長";
		case 7:return "原住民區民代表";
		case 8:return "村(里)長";
	}

}

function createSmallmanImg(i, smallmanId){

	return $('<img data-toggle="tooltip" data-placement="top" class="smallman" data-type="'
			+ mapToPNG(i) + '" id="smallman-'
			+ smallmanId  + '"  src="./index_files/liyuan/'
			+ mapToPNG(i) + '.png">');
}

function resetSmallRatioImage(){
	$("#smallman-ratio-1").css("left","0px").removeClass("rotate");
	$("#smallman-ratio-2").add("#smallman-ratio-3").css("left","13px").show();
	$("#smallman-ratio-4").css("left","20px").removeClass("rotate");
	$("#smallman-ratio-5").css("left","30px").removeClass("rotate");
	$("#smallman-ratio-6").css("left","40px").removeClass("rotate");
	$("#smallman-ratio-7").css("left","50px").removeClass("rotate");
	$("#smallman-ratio-8").css("left","60px").removeClass("rotate");
	$("#smallman-ratio-9").css("left","70px").removeClass("rotate");
}

function animateSmallmanRatio(){
	$("#smallman-ratio-2").add("#smallman-ratio-3").hide();
	$("#smallman-ratio-4").add("#smallman-ratio-5").add("#smallman-ratio-5").add("#smallman-ratio-6")
	.add("#smallman-ratio-7").add("#smallman-ratio-8").add("#smallman-ratio-9").addClass("rotate").animate({
		left: "0px"
	},1000,function(){

	});

}


$(document).ready(function(){
	resetSmallRatioImage();
	$("#smallman-ratio").hover(animateSmallmanRatio, resetSmallRatioImage)	
	var officers = [6, 16, 532, 375, 198, 2096, 6, 50, 7851];
	setTimeout(animateSmallmanRatio, 3000)
	setTimeout(resetSmallRatioImage, 7000)
	// mayor, countryHead, countryDelegate, cityCouncilor, countyHead,
	// countyDelegate, areaHead, areaDelegate, villageHead
	var totalSmallman = 1855;

	var smallmanRatio = transformSmallmanRatio( officers, totalSmallman);
	var smallmanId = 1;
	for (var i = 0 ;i < smallmanRatio.length; i++){
		for (var j = 0;j < smallmanRatio[i];j++){
			//var $smallManImage = $("#smallman-"+smallmanId);
			//if you want to dynamically create, use this
			var $smallManImage = createSmallmanImg(i, smallmanId).attr("title", officers[i]+"名"+mapToPosition(i));
			$smallManImage.appendTo("#smallman-graph")
			.tooltip({
    'selector': '',
    'placement': 'top',
    'container':'body'})
			.hover(function(){
				var type = $(this).attr("data-type");
				//$( "img[data-type='"+type+"']" ).removeClass("smallman").addClass("smallman-bigger");
				$( "img[data-type='"+type+"']" ).css("background-color", "rgb(55,55,55)");

			}, function(){
				var type = $(this).attr("data-type");
				$( "img[data-type='"+type+"']" ).css("background-color", "transparent");
				//$( "img[data-type='"+type+"']" ).removeClass("smallman-bigger").addClass("smallman");
			});
			smallmanId++;
		}
	}







});


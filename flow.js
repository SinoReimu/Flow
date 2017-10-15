// ex-paramter pieceCount: how many piece of div you want
var pieceCount = 5;
// ex-paramter hoverEvent: callback when some piece hovered
var hoverEventIn, hoverEventOut;
var callBaseStyle;

var hoverMoveXStep = 10;
var baseMargin = 80;

function setHoverEvent(eventIn, eventOut) {
	hoverEventIn = eventIn;
	hoverEventOut = eventOut;
}

function setCallBaseStyle(callStyle) {
	callBaseStyle = callStyle;
}

function initFlow() {
	initDom();
	initStyle();
}

function initDom() {
	// generate [pieceCount] divs
	// other paramters generated by pieceCount 
	var container = $("#container");
	for(var i=0; i<pieceCount; i++) {
		var div = document.createElement("div");
		$(div).attr("t", i);
		$(div).addClass("box");
		if(typeof(callBaseStyle)=="function"){
			callBaseStyle($(div));
		}	
		container.append(div);
	}
}

function initStyle() {
	core(-1);
	var container = $("#container > div");
	container.each(function(index){
		$(container[index]).hover(function(){
			var index = parseInt($(this).attr("t"));
			core(index);
			if(typeof(hoverEventIn)=="function"){
				hoverEventIn(index);
			}		
		},function(){
			core(-1);
			var index = parseInt($(this).attr("t"));
			var div = $("#container > div")[index];
			if(typeof(callBaseStyle)=="function"){
				callBaseStyle($(div));
			}	
			if(typeof(hoverEventOut)=="function"){
				hoverEventOut(index);
			}	
		});
		
	});
}

/* function core:
 * 	    paramter: focusIndex (which elem in container selected)
 *		 descript: calculate position of all elements and animated by transition
 *                translateX for x move, scale for zoom and z-index for layer index
 */
 
function core(focusIndex) {
	var container = $("#container > div");
	container.each(function(index){
		var translateX=0, scale=0, zindex=0;
		if(focusIndex == -1) {
			translateX = baseMargin*index;
			scale = 1;
			zindex = 50-Math.abs(index-Math.floor(pieceCount/2));
		} else {
			if(index == focusIndex) {
				zindex = 60;
				scale = 1.5;
				translateX = baseMargin*index;
			} else {
				scale=1;
				zindex = 50-Math.abs(index-Math.floor(pieceCount/2));
				translateX = baseMargin*index;
				if(index < focusIndex) {
					translateX -= (hoverMoveXStep*(focusIndex-index)); //left pieces move to left
				} else{
					translateX += (hoverMoveXStep*(index-focusIndex));
				}
			}
		}
		
		//split calculate module and animation module 
		//calculate paramter could be modify easier
		
		$(container[index]).css({
			"transform":  "translateX("+translateX+"px) scale("+scale+", "+scale+")",
			"z-index": zindex
		});
	});
	
}

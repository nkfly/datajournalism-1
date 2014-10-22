function scale_mapping(data){
	var islands = ['澎湖縣','金門縣','連江縣','綠島鄉','蘭嶼鄉','琉球鄉'];
	var enlarge = [1.5,1.5,2,3,2,3];
	var name;
	if(data.properties.name){
		name = data.properties.name;
		//alert(name);
	}
	else if(data.properties.town){
		name = data.properties.town; 
	}
	//alert(name);
	if(islands.indexOf(name) == -1){
		//alert("fuck");
		return 1;
	}
	else{
		//alert("fuck");
		var large_index = -1;
		for(var i =0;i<islands.length;i++){
			if(islands[i] == name){
				large_index = i;
			}
		}
		return enlarge[large_index];
		
	}	
}
function transform_function(d){
	var scale = scale_mapping(d);
	//alert(scale);
	var centroid = path.centroid(d),
		x = centroid[0],
                y = centroid[1];
	return "translate(" + x + "," + y + ")"
                + "scale(" + scale + ")"
                + "translate(" + -x + "," + -y + ")";
}
d3.selection.prototype.position = function() {

    var el = this.node();
    var elPos = el.getBoundingClientRect();
    var vpPos = getVpPos(el);

    function getVpPos(el) {
        if(el.parentElement.tagName === 'svg') {
            return el.parentElement.getBoundingClientRect();
        }
        return getVpPos(el.parentElement);
    }

    return {
        top: elPos.top - vpPos.top,
        left: elPos.left - vpPos.left,
        width: elPos.width,
        bottom: elPos.bottom - vpPos.top,
        height: elPos.height,
        right: elPos.right - vpPos.left
    };

}

function create_boundary(d,position,name,obj,json){
	var x_pos = position.left;
	var y_pos = position.top-10;
	var width = position.right - position.left;
	var height = position.bottom - position.top+10;
	var centroid = path.centroid(d),
		x = centroid[0],
		y = centroid[1];
	var xmid = x-(position.right + position.left)/2;
	svg.append("rect")
		.attr("x",x_pos+xmid)
		.attr("y",y_pos)
		.attr("width",width)
		.attr("height",height)
		.style("fill","transparent")
		.style("stroke","black")
		.attr('stroke-dasharray', '10,5')
		.on("mouseover",function(){
			d3.select(obj)
				.style("fill","orange");
			if(d.properties.name){
           		         d3.select("#tooltip1")
                		    .select("#name").text(d.properties.name);
                    	for(var i =1;i<7;i++){
          			d3.select("#tooltip1")
                        	.select("#t1v"+i.toString())
                        	.text(d.properties.value[i-1]);
                    	}
                    	if(d.properties.number_of_vote == 3){
                      		for(var i=1;i<3;i++){
                        	d3.select("#tooltip1")
                          	.select("#p"+i.toString())
                          	.style("display","None");
                      		}
                    	}
                    	else{
                      		for(var i=1;i<3;i++){
                        		d3.select("#tooltip1")
                          			.select("#p"+i.toString())
                          			.style("display","inline-block")
                      		}
                    	}
                    	d3.select("#tooltip1").style("display","inline");
                  	}
                  	else if(d.properties.town){
				for(var j=0;j<json.features.length;j++){
                                	if(json.features[j].properties.name == d.properties.county){
						d3.select("#tooltip1")
                                    			.select("#name").text(d.properties.town);
						for(var i =1;i<7;i++){
                                			d3.select("#tooltip1")
                                			.select("#t1v"+i.toString())
                                			.text(json.features[j].properties.value[i-1]);
                        			}	
                                        	break;
                                	}             
                        	}
				for(var i=1;i<3;i++){
                                        d3.select("#tooltip1")
                                                .select("#p"+i.toString())
                                                .style("display","inline-block")
                                }
				d3.select("#tooltip1").style("display","inline");
                  }

		})
		.on("mouseout",function(){
			d3.select(obj)
				.style("fill",function(d){
                        		if(d.properties.number_of_vote == 3){
                          			return color_three;
                                        }
                        		else if(d.properties.town && islands.indexOf(d.properties.town) == -1){
                          			return color_native;
                        		}
                        		else{
                         			return color_five;
                          		}
                    		});
			d3.select("#tooltip1")
				.style("display","None");
		})
	return 0;
}


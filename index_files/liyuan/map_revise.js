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
	/*
	if(d.properties.name == "連江縣"){
		var y2 = y+50;
		return "translate(" + x + "," + y + ")"
                + "scale(" + scale + ")"
                + "translate(" + -x + "," + y + ")";

	}
	*/
	return "translate(" + x + "," + y + ")"
                + "scale(" + scale + ")"
                + "translate(" + -x + "," + -y + ")";
}
d3.selection.prototype.position = function() {
    var el = this.node();
    var elPos = el.getBoundingClientRect();
    var vpPos = getVpPos(el);
	
    function getVpPos(el) {
    	alert("test3");
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
	var width = position.right - position.left + 10;
	var height = position.bottom - position.top+10;
	var centroid = path.centroid(d),
		x = centroid[0],
		y = centroid[1];
	var xmid = x-(position.right + position.left)/2;
	
	svg.append("rect")
		.attr("x",x-width/2)
		.attr("y",y-height/2)
		//.attr("x",x_pos+xmid)
		//.attr("y",y_pos)
		.attr("width",width)
		.attr("height",height)
		.style("z-index","3")
		.style("fill","transparent")
		//.style("stroke","black")
		//.attr('stroke-dasharray', '10,5')
		.on("mouseover",function(){
			d3.select(obj)
				.style("opacity","1.0");
				//.style("fill","orange");
			mouseover(this,d,json);

		})
		.on("mouseout",function(){
			mouseout(svg);
			d3.select(obj)
				.style("opacity","0.5")
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
			d3.select("#tooltip2")
				.style("display","None");
		})
	return 0;
}
function solve(x1,y1,x2,y2){
	var a = (y1-y2)/(x1-x2);
	var b =  y1-a*x1;
	return [a,b]
}
function find_line(svg){
	var x1,x2,y1,y2;
	svg.selectAll("path")
		.each(function(d){
			if(d.properties.name == "新北市"){
				x1 = d3.select(this).position().left;
				y1 = (d3.select(this).position().top + d3.select(this).position().bottom)/2;
			}
			else if(d.properties.name == "屏東縣"){
				x2 = d3.select(this).position().left;
                                y2 = (d3.select(this).position().top + d3.select(this).position().bottom)/2;				
			}
		});
	return solve(x1,y1,x2,y2);
}
function mouseover(obj,d,json){
	/*
	var coordinates = [0, 0];
	coordinates = d3.mouse(obj);
	var x = coordinates[0];
	var y = coordinates[1];
	*/
	var centroid = path.centroid(d);
	var x = centroid[0];
	var y = centroid[1];
	var left = d3.select(obj).position().left;
	var x1 = (d3.select(obj).position().left + d3.select(obj).position().right +350)/2;
	var y1 = (d3.select(obj).position().top + d3.select(obj).position().bottom)/2;
	var solve_result = find_line(svg);
	
	if((solve_result[0]*left + solve_result[1]-y1) <= 0){
                x2 = x + 50;
                var tooltip_left = x2*1.5; //+270/1.5;//*1.5;//+100;
        }
        else{
                x2 = x - 50;
                var tooltip_left = x2*1.5-300;//*1.5; //+ 210;
        }
	y2 = y;
	var tooltip_top = y2-25;
	move_up = ['蘭嶼鄉','綠島鄉','琉球鄉'];
	move_right = ['金門縣'];
	move_left = ['澎湖縣'];
	move_down = ['連江縣'];
	if(move_up.indexOf(d.properties.town) != -1){
		tooltip_top = y2-50;
		x2 = x2 - 20;
		tooltip_left = tooltip_left -20*1.5;
	}
	if(move_left.indexOf(d.properties.name) != -1){
                x2 = x2 + 20 ;
                tooltip_left = tooltip_left + 20*1.5;
        }
	if(move_right.indexOf(d.properties.name) != -1){
		x2 = x + 80 ; 
		tooltip_left = x2*1.5;
	}
	if(move_down.indexOf(d.properties.name) != -1){
                tooltip_top = y2+50;
        }

	//alert(x1.toString()+" "+y1.toString());
	var line = d3.select("#svg1 g")
			.append("line")
			.attr("x1",x)
			.attr("y1",y)
			.attr("x2",x2)
			.attr("y2",y2)
			.attr("stroke","black")
			.attr("stroke-width",1);
	if(d.properties.name){
                                d3.select("#tooltip1")
				.style("top",tooltip_top + "px")
				.style("left",tooltip_left + "px")
                                .select("#name")
				.text(d.properties.name);
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
                        d3.select("#tooltip2")
				.style("top",tooltip_top + "px")
                                .style("left",tooltip_left + "px")
                                .select("#name2")
                                .text(d.properties.town);
                        var tv = [];
                        for(var j=0;j<json.features.length;j++){
                                if(json.features[j].properties.name == d.properties.county){
                                        tv.push(json.features[j].properties.value[2]);
                                        tv.push(json.features[j].properties.value[3]);
                                        break;
                                }             
                        }
                        for(var i=1;i<3;i++){
                                d3.select("#tooltip2")
                                .select("#t2v"+i.toString())
                                .text(tv[i-1]);
                        }
                        d3.select("#tooltip2")
                        .style("display","inline");
        }
}
function mouseout(svg){
	svg.selectAll("line")
		.remove();
}

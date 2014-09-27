// Dimensions of sunburst.
var width = 1000;
var height = 550;
var radius = Math.min(width, height) / 2;

// Breadcrumb dimensions: width, height, spacing, width of tip/tail.
var b = {
  w: 200, h: 30, s: 3, t: 10
};

// Mapping of step names to colors.
	var colors = {
		"電信業"                                  : "#9bf279",
		"石油及天然氣礦業"                        : "#c579f2",
		"其他保險及退休基金輔助業"                : "#79f28e",
		"港埠業"                                  : "#f28779",
		"電力供應業"                              : "#79bbf2",
		"銀行業"                                  : "#79f29a",
		"其他金融中介業"                          : "#f279d3",
		"電力及燃氣供應業"                        : "#e2f279",
		"用水供應業"                              : "#bc79f2",
		"石油及煤製品製造業"                      : "#bff279",
		"郵政業"                                  : "#7999f2",
		"航空運輸業"                              : "#79f292",
		"金融及保險業"                            : "#f279e7",
		"證券期貨及其他金融業"                    : "#79f2e7",
		"海洋水運業"                              : "#f2e679",
		"信用合作社業"                            : "#79eff2",
		"專門設計服務業"                          : "#8579f2",
		"氣體燃料供應業"                          : "#f29979",
		"資訊及通訊傳播業"                        : "#f279cc",
		"資料處理及資訊供應服務業"                : "#bdf279",
		"人身保險業"                              : "#f2ab79",
		"電腦系統設計服務業"                      : "#e479f2",
		"鐵路大眾捷運系統運輸業"                  : "#8079f2",
		"化學材料製造業"                          : "#f279b8",
		"建築、工程服務及技術檢測、分析服務業"    : "#f279d1",
		"醫療保健服務業"                          : "#f27c79",
		"財產保險業"                              : "#f279b8",
		"農會、漁會信用部"                        : "#d079f2",
		"法律服務業"                              : "#79eaf2",
		"會計服務業"                              : "#79f29a",
		"飲料及菸草製造業"                        : "#f279af",
		"專業、科學及技術服務業"                  : "#79eff2",
		"礦業及土石採取業"                        : "#799df2",
		"出版業"                                  : "#9179f2",
		"基本金屬製造業"                          : "#c679f2",
		"廣告業及市場研究業"                      : "#79f282",
		"電腦、電子產品及光學製品製造業"          : "#79f0f2",
		"化學製品製造業"                          : "#f2e779",
		"企業總管理機構及管理顧問業"              : "#f2c679",
		"電子零組件製造業"                        : "#aff279",
		"傳播及節目播送業"                        : "#f2c879",
		"不動產開發業"                            : "#f28679",
		"運輸及倉儲業"                            : "#bcf279",
		"快遞服務業"                              : "#acf279",
		"其他專業、科學及技術服務業"              : "#f27989",
		"汽車及其零件製造業"                      : "#79f2b2",
		"服務業部門"                              : "#f2d579",
		"公共汽車客運業"                          : "#e3f279",
		"業務及辦公室支援服務業"                  : "#f2ce79",
		"批發業"                                  : "#87f279",
		"工業及服務業"                            : "#81f279",
		"其他運輸工具及其零件製造業"              : "#79f27b",
		"建築工程業"                              : "#f2e779",
		"倉儲業"                                  : "#a379f2",
		"用水供應及污染整治業"                    : "#8579f2",
		"工業部門"                                : "#f2ae79",
		"製造業"                                  : "#8d79f2",
		"藥品及醫用化學製品製造業"                : "#def279",
		"其他專門營造業"                          : "#f279cc",
		"創作及藝術表演業"                        : "#f279d7",
		"營造業"                                  : "#84f279",
		"批發及零售業"                            : "#79ddf2",
		"其他運輸輔助業"                          : "#79f2d2",
		"機電、管道及其他建築設備安裝業"          : "#f279e0",
		"產業用機械設備維修及安裝業"              : "#f29f79",
		"租賃業"                                  : "#f279ad",
		"土木工程業"                              : "#79f2cc",
		"影片服務、聲音錄製及音樂出版業"          : "#79f29d",
		"不動產業"                                : "#d179f2",
		"綜合商品零售業"                          : "#79f292",
		"機械設備製造業"                          : "#79f2cc",
		"個人及家庭用品維修業"                    : "#7989f2",
		"非金屬礦物製品製造業"                    : "#79d5f2",
		"旅行及相關代訂服務業"                    : "#79f2e3",
		"食品製造業"                              : "#f29d79",
		"橡膠製品製造業"                          : "#f279bc",
		"人力仲介業"                              : "#f279b3",
		"電力設備製造業"                          : "#a779f2",
		"塑膠製品製造業"                          : "#79f2c8",
		"印刷及資料儲存媒體複製業"                : "#7df279",
		"其他製造業"                              : "#c279f2",
		"皮革、毛皮及其製品製造業"                : "#f1f279",
		"紡織業"                                  : "#94f279",
		"藝術、娛樂及休閒服務業"                  : "#f279a1",
		"其他餐飲業"                              : "#86f279",
		"金屬製品製造業"                          : "#79def2",
		"紙漿、紙及紙製品製造業"                  : "#79b8f2",
		"廢（污）水處理業"                        : "#f279ed",
		"廢棄物處理業"                            : "#f279f2",
		"運動、娛樂及休閒服務業"                  : "#f27995",
		"零售業"                                  : "#79f2e6",
		"住宿服務業"                              : "#f28b79",
		"汽車貨運業"                              : "#f2c779",
		"不動產經營及相關服務業"                  : "#ddf279",
		"人力供應業"                              : "#f2ae79",
		"其他個人服務業"                          : "#f29979",
		"支援服務業"                              : "#9179f2",
		"木竹製品製造業"                          : "#79f298",
		"其他服務業"                              : "#f279d1",
		"家具製造業"                              : "#f279c4",
		"砂、石及黏土採取業"                      : "#79f2a1",
		"成衣及服飾品製造業"                      : "#79f2ac",
		"保全及私家偵探服務業"                    : "#f28f79",
		"污染整治業"                              : "#caf279",
		"住宿及餐飲業"                            : "#7c79f2",
		"建築物及綠化服務業"                      : "#f28379",
		"廢棄物清除業"                            : "#f2cb79",
		"餐館業"                                  : "#79f287",
		"美髮及美容美體業"                        : "#c279f2",
		"其他汽車客運業"                          : "#79f2b4",
		"其他教育及教育輔助服務業"                : "#79f2b5",
		"教育服務業"                              : "#cff279"
	}
var salary = {
	"工業及服務業": "45664",
	"工業部門": "44076",
	"礦業及土石採取業": "54871",
	"石油及天然氣礦業": "96661",
	"砂、石及黏土採取業": "32240",
	"製造業": "43829",
	"食品製造業": "38248",
	"飲料及菸草製造業": "55644",
	"紡織業": "36219",
	"成衣及服飾品製造業": "31370",
	"皮革、毛皮及其製品製造業": "36773",
	"木竹製品製造業": "33810",
	"紙漿、紙及紙製品製造業": "35643",
	"印刷及資料儲存媒體複製業": "37555",
	"石油及煤製品製造業": "85642",
	"化學材料製造業": "62566",
	"化學製品製造業": "51743",
	"藥品及醫用化學製品製造業": "43106",
	"橡膠製品製造業": "38037",
	"塑膠製品製造業": "37627",
	"非金屬礦物製品製造業": "38500",
	"基本金屬製造業": "53659",
	"金屬製品製造業": "35834",
	"電子零組件製造業": "51674",
	"電腦、電子產品及光學製品製造業": "51883",
	"電力設備製造業": "37649",
	"機械設備製造業": "38783",
	"汽車及其零件製造業": "47284",
	"其他運輸工具及其零件製造業": "44817",
	"家具製造業": "32388",
	"其他製造業": "36943",
	"產業用機械設備維修及安裝業": "41702",
	"電力及燃氣供應業": "88873",
	"電力供應業": "93742",
	"氣體燃料供應業": "65664",
	"用水供應及污染整治業": "44118",
	"用水供應業": "87724",
	"廢（污）水處理業": "35579",
	"廢棄物清除業": "28482",
	"廢棄物處理業": "35162",
	"污染整治業": "30872",
	"營造業": "42540",
	"建築工程業": "44631",
	"土木工程業": "41035",
	"機電、管道及其他建築設備安裝業": "41864",
	"其他專門營造業": "42809",
	"服務業部門": "46921",
	"批發及零售業": "42274",
	"批發業": "45825",
	"零售業": "34846",
	"綜合商品零售業": "39121",
	"運輸及倉儲業": "49808",
	"鐵路大眾捷運系統運輸業": "62992",
	"公共汽車客運業": "46368",
	"其他汽車客運業": "24909",
	"汽車貨運業": "34804",
	"海洋水運業": "70584",
	"航空運輸業": "80488",
	"港埠業": "95823",
	"其他運輸輔助業": "42233",
	"倉儲業": "44391",
	"郵政業": "81613",
	"快遞服務業": "49703",
	"住宿及餐飲業": "30504",
	"住宿服務業": "34814",
	"餐館業": "28033",
	"其他餐飲業": "35871",
	"資訊及通訊傳播業": "65545",
	"出版業": "53676",
	"影片服務、聲音錄製及音樂出版業": "40887",
	"傳播及節目播送業": "51228",
	"電信業": "98198",
	"電腦系統設計服務業": "63061",
	"資料處理及資訊供應服務業": "63862",
	"金融及保險業": "77871",
	"銀行業": "92501",
	"信用合作社業": "66859",
	"農會、漁會信用部": "56261",
	"其他金融中介業": "90408",
	"人身保險業": "63270",
	"財產保險業": "58104",
	"其他保險及退休基金輔助業": "96579",
	"證券期貨及其他金融業": "71045",
	"不動產業": "40298",
	"不動產開發業": "51045",
	"不動產經營及相關服務業": "34286",
	"專業、科學及技術服務業": "55507",
	"法律服務業": "56006",
	"會計服務業": "55776",
	"企業總管理機構及管理顧問業": "51698",
	"建築、工程服務及技術檢測、分析服務業": "60631",
	"廣告業及市場研究業": "53208",
	"專門設計服務業": "66289",
	"其他專業、科學及技術服務業": "48652",
	"支援服務業": "33850",
	"租賃業": "41573",
	"人力仲介業": "37814",
	"人力供應業": "34117",
	"旅行及相關代訂服務業": "38406",
	"保全及私家偵探服務業": "31270",
	"建築物及綠化服務業": "28708",
	"業務及辦公室支援服務業": "45921",
	"教育服務業": "22922",
	"其他教育及教育輔助服務業": "22922",
	"醫療保健服務業": "59910",
	"藝術、娛樂及休閒服務業": "36072",
	"創作及藝術表演業": "42623",
	"運動、娛樂及休閒服務業": "35078",
	"其他服務業": "33313",
	"個人及家庭用品維修業": "38545",
	"美髮及美容美體業": "25984",
	"其他個人服務業": "33980"
}

// Total size of all segments; we set this later, after loading the data.
var totalSize = 0; 

var vis = d3.select("#chart").append("svg:svg")
    .attr("width", width)
    .attr("height", height)
    .append("svg:g")
    .attr("id", "container")
    //.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	.attr("transform", "translate(" + radius + "," + radius + ")");

var partition = d3.layout.partition()
    .size([2 * Math.PI, radius * radius])
    .value(function(d) { return d.size; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return d.x; })
    .endAngle(function(d) { return d.x + d.dx; })
    .innerRadius(function(d) { return Math.sqrt(d.y); })
    .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

// Use d3.text and d3.csv.parseRows so that we do not need to have a header
// row, and can receive the csv as an array of arrays.
d3.text("visit-sequences.csv", function(text) {
  var csv = d3.csv.parseRows(text);
  var json = buildHierarchy(csv);
  createVisualization(json);
});

// Main function to draw and set up the visualization, once we have the data.
function createVisualization(json) {

  // Basic setup of page elements.
  initializeBreadcrumbTrail();
  drawLegend();
  d3.select("#togglelegend").on("click", toggleLegend);

  // Bounding circle underneath the sunburst, to make it easier to detect
  // when the mouse leaves the parent g.
  vis.append("svg:circle")
      .attr("r", radius)
      .style("opacity", 0);

  // For efficiency, filter nodes to keep only those large enough to see.
  var nodes = partition.nodes(json)
      .filter(function(d) {
      return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
      });

  var path = vis.data([json]).selectAll("path")
      .data(nodes)
      .enter().append("svg:path")
      .attr("display", function(d) { return d.depth ? null : "none"; })
      .attr("d", arc)
      .attr("fill-rule", "evenodd")
      .style("fill", function(d) { return colors[d.name]; })
      .style("opacity", 1)
      .on("mouseover", mouseover);

  // Add the mouseleave handler to the bounding circle.
  d3.select("#container").on("mouseleave", mouseleave);

  // Get total size of the tree = value of root node from partition.
  totalSize = path.node().__data__.value;
 };

// Fade all but the current sequence, and show it in the breadcrumb trail.
function mouseover(d) {

  /*var percentage = (100 * d.value / totalSize).toPrecision(3);
  var percentageString = percentage + "%";
  if (percentage < 0.1) {
    percentageString = "< 0.1%";
  }*/
  var percentageString = salary[d.name]+" 元";

  d3.select("#name")
      .text(d.name);
  
  d3.select("#percentage")
      .text(percentageString);

  d3.select("#explanation")
      .style("visibility", "");

  var percentage = (100 * d.value / totalSize).toPrecision(3);
  percentageString = "佔就業人口 "+percentage + "%";
  if (percentage < 0.1) {
    percentageString = "佔就業人口 "+"< 0.1%";
  }
  var sequenceArray = getAncestors(d);
  updateBreadcrumbs(sequenceArray, percentageString);

  // Fade all the segments.
  d3.selectAll("path")
      .style("opacity", 0.3);

  // Then highlight only those that are an ancestor of the current segment.
  vis.selectAll("path")
      .filter(function(node) {
                return (sequenceArray.indexOf(node) >= 0);
              })
      .style("opacity", 1);
}

// Restore everything to full opacity when moving off the visualization.
function mouseleave(d) {

  // Hide the breadcrumb trail
  d3.select("#trail")
      .style("visibility", "hidden");

  // Deactivate all segments during transition.
  d3.selectAll("path").on("mouseover", null);

  // Transition each segment to full opacity and then reactivate it.
  d3.selectAll("path")
      .transition()
      .duration(1000)
      .style("opacity", 1)
      .each("end", function() {
              d3.select(this).on("mouseover", mouseover);
            });

  d3.select("#explanation")
      .transition()
      .duration(1000)
      .style("visibility", "hidden");
}

// Given a node in a partition layout, return an array of all of its ancestor
// nodes, highest first, but excluding the root.
function getAncestors(node) {
  var path = [];
  var current = node;
  while (current.parent) {
    path.unshift(current);
    current = current.parent;
  }
  return path;
}

function initializeBreadcrumbTrail() {
  // Add the svg area.
  var trail = d3.select("#sequence").append("svg:svg")
      .attr("width", b.w*5)
      .attr("height", 50)
      .attr("id", "trail");
  // Add the label at the end, for the percentage.
  trail.append("svg:text")
    .attr("id", "endlabel")
    .style("fill", "#000");
}

// Generate a string that describes the points of a breadcrumb polygon.
function breadcrumbPoints(d, i) {
  var points = [];
  points.push("0,0");
  points.push(b.w + ",0");
  points.push(b.w + b.t + "," + (b.h / 2));
  points.push(b.w + "," + b.h);
  points.push("0," + b.h);
  if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
    points.push(b.t + "," + (b.h / 2));
  }
  return points.join(" ");
}

// Update the breadcrumb trail to show the current sequence and percentage.
function updateBreadcrumbs(nodeArray, percentageString) {

  // Data join; key function combines name and depth (= position in sequence).
  var g = d3.select("#trail")
      .selectAll("g")
      .data(nodeArray, function(d) { return d.name + d.depth; });

  // Add breadcrumb and label for entering nodes.
  var entering = g.enter().append("svg:g");

  entering.append("svg:polygon")
      .attr("points", breadcrumbPoints)
      .style("fill", function(d) { return colors[d.name]; });

  entering.append("svg:text")
      .attr("x", (b.w + b.t) / 2)
      .attr("y", b.h / 2)
      .attr("dy", "0.5em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.name; });

  // Set position for entering and updating nodes.
  g.attr("transform", function(d, i) {
    return "translate(" + i * (b.w + b.s) + ", 0)";
  });

  // Remove exiting nodes.
  g.exit().remove();

  // Now move and update the percentage at the end.
  d3.select("#trail").select("#endlabel")
      .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(percentageString);

  // Make the breadcrumb trail visible, if it's hidden.
  d3.select("#trail")
      .style("visibility", "");

}

function drawLegend() {

  // Dimensions of legend item: width, height, spacing, radius of rounded rect.
  var li = {
    w: 180, h: 30, s: 3, r: 3
  };

  var legend = d3.select("#legend").append("svg:svg")
      .attr("width", li.w)
      .attr("height", d3.keys(colors).length * (li.h + li.s));

  var g = legend.selectAll("g")
      .data(d3.entries(colors))
      .enter().append("svg:g")
      .attr("transform", function(d, i) {
              return "translate(0," + i * (li.h + li.s) + ")";
           });

  g.append("svg:rect")
      .attr("rx", li.r)
      .attr("ry", li.r)
      .attr("width", li.w)
      .attr("height", li.h)
      .style("fill", function(d) { return d.value; });

  g.append("svg:text")
      .attr("x", li.w / 2)
      .attr("y", li.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.key; });
}

function toggleLegend() {
  var legend = d3.select("#legend");
  if (legend.style("visibility") == "hidden") {
    legend.style("visibility", "");
  } else {
    legend.style("visibility", "hidden");
  }
}

// Take a 2-column CSV and transform it into a hierarchical structure suitable
// for a partition layout. The first column is a sequence of step names, from
// root to leaf, separated by hyphens. The second column is a count of how 
// often that sequence occurred.
function buildHierarchy(csv) {
  var root = {"name": "root", "children": []};
  for (var i = 0; i < csv.length; i++) {
    var sequence = csv[i][0];
    var size = +csv[i][1];
    if (isNaN(size)) { // e.g. if this is a header row
      continue;
    }
    var parts = sequence.split("-");
    var currentNode = root;
    for (var j = 0; j < parts.length; j++) {
      var children = currentNode["children"];
      var nodeName = parts[j];
      var childNode;
      if (j + 1 < parts.length) {
   // Not yet at the end of the sequence; move down the tree.
 	var foundChild = false;
 	for (var k = 0; k < children.length; k++) {
 	  if (children[k]["name"] == nodeName) {
 	    childNode = children[k];
 	    foundChild = true;
 	    break;
 	  }
 	}
  // If we don't already have a child node for this branch, create it.
 	if (!foundChild) {
 	  childNode = {"name": nodeName, "children": []};
 	  children.push(childNode);
 	}
 	currentNode = childNode;
      } else {
 	// Reached the end of the sequence; create a leaf node.
 	childNode = {"name": nodeName, "size": size};
 	children.push(childNode);
      }
    }
  }
  return root;
};

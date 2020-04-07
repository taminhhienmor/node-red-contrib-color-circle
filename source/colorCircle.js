module.exports = function (RED) {
	"use strict";

	var gain, offset_x, offset_green;
		gain = 10
		offset_x= 0.2
		offset_green = 0.6

	function colorCircle(n) {
		RED.nodes.createNode(this, n);
		this.box = RED.nodes.getNode(n.box);
		var node = this;

		var propertyType = n.propertyType || "msg";
		var property = n.property;
		var globalContext = this.context().global;
		var flowContext = this.context().flow; 
		
		node.on("input", function (msg) {
			node.status({});

			if(msg.gain) gain = msg.gain
			if(msg.offset_x) offset_x = msg.offset_x
			if(msg.offset_green) offset_green = msg.offset_green

			var value = ""
			if(property == "") {
				node.error(RED._("Value is not empty"),msg)
				node.status({fill:"red",shape:"ring",text:"Error. Empty value"});        
				return;
			}
			switch (propertyType) {
				case "str":
					value = property
					break;
				case "msg":
					value = msg[property]
					break;
				case "flow":
					value = flowContext.get(property)
					break;
				case "global":
					value = globalContext.get(property)
					break;
				default:
					value = property
					break;
			}
			value = parseInt(value);

			if(0 <= value && value <= 1) {
				msg.payload = colorBarRGB(value);
				node.send(msg);    
			} else {
				node.error(RED._("Out of range. Please input value in 0 ~ 1.0"),msg)
				node.status({fill:"red",shape:"ring",text:"Error. Out of range"});        
				return;
			}
		})   
  	}

	function sigmoid(x, gain, offset_x) {
	    return ((Math.tanh(((x+offset_x)*gain)/2)+1)/2)
	}

	function colorBarRGB(x) {
	    var red, blue, green;
	    x = (x * 2) - 1;
	    red = sigmoid(x, gain, -1*offset_x);
	    blue = 1-sigmoid(x, gain, offset_x)
	    green = sigmoid(x, gain, offset_green) + (1-sigmoid(x,gain,-1*offset_green));
	    green = green - 1.0;
	    return [parseInt(red*256), parseInt(green*256), parseInt(blue*256)];
	}

	RED.nodes.registerType("colorCircle", colorCircle);
};
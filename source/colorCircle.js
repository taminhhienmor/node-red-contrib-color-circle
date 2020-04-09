module.exports = function (RED) {
	"use strict";

	function colorCircle(n) {
		RED.nodes.createNode(this, n);
		this.box = RED.nodes.getNode(n.box);
		var node = this;

		var valuetype = n.valuetype || "num";
		var valueproperty = n.valueproperty;
		
		var gaintype = n.gaintype || "num";
		var gainproperty = n.gainproperty;
		
		var offsetxtype = n.offsetxtype || "num";
		var offsetxproperty = n.offsetxproperty;
		
		var offsetgreentype = n.offsetgreentype || "num";
		var offsetgreenproperty = n.offsetgreenproperty;
		
		node.on("input", function (msg) {
			node.status({});

			if(valueproperty == "") {
				node.error(RED._("Value can't empty"),msg)
				node.status({fill:"red",shape:"ring",text:"Error. Empty value"});        
				return;
			}

			
			var value = getValueProperty(valuetype, valueproperty, this, msg)
			var gain = getValueProperty(gaintype, gainproperty, this, msg) || 10
			var offset_x = getValueProperty(offsetxtype, offsetxproperty, this, msg) || 0.2
			var offset_green = getValueProperty(offsetgreentype, offsetgreenproperty, this, msg) || 0.6
			

			if(0 <= value && value <= 1) {
				msg.payload = colorBarRGB(value, gain, offset_x, offset_green);
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

	function colorBarRGB(x, gain, offset_x, offset_green) {
	    var red, blue, green;
	    x = (x * 2) - 1;
	    red = sigmoid(x, gain, -1*offset_x);
	    blue = 1-sigmoid(x, gain, offset_x)
	    green = sigmoid(x, gain, offset_green) + (1-sigmoid(x,gain,-1*offset_green));
	    green = green - 1.0;
	    return [parseInt(red*256), parseInt(green*256), parseInt(blue*256)];
	}

	function getValueProperty(valuetype, valueproperty, that, msg) {
		var value = ""
		var globalContext = that.context().global;
		var flowContext = that.context().flow;
		switch (valuetype) {
			case "num":
				value = valueproperty
				break;
			case "msg":
				value = msg[valueproperty]
				break;
			case "flow":
				value = flowContext.get(valueproperty)
				break;
			case "global":
				value = globalContext.get(valueproperty)
				break;
			default:
				value = valueproperty
				break;
		}
		return parseFloat(value)
	}

	RED.nodes.registerType("colorCircle", colorCircle);
};
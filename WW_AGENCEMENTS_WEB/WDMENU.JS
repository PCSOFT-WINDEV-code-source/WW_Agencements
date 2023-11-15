var menuColor = "#A0A0FF"
var menuActive = 0
var onLayer
var timeOn = null

var bName = navigator.appName;
var bVer = parseInt(navigator.appVersion);
var NS4 = (bName == "Netscape" && bVer >= 4);
var IE4 = (bName == "Microsoft Internet Explorer" && bVer >= 4);

if (navigator.appName == "Netscape")
{
	layerStyleRef="layer.";
	layerRef="document.layers";
	styleSwitch="";
}
else
{
	layerStyleRef="layer.style.";
	layerRef="document.all";
	styleSwitch=".style";
}

function showMenu(layerName)
{
	if (NS4 || IE4)
	{
		if (timeOn != null)
		{
			clearTimeout(timeOn)
			hideMenu(onLayer)
		}

		eval(layerRef+'["'+layerName+'"]'+styleSwitch+'.visibility="visible"');
		onLayer = layerName
	}
}

function hideMenu(layerName)
{
	if (menuActive == 0)
		eval(layerRef+'["'+layerName+'"]'+styleSwitch+'.visibility="hidden"');
}

function outTimer()
{
	if (NS4 || IE4)
		timeOn = setTimeout("timerOut()",1000)
}

function timerOut(layerName)
{
	if (menuActive == 0)
		hideMenu(onLayer)
}

function menuOver()
{
	clearTimeout(timeOn)
	menuActive = 1
}

function menuOut()
{
	menuActive = 0 
	timeOn = setTimeout("hideMenu(onLayer)", 400)
}

function menuItem(title, action)
{
	this.title = title
	this.action = action
}

function menuMaker(menuArray)
{
	n = ""
	j = eval(menuArray + ".length") - 1;
	topTable = "<div ID='" + eval(menuArray + ".id") + "'><table  border='1' cellspacing='0' cellpadding='2' bgcolor='" + menuColor +"'><tr><td><table border='0' cellspacing='0' cellpadding='0' bgcolor='" + menuColor + "'>"
	endrow = "</td></tr>"
	btmTable = "</table></td></tr></table></div>"

	n += topTable
	for( var i = 0; i <=j; i++)
	n += "<tr><td><a href='" + eval(menuArray + "[" + i + "].action") + "' onMouseOver='menuOver()' onMouseOut='menuOut()' class='menus' target='_top'>" + eval(menuArray + "[" + i + "].title") + "</a>" + endrow

	n += btmTable
	return n
}


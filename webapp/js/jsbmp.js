function _pack(num, len) {
    var o = [], len = ((typeof len == 'undefined') ? 4 : len);
    for (var i=0; i<len; ++i) {
        o.push(String.fromCharCode((num >> (i * 8)) & 0xff));
    }
    return o.join("");
}

function _bmp(width, height, palette, imgdata, bpp, compression) {

    var imgdatasize = imgdata.length;
    var palettelength = palette.length;
    var palettesize = palettelength * 4; // 4 bytes per colour
    var filesize = 64 + palettesize + imgdatasize; // size of file
    var pixeloffset = 54 + palettesize; // pixel data offset
    var data = [
        "BM",                                 // magic number
        _pack(width),      // size of file
        "\x00\x00\x00\x00",               // unused
        _pack(pixeloffset),   // number of bytes until pixel data
        "\x28\x00\x00\x00",               // number of bytes left in the header
        _pack(width),         // width of pixmap
        _pack(height),        // height of pixmap
        "\x01\x00",                         // number of colour planes, must be 1
        _pack(bpp, 2),           // bits per pixel
        _pack(compression),   // compression mode
        _pack(imgdatasize),   // size of raw BMP data (after the header)
        "\xC4\x0E\x00\x00",               // # pixels per metre horizontal res.
        "\xC4\x0E\x00\x00",               // # pixels per metre vertical res
        _pack(palettelength), // num colours in palette
        "\x00\x00\x00\x00"                // all colours are important

        // END OF HEADER
     ];

    for (var i=0; i<palette.length; ++i) {
        data.push(_pack(parseInt(palette[i], 16)));
    }
    data.push(imgdata);
	
	var image = document.getElementById('bmp');
	image.src = datauri('image/bmp',data.join(""));
	return datauri('image/bmp',data.join(""));
}

function bmp_mono(width, height, pixarray, palette) {
	var rowsize = Math.ceil(width / 8);
	if (typeof palette == 'undefined')
		palette = ['000000', 'ffffff'];

	var j, pix, mod;
	pixarray.reverse();
	var pixels = [];
	var b = 0;
	for (var i=0; i<height; ++i) {
		row = [];
		for (j=0; j<width; ++j) {
			mod = j % 8;
			pix = pixarray.pop();
			if (parseInt(pix, 16) != 0) {
				b = b | Math.pow(2, 7-mod);
			}
			if (mod == 7 || j == width-1) {
				pixels.push(String.fromCharCode(b));
				b = 0;
			}
		}
	}
	return _bmp(width, height, palette, pixels.join(""), 1, 0);
}


function createBMP(canvas) {
    var context = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    var imageData = context.getImageData(0, 0, width, height);
    var data = imageData.data;

    //create pixel array from canvas based on alpha
    var pixels = [];
    for (var i = data.length - 1; i > 0; i -= 4) {
        if (i > 0) {
            if (data[i] > 128) {
                pixels.push("000000");
            } else {
                pixels.push("ffffff");
            }
        }
    }
    //unmirror
    var pixarray = [];
    for (var i = height - 1; i > -1; i--) {
        var row = [];
        for (var j = 0; j < width; j++) {
            row.push(pixels[(i * width) + j]);
        }
        for (var j in row) {
            pixarray.push(row[j]);
        }
    }
    pixarray.reverse();

    return bmp_mono(width, height, pixarray);
}



var base64encode = function(){
    // This is a non-standard extension available in Mozilla
    // and possibly other browsers.
    if (typeof window.btoa != "undefined")
        return window.btoa;

    /* JS fallback based on public domain code from Tyler Akins:
        http://rumkin.com/tools/compression/base64.php */
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    function _btoa(data) {
        var chr1, chr2, chr3, enc1, enc2, enc3,
            i=0, length=data.length, output="";
        while (i < length) {
            // Convert 3 bytes of data into 4 6-bit chunks
            chr1 = data.charCodeAt(i++);
            chr2 = data.charCodeAt(i++);
            chr3 = data.charCodeAt(i++);

            enc1 = chr1 >> 2;                       // reduce byte to 6 bits
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4); // last 2 bits of chr1 + first 4 of chr2
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);// last 4 bits of chr2 + first 2 of chr3
            enc4 = chr3 & 63;                       // last 6 bits

            if (isNaN(chr2)) enc3 = enc4 = 64;      // pad with zeroes if necessary
            else if (isNaN(chr3)) enc4 = 64;

            output += chars.charAt(enc1) + chars.charAt(enc2) + chars.charAt(enc3) + chars.charAt(enc4);
        }
        return output;
    }
    return _btoa;
}();

function datauri(content_type, data) {
    return "data:" + content_type
                   + ";base64,"
                   + encodeURIComponent(base64encode(data));
}

function paint(){ 
	//get canvas
	var canvas = document.getElementById("canvas");
	this.canvas.height = window.innerHeight-25;	
	this.canvas.width  = this.canvas.height/2;
	//是否支持触摸
	var touchable = 'createTouch' in document;
	if (touchable) {
		canvas.addEventListener('touchstart', onTouchStart, false);
		canvas.addEventListener('touchmove', onTouchMove, false);
	}
	else
	{
		  alert("touchable is false !");
	}
	//上一次触摸坐标
	var lastX;
	var lastY;

	var ctx =canvas.getContext("2d");
	ctx.lineWidth=10;//画笔粗细
	//ctx.strokeStyle="#FF0000";//画笔颜色

	//触摸开始事件
	function onTouchStart(event) {
		event.preventDefault();
		lastX=event.touches[0].clientX;
		lastY=event.touches[0].clientY;
		drawRound(lastX,lastY);

	}

	//触摸滑动事件
	function onTouchMove(event) {
		try
		{
		  event.preventDefault();
		  drawLine(lastX,lastY,event.touches[0].clientX,event.touches[0].clientY);
		  lastX=event.touches[0].clientX;
		  lastY=event.touches[0].clientY;
		}
		catch(err){
			alert( err.description);
		}

	}

	//画圆
	function drawRound(x,y)
	{
		//ctx.fillStyle="#FF0000";
		ctx.beginPath();
		ctx.arc(x,y,5,0,Math.PI*2,true);
		ctx.closePath();
		ctx.fill();
	}
	//画线
	function drawLine(startX,startY,endX,endY)
	{
		ctx.beginPath();
		ctx.lineCap="round";
		ctx.moveTo(startX,startY);
		ctx.lineTo(endX,endY);
		ctx.stroke();
	}
	
	clear.onclick = function()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);//清除画布，左上角为起点
	}
}

//for canvas scale
function scaleCanvas (canvas, width, height) {
	var w = canvas.width,
		h = canvas.height;
	if (width == undefined) {
		width = w;
	}
	if (height == undefined) {
		height = h;
	}

	var retCanvas = document.createElement('canvas');
	var retCtx = retCanvas.getContext('2d');
	
	retCanvas.width = width;
	retCanvas.height = height;
	retCtx.translate(width, height/width);
	retCtx.rotate(90*Math.PI/180);
	retCtx.drawImage(canvas, 0, 0, w, h, 0, 0, height, width);
	
	return retCanvas;
}


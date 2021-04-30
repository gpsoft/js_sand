(function(){
	console.log('Loaded');

	// 'rgb(12, 34, 56)' => [12, 34, 56]
	var parseRgb = function(color){
		return color.match(/rgb\((\d+)\D+(\d+)\D+(\d+)\)/)
			.slice(1)
			.map(function(s){return parseInt(s);});
	};

	// [12, 34, 56] => '#0c2238'
	var colorCode = function(rgb){
		return '#'+rgb.map(function(n){
			return n.toString(16);
		}).map(pad0).join('');
	};

	// '4' => '04'
	// '14' => '14'
	var pad0 = function(s){
		return ('00' + s).slice(-2);
	};

	// 青丸(.go)の中に、カラーコードを埋め込む
	var gos = Array.from(document.querySelectorAll('.go'));
	gos.forEach(function(go, ix){
		var styleMap = getComputedStyle(go);
		console.log(ix, styleMap.backgroundColor);

		var rgb = parseRgb(styleMap.backgroundColor);

		go.textContent = colorCode(rgb);
		go.style.color =
			Math.max.apply(null, rgb)>220 ? 'black' : 'white';
	});
})();

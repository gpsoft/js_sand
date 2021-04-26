function run() {
	// HTML要素を取得
	// https://developer.mozilla.org/ja/docs/Web/API/Document/querySelector
	let searchBtn = document.querySelector('#search');

	// イベントの監視
	// https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener
	searchBtn.addEventListener('click', ()=>{

		let kw = document.querySelector('#kw').value;
		if ( kw.length <= 0 ) {
			alert('キーワードを入力して。');
			return;
		}

		// CiNiiの図書検索API
		// https://support.nii.ac.jp/ja/cib/api/b_opensearch
		const API = 'https://ci.nii.ac.jp/books/opensearch/search';
		let params = new URLSearchParams({format: 'json', q: kw});
		let url = API + '?' + params.toString();

		// Ajax通信
		// https://developer.mozilla.org/ja/docs/Web/API/WindowOrWorkerGlobalScope/fetch
		let request = new Request(url);
		fetch(request)
			.then(response=>{
				if ( !response.ok ) {
					console.log('失敗: '+response.status);
				}
				return response.json();
			})
			.then(json=>{
				let result = json['@graph'][0];
				showResult(result);
			});
	});

	let showResult = (result)=>{
		let resultDiv = document.querySelector('#result');

		resultDiv.innerHTML = '';

		// HTML要素を生成
		// https://developer.mozilla.org/ja/docs/Web/API/Document/createElement
		let titleH2 = document.createElement('h2');
		titleH2.textContent = result.title;
		resultDiv.appendChild(titleH2);

		let totalNum = result['opensearch:totalResults'];
		let p = document.createElement('p');
		if ( totalNum <= 0 ) {
			p.textContent = 'マッチなし。';
		} else {
			p.textContent = '全部で'+totalNum+'件マッチ。';
		}
		resultDiv.appendChild(p);

		if ( totalNum > 0 ) {
			result.items.forEach(book=>{
				let p = document.createElement('p');
				p.textContent = book.title;
				resultDiv.appendChild(p);
			});
		}
	};
}

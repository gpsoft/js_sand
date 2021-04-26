function run() {
	// HTML要素を取得
	let $searchBtn = $('#search');

	// イベントの監視
	$searchBtn.on('click', ()=>{

		let kw = $('#kw').val();
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
		$.ajax(url, {
			method: 'GET',
			success: json=>{
				let result = json['@graph'][0];
				showResult(result);
			},
			error: (xhr, st, msg)=>{
				console.log('失敗: '+xhr.state());
			},
		});
	});

	const showResult = result=>{
		let $resultDiv = $('#result');

		$resultDiv.empty();

		// HTML要素を生成
		$('<h2>')
			.text(result.title)
			.appendTo($resultDiv);

		let totalNum = result['opensearch:totalResults'];
		$('<p>')
			.text(totalNum <= 0 ?
				'マッチなし。':`全部で${totalNum}件マッチ。`)
			.appendTo($resultDiv);

		if ( totalNum > 0 ) {
			result.items.forEach(book=>{
				$('<p>')
					.text(book.title)
					.appendTo($resultDiv);
			});
		}
	};
}

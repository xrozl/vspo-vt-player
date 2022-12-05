function loaddata(filename) {
    fetch(location.protocol + "//" + location.host + '/data/' + filename).then(function (response) {
        return response.json();
    }).then(
        function (json) {
            // 要素を取得
            const select_container = document.getElementById('select_container');
            // 要素が空の場合のエラー処理（多分起きないけど一応）
            if (!select_container) {
                console.log('select_container is not found.');
                return;
            }

            // 要素の中に子要素がある場合は削除
            if (select_container.hasChildNodes()) {
                select_container.innerHTML = '';
            }

            // jsonのデータ数が0の場合
            if (Object.keys(json).length === 0) {
                select_container.innerHTML = '<p style="margin: 0, auto; padding-top: 10px; padding-left: 10px; font-size: 1.2vw; width:100%;">データがありません...</p>';
                return;
            }

            // 要素を作成
            for (var key in json) {
                // Youtubeの動画IDを取得
                const videoId = key.split('v=')[1];

                // Youtubeの動画IDから動画のサムネイル画像のURLを取得
                const thumbnail = 'https://i.ytimg.com/vi/' + videoId + '/mqdefault.jpg';

                const title = json[key].title;
                const duration = json[key].duration;

                // 要素を作成
                const div = document.createElement('div');
                div.className = 'select';

                // 子要素を作成
                const img = document.createElement('img');
                img.src = thumbnail;
                img.classList.add('thumbnail');
                const p = document.createElement('p');
                p.innerHTML = '<span onclick=\"addPlaylist(\'' + key + '\', \'' + title + '\', \'' + duration + '\')\" class=\"material-symbols-outlined selector add_button\">add_circle</span>' + title + ' (' + duration + ')';
                p.classList.add('title');

                // 要素に子要素を追加
                div.appendChild(img);
                div.appendChild(p);

                // 要素を追加
                select_container.appendChild(div);

            }
        });

} 

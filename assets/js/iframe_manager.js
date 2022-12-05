// Youtube IFrame Player
var player;

// プレイ中のカーソル
var cursor = 0;

// リピート
var repeat = false;

// 読み込み時に呼ばれる
function init() {
    document.getElementById('controller_volume').addEventListener('input', function() {
        player.setVolume(this.value);
    });
}

// リピート切り替え
function toggleRepeat() {
    repeat = !repeat;
    document.getElementById('repeat_button').style.color = repeat ? '#00ffff' : '#000000';
}

// Youtube IFrame Playerの準備ができたら呼ばれる関数
function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt_player', {
        height: '180',
        width: '320',
        videoId: 'Qh6aSTTkmEs', // Blessing
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

// Youtube IFrame Playerの状態が変わったら呼ばれる関数
function onPlayerStateChange(event) {
    // プレイリストが空の場合
    if (localStorage.getItem('playlist') === null) {
        return;
    }
    // プレイリストを取得
    const playlist = JSON.parse(localStorage.getItem('playlist'));
    refreshView();

    // 曲が終わったら
    if (event.data === 0) {
        // カーソルがプレイリストの曲数より大きい場合
        if ((cursor+1) >= playlist.length) {
            // カーソルを0に戻す
            cursor = 0;
            if (repeat) {
                const videoId = playlist[cursor].videoUrl.split('v=')[1];
                player.loadVideoById(videoId);
                return;
            }
            // 止める
            stopVideo();
            return;
        }
        // カーソルを進める
        cursor++;
        // プレイリストから次の曲を読み込む
        const videoId = playlist[cursor].videoUrl.split('v=')[1];
        player.loadVideoById(videoId);
    }
}

// Youtube IFrame Playerの再生を開始する関数
function playVideo() {
    // 時間が0の場合
    if (player.getCurrentTime() === 0 && cursor === 0) {
        // プレイリストを取得
        if (localStorage.getItem('playlist') === null) {
            player.playVideo();
            return;
        }
        const playlist = JSON.parse(localStorage.getItem('playlist'));
        if (playlist.length === 0) {
            player.playVideo();
            return;
        }
        player.loadVideoById(playlist[0].videoUrl.split('v=')[1]);
    } else {
        player.playVideo();
    }
}

// Youtube IFrame Playerの再生を停止する関数
function stopVideo() {
    player.stopVideo();
}

// Youtube IFrame Playerの再生を一時停止する関数
function pauseVideo() {
    player.pauseVideo();
}

// Youtube IFrame Playerの再生を切り替える関数
function toggleVideo() {
    if (player.getPlayerState() === 1) {
        pauseVideo();
    } else {
        playVideo();
    }
}

// プレイリストの曲を読み込む関数
function loadPlaylist() {
    // ローカルストレージからプレイリストを取得
    const playlist = JSON.parse(localStorage.getItem('playlist'));
    for (let i = 0; i < playlist.length; i++) {
        // プレイリストの曲を読み込む
        refreshView();
    }
}

// プレイリストを表示する関数
function refreshView() {
    // プレイリストを取得
    if (localStorage.getItem('playlist') === null) {
        cursor = 0;
        return;
    }
    const playlist = JSON.parse(localStorage.getItem('playlist'));

    // プレイリストを表示する要素を取得
    const playlistView = document.getElementById('listview');
    // プレイリストを表示する要素を空にする
    playlistView.innerHTML = '';

    // プレイリストの曲数分ループ
    for (let i = 0; i < playlist.length; i++) {
        // プレイリストの曲を表示する要素を作成
        const div = document.createElement('div');
        div.className = 'listitem';
        div.innerHTML = '<span onclick=\"removePlaylist(' + i + ')\" class=\"material-symbols-outlined cancel_button\">cancel</span>' + i + ' : ' + playlist[i].title;
        playlistView.appendChild(div);
    }

    // スタイルコントローラー要素を取得
    const styleController = document.getElementById('style_controller');
    // スタイルコントローラー要素を空にする
    styleController.innerHTML = '';
    // 背景色を追加する
    styleController.innerHTML = '<style>.listitem:nth-child(' + (cursor+1) + '){background-color: #5fb6fc;}</style>'

}

// プレイリストに曲を追加する関数
function addPlaylist(videoUrl, title, duration) {
    // プレイリストを取得
    let playlist = [];
    if (localStorage.getItem('playlist') !== null) {
        playlist = JSON.parse(localStorage.getItem('playlist'));
    }
    // プレイリストに曲を追加
    playlist.push({
        videoUrl: videoUrl,
        title: title,
        duration: duration
    });
    // プレイリストをローカルストレージに保存
    localStorage.setItem('playlist', JSON.stringify(playlist));

    refreshView();
}

// プレイリストから曲を削除する関数
function removePlaylist(num) {
    if (localStorage.getItem('playlist') === null) {
        return;
    }
    // プレイリストを取得
    const playlist = JSON.parse(localStorage.getItem('playlist'));
    // プレイリストから曲を削除
    playlist.splice(num, 1);
    // プレイリストをローカルストレージに保存
    localStorage.setItem('playlist', JSON.stringify(playlist));

    refreshView();
}

// プレイリストをスキップする関数
function skip_next() {
    // プレイリストが空の場合
    if (localStorage.getItem('playlist') === null) {
        return;
    }
    const playlist = JSON.parse(localStorage.getItem('playlist'));
    // カーソルがプレイリストの曲数より大きい場合
    if ((cursor+1) >= playlist.length) {
        // 止める
        stopVideo();
        alert('プレイリストの最後です。');
        cursor = playlist.length - 1;
        return;
    }
    cursor++;
    // プレイリストから次の曲を読み込む
    const videoId = playlist[cursor].videoUrl.split('v=')[1];
    player.loadVideoById(videoId);
    // カーソルを進める
}

// プレイリストを一つもどる関数
function skip_previous() {
    // プレイリストが空の場合
    if (localStorage.getItem('playlist') === null) {
        return;
    }
    const playlist = JSON.parse(localStorage.getItem('playlist'));
    // カーソルが0の場合
    if (cursor <= 0) {
        // 止める
        stopVideo();
        alert('プレイリストの最初です。');
        return;
    }

    // カーソルを戻す
    cursor--;
    // プレイリストから次の曲を読み込む
    const videoId = playlist[cursor].videoUrl.split('v=')[1];
    player.loadVideoById(videoId);
}
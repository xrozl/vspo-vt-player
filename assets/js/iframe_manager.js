// Youtube IFrame Player
var player;

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

}

// Youtube IFrame Playerの再生を開始する関数
function playVideo() {
    player.playVideo();
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

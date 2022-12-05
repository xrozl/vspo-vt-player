function menu(num) {

    // 数値以外が入力された場合のエラー処理（多分起きないけど一応）
    if (typeof num !== 'number') {
        return;
    }

    // メニューのIDと表示する要素のIDを紐付ける
    const menu = {
        1: 'player',
        2: 'usage',
        3: 'info',
        4: 'credit',
    };

    // 入力された数値がメニューに存在しない場合のエラー処理
    if (!menu[num]) {
        return;
    }

    // メニューのIDの要素を取得
    const main = document.getElementById(menu[num]);
    // 他のメニューの要素を取得
    const others = [];
    // メニューの要素数分ループ（メニューの数が増えたらここも変更する必要がある）
    for (let i = 1; i <= 4; i++) {
        // メニューのIDの要素は取得済みなのでスキップ
        if (i === num) {
            continue;
        }
        // 他のメニューの要素を配列に追加
        others.push(document.getElementById(menu[i]));
    }

    // メニューの要素が空の場合のエラー処理（多分起きないけど一応）
    if (!main) {
        return;
    }

    // メニューの要素を表示
    main.style.display = 'block';

    // 要素を非表示
    others.forEach((other) => {
        // 要素が空の場合のエラー処理（多分起きないけど一応）
        if (other) {
            // 要素を非表示
            other.style.display = 'none';
        }
    });

}
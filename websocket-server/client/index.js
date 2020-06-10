console.log('start client');
let inputtext = document.getElementById('inputtext');
let sendbtn = document.getElementById('btnsend');
sendbtn.addEventListener('click', () => {
    console.log(`inputext data=${inputtext.value}`);
    ws.send(inputtext.value);
});


//使用 WebSocket 的網址向 Server 開啟連結
let ws = new WebSocket('ws://localhost:3000')

//開啟後執行的動作，指定一個 function 會在連結 WebSocket 後執行
ws.onopen = () => {
    console.log('open connection')
}

//關閉後執行的動作，指定一個 function 會在連結中斷後執行
ws.onclose = () => {
    console.log('close connection')
}
//接收 Server 發送的訊息
ws.onmessage = event => {
    console.log(event);
    let reader = new FileReader();
    //FileReader.readAsText()：返回文本，需要指定文本编码，默认为 UTF-8。
    //FileReader.readAsArrayBuffer()：返回 ArrayBuffer 对象。
    //FileReader.readAsDataURL()：返回 Data URL。
    //FileReader.readAsBinaryString()：返回原始的二进制字符串。
    //reader.readAsBinaryString(event.data);
    reader.readAsArrayBuffer(event.data);
    reader.onload = function () {
        let text = reader.result;
        console.log(text);
        let showdata = bufferToHex(text);
        console.log(showdata);
    }

}
function bufferToHex(buffer) {
    var s = '', h = '0123456789ABCDEF';
    (new Uint8Array(buffer)).forEach((v) => { s += h[v >> 4] + h[v & 15]; });
    return s;
}

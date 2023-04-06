// ข้อ 2.1

function display(msg) {
    let div = document.getElementById('ex01-div')
    div.innerHTML = msg
}

function showConfirm(callback) {
    // You code here
    window.confirm("????") ? callback("ยืนยันจ้า") : callback("ไม่ดีกว่า")
    
}

// ข้อ 2.2
function start() {
    // hint: ส่ง callback function เข้าไปเป็น argument ของ setTimeout()
    function say(txt, id, time, callback) {
        setTimeout(() => {
            document.getElementById(id).innerHTML = txt
            callback()
        }, time)
    }
    say("Program started", "start",0 , ()=>{
        say("Hello World", "process", 2000, () => {
            say("Program ended", "end", 3000, () => { })
        })
    })
    // say("Program started", "start", 0 , say("Hello World", "process", 2000,
    // say("Program ended", "end", 3000, () => { })))
}

// ข้อ 2.3
function stopTime() {
    clearInterval(down)
    var down = setInterval(countDown, 1000)
    var time = document.getElementById("Time").value
 
    function countDown() {
        if (time == 0) {
            clearInterval(down)
        }
        var timer = [Math.floor(time / 60), time % 60]
        timer = timer.map(x =>  x < 10 ? "0" + x : x )
        document.getElementById("setMinute").innerHTML = timer[0]
        document.getElementById("setSecond").innerHTML = timer[1]
        time -= 1
        // timer = timer.map(x => { 
        //     if(x < 10){
        //         return "0"+x
        //     }
        //     return x
        // })
    }
        
}


async function getApi () {
    let urls = ['https://api.thecatapi.com/v1/images/search', 'https://api.thecatapi.com/v1/images/search']
    for await (const num of urls){
        console.log(num)
    }
}
getApi ()
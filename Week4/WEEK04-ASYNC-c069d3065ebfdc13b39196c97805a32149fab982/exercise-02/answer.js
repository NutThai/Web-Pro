// ข้อ 2.1
function addEvent() {
    /* 
    TODO
     1. สร้าง function สำหรับ callback
     2. Get Element ที่ต้องการจะเพิ่ม Event
     3. Add Event ให้ Element 
     4. ใส่ callback function ให้ Event
    ตัวช่วย
    https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    */
    const doAlert = txt => {
        alert(txt)
    }
    const getText = (id, fuc) => {
        fuc(document.getElementById(id).innerHTML)
    }
    getText("event_init", doAlert)
}

// ข้อ 2.2
function start() {
    // hint: ส่ง callback function เข้าไปเป็น argument ของ setTimeout()

    function say(txt, id, time, fuc) {
        setTimeout(() => {
            document.getElementById(id).innerHTML = txt
            fuc()
        }, time)
    }
    say("Program started", "start",0, ()=>{
        say("Hello World", "process", 2000, () => {
            say("Program ended", "end", 3000, () => { })
        })
    })
    

}

// ข้อ 2.3
function stopTime() {
    var time = document.getElementById("Time").value

    function countDown() {
        if (time == 0) {
            clearInterval(down)
        }
        var timer = [Math.floor(time / 60), time % 60]
        timer = timer.map(x =>  x < 10 ? "0" + x : x )
        // timer = timer.map(x => { 
        //     if(x < 10){
        //         return "0"+x
        //     }
        //     return x
        // })
        document.getElementById("setMinute").innerHTML = timer[0]
        document.getElementById("setSecond").innerHTML = timer[1]
        time -= 1
    }
    var down = setInterval(countDown, 1000)

}

// ข้อ 2.4
function getDogDemo(url) {
    // hint: เรียกใช้ getAPI() โดยดึงข้อมูลจาก url = https://dog.ceo/api/breeds/image/random
    // ลอง console.log() ดูว่าข้อมูลที่ได้มาเป็นอย่างไร

}


// ข้อ 2.5
function Rainbow() {
    //TODO
    // 1. ทำการเช็ค Error ว่ามาจาก State ใด
    // 2. ให้แสดงชื่อ State ในกล่องข้อความเมื่อเกิด Error
    // 3. เปลี่ยนสีข้อความเป็นสีแดงเมื่อเกิด Error

    const colors = ['has-text-primary', 'has-text-success', 'has-text-warning', 'has-text-danger']

    const animateAll = (callbackFunct) => {
        setTimeout(() => {
            //State1 ใช้ try catch 
            callbackFunct(colors[0])


            setTimeout(() => {
                //State2 ใช้ try catch 
                callbackFunct(colors[1])


                setTimeout(() => {
                    //State3 ใช้ try catch 
                    callbackFunct(colors[2])


                }, 1000)
            }, 1000)
        }, 1000)
    }

    animateAll(changeText);
}

function changeText(word) {
    const num = Math.floor(Math.random() * 10)
    const rainbow = document.getElementById("rainbow")
    if (num > 6) {
        rainbow.innerText = num
        rainbow.className = word
    } else {
        throw new Error("Error")
    }
}


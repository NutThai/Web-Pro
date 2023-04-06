const { CALLBACK_TYPE } = require("react-native-gesture-handler/lib/typescript/handlers/gestures/gesture")

// ข้อ 3.1
async function getDogDemo(url) {
  img = document.getElementById("dogImg")
  // hint: เรียกใช้ getAPI() โดยดึงข้อมูลจาก url = https://dog.ceo/api/breeds/image/random
  // ลอง console.log() ดูว่าข้อมูลที่ได้มาเป็นอย่างไร
  // getAPI(url, setTimeout(res=>{img.src = res},10000),res=> alert(res).catch(alert(res)))
  var down = setInterval(countDown, 200)
    var time = parseInt(document.getElementById("dogTime").innerHTML)
    console.log(await evenNumber(20))
    function countDown() {
        if (time == 0) {
            getAPI(url, (res)=>{img.src = res.message},res=> alert(res))
            clearInterval(down)
        }
        document.getElementById("dogTime").innerHTML = time
        time -= 1
    }
}


// ข้อ 3.2
function Rainbow() {
  //TODO
  // 1. ในกรณีที่ status = 'success' ให้แสดงตัวเลขเป็นสีตามที่กำหนดในแต่ละ STATE
  // 2. ให้แสดงชื่อ STATE (STATE 1 หรือ STATE 2 หรือ STATE 3) ในกล่องข้อความเมื่อเกิด Error
  // 3. เปลี่ยนสีข้อความเป็นสีแดงเมื่อเกิด Error (class = 'has-text-error')
  function setColor(num, state, color){
    if(state.status === "success"){
      rainbow.innerHTML = state.text
      rainbow.setAttribute("class", color)
    }
    else{
      rainbow.innerHTML = "STATE "+num
      rainbow.setAttribute("class", 'has-text-danger')
    }
  }
  const rainbow = document.getElementById("rainbow")
  setTimeout(() => {
    // STATE 1 color = 'has-text-primary'
      setColor(1, getResult(), 'has-text-primary')
      setTimeout(() => {
        // STATE 2 color = 'has-text-success'
        setColor(2, getResult(), 'has-text-success')
        setTimeout(() => {
          setColor(3, getResult(), 'has-text-success')
            // STATE 3 color = 'has-text-success'
        }, 2000)

      }, 2000)

  }, 2000)
}

function getResult(){
  const num = Math.floor(Math.random() * 10)
  console.log(num)
  if(num > 5) {
    return {
      'status': 'success',
      'text': num
    }
  }else{
    return {
      'status': 'error',
      'text': num
    }
  }
}

// ข้อ 3.3
async function evenNumber(num) {

  // result = document.getElementById("result")
  // // hint : ทำการสร้าง promise และเรียกใช้
  // try{
  //   const check = new Promise((resolve, reject) => {
  //     if (num % 2 == 0) {
  //       resolve("success : " + num + " is an even number")
  //     }
  //     else {
  //       reject("Error : " + num + " is not an even number")
  //     }
  //   })
    
  //   even = await check
  //   result.innerHTML = even
  // }
  // catch(err){
  //   result.innerHTML = err
  // }
  // -----------------------------------
  result = document.getElementById("result")
  // hint : ทำการสร้าง promise และเรียกใช้
  const check = new Promise((resolve, reject) => {
    if (num % 2 == 0) {
      resolve("success : " + num + " is an even number")
    }
    else {
      reject("Error : " + num + " is not an even number")
    }
  })
  check.then((resolve) => {
    result.innerHTML = resolve
  }).catch(reject => {
    result.innerHTML = reject
  })

}

// ข้อ 3.4
function task(id) {
  const delay = parseInt(Math.random() * 1000)
  // return promise
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (delay < 500) {
        resolve("task " + id + ": " + delay + "ms ... PASS!")
      } else {
        reject("task " + id + ": " + delay + "ms ... NOT PASS!")
      }
    }, delay)
  })
}

function tester() {
  // hint : task(1).then().catch() ..... task(4)...
  // ต้องเรียก function task 4 ครั้ง เปลี่ยน id ไปเรื่อยๆ
  for (i = 1; i <= 4; i++) {
    task(i).then(resolve => console.log(resolve)
    ).catch(reject => console.log(reject))
  }
}

// ข้อ 3.5
// hint : เรียก getAPI() ที่ url = https://api.thecatapi.com/v1/images/search 
// อย่าลืม console.log() ดูข้อมูลที่ได้ด้วยว่ามีโครงสร้างแบบใด
function checkAuth(password) {

  return new Promise((resolve, reject) => {
    password === "Cisco" ? resolve("รหัสผ่านถูกต้อง") : reject("รหัสผ่านไม่ถูกต้อง")
  })
}

function fetchData(password) {
    img = document.getElementById("cat")
    checkAuth(password).then(result=>{
      alert(result)
      getAPI("https://api.thecatapi.com/v1/images/search", res=>img.src = res[0].url, res=>console.log(res))
    }).catch(result => alert(result))
    
      // setImmediate
      // event loop
      // 1. timers
      // 2. i/o CALLBACK
      // 3. immediate
      // error callbackS
}

// GET API
function getAPI(url, success, error) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const res = JSON.parse(this.response);
      success(res);
    } else if (this.readyState == 4) {
      const res = JSON.parse(this.response);
      error(res);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.send();
}

function plus(input){
    function pluss(x,y){
        return x+y
    }
    return pluss(input[0],input[1])
    // let result = 0
    // // TODO: สร้าง function ที่นำ input จำนวน 2 ตัวมาบวกกัน
    // input.forEach(element => {
    //     result += element
    // });
    // return result
}

// TODO: แก้ประเภทตัวแปลใน function นี้ให้ค่าที่ return ออกมาตรงกับคำตอบ 41
// *** เปลี่ยนได้เฉพาะประเภทตัวแปล ***
// global variable
let a = 'Hello';

function greet() {
    // local variable
    let b = 'World';
    if (b == 'World') {
        // block-scoped variable
        var c = 'hello';
    }

    // variable c cannot be accessed here
    console.log(a + ' ' + b + ' ' + c);
    return a + ' ' + b + ' ' + c
}

function varLetConst() {
    // TODO: แก้ประเภทตัวแปลใน function นี้ให้ค่าที่ return ออกมาตรงกับคำตอบ 41
    // *** เปลี่ยนได้เฉพาะประเภทตัวแปล ***
    var k = 5
    var j = 30
    var i = 0
    for (let  j = 0; j <= 5; j++) {
        i++
    }
    for (let  j = 0; j <= 5; j++) {
        j++
    }
    console.log(j)
    console.log(i)
    console.log(k)
    console.log(j + k + i)
    return j + k + i
}

function chainfunction(input){
    // TODO: จงใช้ String method และการ chain function ให้ผลลัพธ์ตรงตามโจทย์
    function trimedNSplit(x){
        return x.trim().split(" ")
    }
    
    input = trimedNSplit(input)[0].toUpperCase().concat(" ",trimedNSplit(input)[1].toLowerCase())
    
    

    //เขียนต่อจาก Return ได้เลยครับ
    return input
}
function mapToSquare (input) {
    // TODO ใช้ .map สร้าง array ที่เป็นเลขยกกำลังสองของ input
    return result = input.map(x => x**2)
    
}

function convertTemperature (input) {
    // TODO: ให้แปลงอุณหภูมิจาก °F เป็น °C โดยใช้ฟังก์ชัน .map()
    function fah_to_celsius (fah) {
        let cel = (fah - 32) * 5 / 9
        return Number(cel.toFixed(1))
    }
    input.map((value, index)=>
        value.temperature = fah_to_celsius(value.temperature)
    );
    return input
}

function filterEvenNumber (input) {
    // TODO: filter input เอาเลขคู่เท่านั้น
    function isEven (x) {
        return x%2 == 0
    }
    return input.filter(isEven)
}

function filterAgeRange (input) {
    // TODO: กรอง input.people ตามช่วงอายุ
    
    function isPass (x) {
       if (x.age >= input.min && input.max >= x.age){
            return x
       }
    }
    return input.people.filter(isPass)
}

function removeByFilter (input) {
    // TODO: ลบ Object ใน Array ด้วยการ filter
    function remove (x) {
        if (x.id != input.removeId){
             return x
        }
     }
     return input.people.filter(remove)
}

function replaceBySplice (input) {
    // TODO: ให้ใช้ฟังก์ชัน .splice() ในการ **เปลี่ยน (replace)** สมาชิกใน Array  
    // เรียงลำดับตัวเลขให้ถูกต้อง
    input.splice(4,1,4)
    return input

}

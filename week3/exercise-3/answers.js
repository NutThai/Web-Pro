function getDayName (input) {
    // input เป็นเลข 0-6
    // TODO: แปลงเลข 0-6 เป็น วันอาทิตย์ - วันเสาร์

    // hint
    const daysInWeek = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์']
    return daysInWeek[input]
}

function formatDate (input) {
    const daysInWeek = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์']
    const monthsInYear = [ "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
    // input เป็น Object ในรูปแบบ
    // {
    //     day: 6, // 0=วันอาทิตย์, 1=วันจันทร์, 2=วันอังคาร, ...
    //     date: 15, // วันที่ 1-31
    //     month: 0, // 0=มกราคม, 1=กุมภาพันธ์, ...
    //     year: 2021 // ปี
    // }
    // TODO: แปลง input เป็น String ในรูปแบบ "วันศุกร์ที่ 15 มกราคม พ.ศ. 2564"
    return daysInWeek[input.day]+"ที่ "+input.date+" "+monthsInYear[input.month]+" พ.ศ. "+(input.year+543)
}
function findTotal (input) {
    // input เป็น array ของตัวเลข
    // TODO: ให้หาผลบวกของเลขทั้งหมดใน input
    let result = 0
    for(let i = 0 ; i < input.length ;i++){
        if(input[i]%2 == 0){
            result += input[i]
        }
        
    }
    return result
// var sum = input.reduce((total, value) => {
//     
//     })
//     return sum;
}


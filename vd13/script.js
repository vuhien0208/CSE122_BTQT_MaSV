function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();


    // Chuyển đổi thành chuỗi 2 chữ số (vd: 9 -> "09")
    const strHours = String(hours).padStart(2, '0');
    const strMinutes = String(minutes).padStart(2, '0');
    const strSeconds = String(seconds).padStart(2, '0');


    // Cập nhật đường dẫn ảnh cho từng chữ số
    document.getElementById('h1').src = `Anh/Bai13/0${strHours[0]}.gif`;
    document.getElementById('h2').src = `Anh/Bai13/0${strHours[1]}.gif`;


    document.getElementById('m1').src = `Anh/Bai13/0${strMinutes[0]}.gif`;
    document.getElementById('m2').src = `Anh/Bai13/0${strMinutes[1]}.gif`;


    document.getElementById('s1').src = `Anh/Bai13/0${strSeconds[0]}.gif`;
    document.getElementById('s2').src = `Anh/Bai13/0${strSeconds[1]}.gif`;


    // Cập nhật lời chào theo buổi
    const greetingElement = document.getElementById('greeting');
    if (hours >= 5 && hours < 12) {
        greetingElement.textContent = "Chào buổi sáng";
    } else if (hours >= 12 && hours < 18) {
        greetingElement.textContent = "Chào buổi chiều";
    } else {
        greetingElement.textContent = "Chào buổi tối";
    }
}


// Cập nhật ngay khi tải trang
updateClock();


// Chạy hàm updateClock mỗi giây (1000ms)
setInterval(updateClock, 1000);


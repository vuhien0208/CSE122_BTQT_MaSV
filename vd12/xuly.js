function inLich() {
    let ngayVal = document.getElementById('txtNgay').value.trim();
    let thangVal = document.getElementById('txtThang').value.trim();
    let namVal = document.getElementById('txtNam').value.trim();

    // Kiểm tra dữ liệu nhập cơ bản
    let d = parseInt(ngayVal);
    let m = parseInt(thangVal);
    let y = parseInt(namVal);

    if (isNaN(d) || isNaN(m) || isNaN(y)) {
        alert("Vui lòng nhập đầy đủ và chính xác ngày, tháng, năm!");
        return;
    }

    // Tạo đối tượng Date (Lưu ý: Tháng trong JS tính từ 0-11)
    let dateObj = new Date(y, m - 1, d);

    // Kiểm tra tính hợp lệ của ngày tháng năm
    if (dateObj.getFullYear() !== y || dateObj.getMonth() !== m - 1 || dateObj.getDate() !== d) {
        alert("Ngày tháng năm không tồn tại trong thực tế!");
        return;
    }

    // Lấy thứ trong tuần (0: Chủ Nhật, 1: Thứ Hai, ...)
    let dayOfWeek = dateObj.getDay();
    let tenThu = "";
    switch (dayOfWeek) {
        case 0: tenThu = "Chủ Nhật"; break;
        case 1: tenThu = "Thứ Hai"; break;
        case 2: tenThu = "Thứ Ba"; break;
        case 3: tenThu = "Thứ Tư"; break;
        case 4: tenThu = "Thứ Năm"; break;
        case 5: tenThu = "Thứ Sáu"; break;
        case 6: tenThu = "Thứ Bảy"; break;
    }

    // Xác định lời chào theo buổi (dựa trên giờ hiện tại của hệ thống)
    let currentHour = new Date().getHours();
    let loiChao = "";
    if (currentHour >= 4 && currentHour < 12) {
        loiChao = "Chào buổi sáng!";
    } else if (currentHour >= 12 && currentHour < 14) {
        loiChao = "Chào buổi trưa!";
    } else if (currentHour >= 14 && currentHour < 18) {
        loiChao = "Chào buổi chiều!";
    } else {
        loiChao = "Chào buổi tối!";
    }

    // Hiển thị kết quả ra giao diện theo đúng định dạng yêu cầu
    document.getElementById('lblNam').innerText = y;
    document.getElementById('lblThang').innerText = "Tháng " + m;
    document.getElementById('lblSoNgay').innerText = d < 10 ? "0" + d : d;
    document.getElementById('lblThu').innerText = tenThu;
    document.getElementById('lblChao').innerText = loiChao;

    // Hiện khung kết quả
    document.getElementById('ketQua').style.display = "block";
}
function toggleTheme() {
    const body = document.body;
    const toggleCheckbox = document.getElementById('modeToggle');
    const statusNote = document.getElementById('statusNote');

    // Thêm hoặc bỏ class .toi trên thẻ body tùy thuộc vào trạng thái nút gạt
    if (toggleCheckbox.checked) {
        body.classList.add('toi');
        statusNote.textContent = "Đây là giao diện ở chế độ TỐI (đang bật).";
    } else {
        body.classList.remove('toi');
        statusNote.textContent = "Đây là giao diện ở chế độ SÁNG (đang bật).";
    }
}
function applyEffect(effectName, buttonElement) {
    // 1. Xử lý trạng thái active trên các nút bấm
    const buttons = document.querySelectorAll('.effect-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    buttonElement.classList.add('active');

    // 2. Lấy phần tử ảnh
    const img = document.getElementById('roseImage');

    // 3. Xóa toàn bộ các class hiệu ứng cũ trước khi gán mới
    img.className = '';

    // 4. Thêm class hiệu ứng tương ứng vào ảnh
    switch (effectName) {
        case 'gray':
            img.classList.add('effect-gray');
            break;
        case 'xray':
            img.classList.add('effect-xray');
            break;
        case 'invert':
            img.classList.add('effect-invert');
            break;
        case 'fliph':
            img.classList.add('effect-fliph');
            break;
        case 'flipv':
            img.classList.add('effect-flipv');
            break;
        case 'glow':
            img.classList.add('effect-glow');
            break;
        case 'shadow':
            img.classList.add('effect-shadow');
            break;
        case 'bold-shadow':
            img.classList.add('effect-bold-shadow');
            break;
        case 'dropshadow':
            img.classList.add('effect-dropshadow');
            break;
        case 'blur':
            img.classList.add('effect-blur');
            break;
        case 'wave':
            img.classList.add('effect-wave');
            break;
        case 'mask':
            img.classList.add('effect-mask');
            break;
        case 'alpha':
            img.classList.add('effect-alpha');
            break;
        default:
            break;
    }
}

// Mặc định chạy hiệu ứng Gray khi vừa tải trang giống như trong mẫu
window.onload = function() {
    const defaultBtn = document.querySelector('.effect-btn');
    applyEffect('gray', defaultBtn);
};
(() => {
  const STORE = "rentsplit-v1";
  const DIMS = ["sleep", "clean", "cook", "guests", "noise", "share", "smokePets", "budget"];
  const WEIGHTS = { sleep: 1.2, clean: 1.3, cook: 0.85, guests: 1.05, noise: 1.15, share: 0.7, smokePets: 1.45, budget: 0.65 };
  const DIM_LABEL = {
    sleep: "Giờ giấc",
    clean: "Sạch sẽ",
    cook: "Nấu ăn",
    guests: "Khách/bạn",
    noise: "Độ ồn",
    share: "Chia sẻ đồ",
    smokePets: "Thuốc & thú cưng",
    budget: "Chi phí chung",
  };

  const QUESTIONS = [
    { id: "sleep", group: "Giờ ngủ – thức", type: "choice", q: "Bạn thường ngủ và thức thế nào?", hint: "Lệch giờ giấc là nguyên nhân mâu thuẫn phổ biến nhất.",
      options: [
        { t: "Dậy rất sớm, ngủ trước 22h", v: 8 },
        { t: "Sinh hoạt giờ hành chính (23h–7h)", v: 32 },
        { t: "Linh hoạt, tuỳ ngày", v: 55 },
        { t: "Cú đêm, hay thức sau 1h", v: 88 },
      ]},
    { id: "clean", group: "Sạch sẽ / gọn gàng", type: "slider", q: "Mức độ gọn gàng của bạn?", left: "Thoải mái, hơi lộn xộn cũng được", right: "Sạch bóng, mỗi thứ một chỗ", min: 0, max: 100 },
    { id: "cook", group: "Nấu ăn & mùi", type: "choice", q: "Bạn nấu ăn ở nhà thế nào?",
      options: [
        { t: "Hầu như không nấu, ăn ngoài", v: 12 },
        { t: "Nấu 2–3 bữa/tuần, mùi nhẹ", v: 40 },
        { t: "Nấu thường xuyên", v: 70 },
        { t: "Nấu nhiều, thích món đậm mùi", v: 92 },
      ]},
    { id: "guests", group: "Mời khách", type: "choice", q: "Bạn hay mời bạn bè / người yêu đến chơi?",
      options: [
        { t: "Hầu như không, nhà là không gian riêng", v: 10 },
        { t: "Thỉnh thoảng, báo trước", v: 40 },
        { t: "Khá thường, cuối tuần hay có khách", v: 72 },
        { t: "Nhà luôn mở, thích tụ tập", v: 95 },
      ]},
    { id: "noise", group: "Mức độ ồn", type: "slider", q: "Bạn ồn thế nào khi ở nhà?", left: "Rất yên, tai nghe / nói nhỏ", right: "Nghe nhạc loa, gọi điện thoải mái", min: 0, max: 100 },
    { id: "share", group: "Đồ dùng chung", type: "choice", q: "Quan điểm chia sẻ đồ dùng chung?",
      options: [
        { t: "Tách biệt, mỗi người đồ của mình", v: 10 },
        { t: "Chia sẻ gia vị / dụng cụ bếp cơ bản", v: 45 },
        { t: "Thoải mái dùng chung hầu hết", v: 82 },
      ]},
    { id: "smokePets", group: "Hút thuốc / thú cưng", type: "choice", q: "Thuốc lá và thú cưng?",
      options: [
        { t: "Không hút, không nuôi, không muốn tiếp xúc", v: 8 },
        { t: "Không hút; thú cưng nhỏ OK nếu vệ sinh tốt", v: 38 },
        { t: "Có thú cưng hoặc chấp nhận mùi lông", v: 68 },
        { t: "Hút thuốc (ban công/phòng) hoặc nhiều pet", v: 92 },
      ]},
    { id: "budget", group: "Chi tiêu chung", type: "choice", q: "Bạn chia tiền điện nước / đồ dùng chung thế nào?",
      options: [
        { t: "Chia đều, chốt sổ rõ ràng mỗi tháng", v: 22 },
        { t: "Theo mức dùng ước lượng, linh hoạt", v: 55 },
        { t: "Ai tiện thì trả, không tính toán nhiều", v: 88 },
      ]},
  ];

  const CITIES = ["Hà Nội", "TP.HCM", "Đà Nẵng", "Hải Phòng", "Cần Thơ"];

  const PEOPLE = [
    { id: "p1", name: "Minh Anh", age: 22, gender: "Nữ", job: "Sinh viên FTU", city: "Hà Nội", district: "Cầu Giấy", price: 3.2, status: "host",
      bio: "Có phòng 2 ngủ gần ĐH Thương mại, tìm bạn nữ ở ghép, thích nhà sạch.",
      photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=70",
      room: { title: "Căn 2PN Cầu Giấy", area: 48, amenities: ["Máy giặt", "Ban công", "Nội thất"], addressPublic: "Ngõ 108, Cầu Giấy", photos: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=70"] },
      lifestyle: { sleep: 30, clean: 86, cook: 70, guests: 35, noise: 28, share: 45, smokePets: 12, budget: 22 },
      verified: ["phone"], rating: 4.8, reviews: 3, kyc: false },
    { id: "p2", name: "Quốc Huy", age: 25, gender: "Nam", job: "Dev frontend", city: "TP.HCM", district: "Bình Thạnh", price: 4.5, status: "host",
      bio: "Ở ghép studio gần Landmark, làm remote, cú đêm nhẹ.",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=70",
      room: { title: "Studio Bình Thạnh", area: 32, amenities: ["Máy lạnh", "Thang máy"], addressPublic: "Điện Biên Phủ, Bình Thạnh", photos: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=70"] },
      lifestyle: { sleep: 78, clean: 62, cook: 40, guests: 48, noise: 55, share: 45, smokePets: 38, budget: 55 },
      verified: ["phone", "cccd"], rating: 4.6, reviews: 5, kyc: true },
    { id: "p3", name: "Lan Phương", age: 24, gender: "Nữ", job: "Designer", city: "Đà Nẵng", district: "Hải Châu", price: 2.8, status: "renter",
      bio: "Tìm phòng/bạn ở ghép yên tĩnh, hay nấu eat-clean.",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=70",
      lifestyle: { sleep: 38, clean: 90, cook: 82, guests: 22, noise: 18, share: 40, smokePets: 10, budget: 22 },
      verified: ["phone"], rating: 5, reviews: 2, kyc: false },
    { id: "p4", name: "Tuấn Kiệt", age: 27, gender: "Nam", job: "Marketing", city: "Hà Nội", district: "Đống Đa", price: 3.8, status: "host",
      bio: "Phòng chung cư có chỗ để xe, thích khách cuối tuần.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=70",
      room: { title: "CC 2PN Đống Đa", area: 55, amenities: ["Chỗ để xe", "Bếp"], addressPublic: "Tây Sơn, Đống Đa", photos: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=70"] },
      lifestyle: { sleep: 58, clean: 48, cook: 55, guests: 80, noise: 70, share: 82, smokePets: 40, budget: 88 },
      verified: [], rating: 4.1, reviews: 1, kyc: false },
    { id: "p5", name: "Hà My", age: 21, gender: "Nữ", job: "Sinh viên NEU", city: "Hà Nội", district: "Hai Bà Trưng", price: 2.5, status: "renter",
      bio: "Ngân sách sinh viên, cần bạn cùng giờ học, không hút thuốc.",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=70",
      lifestyle: { sleep: 28, clean: 74, cook: 38, guests: 30, noise: 25, share: 45, smokePets: 8, budget: 22 },
      verified: ["phone"], rating: 4.9, reviews: 4, kyc: false },
    { id: "p6", name: "Đức Anh", age: 29, gender: "Nam", job: "Kế toán", city: "TP.HCM", district: "Tân Bình", price: 5.0, status: "host",
      bio: "Có phòng trống gần sân bay, người lớn tuổi hơn một chút, thích yên.",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=70",
      room: { title: "Căn hộ Tân Bình", area: 60, amenities: ["Máy giặt", "Bếp đầy đủ", "Bảo vệ"], addressPublic: "Cộng Hòa, Tân Bình", photos: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=70"] },
      lifestyle: { sleep: 22, clean: 80, cook: 60, guests: 18, noise: 15, share: 22, smokePets: 8, budget: 22 },
      verified: ["phone", "cccd"], rating: 4.7, reviews: 8, kyc: true },
  ];

  const LISTINGS_ADMIN = [
    { id: "L01", title: "Phòng Cầu Giấy", owner: "Minh Anh", city: "Hà Nội", status: "pending" },
    { id: "L02", title: "Studio Bình Thạnh", owner: "Quốc Huy", city: "TP.HCM", status: "approved" },
    { id: "L03", title: "CC Đống Đa", owner: "Tuấn Kiệt", city: "Hà Nội", status: "pending" },
  ];
  const REPORTS = [
    { id: "R01", by: "Hà My", target: "Tuấn Kiệt", reason: "Tin phòng không đúng mô tả", status: "open" },
    { id: "R02", by: "Lan Phương", target: "Tài khoản ảo", reason: "Nghi lừa đặt cọc", status: "open" },
  ];
  const MOMENTS = [
    { id: "m1", author: "Minh Anh", text: "Cuối tuần này mình dọn phòng và tìm bạn cùng nhà thích không gian gọn gàng. Ai ở Cầu Giấy nhắn mình nhé!", time: "20 phút trước" },
    { id: "m2", author: "Lan Phương", text: "Có ai muốn cùng lập danh sách đồ dùng chung trước khi ở ghép không? Mình thấy cách này đỡ ngại và rất rõ ràng.", time: "2 giờ trước" },
  ];

  let db, view = { name: "landing", payload: null }, previousView = "discover", drag = null;

  function defaultUser() {
    return {
      id: "me",
      name: "",
      email: "",
      phone: "",
      password: "",
      age: 23,
      gender: "Nam",
      job: "",
      city: "Hà Nội",
      district: "",
      priceMin: 2,
      priceMax: 5,
      status: "renter",
      photo: "",
      bio: "",
      verified: [],
      kyc: false,
      quiz: {},
      quizIndex: 0,
      quizDone: false,
      listing: null,
      listingPending: false,
      likes: [],
      saved: [],
      nopes: [],
      matches: [],
      chats: {},
      reviewsGiven: [],
      privacy: { showAge: true, hideExactAddress: true },
      notify: { match: true, chat: true, review: true },
      role: "user",
      roleSelected: false,
    };
  }

  function load() {
    try { db = JSON.parse(localStorage.getItem(STORE)); } catch { db = null; }
    if (!db) {
      db = {
        session: null,
        users: {},
        listings: LISTINGS_ADMIN,
        reports: REPORTS,
        moments: MOMENTS,
        guestSeen: true,
      };
    }
    if (!db.listings) db.listings = LISTINGS_ADMIN;
    if (!db.reports) db.reports = REPORTS;
    if (!db.moments) db.moments = MOMENTS;
  }
  function save() { localStorage.setItem(STORE, JSON.stringify(db)); }

  function me() { return db.session ? db.users[db.session] : null; }
  function go(name, payload) {
    if (name !== "notifications" && view.name !== "notifications") previousView = name;
    view = { name, payload: payload || null };
    render();
  }
  function continueAfterLogin(u) {
    if (u.role === "admin") { go("admin"); return; }
    if (!u.roleSelected) { go("role-select"); return; }
    if (u.status === "host" && !u.listing) { go("listing"); return; }
    go(u.quizDone ? "discover" : "quiz");
  }
  function toast(msg) {
    const el = document.getElementById("toast");
    el.textContent = msg;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 2200);
  }
  function esc(s) { return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
  function tagsFrom(ls) {
    if (!ls) return [];
    const t = [];
    if (ls.sleep >= 70) t.push("Cú đêm"); else if (ls.sleep <= 35) t.push("Dậy sớm");
    if (ls.clean >= 75) t.push("Người sạch sẽ"); else if (ls.clean <= 40) t.push("Thoải mái");
    if (ls.cook >= 65) t.push("Hay nấu ăn");
    if (ls.guests >= 70) t.push("Thích khách"); else if (ls.guests <= 30) t.push("Ít khách");
    if (ls.noise <= 30) t.push("Yên tĩnh"); else if (ls.noise >= 70) t.push("Năng động");
    if (ls.share >= 70) t.push("Dùng chung thoải mái");
    if (ls.smokePets <= 20) t.push("No smoke / ít pet");
    if (ls.budget <= 30) t.push("Sổ sách rõ");
    return t;
  }
  function compat(a, b) {
    if (!a || !b) return 0;
    let w = 0, s = 0;
    DIMS.forEach(k => {
      const wt = WEIGHTS[k];
      w += wt;
      s += wt * (1 - Math.abs((a[k] ?? 50) - (b[k] ?? 50)) / 100);
    });
    return Math.round((s / w) * 100);
  }
  function breakdown(a, b) {
    return DIMS.map(k => ({ k, label: DIM_LABEL[k], score: Math.round(100 - Math.abs((a[k] ?? 50) - (b[k] ?? 50))) }));
  }
  function biggestGap(a, b) {
    let worst = DIMS[0], d = -1;
    DIMS.forEach(k => {
      const x = Math.abs((a[k] ?? 50) - (b[k] ?? 50));
      if (x > d) { d = x; worst = k; }
    });
    return { k: worst, label: DIM_LABEL[worst] };
  }
  function quizProgress(u) {
    const n = QUESTIONS.filter(q => u.quiz[q.id] !== undefined && u.quiz[q.id] !== null).length;
    return { n, t: QUESTIONS.length, pct: Math.round((n / QUESTIONS.length) * 100) };
  }
  function personPhoto(p) { return p.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=1f7a72&color=fff&size=256`; }

  function nav(active) {
    if (me() && me().role === "admin") return adminNav(active);
    const items = [
      ["discover", "Khám phá", '<path d="M12 3l8 6.5V21H4V9.5L12 3z" fill="none" stroke="currentColor" stroke-width="1.8"/>'],
      ["saved", "Đã lưu", '<path d="M12 20.5s-7-4.3-7-10.2C5 7.8 6.7 6 9 6c1.4 0 2.5.7 3 1.7C12.5 6.7 13.6 6 15 6c2.3 0 4 1.8 4 4.3 0 5.9-7 10.2-7 10.2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>'],
      ["moments", "Moments", '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>'],
      ["matches", "Match", '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 13c1.2 1.6 2.6 2.4 4 2.4s2.8-.8 4-2.4" fill="none" stroke="currentColor" stroke-width="1.8"/>'],
      ["chat", "Chat", '<path d="M5 6h14v10H8l-3 3V6z" fill="none" stroke="currentColor" stroke-width="1.8"/>'],
      ["notifications", "Thông báo", '<path d="M18 10a6 6 0 10-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 22h4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>'],
      ["profile", "Hồ sơ", '<circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 19c1.6-3.2 3.6-4.6 7-4.6S17.4 15.8 19 19" fill="none" stroke="currentColor" stroke-width="1.8"/>'],
      ["settings", "Cài đặt", '<circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 3v2M12 19v2M4.9 6.5l1.5 1.5M17.6 16l1.5 1.5M3 12h2M19 12h2M4.9 17.5l1.5-1.5M17.6 8l1.5-1.5" stroke="currentColor" stroke-width="1.6"/>'],
      ["help", "Trợ giúp", '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9.8 9.5a2.4 2.4 0 114.4 1.4c-.9.9-2.2 1.3-2.2 3.1M12 17.2h.01" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'],
    ];
    return `<nav class="bottom-nav" aria-label="Điều hướng chính">
      <div class="nav-head"><span>RentSplit</span><button class="nav-toggle" id="nav-toggle" type="button" aria-label="Ẩn thanh điều hướng" title="Ẩn thanh điều hướng">‹</button></div>
      <div class="nav-links">${items.map(([id, lab, svg]) => `
      <button class="nav-item ${id === "notifications" ? "nav-notification " : ""}${active === id ? "active" : ""}" data-go="${id}">
        <svg viewBox="0 0 24 24">${svg}</svg>${lab}
      </button>`).join("")}</div>
    </nav>
    <button class="nav-reopen" id="nav-reopen" type="button" aria-label="Mở thanh điều hướng" title="Mở thanh điều hướng">☰</button>`;
  }

  function adminNav(active) {
    const items = [
      ["admin", "Dashboard", "▥"], ["admin-users", "Người dùng", "♟"], ["admin-listings", "Tin đăng phòng", "⌂"],
      ["admin-approvals", "Duyệt tin đăng", "✓"], ["admin-reports", "Báo cáo & Khiếu nại", "⚑"], ["admin-kyc", "Xác thực KYC", "▣"],
      ["admin-reviews", "Đánh giá", "☁"], ["admin-matches", "Match", "♥"], ["admin-stats", "Thống kê", "▧"],
      ["admin-notifications", "Thông báo", "♟"], ["admin-settings", "Cài đặt", "⚙"],
    ];
    return `<nav class="bottom-nav admin-nav" aria-label="Điều hướng quản trị">
      <div class="nav-head"><span>🏠 RentSplit<small>ADMIN</small></span><button class="nav-toggle" id="nav-toggle" type="button" aria-label="Ẩn thanh điều hướng">‹</button></div>
      <div class="nav-links">${items.map(([id, label, icon]) => `<button class="nav-item ${active === id ? "active" : ""}" data-go="${id}"><i class="admin-nav-icon">${icon}</i>${label}</button>`).join("")}</div>
      <div class="nav-footer"><button class="nav-item" data-go="admin-profile"><i class="admin-nav-icon">♟</i>Admin</button><button class="nav-item" id="admin-logout"><i class="admin-nav-icon">▤</i>Đăng xuất</button></div>
    </nav><button class="nav-reopen" id="nav-reopen" type="button" aria-label="Mở thanh điều hướng">☰</button>`;
  }

  function gateAuth(next) {
    if (!me()) { go("auth", { mode: "login", next }); return true; }
    return false;
  }

  function render() {
    const root = document.getElementById("app");
    const u = me();
    const adminWide = view.name === "admin" || view.name.startsWith("admin-");
    const navClosed = localStorage.getItem("rentsplit-nav-closed") === "true";
    const hasSidebar = ["discover", "saved", "moments", "match", "listing", "profile", "matches", "chat", "thread", "review", "settings", "notifications", "help", "admin"].includes(view.name) || view.name.startsWith("admin-");
    root.className = "app-shell" + (adminWide ? " wide" : "") + (hasSidebar && !navClosed ? " sidebar-open" : " sidebar-closed");
    const pages = {
      landing: rLanding,
      auth: rAuth,
      "role-select": rRoleSelect,
      quiz: rQuiz,
      discover: rDiscover,
      saved: rSaved,
      moments: rMoments,
      match: rMatch,
      listing: rListing,
      profile: rProfile,
      matches: rMatches,
      chat: rChat,
      thread: rThread,
      review: rReview,
      settings: rSettings,
      notifications: rNotifications,
      help: rHelp,
      admin: rAdmin,
      "admin-users": rAdminSection,
      "admin-listings": rAdminSection,
      "admin-approvals": rAdminSection,
      "admin-reports": rAdminSection,
      "admin-kyc": rAdminSection,
      "admin-reviews": rAdminSection,
      "admin-matches": rAdminSection,
      "admin-stats": rAdminSection,
      "admin-notifications": rAdminSection,
      "admin-settings": rAdminSection,
      "admin-profile": rAdminSection,
    };
    root.innerHTML = (pages[view.name] || rLanding)();
    bind();
  }

  function rLanding() {
    return `<div class="page no-nav">
      <div class="brand-row">
        <div class="logo-mark">RS</div>
        <div><h1 class="brand-name">RentSplit</h1><p class="brand-sub">Ở ghép theo lối sống</p></div>
      </div>
      <div class="hero-art"><span class="badge">Swipe & match · không chỉ theo giá phòng</span></div>
      <div class="hero">
        <h1>Tìm bạn ở ghép hợp giờ giấc, không chỉ hợp giá.</h1>
        <p class="lede">Khảo sát thói quen sinh hoạt, tính % tương thích, rồi mới nhắn tin. Giảm rủi ro “vỡ trận” tuần đầu tiên ở Hà Nội, TP.HCM, Đà Nẵng.</p>
      </div>
      <div class="chips" style="margin-bottom:16px">
        <span class="chip on">% lối sống</span>
        <span class="chip">Có phòng / tìm phòng</span>
        <span class="chip">Chat sau khi match</span>
      </div>
      <button class="btn btn-primary" data-go="auth" data-mode="register">Đăng ký miễn phí</button>
      <div style="height:10px"></div>
      <button class="btn btn-ghost" data-go="auth" data-mode="login">Đăng nhập</button>
      <p class="lede" style="margin-top:16px;font-size:12px">Khách vãng lai chỉ xem giới thiệu. Match, chat và đăng tin cần tài khoản.
      Demo admin: <b>admin@rentsplit.vn</b> / <b>admin123</b></p>
    </div>`;
  }

  function rAuth() {
    const mode = (view.payload && view.payload.mode) || "login";
    const login = mode === "login";
    return `<div class="page no-nav">
      <button class="btn btn-ghost btn-sm" data-go="landing">← Giới thiệu</button>
      <h2 style="margin:16px 0 6px">${login ? "Đăng nhập" : "Tạo hồ sơ"}</h2>
      <p class="lede">${login ? "Email, số điện thoại hoặc tài khoản demo." : "Email hoặc SĐT. Có thể tiếp tục khảo sát lối sống ngay sau đó."}</p>
      <div class="auth-card">
        ${login ? "" : `<label>Họ tên</label><input id="f-name" placeholder="Nguyễn An" />`}
        <label>Email hoặc số điện thoại</label>
        <input id="f-id" placeholder="ban@email.com hoặc 09…" />
        <label>Mật khẩu</label>
        <input id="f-pass" type="password" placeholder="••••••••" />
        <div id="auth-err" class="field-error"></div>
        <div style="height:12px"></div>
        <button class="btn btn-primary" id="auth-submit">${login ? "Đăng nhập" : "Tạo tài khoản"}</button>
        <div class="socials">
          <button class="btn btn-ghost" data-social="google">Tiếp tục với Google (demo)</button>
          <button class="btn btn-ghost" data-social="phone">Tiếp tục với số điện thoại (demo)</button>
        </div>
      </div>
      <p style="text-align:center;margin-top:14px;font-size:13px">
        ${login ? `Chưa có tài khoản? <a href="#" data-go="auth" data-mode="register">Đăng ký</a>` : `Đã có tài khoản? <a href="#" data-go="auth" data-mode="login">Đăng nhập</a>`}
      </p>
    </div>`;
  }

  function rRoleSelect() {
    return `<div class="page no-nav role-select-page">
      <div class="brand-row"><div class="logo-mark">RS</div><div><h1 class="brand-name">Bạn đang cần gì?</h1><p class="brand-sub">Chọn vai trò để RentSplit thiết lập đúng hành trình cho bạn.</p></div></div>
      <div class="role-options">
        <button class="role-option" data-role-choice="renter"><span class="role-icon">⌂</span><span><b>Tôi đang tìm phòng</b><small>Khám phá phòng và tìm bạn ở ghép phù hợp với lối sống của bạn.</small></span><i>→</i></button>
        <button class="role-option host" data-role-choice="host"><span class="role-icon">⌑</span><span><b>Tôi có phòng cho ở ghép</b><small>Tạo hồ sơ phòng, đăng tin tìm người ở ghép rồi bắt đầu kết nối.</small></span><i>→</i></button>
      </div>
    </div>`;
  }

  function rQuiz() {
    const u = me();
    if (!u) return rAuth();
    const i = Math.min(u.quizIndex || 0, QUESTIONS.length - 1);
    const q = QUESTIONS[i];
    const prog = quizProgress(u);
    const val = u.quiz[q.id];
    let body = "";
    if (q.type === "choice") {
      body = `<div class="opts">${q.options.map((o, idx) => `<button class="opt ${val === o.v ? "on" : ""}" data-ans="${o.v}">${esc(o.t)}</button>`).join("")}</div>`;
    } else {
      const v = val ?? 50;
      body = `<input type="range" id="slide" min="${q.min}" max="${q.max}" value="${v}" />
        <div class="slider-row"><span>${esc(q.left)}</span><span>${esc(q.right)}</span></div>`;
    }
    return `<div class="page no-nav">
      <div class="topbar">
        <div class="brand-row"><div class="logo-mark">RS</div><div><b>Khảo sát lối sống</b><div class="lede" style="margin:0;font-size:12px">${esc(q.group)}</div></div></div>
        <div style="display:flex;gap:6px">
          <button class="btn btn-ghost btn-sm" id="quiz-demo">Điền mẫu</button>
          <button class="btn btn-ghost btn-sm" id="save-draft">Lưu nháp</button>
        </div>
      </div>
      <div class="progress-wrap">
        <div class="progress-meta"><span>Câu ${i + 1}/${QUESTIONS.length}</span><span>${prog.n} đã trả lời</span></div>
        <div class="bar"><i style="width:${((i) / QUESTIONS.length) * 100}%"></i></div>
      </div>
      <h2 class="quiz-q">${esc(q.q)}</h2>
      ${q.hint ? `<p class="quiz-h">${esc(q.hint)}</p>` : ""}
      ${body}
      <div class="row-btns" style="margin-top:22px">
        <button class="btn btn-ghost" id="quiz-prev" ${i === 0 ? "disabled" : ""}>Trước</button>
        <button class="btn btn-primary" id="quiz-next">${i === QUESTIONS.length - 1 ? "Hoàn tất" : "Tiếp"}</button>
      </div>
    </div>`;
  }

  function filtersOf() {
    const u = me();
    return u._filters || { city: u.city, priceMax: 8, ageMax: 35, gender: "Tất cả", minCompat: 50 };
  }

  function feed() {
    const u = me();
    const f = filtersOf();
    const ls = u.quiz;
    return PEOPLE.filter(p => {
      if (u.likes.includes(p.id) || u.nopes.includes(p.id)) return false;
      if (f.city && p.city !== f.city) return false;
      if (p.price > Number(f.priceMax)) return false;
      if (p.age > Number(f.ageMax)) return false;
      if (f.gender !== "Tất cả" && p.gender !== f.gender) return false;
      if (compat(ls, p.lifestyle) < Number(f.minCompat)) return false;
      return true;
    });
  }

  function rDiscover() {
    const u = me();
    if (!u) return rLanding();
    if (!u.quizDone) {
      return `<div class="page">${nav("discover")}
        <h2>Hoàn tất khảo sát để swipe</h2>
        <p class="lede">Thuật toán % tương thích cần bộ câu trả lời lối sống của bạn.</p>
        <button class="btn btn-primary" data-go="quiz">Làm khảo sát</button>
      </div>`;
    }
    const f = filtersOf();
    const cards = feed();
    const top = cards[0];
    let stack = `<div class="empty"><h3>Hết gợi ý trong bộ lọc</h3><p>Nới khoảng giá, khu vực hoặc % tối thiểu.</p></div>`;
    if (top) {
      const c = compat(u.quiz, top.lifestyle);
      const cls = c >= 80 ? "" : c >= 60 ? "mid" : "low";
      const bg = (top.room && top.room.photos[0]) || personPhoto(top);
      stack = `<div class="stack" id="stack">
        <div class="swipe-card" id="card" data-id="${top.id}">
          <div class="cover" style="background-image:url('${bg}')"></div>
          <div class="swipe-grad"></div>
          <div class="stamp like">QUAN TÂM</div>
          <div class="stamp nope">BỎ QUA</div>
          <div class="card-meta">
            <div class="compat ${cls}">${c}% <small>lối sống</small></div>
            <h2 style="margin:0 0 4px">${esc(top.name)}${u.privacy.showAge ? ", " + top.age : ""}</h2>
            <div style="opacity:.9;font-size:13px">${esc(top.city)} · ${esc(top.district)} · ${top.status === "host" ? top.price + " triệu/người" : "đang tìm phòng ~" + top.price + "tr"}</div>
            <div style="margin-top:8px">${tagsFrom(top.lifestyle).slice(0, 3).map(t => `<span class="tag">${esc(t)}</span>`).join(" ")}</div>
          </div>
        </div>
      </div>
      <div class="swipe-actions">
        <button class="round no" id="swipe-no">✕</button>
        <button class="round yes" id="swipe-yes">♥</button>
        <button class="round save" id="save-person" title="Lưu hồ sơ">🔖</button>
      </div>`;
    }
    return `<div class="page">${nav("discover")}
      <div class="topbar">
        <div class="brand-row"><div class="logo-mark">RS</div><b>Gợi ý match</b></div>
        <button class="icon-btn" id="toggle-filter" title="Bộ lọc">⚙</button>
      </div>
      <div class="filters" id="filters">
        <label>Khu vực</label>
        <select id="f-city">${CITIES.map(c => `<option ${c === f.city ? "selected" : ""}>${c}</option>`).join("")}</select>
        <label>Giá tối đa (triệu/người)</label>
        <input type="range" id="f-price" min="2" max="10" step="0.5" value="${f.priceMax}" />
        <label>Tuổi tối đa: <span id="age-lab">${f.ageMax}</span></label>
        <input type="range" id="f-age" min="18" max="40" value="${f.ageMax}" />
        <label>Giới tính</label>
        <select id="f-gender">${["Tất cả", "Nam", "Nữ"].map(g => `<option ${g === f.gender ? "selected" : ""}>${g}</option>`).join("")}</select>
        <label>% tương thích tối thiểu: <span id="c-lab">${f.minCompat}</span></label>
        <input type="range" id="f-minc" min="30" max="90" value="${f.minCompat}" />
        <div style="height:8px"></div>
        <button class="btn btn-teal btn-sm" id="apply-f">Áp dụng</button>
      </div>
      ${stack}
    </div>`;
  }

  function rSaved() {
    const u = me();
    const saved = PEOPLE.filter(p => (u.saved || []).includes(p.id));
    if (!saved.length) return `<div class="page">${nav("saved")}
      <h2>Đã lưu</h2><div class="empty"><h3>Chưa có hồ sơ được lưu</h3><p>Nhấn biểu tượng 🔖 cạnh nút tim để lưu người bạn muốn xem lại.</p><button class="btn btn-teal btn-sm" data-go="discover">Khám phá hồ sơ</button></div>
    </div>`;
    return `<div class="page">${nav("saved")}
      <h2>Đã lưu</h2><p class="lede">Những hồ sơ bạn muốn xem lại sau.</p>
      <div class="saved-grid">${saved.map(p => `<button class="saved-person" data-go="match" data-id="${p.id}">
        <img src="${personPhoto(p)}" alt="" /><span><b>${esc(p.name)}, ${p.age}</b><small>${esc(p.job)} · ${esc(p.city)}</small></span><strong>♥</strong>
      </button>`).join("")}</div>
    </div>`;
  }

  function rMoments() {
    const u = me();
    return `<div class="page">${nav("moments")}
      <h2>Moments</h2><p class="lede">Chia sẻ câu chuyện, mẹo ở ghép hoặc điều bạn đang tìm kiếm.</p>
      <div class="card moment-compose"><textarea id="moment-text" placeholder="Bạn đang nghĩ gì về cuộc sống ở ghép?"></textarea><button class="btn btn-teal btn-sm" id="post-moment">Đăng moment</button></div>
      <div class="moments-feed">${db.moments.map(m => `<article class="moment-card"><div class="moment-avatar">${esc(m.author).slice(0, 1)}</div><div><div class="moment-meta"><b>${esc(m.author)}</b><span>${esc(m.time)}</span></div><p>${esc(m.text)}</p><small>♡ Quan tâm &nbsp; · &nbsp; 💬 Bình luận</small></div></article>`).join("")}</div>
    </div>`;
  }

  function rMatch() {
    const u = me();
    const p = PEOPLE.find(x => x.id === view.payload) || PEOPLE.find(x => u.matches.includes(x.id));
    if (!p) return rDiscover();
    const c = compat(u.quiz, p.lifestyle);
    const br = breakdown(u.quiz, p.lifestyle);
    return `<div class="page">${nav("matches")}
      <button class="btn btn-ghost btn-sm" data-go="discover">← Khám phá</button>
      <div class="match-hero">
        <p class="lede" style="margin:8px 0 0">Độ tương thích lối sống</p>
        <p class="match-pct display">${c}%</p>
        <div class="pair">
          <img src="${personPhoto(u)}" alt="" onerror="this.style.background='#ccc'" />
          <span>♡</span>
          <img src="${personPhoto(p)}" alt="" />
        </div>
        <h2 style="margin:0">${esc(p.name)}, ${p.age}</h2>
        <p class="lede">${esc(p.job)} · ${esc(p.city)}</p>
        <div class="chips">${tagsFrom(p.lifestyle).map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      </div>
      <div class="card">
        <b>Breakdown theo nhóm tiêu chí</b>
        <div class="bars" style="margin-top:12px">
          ${br.map(x => `<div class="row"><span>${esc(x.label)}</span><div class="mini"><i style="width:${x.score}%"></i></div><b>${x.score}</b></div>`).join("")}
        </div>
      </div>
      ${p.room ? `<div class="card" style="margin-top:12px">
        <b>${esc(p.room.title)}</b>
        <p class="lede" style="margin:6px 0">${esc(p.room.addressPublic)} · ${p.room.area}m² · ${p.price} triệu/người</p>
        <p style="font-size:12px;color:var(--muted)">Địa chỉ chi tiết ẩn đến khi hai bên match (riêng tư).</p>
        <div class="chips">${p.room.amenities.map(a => `<span class="chip on">${esc(a)}</span>`).join("")}</div>
      </div>` : ""}
      <div style="height:12px"></div>
      <button class="btn btn-primary" data-thread="${p.id}">Bắt đầu nhắn tin</button>
    </div>`;
  }

  function rListing() {
    const u = me();
    const L = u.listing || { title: "", price: 3.5, area: 30, address: "", amenities: "", photos: "" };
    return `<div class="page">${nav("profile")}
      <h2>Đăng tin phòng</h2>
      <p class="lede">Tin bắt buộc gắn với hồ sơ lối sống của bạn để người xem thấy % tương thích.</p>
      <div class="card">
        <label>Tiêu đề</label><input id="l-title" value="${esc(L.title)}" placeholder="Căn 2PN Cầu Giấy, tìm 1 bạn nữ" />
        <label>Giá / người (triệu)</label><input id="l-price" type="number" step="0.1" value="${L.price}" />
        <label>Diện tích (m²)</label><input id="l-area" type="number" value="${L.area}" />
        <label>Địa chỉ công khai (ẩn số nhà)</label><input id="l-addr" value="${esc(L.address)}" placeholder="Ngõ …, Cầu Giấy, Hà Nội" />
        <label>Tiện ích (phẩy)</label><input id="l-am" value="${esc(L.amenities)}" placeholder="Máy giặt, ban công, bếp" />
        <label>URL ảnh (tuỳ chọn)</label><input id="l-photo" value="${esc(L.photos)}" />
        <p class="lede" style="font-size:12px;margin-top:10px">Hồ sơ lối sống: ${u.quizDone ? tagsFrom(u.quiz).join(" · ") : "chưa hoàn tất — hãy làm quiz trước."}</p>
        <button class="btn btn-primary" id="save-listing">Gửi duyệt tin</button>
      </div>
    </div>`;
  }

  function rProfile() {
    const u = me();
    const t = tagsFrom(u.quiz);
    const photo = u.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || "You")}&background=e25b43&color=fff&size=256`;
    return `<div class="page">${nav("profile")}
      <div class="card">
        <div class="profile-head">
          <img class="avatar" src="${photo}" alt="" />
          <div>
            <h2 style="margin:0">${esc(u.name || "Chưa đặt tên")}, ${u.age}</h2>
            <div class="lede" style="margin:4px 0">${esc(u.job || "Nghề / trường")} · ${esc(u.city)}</div>
            <div>${u.verified.map(v => `<span class="tag">✓ ${v === "cccd" ? "CCCD" : "SĐT"}</span>`).join(" ")}
              ${u.kyc ? `<span class="tag">KYC</span>` : ""}</div>
          </div>
        </div>
        <div class="stat-row">
          <div class="stat"><b>${u.status === "host" ? "Host" : "Renter"}</b><span>Trạng thái</span></div>
          <div class="stat"><b>${u.priceMin}–${u.priceMax}tr</b><span>Giá mong muốn</span></div>
          <div class="stat"><b>${u.matches.length}</b><span>Match</span></div>
        </div>
        <p class="lede">${esc(u.bio || "Chân dung lối sống được tạo từ khảo sát.")}</p>
        <div class="chips">${t.length ? t.map(x => `<span class="tag">${esc(x)}</span>`).join("") : `<span class="lede">Chưa có tag — hoàn tất quiz.</span>`}</div>
        <div style="height:12px"></div>
        <label>Tên</label><input id="p-name" value="${esc(u.name)}" />
        <label>Tuổi</label><input id="p-age" type="number" value="${u.age}" />
        <label>Nghề / trường</label><input id="p-job" value="${esc(u.job)}" />
        <label>Khu vực</label>
        <select id="p-city">${CITIES.map(c => `<option ${c === u.city ? "selected" : ""}>${c}</option>`).join("")}</select>
        <label>Giá mong muốn tối đa (triệu)</label><input id="p-price" type="number" step="0.1" value="${u.priceMax}" />
        <label>Bạn đang…</label>
        <select id="p-status">
          <option value="renter" ${u.status === "renter" ? "selected" : ""}>Đang tìm phòng / bạn ở ghép</option>
          <option value="host" ${u.status === "host" ? "selected" : ""}>Đang có phòng cho ở ghép</option>
        </select>
        <div class="row-btns" style="margin-top:14px">
          <button class="btn btn-primary" id="save-profile">Lưu hồ sơ</button>
          <button class="btn btn-ghost" data-go="listing">Đăng tin phòng</button>
        </div>
        <div style="height:10px"></div>
        <button class="btn btn-ghost" id="verify-phone">Xác thực SĐT (demo)</button>
        <div style="height:8px"></div>
        <button class="btn btn-ghost" id="verify-cccd">Xác thực CCCD — tuỳ chọn (demo)</button>
        <p class="lede" style="font-size:12px;margin-top:10px">Đánh giá từ lần ở ghép trước: chưa có (dùng trang Đánh giá sau khi match).</p>
      </div>
    </div>`;
  }

  function rMatches() {
    const u = me();
    if (!u.matches.length) {
      return `<div class="page">${nav("matches")}<h2>Match của bạn</h2><div class="empty">Chưa có match. Swipe phải khi % hợp.</div></div>`;
    }
    return `<div class="page">${nav("matches")}<h2>Đã match</h2>
      ${u.matches.map(id => {
        const p = PEOPLE.find(x => x.id === id);
        if (!p) return "";
        const c = compat(u.quiz, p.lifestyle);
        return `<button class="list-item" data-go="match" data-id="${p.id}">
          <img src="${personPhoto(p)}" alt="" />
          <div><div class="who">${esc(p.name)}</div><div class="preview">${c}% tương thích · ${esc(p.city)}</div></div>
        </button>`;
      }).join("")}
      <div style="height:16px"></div>
      <button class="btn btn-ghost" data-go="review">Đánh giá sau khi ở ghép</button>
    </div>`;
  }

  function rChat() {
    const u = me();
    if (!u.matches.length) return `<div class="page">${nav("chat")}<h2>Tin nhắn</h2><div class="empty">Chat mở khi hai bên match.</div></div>`;
    return `<div class="page">${nav("chat")}<h2>Tin nhắn</h2>
      ${u.matches.map(id => {
        const p = PEOPLE.find(x => x.id === id);
        const msgs = (u.chats[id] || []);
        const last = msgs[msgs.length - 1];
        return `<button class="list-item" data-thread="${id}">
          <img src="${personPhoto(p)}" alt="" />
          <div><div class="who">${esc(p.name)}</div><div class="preview">${last ? esc(last.text) : "Bắt đầu trò chuyện"}</div></div>
        </button>`;
      }).join("")}
    </div>`;
  }

  function rThread() {
    const u = me();
    const id = view.payload;
    const p = PEOPLE.find(x => x.id === id);
    if (!p) return rChat();
    const gap = biggestGap(u.quiz, p.lifestyle);
    const msgs = u.chats[id] || [];
    const tips = [
      `Hỏi thêm về ${gap.label.toLowerCase()}`,
      "Giờ giấc sinh hoạt cuối tuần của bạn thế nào?",
      "Mình chia tiền điện nước ra sao cho công bằng?",
    ];
    return `<div class="page">${nav("chat")}
      <div class="topbar">
        <button class="btn btn-ghost btn-sm" data-go="chat">← Danh sách</button>
        <b>${esc(p.name)}</b>
        <button class="btn btn-ghost btn-sm" data-go="match" data-id="${p.id}">${compat(u.quiz, p.lifestyle)}%</button>
      </div>
      <div class="suggest">${tips.map(t => `<button data-tip="${esc(t)}">${esc(t)}</button>`).join("")}</div>
      <div class="thread" id="thread">
        ${msgs.map(m => `<div class="bubble ${m.who}">${esc(m.text)}</div>`).join("")}
      </div>
      <div class="composer">
        <input id="msg" placeholder="Nhắn tin…" />
        <button class="btn btn-primary btn-sm" id="send">Gửi</button>
      </div>
    </div>`;
  }

  function rReview() {
    const u = me();
    const p = PEOPLE.find(x => u.matches.includes(x.id));
    return `<div class="page">${nav("admin")}
      <h2>Đánh giá sau khi ở ghép</h2>
      <p class="lede">Sau một thời gian ở chung, hãy đánh giá mức độ đúng mô tả — giúp cộng đồng tin cậy hơn.</p>
      ${p ? `<div class="card">
        <b>${esc(p.name)}</b>
        <p class="lede">Đúng như mô tả lối sống?</p>
        <div class="stars" id="stars">${[1,2,3,4,5].map(i => `<button data-star="${i}">★</button>`).join("")}</div>
        <label>Thái độ / nên giới thiệu?</label>
        <textarea id="rev-note" placeholder="Bạn ấy giữ nhà đúng như quiz, nên giới thiệu…"></textarea>
        <button class="btn btn-primary" id="send-rev">Gửi đánh giá</button>
      </div>` : `<div class="empty">Cần có match trước.</div>`}
    </div>`;
  }

  function rSettings() {
    const u = me();
    return `<div class="page">${nav("settings")}
      <h2>Cài đặt</h2>
      <div class="card">
        <b>Khảo sát lối sống</b>
        <p class="lede">Chỉnh lại câu trả lời bất cứ lúc nào — trọng số thuật toán không xoá dữ liệu cũ.</p>
        <button class="btn btn-teal" data-go="quiz">Sửa khảo sát</button>
      </div>
      <div class="card" style="margin-top:12px">
        <b>Quyền riêng tư</b>
        <label><input type="checkbox" id="pr-age" ${u.privacy.showAge ? "checked" : ""} /> Hiện tuổi trên thẻ</label>
        <label><input type="checkbox" id="pr-addr" ${u.privacy.hideExactAddress ? "checked" : ""} /> Ẩn địa chỉ chi tiết đến khi match</label>
        <button class="btn btn-ghost" id="save-pr" style="margin-top:10px">Lưu riêng tư</button>
      </div>
      <div class="card" style="margin-top:12px">
        <b>Thông báo</b>
        <label><input type="checkbox" id="n-match" ${u.notify.match ? "checked" : ""} /> Match mới</label>
        <label><input type="checkbox" id="n-chat" ${u.notify.chat ? "checked" : ""} /> Tin nhắn</label>
        <label><input type="checkbox" id="n-rev" ${u.notify.review ? "checked" : ""} /> Nhắc đánh giá sau ở ghép</label>
        <button class="btn btn-ghost" id="save-n" style="margin-top:10px">Lưu thông báo</button>
      </div>
      <div class="card" style="margin-top:12px">
        <button class="btn btn-ghost" data-go="review">Trang đánh giá</button>
        <div style="height:8px"></div>
        ${u.role === "admin" ? `<button class="btn btn-dark" data-go="admin">Trang quản trị</button><div style="height:8px"></div>` : ""}
        <button class="btn btn-ghost" id="logout">Đăng xuất</button>
        <div style="height:8px"></div>
        <button class="btn btn-primary" id="del-acc" style="background:#7a1f14">Xoá tài khoản</button>
      </div>
    </div>`;
  }

  function rNotifications() {
    const items = [
      ["Match mới", "Minh Anh vừa quan tâm đến hồ sơ của bạn.", "Vừa xong", "match"],
      ["Gợi ý phù hợp", "Có 3 hồ sơ mới có độ tương thích cao với bạn.", "Hôm nay", "discover"],
      ["Mẹo an toàn", "Chỉ đặt cọc sau khi xem phòng và xác minh thông tin.", "Hôm qua", "settings"],
    ];
    return `<div class="page">${nav("notifications")}
      <div class="topbar"><div><h2 style="margin:0">Thông báo</h2><p class="lede" style="margin:5px 0 0">Cập nhật mới dành cho bạn</p></div></div>
      <div class="card notification-list">
        ${items.map(([title, text, time, target], index) => `<button class="notification-item ${index === 0 ? "unseen" : ""}" data-go="${target}">
          <span class="notification-icon">${index === 0 ? "♡" : index === 1 ? "✦" : "!"}</span>
          <span><b>${title}</b><small>${text}</small><em>${time}</em></span>
        </button>`).join("")}
      </div>
    </div>`;
  }

  function rHelp() {
    return `<div class="page">${nav("help")}
      <h2>Trợ giúp</h2>
      <p class="lede">Đội ngũ chăm sóc người dùng sẽ hỗ trợ các vấn đề về tài khoản, match, tin đăng và an toàn giao dịch.</p>
      <div class="card support-card">
        <div class="support-mark">?</div>
        <div><b>Liên hệ quản trị viên</b><p class="lede">Phản hồi trong giờ làm việc, thường dưới 24 giờ.</p></div>
      </div>
      <div class="card" style="margin-top:12px">
        <label>Chủ đề</label>
        <select id="help-topic"><option>Tài khoản và hồ sơ</option><option>Match hoặc tin nhắn</option><option>Tin đăng và phòng ở</option><option>Báo cáo an toàn</option><option>Khác</option></select>
        <label>Nội dung cần hỗ trợ</label>
        <textarea id="help-message" placeholder="Mô tả vấn đề của bạn để admin có thể hỗ trợ nhanh hơn."></textarea>
        <button class="btn btn-teal" id="send-help" style="margin-top:12px">Gửi yêu cầu cho admin</button>
      </div>
    </div>`;
  }

  function rAdmin() {
    const u = me();
    if (!u || u.role !== "admin") {
      return `<div class="page no-nav"><p>Cần tài khoản quản trị.</p><button class="btn" data-go="auth" data-mode="login">Đăng nhập</button></div>`;
    }
    const users = Object.values(db.users).filter(x => x.role !== "admin");
    return `<div class="page">${nav("admin")}
      <h2>Quản trị RentSplit</h2>
      <div class="kpi">
        <div class="card"><b>${users.length}</b><span class="lede">Người dùng</span></div>
        <div class="card"><b>${db.listings.filter(l => l.status === "pending").length}</b><span class="lede">Tin chờ duyệt</span></div>
        <div class="card"><b>${db.reports.filter(r => r.status === "open").length}</b><span class="lede">Báo cáo mở</span></div>
        <div class="card"><b>38%</b><span class="lede">Tỷ lệ swipe → match (demo)</span></div>
      </div>
      <h3>Tin đăng chờ duyệt</h3>
      <div class="table-wrap card">
        <table><thead><tr><th>Mã</th><th>Tin</th><th>Chủ</th><th>TT</th><th></th></tr></thead>
        <tbody>${db.listings.map(l => `<tr>
          <td>${l.id}</td><td>${esc(l.title)}</td><td>${esc(l.owner)}</td><td>${l.status}</td>
          <td>${l.status === "pending" ? `<button class="btn btn-sm btn-teal" data-approve="${l.id}">Duyệt</button>` : "—"}</td>
        </tr>`).join("")}</tbody></table>
      </div>
      <h3>Báo cáo vi phạm</h3>
      <div class="table-wrap card">
        <table><thead><tr><th>Mã</th><th>Người báo</th><th>Đối tượng</th><th>Lý do</th><th></th></tr></thead>
        <tbody>${db.reports.map(r => `<tr>
          <td>${r.id}</td><td>${esc(r.by)}</td><td>${esc(r.target)}</td><td>${esc(r.reason)}</td>
          <td>${r.status === "open" ? `<button class="btn btn-sm btn-ghost" data-close="${r.id}">Đóng</button>` : "đã xử lý"}</td>
        </tr>`).join("")}</tbody></table>
      </div>
      <h3>Người dùng</h3>
      <div class="table-wrap card">
        <table><thead><tr><th>Tên</th><th>Email</th><th>Quiz</th></tr></thead>
        <tbody>${users.map(x => `<tr><td>${esc(x.name)}</td><td>${esc(x.email)}</td><td>${x.quizDone ? "xong" : "nháp"}</td></tr>`).join("") || `<tr><td colspan="3">Chưa có user thường</td></tr>`}</tbody>
      </table></div>
    </div>`;
  }

  function rAdminSection() {
    const u = me();
    if (!u || u.role !== "admin") return `<div class="page no-nav"><p>Cần tài khoản quản trị.</p></div>`;
    const key = view.name;
    const titles = { "admin-users": "Người dùng", "admin-listings": "Tin đăng phòng", "admin-approvals": "Duyệt tin đăng", "admin-reports": "Báo cáo & Khiếu nại", "admin-kyc": "Xác thực KYC", "admin-reviews": "Đánh giá", "admin-matches": "Match", "admin-stats": "Thống kê", "admin-notifications": "Thông báo", "admin-settings": "Cài đặt", "admin-profile": "Tài khoản Admin" };
    const users = Object.values(db.users).filter(x => x.role !== "admin");
    let content = `<div class="card"><p class="lede">Chức năng quản trị đang sẵn sàng để theo dõi và xử lý.</p></div>`;
    if (key === "admin-users") content = `<div class="table-wrap card"><table><thead><tr><th>Tên</th><th>Email</th><th>Vai trò</th><th>Quiz</th></tr></thead><tbody>${users.map(x => `<tr><td>${esc(x.name)}</td><td>${esc(x.email)}</td><td>${x.status === "host" ? "Có phòng" : "Tìm phòng"}</td><td>${x.quizDone ? "Hoàn tất" : "Chưa xong"}</td></tr>`).join("") || `<tr><td colspan="4">Chưa có người dùng</td></tr>`}</tbody></table></div>`;
    if (key === "admin-listings" || key === "admin-approvals") content = `<div class="table-wrap card"><table><thead><tr><th>Mã</th><th>Tin</th><th>Chủ</th><th>Trạng thái</th><th></th></tr></thead><tbody>${db.listings.map(l => `<tr><td>${l.id}</td><td>${esc(l.title)}</td><td>${esc(l.owner)}</td><td>${l.status}</td><td>${l.status === "pending" ? `<button class="btn btn-sm btn-teal" data-approve="${l.id}">Duyệt</button>` : "—"}</td></tr>`).join("")}</tbody></table></div>`;
    if (key === "admin-reports") content = `<div class="table-wrap card"><table><thead><tr><th>Mã</th><th>Người báo</th><th>Lý do</th><th></th></tr></thead><tbody>${db.reports.map(r => `<tr><td>${r.id}</td><td>${esc(r.by)}</td><td>${esc(r.reason)}</td><td>${r.status === "open" ? `<button class="btn btn-sm btn-ghost" data-close="${r.id}">Đóng</button>` : "Đã xử lý"}</td></tr>`).join("")}</tbody></table></div>`;
    if (key === "admin-kyc") content = `<div class="card"><b>Hồ sơ cần xác thực</b><p class="lede">${users.filter(x => !x.kyc).length} tài khoản đang chờ KYC.</p><div class="chips">${users.filter(x => !x.kyc).map(x => `<span class="chip">${esc(x.name || x.email)}</span>`).join("") || `<span class="chip">Không có hồ sơ chờ</span>`}</div></div>`;
    if (key === "admin-stats") content = `<div class="kpi"><div class="card"><b>${users.length}</b><span class="lede">Người dùng</span></div><div class="card"><b>${db.listings.length}</b><span class="lede">Tin đăng</span></div><div class="card"><b>${db.reports.filter(r => r.status === "open").length}</b><span class="lede">Báo cáo mở</span></div><div class="card"><b>38%</b><span class="lede">Tỷ lệ match</span></div></div>`;
    if (key === "admin-profile") content = `<div class="card"><div class="profile-head"><div class="support-mark">A</div><div><b>${esc(u.name)}</b><p class="lede">${esc(u.email)} · Quản trị viên</p></div></div></div>`;
    return `<div class="page">${nav(key)}<h2>${titles[key]}</h2>${content}</div>`;
  }

  function ensureAdmin() {
    if (!db.users["admin@rentsplit.vn"]) {
      db.users["admin@rentsplit.vn"] = Object.assign(defaultUser(), {
        email: "admin@rentsplit.vn",
        name: "Admin",
        password: "admin123",
        role: "admin",
        quizDone: true,
        quiz: { sleep: 50, clean: 50, cook: 50, guests: 50, noise: 50, share: 50, smokePets: 50, budget: 50 },
      });
    }
  }

  function login(id, pass, social) {
    ensureAdmin();
    const key = id.trim().toLowerCase();
    let u = db.users[key];
    if (social) {
      if (!u) {
        u = Object.assign(defaultUser(), { email: key, name: "Người dùng mới", password: pass || "social" });
        db.users[key] = u;
      }
      db.session = key;
      save();
      return u;
    }
    if (key === "admin@rentsplit.vn" && pass === "admin123") {
      db.session = key; save(); return db.users[key];
    }
    if (!u || u.password !== pass) return null;
    db.session = key; save(); return u;
  }

  function register(name, id, pass) {
    const key = id.trim().toLowerCase();
    if (db.users[key]) return { err: "Tài khoản đã tồn tại" };
    const u = Object.assign(defaultUser(), { email: key, name: name || "Bạn mới", password: pass, phone: /^\d/.test(id) ? id : "" });
    db.users[key] = u;
    db.session = key;
    save();
    return { ok: u };
  }

  function currentAnswer() {
    const u = me();
    const q = QUESTIONS[u.quizIndex || 0];
    if (q.type === "slider") {
      const el = document.getElementById("slide");
      return el ? Number(el.value) : (u.quiz[q.id] ?? 50);
    }
    return u.quiz[q.id];
  }

  function swipe(dir) {
    const u = me();
    const top = feed()[0];
    if (!top) return;
    if (dir === "right") {
      u.likes.push(top.id);
      const c = compat(u.quiz, top.lifestyle);
      const matched = c >= 62;
      if (matched) {
        if (!u.matches.includes(top.id)) u.matches.push(top.id);
        if (!u.chats[top.id]) {
          u.chats[top.id] = [{ who: "them", text: `Chào ${u.name || ""}! Mình thấy lối sống khá hợp, nhắn thêm về giờ giấc nhé.` }];
        }
        save();
        toast("It's a match! " + c + "%");
        go("match", top.id);
        return;
      }
      toast("Đã quan tâm — chờ đối phương phản hồi");
    } else {
      u.nopes.push(top.id);
      toast("Đã bỏ qua");
    }
    save();
    render();
  }

  function saveCurrentPerson() {
    const u = me();
    const top = feed()[0];
    if (!top) return;
    if (!u.saved) u.saved = [];
    if (u.saved.includes(top.id)) { toast("Hồ sơ này đã được lưu"); return; }
    u.saved.push(top.id);
    save();
    render();
    toast("Đã lưu hồ sơ để xem lại sau");
  }

  function bindSwipe() {
    const card = document.getElementById("card");
    if (!card) return;
    let x0 = 0, dragging = false;
    const like = card.querySelector(".stamp.like");
    const nope = card.querySelector(".stamp.nope");
    function set(dx) {
      const rot = dx / 18;
      card.style.transform = `translateX(${dx}px) rotate(${rot}deg)`;
      like.style.opacity = Math.max(0, dx / 120);
      nope.style.opacity = Math.max(0, -dx / 120);
    }
    card.addEventListener("pointerdown", e => { dragging = true; x0 = e.clientX; card.setPointerCapture(e.pointerId); });
    card.addEventListener("pointermove", e => { if (!dragging) return; set(e.clientX - x0); });
    function end(e) {
      if (!dragging) return;
      dragging = false;
      const dx = e.clientX - x0;
      if (dx > 90) swipe("right");
      else if (dx < -90) swipe("left");
      else { card.style.transform = ""; like.style.opacity = 0; nope.style.opacity = 0; }
    }
    card.addEventListener("pointerup", end);
    card.addEventListener("pointercancel", end);
  }

  function bind() {
    const navToggle = document.getElementById("nav-toggle");
    const navReopen = document.getElementById("nav-reopen");
    if (navToggle) navToggle.addEventListener("click", () => {
      localStorage.setItem("rentsplit-nav-closed", "true");
      document.getElementById("app").classList.replace("sidebar-open", "sidebar-closed");
    });
    if (navReopen) navReopen.addEventListener("click", () => {
      localStorage.setItem("rentsplit-nav-closed", "false");
      document.getElementById("app").classList.replace("sidebar-closed", "sidebar-open");
    });
    const adminLogout = document.getElementById("admin-logout");
    if (adminLogout) adminLogout.addEventListener("click", () => { db.session = null; save(); go("landing"); });
    document.querySelectorAll("[data-go]").forEach(el => {
      el.addEventListener("click", e => {
        e.preventDefault();
        const name = el.getAttribute("data-go");
        const mode = el.getAttribute("data-mode");
        const id = el.getAttribute("data-id");
        if (name === "notifications" && view.name === "notifications") { go(previousView); return; }
        const needAuth = !["landing", "auth"].includes(name);
        if (needAuth && !me()) { go("auth", { mode: "login", next: name }); return; }
        if (name === "auth") go("auth", { mode: mode || "login" });
        else if (name === "match") go("match", id);
        else go(name, id);
      });
    });
    document.querySelectorAll("[data-thread]").forEach(el => el.addEventListener("click", () => go("thread", el.getAttribute("data-thread"))));
    document.querySelectorAll("[data-social]").forEach(el => el.addEventListener("click", () => {
      const u = login("demo." + el.getAttribute("data-social") + "@rentsplit.vn", "social", true);
      toast("Đăng nhập mạng xã hội (demo)");
      continueAfterLogin(u);
    }));
    document.querySelectorAll("[data-role-choice]").forEach(el => el.addEventListener("click", () => {
      const u = me();
      const choice = el.getAttribute("data-role-choice");
      u.status = choice;
      u.roleSelected = true;
      save();
      if (choice === "host") { go("listing"); return; }
      go(u.quizDone ? "discover" : "quiz");
    }));
    const submit = document.getElementById("auth-submit");
    if (submit) submit.addEventListener("click", () => {
      const mode = (view.payload && view.payload.mode) || "login";
      const id = document.getElementById("f-id").value;
      const pass = document.getElementById("f-pass").value;
      const err = document.getElementById("auth-err");
      if (!id || !pass) { err.textContent = "Nhập đủ thông tin."; return; }
      if (mode === "register") {
        const name = document.getElementById("f-name").value;
        const r = register(name, id, pass);
        if (r.err) { err.textContent = r.err; return; }
        continueAfterLogin(r.ok);
      } else {
        const u = login(id, pass);
        if (!u) { err.textContent = "Sai tài khoản hoặc mật khẩu."; return; }
        continueAfterLogin(u);
      }
    });
    document.querySelectorAll("[data-ans]").forEach(el => el.addEventListener("click", () => {
      const u = me();
      const q = QUESTIONS[u.quizIndex || 0];
      u.quiz[q.id] = Number(el.getAttribute("data-ans"));
      save(); render();
    }));
    const quizDemo = document.getElementById("quiz-demo");
    if (quizDemo) quizDemo.addEventListener("click", () => {
      const u = me();
      const sample = { sleep: 32, clean: 78, cook: 40, guests: 40, noise: 30, share: 45, smokePets: 12, budget: 22 };
      u.quiz = sample; u.quizIndex = QUESTIONS.length - 1; u.quizDone = true;
      u.bio = "Chân dung: " + tagsFrom(u.quiz).join(", ");
      save(); toast("Đã điền khảo sát mẫu"); go("discover");
    });
    const saveDraft = document.getElementById("save-draft");
    if (saveDraft) saveDraft.addEventListener("click", () => {
      const u = me();
      const q = QUESTIONS[u.quizIndex || 0];
      if (q.type === "slider") u.quiz[q.id] = currentAnswer();
      save(); toast("Đã lưu nháp, quay lại bất cứ lúc nào");
    });
    const prev = document.getElementById("quiz-prev");
    if (prev) prev.addEventListener("click", () => { me().quizIndex = Math.max(0, (me().quizIndex || 0) - 1); save(); render(); });
    const next = document.getElementById("quiz-next");
    if (next) next.addEventListener("click", () => {
      const u = me();
      const i = u.quizIndex || 0;
      const q = QUESTIONS[i];
      const ans = currentAnswer();
      if (ans === undefined || ans === null) { toast("Chọn một đáp án hoặc kéo thanh trượt"); return; }
      u.quiz[q.id] = ans;
      if (i >= QUESTIONS.length - 1) {
        u.quizDone = true;
        u.bio = "Chân dung: " + tagsFrom(u.quiz).join(", ");
        save(); toast("Hồ sơ lối sống đã sẵn sàng");
        go("discover");
        return;
      }
      u.quizIndex = i + 1;
      save(); render();
    });
    const tf = document.getElementById("toggle-filter");
    if (tf) tf.addEventListener("click", () => document.getElementById("filters").classList.toggle("open"));
    const sendHelp = document.getElementById("send-help");
    if (sendHelp) sendHelp.addEventListener("click", () => {
      const message = document.getElementById("help-message").value.trim();
      if (!message) { toast("Hãy nhập nội dung cần hỗ trợ"); return; }
      toast("Đã gửi yêu cầu đến admin");
      document.getElementById("help-message").value = "";
    });
    const postMoment = document.getElementById("post-moment");
    if (postMoment) postMoment.addEventListener("click", () => {
      const input = document.getElementById("moment-text");
      const message = input.value.trim();
      if (!message) { toast("Hãy viết nội dung cho moment của bạn"); return; }
      if (!db.moments) db.moments = [];
      db.moments.unshift({ id: "m" + Date.now(), author: me().name || "Bạn", text: message, time: "Vừa xong" });
      save(); render(); toast("Đã đăng moment");
    });
    const af = document.getElementById("apply-f");
    if (af) af.addEventListener("click", () => {
      me()._filters = {
        city: document.getElementById("f-city").value,
        priceMax: document.getElementById("f-price").value,
        ageMax: document.getElementById("f-age").value,
        gender: document.getElementById("f-gender").value,
        minCompat: document.getElementById("f-minc").value,
      };
      save(); render();
    });
    const age = document.getElementById("f-age");
    if (age) age.addEventListener("input", () => document.getElementById("age-lab").textContent = age.value);
    const mc = document.getElementById("f-minc");
    if (mc) mc.addEventListener("input", () => document.getElementById("c-lab").textContent = mc.value);
    const yn = document.getElementById("swipe-yes");
    const nn = document.getElementById("swipe-no");
    const savePerson = document.getElementById("save-person");
    if (yn) yn.addEventListener("click", () => swipe("right"));
    if (nn) nn.addEventListener("click", () => swipe("left"));
    if (savePerson) savePerson.addEventListener("click", saveCurrentPerson);
    bindSwipe();
    const sp = document.getElementById("save-profile");
    if (sp) sp.addEventListener("click", () => {
      const u = me();
      u.name = document.getElementById("p-name").value;
      u.age = Number(document.getElementById("p-age").value);
      u.job = document.getElementById("p-job").value;
      u.city = document.getElementById("p-city").value;
      u.priceMax = Number(document.getElementById("p-price").value);
      u.status = document.getElementById("p-status").value;
      save(); toast("Đã lưu hồ sơ");
    });
    const vp = document.getElementById("verify-phone");
    if (vp) vp.addEventListener("click", () => { const u = me(); if (!u.verified.includes("phone")) u.verified.push("phone"); save(); toast("Đã xác thực số điện thoại (demo)"); render(); });
    const vc = document.getElementById("verify-cccd");
    if (vc) vc.addEventListener("click", () => { const u = me(); if (!u.verified.includes("cccd")) u.verified.push("cccd"); u.kyc = true; save(); toast("Đã gửi KYC CCCD (demo)"); render(); });
    const sl = document.getElementById("save-listing");
    if (sl) sl.addEventListener("click", () => {
      const u = me();
      u.status = "host";
      u.roleSelected = true;
      u.listing = {
        title: document.getElementById("l-title").value,
        price: document.getElementById("l-price").value,
        area: document.getElementById("l-area").value,
        address: document.getElementById("l-addr").value,
        amenities: document.getElementById("l-amenities") ? document.getElementById("l-amenities").value : document.getElementById("l-am").value,
        photos: document.getElementById("l-photo").value,
      };
      u.listingPending = true;
      db.listings.unshift({ id: "L" + Date.now().toString().slice(-4), title: u.listing.title || "Tin mới", owner: u.name, city: u.city, status: "pending" });
      save();
      if (!u.quizDone) { toast("Tin đã lưu. Hoàn tất khảo sát để bắt đầu ghép đôi"); go("quiz"); }
      else { toast("Tin đã gửi admin duyệt"); go("discover"); }
    });
    const send = document.getElementById("send");
    if (send) send.addEventListener("click", sendMsg);
    const msg = document.getElementById("msg");
    if (msg) msg.addEventListener("keydown", e => { if (e.key === "Enter") sendMsg(); });
    document.querySelectorAll("[data-tip]").forEach(el => el.addEventListener("click", () => {
      document.getElementById("msg").value = el.getAttribute("data-tip");
    }));
    let star = 5;
    document.querySelectorAll("[data-star]").forEach(el => el.addEventListener("click", () => {
      star = Number(el.getAttribute("data-star"));
      document.querySelectorAll("[data-star]").forEach(s => s.classList.toggle("on", Number(s.getAttribute("data-star")) <= star));
    }));
    const sr = document.getElementById("send-rev");
    if (sr) sr.addEventListener("click", () => { toast("Cảm ơn đánh giá — cộng đồng tin cậy hơn"); go("matches"); });
    const spr = document.getElementById("save-pr");
    if (spr) spr.addEventListener("click", () => {
      me().privacy.showAge = document.getElementById("pr-age").checked;
      me().privacy.hideExactAddress = document.getElementById("pr-addr").checked;
      save(); toast("Đã lưu quyền riêng tư");
    });
    const sn = document.getElementById("save-n");
    if (sn) sn.addEventListener("click", () => {
      me().notify = { match: document.getElementById("n-match").checked, chat: document.getElementById("n-chat").checked, review: document.getElementById("n-rev").checked };
      save(); toast("Đã lưu thông báo");
    });
    const lo = document.getElementById("logout");
    if (lo) lo.addEventListener("click", () => { db.session = null; save(); go("landing"); });
    const da = document.getElementById("del-acc");
    if (da) da.addEventListener("click", () => {
      if (!confirm("Xoá tài khoản khỏi bản demo trên máy này?")) return;
      delete db.users[db.session];
      db.session = null; save(); go("landing");
    });
    document.querySelectorAll("[data-approve]").forEach(el => el.addEventListener("click", () => {
      const id = el.getAttribute("data-approve");
      const l = db.listings.find(x => x.id === id); if (l) l.status = "approved";
      save(); toast("Đã duyệt tin"); render();
    }));
    document.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", () => {
      const r = db.reports.find(x => x.id === el.getAttribute("data-close"));
      if (r) r.status = "closed";
      save(); render();
    }));
  }

  function sendMsg() {
    const u = me();
    const id = view.payload;
    const input = document.getElementById("msg");
    const text = (input.value || "").trim();
    if (!text) return;
    if (!u.chats[id]) u.chats[id] = [];
    u.chats[id].push({ who: "me", text });
    const p = PEOPLE.find(x => x.id === id);
    const gap = biggestGap(u.quiz, p.lifestyle);
    u.chats[id].push({ who: "them", text: `Ok mình ghi nhận. Về ${gap.label.toLowerCase()} mình linh hoạt được nếu báo trước.` });
    save();
    input.value = "";
    render();
  }

  load();
  ensureAdmin();
  save();
  if (me()) continueAfterLogin(me());
  else render();
})();

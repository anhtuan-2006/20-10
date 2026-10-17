# 20/10 — A little gift for you 💙

Một trang web nhỏ dạng trình chiếu, tông nền đen/xanh đêm, hoa neon xanh và một vài điểm nhấn hồng. Không cần cài thư viện hay chạy máy chủ: mở `index.html` bằng trình duyệt là dùng được.

## Các phân cảnh hiện có

1. **Dear to Name1** — màn mở đầu.
2. **Một vũ trụ dành riêng cho em** — chòm sao trái tim kích thước lớn, hào quang cyan/hồng, quỹ đạo nhiều lớp, các vệ tinh nhỏ và sao băng chạy ngang.
3. **Happy Women's Day** — bó hoa neon và 6 khung ảnh.
4. **Những mảnh ghép về chúng mình** — bốn thẻ kỷ niệm có thể thay ảnh và chú thích.
5. **Phong thư** — chạm để mở thư.
6. **Bức thư dài** — giấy có viền trang trí và thanh cuộn riêng.
7. **Một lời nhắn chỉ dành riêng cho em** — lời nhắn riêng trước màn kết thúc.
8. **The End** — màn kết thúc, chạm để xem lại từ đầu.

## Cách chạy

1. Giải nén `20-10-love.zip`.
2. Mở thư mục `20-10-love`.
3. Nhấp đúp `index.html` (nên dùng Chrome, Safari hoặc Firefox).
4. Chạm/click ở bất kỳ đâu để chuyển phần. Có thể dùng `Space`, `Enter`, `→`; bấm `←` để lùi lại một phần. Ở màn hình cuối, chạm để xem lại từ đầu.

## Chỉnh sửa nội dung

### 1. Đổi tên người nhận
Mở `js/script.js`, sửa:

```js
const CONFIG = {
  recipient: 'Name1',
  totalScenes: 8,
  closeLetterDelay: 2350
};
```

Ví dụ: `recipient: 'My Girl Friend'`.

### 2. Thay 6 ảnh mẫu bằng ảnh thật
Trong `index.html`, tìm các dòng `src="assets/photos/photo-1.svg"` đến `photo-6.svg`.

- Sao chép ảnh cá nhân vào thư mục `assets/photos/`.
- Đổi đường dẫn tương ứng, ví dụ `src="assets/photos/ky-niem-1.jpg"`.
- Nên dùng ảnh dọc hoặc ảnh gần vuông để hiển thị đẹp trong khung trắng.
- Các dòng chú thích ngay dưới ảnh (`little moments`, `my favorite smile`,...) sửa trực tiếp ở thẻ `<figcaption>`.

Các ảnh SVG hiện có chỉ là ảnh minh họa để trang không bị trống trước khi bạn thêm ảnh của hai người.

### 3. Viết thư dài
Trong `index.html`, tìm phần `id="paperInner"`. Thư mẫu hiện có nhiều đoạn để minh họa thanh cuộn. Bạn có thể thay nội dung từng thẻ `<p class="letter-line">...</p>`, thêm bao nhiêu đoạn tùy ý hoặc xóa các đoạn không cần.

- Khi mở thư, nội dung nằm trong vùng cuộn riêng bên trong tờ giấy; viền trang trí luôn giữ cố định.
- Dùng con lăn chuột, vuốt lên/xuống hoặc kéo thanh cuộn ở cạnh phải để đọc hết thư.
- Chạm bên ngoài tờ giấy để khép thư; nhấn `Esc` cũng khép được thư. Khi chạm hoặc kéo bên trong tờ giấy, trang sẽ không tự chuyển cảnh.
- Mỗi đoạn tự xuất hiện lần lượt với độ trễ nhẹ. Nếu thêm rất nhiều đoạn, chúng vẫn hiện đầy đủ sau khoảng vài giây.

Ví dụ:

```html
<p class="letter-line">Cảm ơn em vì đã xuất hiện và làm những ngày bình thường của anh trở nên đặc biệt.</p>
```

Dòng kết thư nằm ở `<p class="letter-sign">Thương em thật nhiều, <span>♡</span></p>`.

### 4. Đổi câu kết
Trong phần `PHẦN 5`, thay `aaaaaaaaaaaaaaaa...` bên trong `<p class="ending-message">` bằng câu bạn muốn nhắn.

## Cấu trúc thư mục

```text
20-10-love/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    ├── decor/
    │   └── neon-bouquet.svg
    └── photos/
        ├── photo-1.svg
        ├── photo-2.svg
        ├── photo-3.svg
        ├── photo-4.svg
        ├── photo-5.svg
        └── photo-6.svg
```

## Ghi chú

- Font chữ tải từ Google Fonts khi có Internet; nếu không có mạng, trình duyệt tự dùng font dự phòng.
- Hiệu ứng được tối giản tự động nếu thiết bị bật chế độ giảm chuyển động.
- Tên, lời thư, chú thích ảnh và câu cuối đều sửa trực tiếp trong file nguồn.

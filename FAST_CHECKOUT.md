# Bản tối ưu thời điểm checkout với mã shop

File dùng là `modified_script.optimized.js`. File `modified_script.js` hiện có trong repo được giữ nguyên. Bản tối ưu thay phần Ultra Speed Engine v3.6 ở cuối file bằng bộ điều khiển thời điểm mới, đồng thời nối với quy trình đặt đơn hiện có.

Dùng URL dấu trang trong [fast-checkout.bookmarklet.txt](fast-checkout.bookmarklet.txt). Nó tải file `modified_script.optimized.js` từ CDN. Tải lại trang Shopee rồi chỉ nạp một bản script, tránh chạy chồng bản cũ và bản mới.

## Cách chuẩn bị

1. Mở Shopee, đăng nhập, chọn đúng sản phẩm, phân loại và số lượng. Chuẩn bị giỏ hàng trước; chỉ bỏ qua bước thêm giỏ khi sản phẩm đã thực sự nằm trong giỏ với đúng phân loại và số lượng.
2. Trong giao diện đặt đơn hiện có, chọn hoặc nhập **đúng mã shop**, rồi bấm **Kiểm tra/Xác minh** trước giờ mở mã. Kiểm tra điều kiện áp dụng của mã. Không dùng chế độ tự chọn mã ngoài danh sách nếu mục tiêu là một mã cụ thể.
3. Bật **Hẹn giờ thực thi**, nhập đúng giờ mở mã, ví dụ `09:00:00`. Chuẩn bị và bấm **Bắt đầu** trước ít nhất 2 giây; nên làm sớm hơn để hoàn tất xác minh, thiết lập và xử lý kết nối.
4. Trong mục **Thời điểm checkout và đặt đơn**, để **Checkout sau giờ mở mã = 0 ms**. Đặt **Đặt đơn sau giờ mở mã = 0 ms** để gửi ngay sau khi nhận checkout hợp lệ; nhập `1000` để chờ ít nhất đến giờ mở mã cộng 1 giây. Nếu checkout hoàn tất muộn hơn mốc này, đặt đơn được gửi sau khi checkout hợp lệ.
5. Nhập mức giá tối đa theo nhu cầu khi giao diện hỏi. Giữ tab ở phía trước và máy hoạt động trong lúc chờ. Dùng nút **Bắt đầu** và **Dừng** có sẵn; phần cài đặt mới không tự bắt đầu mua.

Cài đặt được lưu trên trình duyệt này. Để đổi thông số sau khi đã chuẩn bị lượt chạy, bấm **Dừng**, sửa thông số, rồi bắt đầu lại. Nếu giá trị bị từ chối, thông báo **Chưa áp dụng** sẽ hiện và giá trị đó không được lưu.

## Ý nghĩa các mốc

- **Checkout = 0 ms**: mục tiêu là gửi yêu cầu checkout tại giờ mở mã đã hẹn.
- **Đặt đơn = 0 ms**: gửi đặt đơn sớm nhất sau checkout xác nhận mã đã chọn và vượt qua các kiểm tra giá.
- **Đặt đơn = 1000 ms**: gửi đặt đơn sớm nhất tại `giờ mở mã + 1.000 ms`, đồng thời vẫn phải chờ checkout hợp lệ.
- **Bù giờ máy chủ**: mặc định `0 ms`; đây là hiệu chỉnh thủ công, không phải tự đồng bộ giờ. Số dương nghĩa là đồng hồ máy chủ đi trước đồng hồ máy bạn. Chỉ chỉnh khi đã đo được độ lệch.

`checkout_session_id` được mã phía trình duyệt tạo cục bộ để liên kết phiên checkout. Có ID này không có nghĩa là Shopee đã giữ mã, giữ suất voucher hay giữ hàng cho tài khoản.

Giờ `xx:xx:xx.000` là mốc lập lịch gửi yêu cầu. Trình duyệt, việc chuyển tab, tải máy, độ trễ mạng và máy chủ đều ảnh hưởng thời điểm thực tế. Bản này không bảo đảm yêu cầu tới máy chủ đúng mili giây hoặc chắc chắn mua thành công. Độ trễ đặt đơn bằng 0 vẫn cần chờ phản hồi checkout; không thể đặt đơn có xác minh mã trước khi phản hồi đó tới.

## Những thay đổi cần biết

Bộ điều khiển mới để quy trình gốc xây dựng yêu cầu đặt đơn từ checkout đã xác nhận, thay cho việc phần v3.6 tự tạo thêm lượt đặt lại bằng dữ liệu chắp vá. Nó không tự gửi lại `place_order` như phần khôi phục v3.6 và không vượt Captcha. Nếu có Captcha, cần xác minh theo yêu cầu của Shopee.

Giá và trạng thái mã vẫn phụ thuộc dữ liệu Shopee trả về. Mã không áp dụng, hết lượt, chưa mở hoặc hết hàng có thể khiến lượt chạy dừng hoặc bị máy chủ từ chối. Không coi trạng thái chưa rõ sau lỗi mạng là bằng chứng chưa có đơn; kiểm tra lịch sử đơn hàng trước khi chạy lại.

Các kiểm thử đi kèm dùng đồng hồ và phản hồi mạng mô phỏng. Chúng kiểm tra logic lập lịch và các chốt kiểm tra trong mã, chưa phải thử mua hàng hoặc đo hiệu năng trên hệ thống Shopee thật.

Trong log, `Gửi checkout: T+... ms`, `Nhận checkout: T+... ms` và `Gửi đặt đơn: T+... ms` ghi thời điểm quan sát ở trình duyệt so với giờ đã hẹn. Ví dụ: checkout được gửi ở `T+2 ms` và nhận hợp lệ ở `T+180 ms` thì cấu hình đặt đơn `0` có thể đi tiếp ngay sau đó; cấu hình `1000` tiếp tục chờ đến `T+1000 ms`. Đây là ví dụ minh họa, không phải kết quả đo trên Shopee.

Nếu Shopee đổi cấu trúc phản hồi, bản này có thể báo không xác nhận được số tiền giảm. Nó chỉ nhận các trường giảm voucher shop đã biết, không dùng giảm của sàn hoặc miễn phí vận chuyển để thay thế. Khi gặp trường hợp đó, cần kiểm tra phản hồi checkout đã che thông tin cá nhân để cập nhật bộ đọc; không bỏ kiểm tra rồi đặt với giá chưa rõ.

Giới hạn mặc định là 6 lượt checkout cho một lần chạy; các lượt sau vẫn đi tuần tự theo vòng thử lại của mã gốc. Không tạo thêm nhánh gửi đặt đơn song song. Nếu Dừng khi yêu cầu đặt đơn đang gửi, đợi phản hồi; khi kết quả không xác định, kiểm tra Đơn mua trước khi tải lại trang và chạy tiếp.

Giới hạn thời gian phía trình duyệt được mô tả trong [tài liệu setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout). Phần đồng bộ cũ chỉ đọc [HTTP Date](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Date), có độ phân giải đến giây; bản mới không coi giá trị đó là đồng bộ mili giây và dùng đồng hồ tăng đều cho thời hạn đã hẹn.


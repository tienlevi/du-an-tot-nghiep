Cấu trúc folder

src/
├── assets: Để chứa ảnh và video
├── config: Dùng để cấu hình như axios, firebase
├── constants: Tạo biến và function riêng
├── components: Chứa các thành phần ở giao diện
├── common: Chứa chung folder như hooks, lib, types
│ ├── hooks: Để tạo hook riêng mình
│ └── lib: Chứa tiện ích hoặc thư viện như firebase, mongodb, upload
| └── types: Dùng để xác định kiểu dữ liệu
├── services: Để tạo ra các logic ở phía server
├── context: Chứa React context và provider
├── pages: Để tạo các trang
├── routes: Đặt tên trang và liên kết các trang
├── styles: Tạo file css riêng

- Lưu ý: Khi tạo file ở bên trong components khi import ở bên dashboard hoặc website thì tạo file trong folder
  /(dashboard)/components hoặc /(website)/components luôn nhé

- Git conventional: feat(Tính năng mới), fix(sửa lỗi), chore(việc vặt), breakingChange(Thay đổi lớn) 

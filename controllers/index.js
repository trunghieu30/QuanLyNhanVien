var arrNhanVien = [];
document.querySelector('#btnThemNV').onclick = function () {
    var nv = new NhanVien();
    nv.taiKhoan = Number(document.querySelector('#tknv').value);
    nv.hoTen = document.querySelector('#name').value;
    nv.email = document.querySelector('#email').value;
    nv.matKhau = document.querySelector('#password').value;
    nv.ngayLam = document.querySelector('#datepicker').value;
    nv.luongCB = Number(document.querySelector('#luongCB').value);
    nv.chucVu = document.querySelector('#chucvu').value;
    nv.gioLam = Number(document.querySelector('#gioLam').value);
    var valid = true;
    valid = kiemTraRong(nv.email, '#tbEmail', 'Email') & kiemTraRong(nv.hoTen, '#tbTen', 'Họ tên') & kiemTraRong(nv.matKhau, '#tbMatKhau', 'Mật khẩu') & kiemTraRong(nv.ngayLam, '#tbNgay', 'Ngày làm') & kiemTraRong(nv.luongCB, '#tbLuongCB', 'Lương cơ bản') & kiemTraRong(nv.gioLam, '#tbGiolam', 'Giờ làm');

    valid &= kiemTraDoDai(nv.taiKhoan, '#error_tbTKNV', 'Tài khoản', 4, 6) & kiemTraTatCaKyTu(nv.hoTen, '#error_tbTen', 'Họ tên') & kiemTraEmail(nv.email, '#error_tbEmail', 'Email') & kiemTraGiaTri(nv.luongCB, '#error_tbLuongCB', 'Lương cơ bản', 1000000, 20000000) & kiemTraGiaTri(nv.gioLam, '#error_tbGiolam', 'Giờ làm', 80, 200);


    if (!valid) {
        return;
    }
    arrNhanVien.push(nv);
    renderTableNhanVien(arrNhanVien);
    luuLocalStorage(arrNhanVien);
}

function renderTableNhanVien(arrayNhanVien) {
    var html = '';
    for (var index = 0; index < arrayNhanVien.length; index++) {
        var nv = arrayNhanVien[index];
        nv.tinhTongLuong = function () {
            var tongTienLuong = 0;
            if (this.chucVu === 'Sếp') {
                tongTienLuong = this.luongCB * 3;
            } else if (this.chucVu === 'Trưởng phòng') {
                tongTienLuong = this.luongCB * 2;
            } else if (this.chucVu === 'Nhân viên') {
                tongTienLuong = this.luongCB * 1;
            }

            return tongTienLuong;
        };

        nv.xepLoaiNV = function () {
            var xepLoai = '';
            if (this.gioLam >= 0 & this.gioLam < 160) {
                xepLoai = 'Nhân viên trung bình';
            } else if (this.gioLam >= 160 & this.gioLam < 176) {
                xepLoai = 'Nhân viên khá';
            } else if (this.gioLam >= 176 & this.gioLam < 192) {
                xepLoai = 'Nhân viên giỏi';
            } else if (this.gioLam >= 192) {
                xepLoai = 'Nhân viên xuất sắc';
            }

            return xepLoai;
        }

        html += `
          <tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tinhTongLuong()}</td>
            <td>${nv.xepLoaiNV()}</td>
            <td>
              <button class="btn btn-danger" onclick="xoaNhanVien('${nv.taiKhoan}')">Xóa</button>
              <button type="button" data-toggle="modal" data-target="#myModal" class="btn btn-primary" onclick="chinhSua('${nv.taiKhoan}')">Sửa</button>
            </td>
          </tr>
        `;
    }

    document.querySelector('#tableDanhSach').innerHTML = html;

    return html;
}

document.querySelector('#btnTimNV').onclick = function () {
    var xepLoai = document.querySelector('#searchName').value;
    indexSearchName = -1;
    var html = '';
    for (index = 0; index < indexSearchName; index++) {
        if (xepLoai = 1) {
            indexSearchName = index;
            return arrNhanVien[indexSearchName];
        }
        var nv = arrNhanVien[indexSearchName];
        html += `
        <tr>
        <td>${nv.taiKhoan}</td>
        <td>${nv.hoTen}</td>
        <td>${nv.email}</td>
        <td>${nv.ngayLam}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.tinhTongLuong()}</td>
        <td>${nv.xepLoaiNV()}</td>
        <td>
          <button class="btn btn-danger" onclick="xoaNhanVien('${nv.taiKhoan}')">Xóa</button>
          <button type="button" data-toggle="modal" data-target="#myModal" class="btn btn-primary" onclick="chinhSua('${nv.taiKhoan}')">Sửa</button>
        </td>
      </tr>
        `;
    }
    document.querySelector('#tableDanhSach').innerHTML = html;
}



function xoaNhanVien(taiKhoanNVClick) {
    var indexDel = arrNhanVien.findIndex(nv => nv.taiKhoan === taiKhoanNVClick);
    arrNhanVien.splice(indexDel, 1);

    renderTableNhanVien(arrNhanVien);
};

function chinhSua(taiKhoanNVClick) {
    var indexEdit = arrNhanVien.findIndex(nv => nv.taiKhoan === taiKhoanNVClick);
    var nvEdit = arrNhanVien[indexEdit];
    document.querySelector('#tknv').value = nvEdit.taiKhoan;
    document.querySelector('#name').value = nvEdit.hoTen;
    document.querySelector('#email').value = nvEdit.email;
    document.querySelector('#password').value = nvEdit.matKhau;
    document.querySelector('#datepicker').value = nvEdit.ngayLam;
    document.querySelector('#luongCB').value = nvEdit.luongCB;
    document.querySelector('#chucvu').value = nvEdit.chucVu;
    document.querySelector('#gioLam').value = nvEdit.gioLam;

}



document.querySelector('#btnCapNhat').onclick = function () {
    var nv = new NhanVien();
    nv.taiKhoan = Number(document.querySelector("#tknv").value);
    nv.hoTen = document.querySelector("#name").value;
    nv.email = document.querySelector("#email").value;
    nv.matKhau = document.querySelector("#password").value;
    nv.ngayLam = document.querySelector("#datepicker").value;
    nv.luongCB = Number(document.querySelector("#luongCB").value);
    nv.chucVu = document.querySelector("#chucvu").value;
    nv.gioLam = Number(document.querySelector("#gioLam").value);
    var indexEdit = arrNhanVien.findIndex(nhanVien => nhanVien.taikhoan === nv.taiKhoan);

    arrNhanVien[indexEdit].hoTen = nv.hoTen;
    arrNhanVien[indexEdit].email = nv.email;
    arrNhanVien[indexEdit].matKhau = nv.matKhau;
    arrNhanVien[indexEdit].ngayLam = nv.ngayLam;
    arrNhanVien[indexEdit].luongCB = nv.luongCB;
    arrNhanVien[indexEdit].chucVu = nv.chucVu;
    arrNhanVien[indexEdit].gioLam = nv.gioLam;
    renderTableNhanVien(arrNhanVien);
    luuLocalStorage();
}

function luuLocalStorage() {

    var stringMangNhanVien = JSON.stringify(arrNhanVien);
    localStorage.setItem('arrNhanVien', stringMangNhanVien);
}

function layLocalStorage() {
    if (localStorage.getItem('arrNhanVien')) {
        var stringMangNhanVien = localStorage.getItem('arrNhanVien');
        arrNhanVien = JSON.parse(stringMangNhanVien);
        renderTableNhanVien(arrNhanVien);
    }
}

window.onload = function () {
    layLocalStorage();
}
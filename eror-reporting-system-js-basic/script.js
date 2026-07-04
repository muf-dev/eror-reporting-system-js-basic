const laporan = [];

//ambil element html yang akan kita pakai
const form = document.getElementById('errorForm');
const daftar = document.getElementById('daftarLaporan');
const emptyState = document.getElementById('emptyState');
const jumlahEl = document.getElementById('jumlah');
const notif = document.getElementById('notif');

//fungsi - tampilkan semua laporan ke HTML
function tampilkanLaporan() {
  //update hitungan
  jumlahEl.textContent = laporan.length

  //kalau kosong, tampilkan pesan
  if (laporan.length === 0) {
    emptyState.style.display = 'block'
    daftar.innerHTML = '<p id="emptyState">Belum ada laporan.isi diatas</p>'
    return
  }

  emptyState.style.display = 'none';

  // bangun HTML dari setiap laporan
  daftar.innerHTML = laporan.map(function(item,index){
    return `
    <div class="error-item">
    <div class="error-header">
    <span class="error-judul">${item.judul}</span>
    <span class="badge badge-${item.prioritas}">${item.prioritas}
    </div>
    <div class="error-desc">
    ${item.kategori} . dilaporkan oleh ${item.pelapor}
    </div>
    <div class="error-desc">${item.deskripsi}</div>
    <button class="btn-hapus" onclick="hapusLaporan(${index})">Hapus</button>
    </div>
    `
  }).join('')
}

//fungsi hapus laporan berdasarkan index
function hapusLaporan(index) {
  laporan.splice(index, 1) // hapus 1 item diposisi index
  tampilkanLaporan()
}

//event - saat form submit
form.addEventListener('submit', function(event) {
  event.preventDefault() // cegah halaman reload

  //baca nilai dari setiap field
  const data = {
    judul : document.getElementById('judul').value,
    prioritas : document.getElementById('prioritas').value,
    kategori : document.getElementById('kategori').value,
    deskripsi : document.getElementById('deskripsi').value,
    pelapor : document.getElementById('pelapor').value,  
  }

  //masukan ke array
  laporan.push(data)

  //talpilkan ke halaman
  tampilkanLaporan()

  //Reset form
  form.reset()

  //tampilkan notifikasi
  notif.style.display = 'block'
  setTimeout(function() {
    notif.style.display ='none'
  }, 3000)
})

//tampilkan awal kosong 
tampilkanLaporan()
import menu from './db.js';
import { buttonsData } from './db.js';

//HTML'den gelenler
const menuContainer = document.getElementById('menu-container');
const buttonsArea = document.getElementById('buttons-area');

//Sayfa yüklendiği anda elemanları listeleyen fonksiyonu çalıştır
document.addEventListener('DOMContentLoaded', () => {
  displayMenuItems(menu);
  showButtons('all');
});

//Ekrana menü elemanlarını listeleyecek fonksiyon
function displayMenuItems(menuItems) {
  console.log(menuItems);

  //Dizideki her bir obje için
  //Bir menü elemanını temsil eden html oluştur
  //Ve bu html'i  bir diziye aktar
  let displayMenu = menuItems.map(
    (item) => `
     <a href="productDetail.html?id=${item.id}" id="card" class="d-flex gap-3 flex-column flex-md-row text-decoration-none text-dark">
        <img class="rounded shadow" src=${item.img} />
        <div>
          <div class="d-flex justify-content-between">
            <h5>${item.title}</h5>
            <p class="text-success">$ ${item.price}</p>
          </div>

          <p class="lead">
            ${item.desc}
          </p>
        </div>
      </a>
 `
  );
  //Diziyi aralarındaki virgülü silerek stringe çevirme
  displayMenu = displayMenu.join(' ');

  //Oluşan menü elemanlarını HTML'e gönderme
  menuContainer.innerHTML = displayMenu;
}

//Butonları html'den getirme
buttonsArea.addEventListener('click', searchCategeory);

//Tıklanılan butona göre ekrana o kategorinni elemanlarını
//Basmakla görevli fonksiyon
function searchCategeory(e) {
  const categeory = e.target.dataset.category;

  //Tüm diziki elemanlardan yalnızca kategori değeri
  //Tıkladığımız butonun kategori değetriyle aynı olanları
  //Bir diziye aktarma
  const filtredMenu = menu.filter(
    (menuItem) => menuItem.category === categeory
  );

  //Eğerki hepsi seçildiyse o zaman bütün menuyu ekran bas
  if (categeory === 'all') {
    displayMenuItems(menu);
  } else {
    //Filtrenmiş diziyi ekrana basma
    displayMenuItems(filtredMenu);
  }

  //Butonları güncelle
  showButtons(categeory);
}

//Ekrana menü butonlarını basacak fonksiyon
function showButtons(active) {
  //Eski butonları temizleme
  buttonsArea.innerHTML = '';
  //Yeni butonları ekleme
  buttonsData.forEach((btn) => {
    //html butonu oluşturma
    const buttonElement = document.createElement('button');

    //Gerekli classları verme
    buttonElement.className = 'btn btn-outline-dark filter-btn';

    //Yazıyı değiştirme
    buttonElement.innerText = btn.text;

    // datasını tanımlama
    buttonElement.dataset.category = btn.data;

    //Active olana ayrıca class verme
    if (buttonElement.dataset.category === active) {
      buttonElement.classList.add('bg-dark', 'text-light');
    }

    //HTML'e gönderme
    buttonsArea.appendChild(buttonElement);
  });
}

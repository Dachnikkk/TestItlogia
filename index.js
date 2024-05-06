// Функция для валидации имени
function validateName(name) {
  return /^[A-Za-zА-Яа-я\s]+$/.test(name);
}

// Функция для валидации телефона
function validatePhone(input) {
  var keyCode;
  function mask(event) {
    event.keyCode && (keyCode = event.keyCode);
    var pos = this.selectionStart;
    if (pos < 3) event.preventDefault();
    var matrix = "+7 (___) ___ ____",
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, ""),
      new_value = matrix.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) : a;
      });
    i = new_value.indexOf("_");
    if (i != -1) {
      i < 5 && (i = 3);
      new_value = new_value.slice(0, i);
    }
    var reg = matrix
      .substr(0, this.value.length)
      .replace(/_+/g, function (a) {
        return "\\d{1," + a.length + "}";
      })
      .replace(/[+()]/g, "\\$&");
    reg = new RegExp("^" + reg + "$");
    if (
      !reg.test(this.value) ||
      this.value.length < 5 ||
      (keyCode > 47 && keyCode < 58)
    ) {
      this.value = new_value;
    }
    if (event.type == "blur" && this.value.length < 5) {
      this.value = "";
    }
  }

  input.addEventListener("input", mask, false);
  input.addEventListener("focus", mask, false);
  input.addEventListener("blur", mask, false);
  input.addEventListener("keydown", mask, false);
}

validatePhone(document.getElementById("phoneInput"));

// Обработчик события input для поля "Имя"
document
  .getElementById("nameInput")
  .addEventListener("input", function (event) {
    let name = event.target.value;

    if (!validateName(name)) {
      // Если имя невалидно, удаляем последний введенный символ
      event.target.value = name.slice(0, -1);
    }
  });

document.getElementById("submitBtn").addEventListener("click", function () {
  let name = document.getElementById("nameInput").value;
  let address = document.getElementById("addressInput").value;
  let phone = document.getElementById("phoneInput").value;

  // Проверка заполненности полей
  if (!name || !address || !phone) {
    alert("Пожалуйста, заполните все поля формы перед отправкой.");
    return;
  }

  fetch("/submit-form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      address: address,
      phone: phone,
      cart: [],
    }),
  }).then(function (data) {
    document.getElementById("successPopup").style.display = "block";
  });

  // Функция для закрытия попапа
  function closePopup() {
    document.getElementById("successPopup").style.display = "none";
  }

  // Идеальная отправка
  // .then(function(response) {
  //     if (!response.ok) {
  //         throw new Error('Произошла ошибка при отправке формы.');
  //     }
  //     return response.text();
  // })
  // .then(function(data) {
  //     alert('Форма успешно отправлена!');
  // })
  // .catch(function(error) {
  //     alert(error.message);
  // });
});

const catalogImages = document.querySelectorAll(".catalog__img");

catalogImages.forEach(function (image) {
  image.addEventListener("click", function () {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    const enlargedImage = document.createElement("img");
    enlargedImage.src = this.src;
    enlargedImage.alt = this.alt;
    overlay.appendChild(enlargedImage);

    document.body.appendChild(overlay);

    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) {
        overlay.remove();
      }
    });
  });
});

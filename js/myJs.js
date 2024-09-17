const textConfig = {
  text1: "Chào mừng bé đến với chương trình trả lời câu hỏi nhận quà!",
  text2: "",
  text3: "Bé có yêu anh nhiều hông nàooo",
  text4: "Nếu bé ko trả lời mà thoát ra tức là muốn làm vợ tớ rùi đó nha :v",
  text5: "Anh mơ à???",
  text6: "Yêu nhất trên đời <3",
  text7: "Bé yêu anh ở điểm nào nhất hihi :3",
  text8: "Gửi cho anh <3",
  text10: "Anh yêu bé nhất trên đời i love you 3000 <3",
  text11:
    "Nhận món quà nhỏ này của anh nhaa_:3",
  text12: "Okii lunn <3",
  text13: "Bé không thích anh ở điểm nào nhất <3",
  text15: "Bé muốn anh thay đổi điều gì nè<3",
  text16: "Bé muốn nhận món quà gì nè <3",
};

$(document).ready(function () {
  // process bar
  setTimeout(function () {
    firstQuestion();
    $(".spinner").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
    $("body").delay(350).css({
      overflow: "visible",
    });
  }, 600);

  $("#text3").html(textConfig.text3);
  $("#text4").html(textConfig.text4);
  $("#no").html(textConfig.text5);
  $("#yes").html(textConfig.text6);

  function firstQuestion() {
    $(".content").hide();
    Swal.fire({
      title: textConfig.text1,
      text: textConfig.text2,
      imageUrl: "img/chumo.jpg",
      imageWidth: 300,
      imageHeight: 300,
      background: '#fff url("img/iput-bg.jpg")',
      imageAlt: "Custom image",
    }).then(function () {
      $(".content").show(200);
    });
  }

  // switch button position
  function switchButton() {
    var audio = new Audio("music/duck.mp3");
    audio.play();
    var leftNo = $("#no").css("left");
    var topNO = $("#no").css("top");
    var leftY = $("#yes").css("left");
    var topY = $("#yes").css("top");
    $("#no").css("left", leftY);
    $("#no").css("top", topY);
    $("#yes").css("left", leftNo);
    $("#yes").css("top", topNO);
  }
  
  // move random button position
  function moveButton() {
    var audio = new Audio("music/Swish1.mp3");
    audio.play();
    var x = screen.width <= 600 ? Math.random() * 300 : Math.random() * 500;
    var y = screen.width <= 600 ? Math.random() * 500 : Math.random() * 500;
    $("#no").css("left", `${x}px`);
    $("#no").css("top", `${y}px`);
  }

  var n = 0;
  $("#no").mousemove(function () {
    if (n < 1) switchButton();
    if (n > 1) moveButton();
    n++;
  });

  $("#no").click(() => {
    if (screen.width >= 900) switchButton();
  });

  // generate text in input
  function textGenerate() {
    var n = "";
    var text = $("#txtReason").val(); 
    var a = Array.from(textConfig.text9); 
    var count = text.length;
    if (count < a.length) {
      var newChar = a[count]; 
      $("#txtReason").val(text + newChar);
    }
  }

  function handleQuestion(questionText, confirmText, nextFunction) {
    Swal.fire({
      title: questionText,
      html: true,
      width: 900,
      padding: "3em",
      html: "<input type='text' class='form-control' id='txtReason' placeholder='Nhập câu trả lời...'>",
      background: '#fff url("img/iput-bg.jpg")',
      backdrop: `
        rgba(0,0,123,0.4)
        url("img/giphy2.gif")
        left top
        no-repeat
      `,
      showCancelButton: false,
      confirmButtonColor: "#fe8a71",
      cancelButtonColor: "#f6cd61",
      confirmButtonText: confirmText,
    }).then((result) => {
      if (result.value) {
        var reason = $("#txtReason").val();
        if (reason) {
          var savedContents = JSON.parse(localStorage.getItem('savedContents')) || [];
          savedContents.push(reason);
          localStorage.setItem('savedContents', JSON.stringify(savedContents));

          if (nextFunction) {
            nextFunction();
          } else {
            Swal.fire({
              width: 900,
              confirmButtonText: textConfig.text12,
              background: '#fff url("img/iput-bg.jpg")',
              title: textConfig.text10,
              text: textConfig.text11,
              confirmButtonColor: "#83d0c9",
              onClose: () => {
                window.location = "indexG.html";
              },
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Vui lòng nhập câu trả lời trước khi gửi!',
          });
        }
      }
    });
  }

  $("#yes").click(function () {
    handleQuestion(textConfig.text7, textConfig.text8, function() {
      handleQuestion(textConfig.text13, textConfig.text8, function() {
        handleQuestion(textConfig.text15, textConfig.text8, function() {
             handleQuestion(textConfig.text16, textConfig.text8);
        });
        
      });
    });

    $("#txtReason").focus(function () {
      var handleWriteText = setInterval(function () {
        textGenerate();
      }, 10);
      $("#txtReason").blur(function () {
        clearInterval(handleWriteText);
      });
    });
  });
});

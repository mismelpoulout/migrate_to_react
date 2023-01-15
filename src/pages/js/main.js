const APP_INFO = {
  name: "MedStudio",
  version: "1.0.0"
};
window.console = {
  error: function (a) {
    $("#log").innerHTML += "<p>" + a + "</p>";
  },
  log: function () {

  },
  warn: function () {

  }
}
async function main() {
  await HistoryDB.connect("history");
  await ImageDB.connect("images");
  const hash = await ImageDB.getById("#");
  if (!hash) {
    const h = await loadImage("../img/logo-medicina1-150x150.jpg");
    new ImageDB({ _id: "#", dataURL: IMGToDataURL(h) }).save();
  }

  setupPreferences();
  setupOpenInNewTab();
  setupTriggerLayers();
  renderTopics(mirTopics, "#mir-list");
  renderTopics(uCatolicaTopics, "#uCatolica-list");
  renderPlaylist();




  $("#btn-closeLayer").onclick = Layer.closeCurrent;
  $("#start-game").onclick = () => startQuiz(90);
  $("#start-exam").onclick = () => startExam($("#exam-duration-input").value * 1);
  $("#loader").remove();

  $("#exam-duration-input").oninput = function () {
    $("#exam-duration").innerHTML = this.value;
  }

  setupLayerEvents();
}

window.onload = main;

function setupLayerEvents() {

  Layer.on("open", function ({ layerTitle }) {
    console.log(layerTitle)
    if (!layerTitle) return;
    $("#title").classList.remove("appName");
    $("#title").innerHTML = layerTitle;
  });

  Layer.on("open", function ({ layerName }) {

    if (layerName != "history") return;

    HistoryDB.getAll().then(function (history) {
      history.reverse();
      $("#history-exam").innerHTML = "";
      $("#history-game").innerHTML = "";
      history.forEach(result => {
        const date = result.date.split(" ");
        const tr = `<tr>
        <td class=${result.efficiency >= 70 ? "approved" : "reprobate"}>${result.efficiency}%</td>
          <td>${date[0]}</td>
          <td>${date[1]}</td>
        </tr>`;
        if (result.type == "exam") {
          $("#history-exam").innerHTML += tr;
        } else if (result.type == "game") {
          $("#history-game").innerHTML += tr;
        }
      });
      if ($("#history-exam").innerHTML == "") {
        $("#history-exam").innerHTML = "No hay datos aun";
      }
      if ($("#history-game").innerHTML == "") {
        $("#history-game").innerHTML = "No hay datos aun";
      }
    })

  })



  Layer.on("stackEmpty", function () {
    $("#title").classList.add("appName");
    $("#title").innerHTML = APP_INFO.name;
  });

  Layer.on("close", function () {
    if (Layer.stack.length <= 0) return;
    const title = Layer.stack[Layer.stack.length - 1].layerTitle;
    if (!title) return;
    $("#title").innerHTML = title;
  });
}

function renderTopics(topics, targetElement) {
  topics.forEach(async (topic) => {
    let iconURL = "../icons/" + topic.icon;
    if (topic.icon.search(/[.][p][n][g]/) == -1) {
      iconURL = topic.icon == "#" ? "#" : "../icons/" + topic.icon + ".svg";
    }

    const icon = await getImage(iconURL);
    icon.classList.add("icon");
    const li = createElement("li", {
      classList: "openInNewTab",
      dataset: {
        href: topic.PDFURL
      },
      childs: [icon, createElement("p", { innerHTML: topic.name })]
    });
    li.onclick = openInNewTab;
    $(targetElement).appendChild(li);
  });
}

function renderPlaylist() {
  videos.dr_guevara.forEach(async video => {

    const thumbnail = await getImage(video.thumbnailURL == "#" ? "../img/logo-medicina1-150x150.jpg" : video.thumbnailURL);//await getImage(video.thumbnailURL);
    thumbnail.classList.add("icon");
    const title = createElement("p", {
      innerHTML: video.title
    });
    const duration = createElement("span", {
      classList: "videoDuration",
      innerHTML: video.duration
    });

    const container = createElement("li", {
      classList: "thumbnailContainer",
      childs: [thumbnail, duration, title],
      onclick: function () {
        const videoNode = document.createElement("video");
        videoNode.src = video.url;
        videoNode.controls = true;
        videoNode.autoplay = true;
        $("#video-title").innerHTML = video.title;
        $("#video").appendChild(videoNode);
        Layer.open("video-player");
        function close() {
          videoNode.pause();
          videoNode.remove();
          Layer.removeEvent("close", close)
        }
        Layer.on("close", close);
      }
    });
    $("#playlist").appendChild(container);
  });
}

function setupOpenInNewTab() {
  document.querySelectorAll(".openInNewTab").forEach((element) => {
    element.onclick = openInNewTab;
  });
}

function setupTriggerLayers() {
  let triggers = document.querySelectorAll(".trigger-layer");
  triggers.forEach(Layer.assignTrigger);
}

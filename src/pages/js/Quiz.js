async function startQuiz(time) {
  const quiz = new Quiz(time);
  await quiz.load();

  function quizOver() {
    $("#result-stall").innerHTML = "";
    $("#corrects").innerHTML = quiz.corrects;
    $("#wrongs").innerHTML = quiz.incorrects;
    $("#total").innerHTML = quiz.corrects + quiz.incorrects;
    const effectiveness = 100 / (quiz.corrects + quiz.incorrects) * quiz.corrects;
    $("#quiz-efficiency").innerHTML =
      "su efectividad es de " + (effectiveness ? effectiveness.toFixed(2) : "0") +
      "%";

    if ($("#layer-rate").classList.contains("active")) {
      Layer.closeCurrent();
    }

    if (effectiveness) {
      addHistory("game", effectiveness.toFixed(2))
    }



    Layer.open("quiz-result", "Resultado");
    quiz.timer.stop();
  }

  quiz.on("quizOver", quizOver);

  quiz.timer.on("update", function (m, s) {
    $("#timer").innerHTML = m + ":" + s;
  });

  $("#btn-closeQuiz").onclick = () => {
    quiz.exit();
  };

  $("#restartQuiz").onclick = () => {
    startQuiz(time);
    Layer.closeCurrent();
  };

  $("#goHome").onclick = () => {
    Layer.closeAll();
    $("#btn-closeQuiz").style.display = "none";
    $("#timer").innerHTML = "";
    $("#pre-start-game").style.display = "block";
    $("#question").innerHTML = "";
    $("#btn-closeLayer").style.display = "";
    $(".QA").classList.remove("active");
  };

  $("#btn-closeLayer").style.display = "none";
  $("#btn-closeQuiz").style.display = "block";

  $("#pre-start-game").style.display = "none";
  $(".QA").classList.add("active");

  quiz.start();
  showQuestion(quiz.questions[quiz.currentIndex]);
  $("#game-rate").onclick = async () => {
    const rate = rateQuiestion(quiz.questions[quiz.currentIndex]);
    if (rate == "correcto") {
      rateAnimation("correct");
      quiz.corrects++;
    } else {
      rateAnimation("incorrecto");
      quiz.incorrects++;
    }

    $("#question-feedback-options").innerHTML = "";

    quiz.questions[quiz.currentIndex].options.forEach((option, i) => {
      const optionElement = createElement("li", {
        innerHTML: option
      });

      if ($("input[name='option']:checked", true).dataset.index == i && rate == "correcto") {
        optionElement.classList.add("correct");
      } else if ($("input[name='option']:checked", true).dataset.index == i && rate == "incorrecto") {
        optionElement.classList.add("wrong");
      }

      if (option.getNormalized() == quiz.questions[quiz.currentIndex].answer.getNormalized()) {
        optionElement.classList.add("correct")
      }
      $("#question-feedback-options").appendChild(optionElement);
    });

    $("#question-feedback").innerHTML = "";
    $("#question-feedback").innerHTML +=
      (quiz.questions[quiz.currentIndex].feedback || "no feedback");
  };

  $("#next-question").onclick = () => {
    Layer.closeCurrent();
    showQuestion(quiz.next());
  };
}

function rateQuiestion(question) {
  const userAnswer = $("input[name='option']:checked", true);
  if (!userAnswer) return "incorrecto";
  if (userAnswer.value.getNormalized() == question.answer.getNormalized()) {
    return "correcto";
  } else {
    return "incorrecto";
  }
}

function showQuestion(question) {
  $("#layer-play").scrollTo(0, 0);
  if (question == "quizOver") return;
  question.question = question.question.replace(
    /[[]+[i]+[m]+[g]+(]|:+[0-9]+])/g,
    function (a) {
      if (a == "[img]") {
        const img = createElement("img", {
          classList: "q-img",
          src: question.imgs
        });
        return img.outerHTML
      } else {
        return `
            <img class="q-img" src="${question.imgs[a.match(/[0-9]/)[0]]}">
            `;
      }
    }
  );
  $("#question").innerHTML = `
    <p>${question.question}</p>
    `;

  $("#options").innerHTML = "";

  const options = [];

  question.options.forEach((option, i) => {
    let optionElement = null;
    const radio = createElement("input", {
      type: "radio",
      value: option,
      dataset: {
        index: i
      },
      name: "option",
      onclick: function () {
        options.forEach(option => option.classList.remove("active"));
        optionElement.classList.add("active")
      }
    });

    optionElement = createElement("label", {
      classList: "option",
      innerHTML: `
                <span>${option}</span>
            `,
      childs: [radio]
    });
    options.push(optionElement);
    $("#options").appendChild(optionElement);



  });
}

async function rateAnimation(state) {
  $("#rate-state").style.color = "#f00";
  $("#rate-state").innerHTML =
    "¡" + (state == "correct" ? "Correcto!" : "Incorrecto!");
  Layer.open("rate");
  if (state == "correct") {
    $("#rate-state").style.color = "#68c100";
  }
}

function showQuestionText(quiz, i) {
  Layer.open("result-question-postView");

  $("#options-postView").innerHTML = "";

  const rate = quiz.list[i] ? "correcto" : "incorrecto";


  quiz.questions[i].options.forEach((option, i_option) => {
    const optionElement = createElement("li", {
      innerHTML: option
    });

    if (quiz.userAnswers[i] == i_option && rate == "correcto") {
      optionElement.classList.add("correct");
    } else if (quiz.userAnswers[i] == i_option && rate == "incorrecto") {
      optionElement.classList.add("wrong");
    }

    if (option.getNormalized() == quiz.questions[i].answer.getNormalized()) {
      optionElement.classList.add("correct")
    }
    $("#options-postView").appendChild(optionElement);
  });
  $("#question-postView").innerHTML = quiz.questions[i].question;
}





class Quiz {
  constructor(minutes) {
    this.questions = [];
    this.corrects = 0;
    this.incorrects = 0;
    this.currentIndex = 0;
    this.state = "quizRunning";
    this._events = new EventEmitter();
    this.timer = new Timer(minutes);
    this.timer.on("timeout", () => {
      this._events.emit("quizOver");
    });
  }

  on(eventName, listener) {
    this._events.on(eventName, listener);
  }

  async load() {
    this.questions = await loadQuizQuestions();
  }

  start() {
    this.questions.shufle();
    this.timer.start();
  }

  exit() {
    this._events.emit("quizOver");
    this.timer.stop();
  }

  next() {
    this.currentIndex++;
    if (this.questions[this.currentIndex]) {
      return this.questions[this.currentIndex];
    }
    this._events.emit("quizOver");
    return "quizOver";
  }
}

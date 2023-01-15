class Exam {
    constructor(minutes) {
        this.questions = [];
        this.timer = new Timer(minutes);
        this.answersSelected = [];
        this._events = new EventEmitter();
        this.timer.on("timeout", () => {
            this.exit();
        });
        this.ended = false;
    }

    on(eventName, listener) {
        this._events.on(eventName, listener);
    }

    async load() {
        this.questions = await loadQuizQuestions();
    }

    start() {
        this.timer.start();
        this.questions.shufle();
    }

    exit() {
        if (this.ended) return;
        this.timer.stop();
        this.ended = true;
        this._events.emit("exit");
    }
}

async function startExam() {
    const exam = new Exam($("#exam-duration-input").value);
    window.w = exam
    await exam.load();

    exam.start();
    $("#btn-closeQuiz").style.display = "block";
    $("#btn-closeLayer").style.display = "none";
    exam.on("exit", function () {
        saveAnswers();
        const result = rateExam();
        $("#corrects").innerHTML = result.corrects;
        $("#wrongs").innerHTML = result.incorrects;
        $("#total").innerHTML = result.total;
        $("#quiz-efficiency").innerHTML = "su eficiencia en " + result.total + " preguntas es de " + result.efficiency + "%";

        $("#result-stall").innerHTML = "";
        result.stall.forEach((state, i) => {
            $("#result-stall").appendChild(createElement("div", {
                classList: state ? "correct" : "wrong",
                innerHTML: i + 1,
                onclick: function () {
                    $("#question-postView").innerHTML = "";
                    $("#options-postView").innerHTML = "";
                    

                    Layer.open("result-question-postView");
                    $("#question-postView").innerHTML = exam.questions[i].question;
                    let options = [];
                    for (let j = 0; j < exam.questions[i].options.length; ++j) {
                        let classList = "option";
                        if (exam.answersSelected[i] == j) {
                            classList += (state ? " correct" : " wrong");
                        }
                        const li = createElement("li", {
                            innerHTML: exam.questions[i].options[j],
                            classList
                        });
                        options.push(li);
                    }
                    const optionsContainer = createElement("ul", {
                        childs: options
                    });
                    $("#options-postView").appendChild(optionsContainer);
                }
            }))
        })
        $("#close-questionPostView").onclick = () => Layer.closeCurrent();
        Layer.open("quiz-result");
        if (result.efficiency) {

            addHistory(type = "exam", result.efficiency);
        }
    });

    $("#goHome").onclick = function () {
        Layer.closeAll();
        $("#btn-closeQuiz").style.display = "none";
        $("#btn-closeLayer").style.display = "";
        $("#timer").innerHTML = "";
    };

    $("#restartQuiz").onclick = function () {
        startExam();
        Layer.closeCurrent();
    }

    exam.timer.on("update", (min, sec) => {
        timer.innerHTML = min + ":" + sec;
    });
    window.a = exam;

    function rateExam() {
        const stall = [];
        let corrects = 0;
        exam.answersSelected.forEach((answerIndex, i) => {
            if (answerIndex >= 0) {
                const answerSelected = exam.questions[i].options[answerIndex].toLowerCase().trim();
                if (answerSelected == exam.questions[i].answer.toLowerCase().trim()) {
                    stall.push(1);
                    corrects++;
                } else {
                    stall.push(0);
                }
            } else {
                stall.push(0);
            }
        })
        return {
            corrects,
            incorrects: exam.answersSelected.length - corrects,
            total: exam.answersSelected.length,
            efficiency: (100 / exam.answersSelected.length * corrects).toFixed(2),
            stall
        }
    }

    function createQuestions(firstIndex = 0, questionAmount) {
        const questions = [];
        console.log(exam.questions)
        for (let i = firstIndex; i < questionAmount; ++i) {
            if (exam.questions[i]) {
                exam.questions[i].question = exam.questions[i].question.replace(
                    /[[]+[i]+[m]+[g]+(]|:+[0-9]+])/g,
                    function (a) {
                        if (a == "[img]") {
                            const img = createElement("img", {
                                classList: "q-img",
                                src: exam.questions[i].imgs
                            });
                            return img.outerHTML
                        } else {
                            return `
                            <img class="q-img" src="${exam.questions[i].imgs[a.match(/[0-9]/)[0]]}">
                            `;
                        }
                    }
                );


                const questionSentence = createElement("p", {
                    classList: "question-sentence",
                    innerHTML: exam.questions[i].question
                });
                let options = [];

                for (let j = 0; j < exam.questions[i].options.length; ++j) {
                    const li = createElement("li", {
                        innerHTML: exam.questions[i].options[j],
                        classList: "option",
                        dataset: {
                            index: j
                        }
                    });
                    li.onclick = () => {

                        if (li.classList.contains("active")) {

                            li.classList.remove("active");
                        } else {
                            options.forEach(opt => opt.classList.remove("active"));
                            li.classList.add("active");
                        }
                    }
                    options.push(li);
                }

                const optionsContainer = createElement("ol", {
                    classList: "optionsContainer",
                    childs: options
                });
                questions.push({
                    sentence: questionSentence,
                    options: optionsContainer
                })

            }
        }
        return questions;
    }
    function renderQuestion(targetElement, question, index) {
        const questionContainer = createElement("div", {
            classList: "questionContainer exam max-width-500",
            childs: [createElement("h3", {
                innerHTML: "#" + (index + 1),
                classList: "questionIndex",
            }), question.sentence, question.options]
        })
        targetElement.appendChild(questionContainer);
    }

    let lastIndex = 0;

    function renderQuestions10() {
        const questions = createQuestions(lastIndex, lastIndex + 10);
        if (questions.length == 0) {
            exam.exit();
        } else {

            $("#exam-questions").innerHTML = "";
            $("#layer-exam").scrollTo(0, 0);
        }
        for (let i = 0; i < questions.length; ++i) {
            renderQuestion($("#exam-questions"), questions[i], i + lastIndex);
        }
    }

    function saveAnswers() {
        const containers = document.querySelectorAll(".optionsContainer");

        containers.forEach(container => {
            const optionSelected = container.querySelector(".option.active");
            if (optionSelected) {

                exam.answersSelected.push(optionSelected.dataset.index * 1);
            } else {
                exam.answersSelected.push(-1);
            }
        });

        lastIndex += 10;
    }

    renderQuestions10();
    $("#timer").style.display = "block";
    $("#next-exam").onclick = () => {
        saveAnswers();
        renderQuestions10();
    }
    $("#btn-closeQuiz").onclick = function () {
        exam.exit();
    }


}
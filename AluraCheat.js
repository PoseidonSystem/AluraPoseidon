// ==UserScript==
// @name         Alura Poseidon Auto
// @namespace    https://cursos.alura.com.br/
// @version      03/12/2024
// @description  Executa automaticamente as tarefas no curso da Alura.
// @author       Poseidon
// @match        https://cursos.alura.com.br/course/*/task/*
// @icon         https://i.imgur.com/gP1LZq9.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const runScript = () => {
        let next_lesson_button = document.getElementsByClassName("bootcamp-next-button")[0];
        let submit_button = document.getElementById('submitBlocks');
        let transcription_button = document.querySelector('.video-transcription-button');

        let alternatives = document.querySelectorAll('.singleChoice .alternativeList-item');

        console.log("Alternativas encontradas:", alternatives);

        let hasCorrectAnswer = false;

        alternatives.forEach(alternative => {
            console.log("Verificando alternativa:", alternative);
            if (alternative.getAttribute('data-correct') === "true") {
                let radioInput = alternative.querySelector('.alternativeList-item-input');
                if (radioInput) {
                    radioInput.checked = true;
                    hasCorrectAnswer = true;
                    console.log("Alternativa correta encontrada e marcada:", alternative);
                }
            }
        });

        if (hasCorrectAnswer) {
            console.log("Alternativa(s) correta(s) selecionada(s).");
        } else if (submit_button) {
            submit_button.click();
            console.log("Botão 'Submeter resposta' clicado.");
        } else if (transcription_button) {
            transcription_button.click();
            console.log("Botão 'continuar lendo' clicado.");
        }

        setTimeout(() => {
            if (next_lesson_button) {
                next_lesson_button.click();
                console.log("Botão 'bootcamp-next-button' clicado.");
            } else {
                alert("Botão 'bootcamp-next-button' não encontrado.");
            }
        }, 2000); // 2 segundos de espera
    };

    const startAutoRun = () => {
        runScript();
        // Chama o script novamente após um intervalo de tempo
        setTimeout(startAutoRun, 1000); // 1 segundo de espera antes de executar novamente
    };

    // Espera um pouco para garantir que o conteúdo esteja carregado
    setTimeout(startAutoRun, 1000); // 1 segundo de espera antes de iniciar a execução automática

})();

// ==UserScript==
// @name         Alura Poseidon
// @namespace    https://cursos.alura.com.br/
// @version      08/11/2024
// @description  nuh uh i dont want to do alura nomore :sob:
// @author       wwwwwwwwwww
// @match        https://cursos.alura.com.br/course/*/task/*
// @icon         https://i.imgur.com/gP1LZq9.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Função principal para executar o script
    const runScript = () => {
        let next_lesson_button = document.getElementsByClassName("bootcamp-next-button")[0];
        let submit_button = document.getElementById('submitBlocks');
        let transcription_button = document.querySelector('.video-transcription-button');

        // Verifica se é uma questão de múltipla escolha
        let alternatives = document.querySelectorAll('.singleChoice .alternativeList-item');

        console.log("Alternativas encontradas:", alternatives); // Log para ver as alternativas

        let hasCorrectAnswer = false;

        alternatives.forEach(alternative => {
            console.log("Verificando alternativa:", alternative); // Log para verificar cada alternativa
            if (alternative.getAttribute('data-correct') === "true") {
                let radioInput = alternative.querySelector('.alternativeList-item-input');
                if (radioInput) {
                    radioInput.checked = true; // Marca a alternativa como selecionada
                    hasCorrectAnswer = true; // Indica que pelo menos uma alternativa correta foi encontrada
                    console.log("Alternativa correta encontrada e marcada:", alternative);
                }
            }
        });

        if (hasCorrectAnswer) {
            console.log("Alternativa(s) correta(s) selecionada(s).");
        } else if (submit_button) {
            // Clica no botão "Submeter resposta" se não houver alternativas corretas
            submit_button.click();
            console.log("Botão 'Submeter resposta' clicado.");
        } else if (transcription_button) {
            // Clica no botão "continuar lendo" se não houver alternativas e não houver botão de submeter
            transcription_button.click();
            console.log("Botão 'continuar lendo' clicado.");
        }

        // Espera um pouco antes de clicar no próximo botão
        setTimeout(() => {
            if (next_lesson_button) {
                next_lesson_button.click();
                console.log("Botão 'bootcamp-next-button' clicado.");
            } else {
                alert("Botão 'bootcamp-next-button' não encontrado.");
            }
        }, 2000); // 2 segundos de espera
    };

    // Espera um pouco para garantir que o conteúdo esteja carregado
    setTimeout(runScript, 1000); // 1 segundo de espera antes de executar o script

})();

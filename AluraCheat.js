// ==UserScript==
// @name         Alura Cheat
// @namespace    https://cursos.alura.com.br/
// @version      1.0
// @description  Painel flutuante para automatizar tarefas na Alura 
// @author       Assistente
// @match        https://cursos.alura.com.br/course/*/task/*
// @icon         https://i.imgur.com/gP1LZq9.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let intervalId;

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
            if (submit_button) {
                submit_button.click(); // Submete a resposta
                console.log("Botão 'Submeter resposta' clicado.");
            } else if (transcription_button) {
                transcription_button.click(); // Clica no botão "continuar lendo"
                console.log("Botão 'continuar lendo' clicado.");
            }
        }

        // Clica no próximo botão, se encontrado
        if (next_lesson_button) {
            next_lesson_button.click();
            console.log("Botão 'bootcamp-next-button' clicado.");
        } else {
            console.log("Botão 'bootcamp-next-button' não encontrado. Tentando novamente...");
        }
    };

    // Função para criar o painel flutuante
    const createCheatPanel = () => {
        // Cria o elemento do painel flutuante
        const cheatPanel = document.createElement('div');
        cheatPanel.style.position = 'fixed';
        cheatPanel.style.bottom = '20px';
        cheatPanel.style.right = '20px';
        cheatPanel.style.backgroundColor = '#333';
        cheatPanel.style.color = '#fff';
        cheatPanel.style.padding = '10px';
        cheatPanel.style.borderRadius = '5px';
        cheatPanel.style.zIndex = '9999';
        cheatPanel.style.cursor = 'pointer';

        // Cria o botão "Ativar Cheat"
        const activateButton = document.createElement('button');
        activateButton.textContent = 'Ativar Cheat';
        activateButton.style.backgroundColor = '#4CAF50';
        activateButton.style.color = '#fff';
        activateButton.style.border = 'none';
        activateButton.style.padding = '5px 10px';
        activateButton.style.borderRadius = '3px';
        activateButton.style.cursor = 'pointer';

        // Adiciona o evento de clique para executar o script
        activateButton.addEventListener('click', () => {
            if (!intervalId) {
                intervalId = setInterval(runScript, 2000); // Executa a função a cada 2 segundos
                console.log("Cheat ativado!");
            } else {
                clearInterval(intervalId); // Para o cheat se já estiver ativado
                intervalId = null;
                console.log("Cheat desativado.");
            }
        });

        // Adiciona o botão ao painel flutuante
        cheatPanel.appendChild(activateButton);

        // Adiciona o painel flutuante ao documento
        document.body.appendChild(cheatPanel);
    };

    // Espera um pouco para garantir que o conteúdo esteja carregado
    setTimeout(createCheatPanel, 1000); // 1 segundo de espera antes de criar o painel
})();

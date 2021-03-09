//Criando objeto jogo
const jogo = {
    //Definindo array do tabuleiro
    tabuleiro: ['','','','','','','','',''],

    //Definindo objeto dos simbolos
    simbolos: {

        //Opções de simbolo
        opcoes:['X', 'O'],

        //Turno ativo de quem deve jogar
        turno_index: 0,

        //Função para trocar o turno de quem joga
        troca: function() {
            this.turno_index = (this.turno_index === 0 ? 1 : 0);
        }
    },
    //Container para criação visuaal
    container_element: null,

    //Variavel que guarda se o jogo acabou ou não
    gameover: false,

    //Variavel que conta o numero de jogadas realizadas por ambas partes
    numero_jogadas: 0,

    //Arraz das sequencias que ganham o jogo
    sequencia_vencedora: [
        [0,1,2],
        [3.4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [6,4,2],
        [0,4,8]
    ],


    //Função que inicializa o container
    init: function(container)  {
        this.container_element = container;
    },

    //Função que efetua as jogadas e verifica se o jogo terminou
    efetua_jogada: function(posicao) {

        //Verificação se o jogo já terminou
        if(this.gameover) return false;

        //Verifica se posição que jogador ira jogar esta vazia
        if(this.tabuleiro[posicao] === '') {

            //Salva o simbolo do jogador na posição
            this.tabuleiro[posicao] = this.simbolos.opcoes[this.simbolos.turno_index];

            //Imprime na tela o simbolo do jogador na posição
            this.draw();

            //Verifica se o jogador realizou uma sequencia vencedora
            let sequencia_vencedora_index = this.conferir_sequencia_vencedora(this.simbolos.opcoes[this.simbolos.turno_index]);

            //Encerra jogo se uma sequencia vencedora for identificada
            if (sequencia_vencedora_index >= 0) {
                this.fim_jogo(this.simbolos.opcoes[this.simbolos.turno_index]);
                document.querySelector('.reiniciar').style.display = "flex";
            }

            //Verifica se o jogo deu velha se não prossegue com o jogo
            else {
                this.simbolos.troca();
                this.numero_jogadas++;             
                if(this.numero_jogadas == 9) {
                    this.gameover= true;
                    alert('O jogo deu velha e será reiniciado!');
                    location.reload();
                }
            }
            return true;
        }
        
        //Imprime um alert se o jogador tentar inserir um valor em uma casa já preenchida
        else {
            alert('Você não pode jogar neste local!');
            return false;
        }
    },

    //Função para reiniciar o jogo
    reiniciar_jogo: function() {
        location.reload();
        alert('O jogo será reiniciado!');
    },

    //Função para fim de jogo e imprimir vencedor
    fim_jogo: function(simbolo_vencedor) {
        this.gameover = true;
        alert('O jogo acabou, o vencedor foi: ' + simbolo_vencedor);
    },

    //Função que verifica se uma sequencia vencedora foi feita
    conferir_sequencia_vencedora: function(simbolo) {
        for ( i in this.sequencia_vencedora) {
            if (this.tabuleiro[this.sequencia_vencedora[i][0]] == simbolo &&
                this.tabuleiro[this.sequencia_vencedora[i][1]] == simbolo &&
                this.tabuleiro[this.sequencia_vencedora[i][2]] == simbolo){
                    return i;
                    console.log('Sequencia Vencedora: ' + i);
                }
        };
        return -1;
    },

    //Função que imprime os desenhos na tela.
    draw: function() {
        let conteudo = '';

        for( i in this.tabuleiro) {
            conteudo += '<div onclick="jogo.efetua_jogada(' + i + ')">' + this.tabuleiro[i] + '</div>';
        }

        this.container_element.innerHTML = conteudo;
    }


};
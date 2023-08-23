const game = {
    player_score: 0,
    computer_score: 0,
    best_of: 5
}

const player_buttons = document.querySelectorAll('.option-btn');
const player_display = document.querySelector('#player-choice')
const computer_display = document.querySelector('#computer-choice');
const illustrations = [document.querySelector('#rock').innerHTML, document.querySelector('#paper').innerHTML, document.querySelector('#scissor').innerHTML, "<svg class=\"svg-rotate\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"w-6 h-6\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99\"/></svg>"];
const options = ['rock', 'paper', 'scissor'];
const score = document.querySelector('.score-box');
const start_btn = document.querySelector('#start-btn');
const reload_btn = document.querySelector('#reload-btn');
const game_settings_container = document.querySelector('.game-settings-container');
const game_options_Container = document.querySelector('.game-options-container');
const reload_wrapper = document.querySelector('.reload-wrapper');


function gameStart(){
    let status = ""
    score.innerHTML = game.player_score +" - "+ game.computer_score
    if(document.getElementById('bo3').checked) {
        game.best_of = 2
    }else if(document.getElementById('bo5').checked) {
        game.best_of = 3
    } else {
        game.best_of = Math.pow(10, 10)
    }
    player_buttons.forEach( option => {
        option.addEventListener('click', () => {
            computer_display.innerHTML = illustrations[3]
            let random_delay = Math.floor(Math.random()*1000) + 200
            let player_choice = [option.id, options.indexOf(option.id)]
            player_display.innerHTML = illustrations[player_choice[1]]
            player_display.style = 'opacity: 0.5'
            let random_index = options[Math.floor(Math.random()*3)]
            let computer_choice = [random_index, options.indexOf(random_index)]
            switch(winner(player_choice, computer_choice)){
                case 'loss':
                    game.computer_score++
                    break
                case 'win':
                    game.player_score++
                    break
                default:
                    break
            }
            setTimeout(() => {
                player_display.style = 'opacity: 1'
                computer_display.innerHTML = illustrations[computer_choice[1]]
                score.innerHTML = game.player_score +" - "+ game.computer_score
                if (game.player_score == game.best_of){
                    status = "YOU WON!"
                    gameEnd(status);
                    return;
                } else if(game.computer_score == game.best_of){
                    status = "YOU LOST!"
                    gameEnd(status);
                    return;
                }
            }, random_delay);
        });
    });
}

function winner(player, computer){
    if (player[1] === computer[1]){
        return 'draw'
    }
    if (player[1] - computer[1] == -2 ){
        return 'win'
    }
    if (player[1] - computer[1] == 2 ){
        return 'loss'
    }
    if( player[1] > computer[1]){
        return 'win'
    }
    return 'loss'
}
function gameEnd(status){
    score.innerHTML = status
    game_options_Container.classList.toggle('opacity')
    setTimeout( () => {
        reload_wrapper.classList.toggle('display-none')
        game_options_Container.classList.toggle('display-none')
        game_options_Container.classList.toggle('opacity')
    },200)
}


start_btn.addEventListener('click', () => {
    game_settings_container.classList.toggle('opacity')
    setTimeout( () => {
        game_options_Container.classList.toggle('display-none')
        game_settings_container.classList.toggle('display-none')
        game_settings_container.classList.toggle('opacity')
    },200)
    gameStart();
});

reload_btn.addEventListener('click', () => {
    location.reload()
});

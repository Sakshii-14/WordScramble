
async function getData() {
    let apiUrl = 'https://api.api-ninjas.com/v1/randomword';
    let apikey = 'MSecLBiRtNo8UUT/OxdhgQ==c4GjUCYGvOqPuwvg';

    try {
        let response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-Api-Key': apikey,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        display(data.word);

    }
    catch (error) {
        console.error("Error fetching data:" + error);
    }

}

getData();

let index = 0;
let chances = 0;
let chance = document.querySelector("#chance");
let mistakes = document.querySelectorAll("#mistakelist>li");
let dots = document.querySelectorAll(".dots");

function display(word) {

   
    shuffle(word);

    let inputboxes = document.querySelectorAll("input");
    inputboxes[0].disabled = false;
    inputboxes[0].focus();
    inputboxes.forEach(elem => elem.addEventListener('input', MatchData));
    function MatchData() {

        console.log(index);
        let regex = new RegExp(`${word[index]}`, 'i');
        let inputvalue = this.value;
        if (inputvalue.match(regex)) {
            this.readonly = true;
            this.disabled = true;
            this.classList.replace("border-[#4A5567]", "border-[#7429C6]");
            index++;
            if (index === word.length && chances <= 5) {
               showAlert();
            }
            inputboxes[index].disabled = false;
            inputboxes[index].focus();

        }
        else {
            chances++;

            if (chances <= 5) {
                chance.innerHTML = chances;
                mistakes[chances - 1].innerHTML = (chances - 1) === 4 ? inputvalue : inputvalue + ',';
                this.value = '';
                dots[chances - 1].classList.replace("bg-[#4A5567]", "bg-[#7429C6]");
            }
            else {
                index = 0;
                chances = 0;
                chance.innerHTML = chances;
                mistakes.forEach(elem => elem.innerHTML = '')
                dots.forEach(elem => elem.classList.replace("bg-[#7429C6]", "bg-[#4A5567]"))
                let inputboxes = document.querySelectorAll("input");
                inputboxes.forEach(elem => elem.value = '');
                getData();
            }

        }

    }


}



function shuffle(word) {
    let arr = Array.from(word);
    for (let i = arr.length - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    let html = arr.map(elem => {
        elem = elem.toLowerCase();
        return `
    <li>${elem} </li>
    `
    })
    let html2 = arr.map(elem => {
        return `
    <input type="text" maxlength="1" class="sm:h-[3rem] sm:w-[3rem] h-[2rem] w-[2rem] text-[#F2F5F9] flex items-center justify-center text-center placeholder:text-center sm:text-[1.2rem] text-[0.875rem] py-[0.1rem] px-[0.26rem] font-medium outline-none rounded-lg focus:border-[#672171]  border-2 border-[#4A5567] bg-transparent placeholder:text-[#F2F5F9]" placeholder="_" disabled>
    `
    })
    let letters = document.querySelector("#letterlist");
    let boxes = document.querySelector("#inputbox");
    boxes.innerHTML = html2.join('');
    letters.innerHTML = html.join('');
}



let random = document.querySelector("#random");
let reset = document.querySelector("#reset");

random.addEventListener('click', ()=>{
    getData();
    ResetGame();
});

reset.addEventListener('click', ResetGame)

function ResetGame() {
    index = 0;
    chances = 0;
    let inputboxes = document.querySelectorAll("input");
    inputboxes.forEach(elem => {
        elem.value = ''
        elem.classList.replace("border-[#7429C6]", "border-[#4A5567]");
    });
    dots.forEach(elem => elem.classList.replace("bg-[#7429C6]", "bg-[#4A5567]"));
    mistakes.forEach(elem => elem.innerHTML = '');
    chance.innerHTML = chances;
    inputboxes[0].disabled = false;
    inputboxes[0].focus();
}

function showAlert() {
    document.getElementById('custom-alert').style.display = 'block';
}

function closeAlert() {
    document.getElementById('custom-alert').style.display = 'none';
    random.click();
}

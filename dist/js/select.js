class Selectly{
    constructor(oldselect){
        this.oldselect = oldselect;
        this.init();
    }

    init(){
        this.createStructure();
        this.handleEvents();
    }

    createStructure(){
        const oldSelect = document.querySelector(".selectly");
        let selectlyContainer = document.createElement("div");
        selectlyContainer.classList.add("select__container");
        
        let selectedOption = document.createElement("div");
        selectedOption.classList.add("selected__option");

        let infoContainer = document.createElement("div");
        infoContainer.classList.add("info__container");

        let infoText = document.createElement("p");
        infoText.classList.add("info__text");
        infoText.textContent = 'Select Option';
        let closeIcon = document.createElement("img");
        closeIcon.src = './dist/img/x.svg';
        closeIcon.alt = 'close-icon';

        let rollContainer = document.createElement("div");
        rollContainer.classList.add("roll__container");

        let rollIcon = document.createElement("img");
        rollIcon.src = './dist/img/chevron-down.svg';
        rollIcon.alt = 'roll-icon';

        let optionsContainer = document.createElement("div");
        optionsContainer.classList.add("options__container");

        oldSelect.before(selectlyContainer);
        selectlyContainer.appendChild(selectedOption);
        selectedOption.appendChild(infoContainer);
        infoContainer.appendChild(infoText);
        infoContainer.appendChild(closeIcon)
        selectedOption.appendChild(rollContainer);
        rollContainer.appendChild(rollIcon);
        selectlyContainer.appendChild(optionsContainer);

        for(let i = 0; i<oldSelect.options.length; i++){
            let optionsItem = document.createElement("div");
            optionsItem.classList.add("options__item");
            optionsItem.setAttribute("data-value", oldSelect.options[i].value);
            optionsItem.textContent = oldSelect.options[i].value;
            optionsContainer.appendChild(optionsItem);
        }

        optionsContainer.style.display = 'none';
        this.oldselect.style.display = 'none';

        this.select = selectlyContainer;
    }

    handleEvents(){
        let select = this.select;
        const rollIcon = select.querySelector("img[alt=roll-icon]");
        const closeIcon = select.querySelector("img[alt=close-icon]")
        const optionsContainer = select.querySelector(".options__container");
        const options = optionsContainer.querySelectorAll(".options__item")
        let that = this;

        rollIcon.addEventListener("click", function(){
            rollIcon.classList.toggle("roll__active");
            if(rollIcon.classList.contains("roll__active")){
                optionsContainer.style.display = 'block';
            }
            else{
                optionsContainer.style.display = 'none';
            }
        });

        options.forEach(option => {
            option.addEventListener('click', function(){
                that.selectOption(option);
            })
        })

        closeIcon.addEventListener('click', function(){
            that.clearSelectedOption()
        })
    }

    selectOption(option){
        let select = this.select;
        const optionsContainer = select.querySelector(".options__container");
        const options = select.querySelectorAll(".options__item");
        const rollIcon = select.querySelector("img[alt=roll-icon]");
        const infoText = select.querySelector(".info__text");
        const closeIcon = select.querySelector("img[alt=close-icon]")
        let selectedText = '';

        options.forEach(el => {
            el.classList.remove("selected");
        })

        option.classList.add("selected")
        selectedText = option.getAttribute('data-value');

        infoText.textContent = selectedText
        optionsContainer.style.display = 'none';
        rollIcon.classList.remove("roll__active");
        closeIcon.style.display = 'block';
    }

    clearSelectedOption(){
        let select = this.select;
        const options = select.querySelectorAll(".options__item");
        const infoText = select.querySelector(".info__text");
        const closeIcon = select.querySelector("img[alt=close-icon]")

        options.forEach(el => {
            el.classList.remove("selected");
        })

        infoText.textContent = 'Select Option';
        closeIcon.style.display = 'none';
    }
}


const selects = document.querySelectorAll(".selectly");

selects.forEach((select, index) => {
    index = new Selectly(select);
})
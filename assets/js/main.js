window.addEventListener("load", function () {
    let previousNumber = 0;
    let currentNumber = 0;
    let operator = null;
    let result = false;
    let dot = false;

    
    let output = this.document.querySelector("#output");
    let keyNum = this.document.querySelectorAll(".key__num");



    keyNum.forEach((key) => {
        key.addEventListener("click", print);
    });
    window.addEventListener("keydown", function(e)
    {
        if(between(e.key, 0, 9)) {
            console.log(e.key);
            print(e.key);
        } else if(e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/" || e.key === "Enter") {
            apply(e);
        } else if(e.key === "Backspace") {
            removeLastCharacter();
        }
    });
    let operatorBtns = this.document.querySelectorAll(".operator")
    operatorBtns.forEach(o => {
        o.addEventListener("click", apply);
    });

    let reset = this.document.querySelector("#reset");
    reset.addEventListener("click", function () {
        lastNumber = 0;
        currentNumber = 0;
        output.value = "0";
        dot = false;
        result = false;
        operator = null;
    });

    let del = this.document.querySelector("#delete");
    del.addEventListener("click", removeLastCharacter);



    let circle = document.querySelector("#circle") //Pomera se za 20px
    let saveColor = localStorage.getItem("saveColor");
    console.log(saveColor)
    switch(saveColor)
    {
        case "bg2":
            circle.style.transform = "translateX(20px)";
            changeColor("bg--main2", "text--dark", "screen--bg2", "toggle--bg2", "key--bg2", "btn--bg2-equal", "btn2", "btn--bg2", "bg--orange", "bg--main1", "text--white", "screen--bg1", "toggle--bg1", "key--bg1", "btn--bg1-equal1", "btn1", "btn--bg1", "bg--red");
            break;
        case "bg3":
            circle.style.transform = "translateX(40px)";
            changeColor("bg--main3", "text--yellow", "screen--bg3", "toggle--bg3", "key--bg3", "btn--bg3-equal", "btn3", "btn--bg3", "bg--cyan", "bg--main2", "text--dark", "screen--bg2", "toggle--bg2", "key--bg2", "btn--bg2-equal", "btn2", "btn--bg2", "bg--orange");
            break;
        default:
            circle.style.transform = "translateX(0)";
            changeColor("bg--main1", "text--white", "screen--bg1", "toggle--bg1", "key--bg1", "btn--bg1-equal1", "btn1", "btn--bg1", "bg--red", "bg--main2", "text--dark", "screen--bg2", "toggle--bg2", "key--bg2", "btn--bg2-equal", "btn2", "btn--bg2", "bg--orange");
            break;
    }
    let transform;

    circle.addEventListener("click", moveCircle);

    function moveCircle()
    {
        saveColor = localStorage.getItem("saveColor");
        console.log(saveColor);
        switch(saveColor)
        {
            case "bg2":
                localStorage.setItem("saveColor", "bg3");
                changeColor("bg--main3", "text--yellow", "screen--bg3", "toggle--bg3", "key--bg3", "btn--bg3-equal", "btn3", "btn--bg3", "bg--cyan", "bg--main2", "text--dark", "screen--bg2", "toggle--bg2", "key--bg2", "btn--bg2-equal", "btn2", "btn--bg2", "bg--orange");
                transform = 40;
                break;
            case "bg3":
                localStorage.setItem("saveColor", "bg1");
                changeColor("bg--main1", "text--white", "screen--bg1", "toggle--bg1", "key--bg1", "btn--bg1-equal", "btn1", "btn--bg1", "bg--red", "bg--main3", "text--yellow", "screen--bg3", "toggle--bg3", "key--bg3", "btn--bg3-equal", "btn3", "btn--bg3", "bg--cyan");
                transform = 0;
                break;
            default:
                localStorage.setItem("saveColor", "bg2");
                changeColor("bg--main2", "text--dark", "screen--bg2", "toggle--bg2", "key--bg2", "btn--bg2-equal", "btn2", "btn--bg2", "bg--orange", "bg--main1", "text--white", "screen--bg1", "toggle--bg1", "key--bg1", "btn--bg1-equal1", "btn1", "btn--bg1", "bg--red");
                transform = 20;
                break;
        }
        this.style.transform = `translateX(${transform}px)`;
        console.log(saveColor);
    }


    /**
     * REM - Remove
     * Prvih 9 argumenata je classList.add
     * Druga polovina je za classList.remove
     */
    function changeColor(bgMain, text, bgScreen, bgToggle, bgKey, bgEqualBtn, activeBtn, bgDelResetBtn, bgCircle, bgMainRem, textRem, bgScreenRem, bgToggleRem, bgKeyRem, bgEqualBtnRem, activeBtnRem, bgDelResetBtnRem, bgCircleRem)
    {
        let containerFluid = document.querySelector("#container--fluid");
        let keysToggle = document.querySelector("#keys");
        let equal = document.querySelector("#equal");
        let toggle = document.querySelector("#toggle");

        let p = document.querySelectorAll(".p");
        let keyAppearance = document.querySelectorAll(".key__appearance");
        let keyDelReset = document.querySelectorAll(".key__del_reset");

        containerFluid.classList.remove(bgMainRem);
        containerFluid.classList.add(bgMain);

        keysToggle.classList.remove(bgToggleRem);
        keysToggle.classList.add(bgToggle);

        equal.classList.remove(bgEqualBtnRem);
        equal.classList.add(bgEqualBtn);

        output.classList.remove(textRem, bgScreenRem);
        output.classList.add(text, bgScreen); //Njemu obrisati i boju i screenbg
        
        circle.classList.remove(bgCircleRem);
        circle.classList.add(bgCircle)

        toggle.classList.remove(bgToggleRem)
        toggle.classList.add(bgToggle);
        p.forEach(e => {
            e.classList.remove(textRem); 
            e.classList.add(text);
        })

        if(bgMain === "bg--main1")
        {
            text = "text--dark";
        }
        keyAppearance.forEach(key => {
            key.classList.remove(bgKeyRem, activeBtnRem, textRem);
            key.classList.add(bgKey, activeBtn, text);
        });

        keyDelReset.forEach(key => {
            key.classList.remove(bgDelResetBtnRem);
            key.classList.add(bgDelResetBtn);
        });
    }

    /**
     *
     * @param {Number} a
     * @param {Number} b
     * @param {String} operator
     * @returns
     *
    */
    function calculate(a, b, operator) 
    {
		if (operator === "+") {
			return a + b;
		} else if (operator === "-") {
			return a - b;
		} else if (operator === "x") {
			return a * b;
		} else if (operator === "/") {
			return a / b;
		}
	}

    function apply(e)
    {
        currentNumber = parseFloat(output.value);
        console.log(currentNumber);
        if(operator !== "=" && operator !== null)
        {
            previousNumber = calculate(previousNumber, currentNumber, operator);
            output.value = previousNumber;
            result = true;
        } else {
            previousNumber = currentNumber;
            output.value = "";
        }
        let nextOperator;
        if(e.key === "+" || e.key === "-" || e.key === "/")
        {
            nextOperator = e.key;
        } else if(e.key === "*") {
            nextOperator = "x";
        } else if(e.key === "Enter") {
            nextOperator = "=";
        } else {
            nextOperator = e.target.value;
        }
        operator = nextOperator;
        console.log(e);
    
    }

    function removeLastCharacter()
    {
        let str = output.value.substring(0, output.value.length - 1);
        dot = false;
        return output.value = str;
    }

    function print(e)
    {
        let val = this.value;
        console.log(val);
        if(e === e.toString())
        {
            val = e;
        }
        if (result) 
        {
            result = false;
            output.value = "";
        }
        
        if (output.value.substring(0, 1) === "0" && this.value !== ".") 
        { 
            return output.value === "0" ? output.value = "" + val : output.value += val;
        }

        if (this.value === "." && dot === false) 
        {
            output.value === "" ? output.value = "0." : output.value += ".";
            dot = true;
            console.log(output.value);
        }
        if(dot === true && this.value === ".")
        {
            return output.value = output.value;
        }
        else
        {
            output.value += val;
        }
    }
    function between(x, min, max)
    {
        return x >= Number(min) && Number(x <= max);
    }
});

// Bag sa resetom je taj kad kliknem na reset dugme, dugme ostane selektovano i tako kad ja pritisnem enter ono se klikne
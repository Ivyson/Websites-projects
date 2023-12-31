 const keys = document.querySelectorAll('.key'); //initiaise the selected key
 const displayInput = document.querySelector('.Display .Input');
 const displayOutput = document.querySelector('.Display .output'); 

let input = "";
for (let key of keys)
{
    const value = key.dataset.key;
    key.addEventListener('click', () => {
        if(value == "clear")
        {
            input = "";
            displayOutput.innerHTML = "";
            displayInput.innerHTML = "";
        }
        else if(value == "delete")
        {
            input = input.slice(0,-1);
            displayInput.innerHTML = CleanInput(input);
        }
        else if( value == "=")
        {
            let results = eval(PrepareInput(input));
            console.log(results);
            displayOutput.innerHTML = CleanOutput(results);
        }
        else if(value == "brackets")
        {
            if(input.indexOf("(") == -1 || input.indexOf("(") == 1 &&input.indexOf(")") == 1 && input.lastIndexOf("(") < input.lastIndexOf(")"))
            {
                input = input + "(";
            }
            else if(!(input.indexOf("(") == -1 || input.indexOf("(") != -1 && input.indexOf(")") != -1 && input.lastIndexOf("(") < input.lastIndexOf(")")))
            {
                input = input + ")";
            }
            displayInput.innerHTML = CleanInput(input);
        }
        else{
            if(ValidateInput(value)){

                input = input + value;
                displayInput.innerHTML = CleanInput(input);
            }
            
        }
    })
}
function CleanInput(input){ //Need to check if the comma already exists and if it does then do not allow an entry of another decimal
    let inputArray = input.split("");
    let inputArrayLength = inputArray.length;
    for(let i = 0; i < inputArrayLength; i++)
    {
        if(inputArray[i] == "*"){
            inputArray[i] = '<span class="operator">x</span>'
        }
        else if(inputArray[i] == "/")
        {
            inputArray[i] = '<span class="operator">/</span>'
        }
        else if(inputArray[i] == "+")
        {
            inputArray[i] = '<span class="operator">+</span>'
        }
        else if(inputArray[i] == "-")
        {
            inputArray[i] = '<span class="operator">-</span>'
        }
        else if(inputArray[i] == "(")
        {
            inputArray[i] = '<span class="brackets">(</span>'
        }
        else if(inputArray[i] == ")")
        {
            inputArray[i] = '<span class="brackets">)</span>'
        }
        else if(inputArray[i] == "%")
        {
            inputArray[i] = '<span class="Percentage">%</span>'
        }
    }

    return inputArray.join("");
}
function CleanOutput(output) {
    let outputString = output.toString();
    let decimal = outputString.split(".")[1];
    outputString = outputString.split(".")[0];
    let outputArray = outputString.split("");
    if(outputArray.length > 3)
    {
        for(let i = outputArray - 3; i > 0; i >= 3)
        {
            outputArray.splice(i, 0, ",");
        }
    }
    if(decimal)
        {
            outputArray.push(".");
            outputArray.push(decimal);
        }
        return outputArray.join("");
}
function ValidateInput (value)
{
    let lastInput = input.slice(-1);
    let operators = ["+","-","*","/",];
    if(value == "." && lastInput == ".")
    {
        return false;
    }
    if(operators.includes(value))
    {
        if(operators.includes(lastInput))
        {
            return false;
        }
        else{
            return true;
        }
    }

    return true;
}
function PrepareInput(input)
{
    let inputArray = input.split("");

    for(let i = 0; i < inputArray.length; i++)
    {
        if(inputArray[i] == "%")
        inputArray[i] = "/100";
    }
    return inputArray.join("");
}
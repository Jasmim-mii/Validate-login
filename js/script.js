// criando class
class Validator {
	constructor() {
		this.validations = [
			//mapeando as validações
			"data-required",
			"data-email-validate",
			"data-min-length",
			"data-only-letters",
			"data-equal",
			"data-password-validate",
		];
	}
	validate(form) {
		let cleanValidate = document.querySelectorAll("form .error-validation");

		if (cleanValidate.length >= 0) {
			this.cleanValidation(cleanValidate);
		}

		let inputs = form.getElementsByTagName("input");
		let inputsArray = [...inputs];
		inputsArray.forEach(function (input) {
			for (let i = 0; this.validations.length > i; i++) {
				if (input.getAttribute(this.validations[i]) != null) {
					let method = this.validations[i]
						.replace("data-", "")
						.replace("-", "");

					let value = input.getAttribute(this.validations[i]);
					this[method](input, value);
				}
			}
		}, this);
	}

	// /////////methods////////////////
	minlength(input, minValue) {
		let inputLength = input.value.length;
		let errorMessage = `O campo precisa ter no minino ${minValue} caracteres`;

		if (inputLength < minValue) {
			this.printMessage(input, errorMessage);
		}
	}

	emailvalidate(input) {
		let emailRes =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		let email = input.value;
		let errorMessage = `Padrão de email incorreto`;

		if (!emailRes.test(email)) {
			this.printMessage(input, errorMessage);
		}
	}

	//validar apenas string
	onlyletters(input) {
		let letterRes = /^[A-Za-z]+$/;

		let inputLetter = input.value;

		let errorMessage = `Erro, caracteres não aceito: {1,<>,!.,-,&,%,$,#} `;

		if (!letterRes.test(inputLetter)) {
			this.printMessage(input, errorMessage);
		}
	}

	passwordEqual(input, inputName) {

		let inputToCompare = document.getElementsByName(inputName)[0];
	
		let errorMessage = `A senha precisa ser igual a ${inputName}`;
	
		if(input.value != inputToCompare.value) {
		  this.printMessage(input, errorMessage);
		}
	}
	passwordvalidate(input){
		let numeros = /([0-9])/;
		let string_passwd = /([A-Z])/;
		let caracteres = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;	
		let pssw = input.value
		let errorMessage = "A senha precisa ter pelomenos: 1 caractere e uma letra maiuscula"
		let sucessMessage = "Senha criada com sucesso"


		if(!numeros.test(pssw)){
			this.printMessage(input, errorMessage);
		}else if(!string_passwd.test(pssw)){
			this.printMessage(input, errorMessage);
		}else if(!caracteres.test(pssw)){
			this.printMessage(input, errorMessage);
		}else{
			this.printMessage(input, sucessMessage).close()	
		}
	}

	required(input) {
		let inputValue = input.value;

		if (inputValue === "") {
			let errorMessage = `Campo obrigatório`;
			this.printMessage(input, errorMessage);
		}
	}
	

	//imprimir msg
	printMessage(input, msg) {
		let template = document.querySelector(".error-validation").cloneNode(true); //cloneNode - clona

		let errorCollection = input.parentNode.querySelector(".error-validation");
		if (errorCollection === null) {
			template.textContent = msg;

			let inputParent = input.parentNode;
			template.classList.remove("template");
			inputParent.appendChild(template);

		}
	}

	cleanValidation(validations) {
		validations.forEach((el) => el.remove());
	}
}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

submit.addEventListener("click", function (e) {
	e.preventDefault();
	validator.validate(form);
});


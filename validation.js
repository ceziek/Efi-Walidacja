class Validation {
    constructor(form) {
        console.info('validation');

        if (form) {
            this.inputs = form.querySelectorAll('input');
            this.selects = form.querySelectorAll('select');
        }
    }

    createMessage(element, text) {
        let message = document.createElement("span");
        let node = document.createTextNode(text);

        message.appendChild(node);
        message.className = 'valid-message';
        message.style.color = '#ee3529';
        message.style.marginLeft = '1rem';

        element.parentNode.insertBefore(message, element.nextSibling);
    }

    validatorRules(attributes, value, element) {
        [].slice.apply(attributes).forEach((attr) => {
            switch (String(attr.name).toLowerCase()) {
                case 'require':
                    if (value === undefined || value === '' || value === null) {
                        this.createMessage(element, 'This field is required');
                        this.valid = false;
                    }
                    break;
                case 'length':
                    let length = parseInt(attr.value);

                    if (value.length !== length) {
                        this.createMessage(element, 'Must be ' + length + ' letters');
                        this.valid = false;
                    }
                    break;
                case 'min-length':
                    let minLength = parseInt(attr.value);

                    if (value.length < minLength) {
                        this.createMessage(element, 'Min letters :' + minLength);
                        this.valid = false;
                    }
                    break;
                case 'max-length':
                    let maxLength = parseInt(attr.value);

                    if (value.length > maxLength) {
                        this.createMessage(element, 'Max letters :' + maxLength);
                        this.valid = false;
                    }
                    break;
                case 'numbers':
                    var numRegex = /[0-9]+/;
                    if (!numRegex.test(value)) {
                        this.valid = false;
                        this.createMessage(element, 'Only digits allowed');
                    }
                    break;
                case 'date-valid':
                    let dateRegex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
                    if (!dateRegex.test(value)) {
                        this.valid = false;
                        this.createMessage(element, 'Wrong date format');
                    }
                    break;
                case 'day-valid':
                    let week = ["poniedzialek", "wtorek", "sroda", "czwartek", "piatek", "sobota", "niedziela"];
                    let today = week[new Date().getDay() - 1];
                    if (today !== value) {
                        this.valid = false;
                        console.log('Today is', today);
                        this.createMessage(element, 'Today is not that day');
                    }
                    break;
            }
        })

    }

    validate() {
        this.valid = true;
        let messages = document.querySelectorAll('.valid-message');
        messages.forEach((msg) => msg.remove());

        if (this.inputs) {
            this.inputs.forEach((element) => {
                let attributes = element.attributes;
                let value = element.value;

                if (attributes) {
                    this.validatorRules(attributes, value, element)
                }
            })
        }
        if (this.selects) {
            this.selects.forEach((element) => {
                let attributes = element.attributes;
                let value = element.value;

                if (attributes) {
                    this.validatorRules(attributes, value, element)
                }
            })
        }

        return this.valid;
    }
}

let form = document.querySelector('form');

let nowaWalidacja = new Validation(form);

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (nowaWalidacja.validate()) {
        alert('Walidacja przeszła pomyślnie');
        form.submit();
    }
});


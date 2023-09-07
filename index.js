export function FormBlocker(ref_form)
{
    if(typeof ref_form === "string"){
        return new FormBlockerClass(document.getElementById(ref_form));
    }else{
        if(typeof ref_form !== "object"){
            throw "Ref is not a valid object.";
        }
        if(typeof ref_form.current === "undefined"){
            throw "Ref is not a valid object."
        }
        return new FormBlockerClass(ref_form.current);
    }
}

class FormBlockerClass
{
    #buttons = [];
    #formElements = [];
    #formDataJSON = {};
    #spinnerStatus = false;
    #spinners = [];
    #isBlocked = false;
    #ref_form;
    constructor(ref_form) {
        this.#ref_form = ref_form;
    }
    blockForm(spinner=true, spinner_size=24){
        const data = this.formData();

        this.#isBlocked = true;
        this.#buttons = [];
        this.#formElements = [];
        for(var i=0; i<this.#ref_form.length; i++) {
            switch (this.#ref_form[i].localName) {
                case 'button':
                    if (this.#ref_form[i].disabled !== true) {
                        this.#formElements.push(this.#ref_form[i])
                        this.#buttons.push(this.#ref_form[i]);
                    }
                    break;
                case 'input':
                case 'select':
                case 'textarea':
                case 'datalist':
                    //Block Item
                    if (this.#ref_form[i].disabled !== true) {
                        this.#formElements.push(this.#ref_form[i])
                    }
                    break;
            }
        }

        this.#formElements.forEach(element => {
            element.disabled = true;
        })
        if(spinner === true){
            this.#spinners = [];
            this.#buttons.forEach(element => {
                if(element.type === "submit"){
                    const spinID = this.#spinnerFn(element, spinner_size);
                    this.#spinners.push(spinID);
                }
            });
            this.#spinnerStatus = true;
        }
    }

    unblockForm()
    {
        if(this.#isBlocked === true){
            this.#isBlocked = false;
            this.#formElements.forEach(element => {
                element.disabled = false;
            })
            if(this.#spinnerStatus === true){
                this.#spinnerStatus = false;
                this.#spinners.forEach(spinID => {
                    document.getElementById(spinID).remove();
                })
            }
        }
    }

    formData()
    {
        if(this.#isBlocked === true){
            return this.#formDataJSON;
        }else{
            this.#formDataJSON = {};
            const formData = new FormData(this.#ref_form);
            formData.forEach((value, key) => this.#formDataJSON[key] = value);
            return this.#formDataJSON;
        }
    }

    #spinnerFn(element, size)
    {
        const svgID = this.#uniqID("spin_");
        let svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
        svg.setAttribute("width", size);
        svg.setAttribute("height", size);
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("id", svgID);
        svg.setAttribute("fill", "currentcolor");
        svg.style.marginRight = "5px";
        svg.classList.add("spinnerFrm");
        let style = document.createElement('style');
        style.innerHTML = ".spinner_ajPY{transform-origin:center;animation:spinner_AtaB .75s infinite linear}@keyframes spinner_AtaB{100%{transform:rotate(360deg)}}";
        let path = document.createElementNS('http://www.w3.org/2000/svg','path');
        path.setAttribute("d", "M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z");
        path.setAttribute("opacity", ".25");
        let path2 = document.createElementNS('http://www.w3.org/2000/svg','path');
        path2.setAttribute("d", "M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z");
        path2.classList.add("spinner_ajPY");
        svg.append(style, path, path2);
        element.prepend(svg);
        return svgID;
    }

    #uniqID(prefix="",random=true)
    {
        const sec = Date.now() * 1000 + Math.random() * 1000;
        const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
        return `${prefix}${id}${random ? `.${Math.trunc(Math.random() * 100000000)}`:""}`;
    }
}
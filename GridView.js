class GridView {
    /**
     * properties
     * 
     *  @param [array] _tableClass - css table classes
     *  @param [array] data - output
     *  @param [array] attribute - we control what we output
     *  @param [array] _element - where do we display the table
     *  @param [array] _header - table header
     *  @param [array] _headerClass - css clearance classes header
     */
    constructor(){
        this._header = '';
        this._headerClass = [];
        this._tableClass = [];
        this._element = 'body';
        this.attribute = [];
    }

    /**
     * Method set header
    */
    setHeader(header){
        if(typeof header === 'string' && header.trim() != ''){
            this._header = header.trim();
            return true;
        }
        return false;
    }

    /**
     * Method set headerClass
    */
    setHeaderClass(headerClass){
        if(typeof headerClass === 'object'){
            this._headerClass = headerClass;
            return true;
        }
        return false;
    }

    /**
     * Method set element
    */
    setElement(element){
        if(document.querySelector(element)){
            this._element = element;
            return true;
        }
        return false;
    }


    /**
     * Method table display
    */

    render(data){
        this.setHeader(data.header);
        this.setHeaderClass(data.headerClass);
        this.setElement(data.element);
        this.attribute = data.attribute;
        this.data = data.data;
        //show header
        if(this._header){
            const header = document.createElement('h1');
            header.textContent = this._header;
            this._headerClass.forEach(cssClass => {
                header.classList.add(cssClass);
            });
            document.querySelector(this._element).append(header);
        }
        // show table 
        const table = document.createElement('table');
            this._tableClass.forEach(cssClass => {
                table.classList.add(cssClass);
            });

        // create table header
        const trHeader = document.createElement('tr');
        for(let key in this.attribute){
            const th = document.createElement('th');
            if(this.attribute[key].label){
                th.textContent = this.attribute[key].label;
            }
            else {
                th.textContent = key;
            }
            trHeader.append(th);
        }
        table.append(trHeader);
        

        //draw tabl
        for (let i = 0; i < this.data.length; i++) {
            const dataArr = this.data[i]; 
            console.log(dataArr);
            const tr = document.createElement('tr');
            for(let key in this.attribute){
                const td = document.createElement('td');
                console.log(dataArr[key]);
                let value = dataArr[key];
                if (this.attribute[key].value) {
                    value = this.attribute[key].value(dataArr);
                }
                if (this.attribute[key].src) {
                    td.innerHTML = value;
                }
                else {
                    td.textContent = value;
                }
                tr.append(td);
            }
            table.append(tr);
        }
        document.querySelector(this._element).append(table);
    }

}
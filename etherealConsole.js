javascript:(() => {
    // class obb {
    //     constructor(array, methods) { //syntax ex. [{name: "a", properties: {boost: ""}}, {}]
    //         for (let x of array) {
    //             //console.log(x); debug
                
    //             if (!x["name"] || !x["properties"]) {break;}
    //             this[x["name"]] = x["properties"];
    //             ///console.log(x, x["name"], x["properties"]); debug
    //             if (methods != undefined) {
    //                 for (let y of methods) {
    //                     if (!y["name"] || !y["value"]) {break;}
    //                     //console.log([y, y["name"], y["value"]]); debug
    //                     this[x["name"]][y["name"]] = y["value"];
    //                     //delete(this[y["name"]]["name"]);
    //                     //delete(this[y["name"]]["value"]);
    //                 }
    //             }
    //             delete(this[x["name"]]["name"]);
    //             delete(this[x["name"]]["properties"]);
    //         }
            
    //     }  
    // };
    const closeId = string(5);
    const saveId = string(5);
    const loadId = string(5);
    const loadNameId = string(5);
    function string(times, type) {
        const stUpperBound = 35;
        const upperBound = 50;
        const errors = [
            {
                type: "TypeError",
                value: typeof(times) != "number",
                display: `${times} is not a number`
            },
            {
                type: "Error",
                value: times < 1,
                display: `${times} is less than 1`
            },
            {
                type: "Error",
                value: times % 1 != 0,
                display: `${times} is not an integer`
            },
            {
                type: "Error",
                value: times > stUpperBound && !type,
                display: `${times} exceeds the maximum call size of ${stUpperBound}`
            },
            {
                type: "Error",
                value: times > upperBound && type,
                display: `${times} exceeds the maximum call size of ${upperBound}`
            },
        ]
        for (let x of errors) {
            if (x.value) {
               throw(`${x.type}: ${x.display}`); 
            }
        }
        
        let output = Math.random() * 1232311;
        for (i = 0; i < times; i++) {
            output = btoa(output) + btoa(btoa(Math.random()));
        }
        return type ? output.length: output;
    }
    const etherealConsole = {
        saved: [],
        config: {
            type: true,
            timeStamp: false,
            value: true,
            framerate: 10,
            saveName: "etherealConsoleData",
            sizeCode: 50,
            sizeOutput: 100,
            watermark: `Ethereal Console v1.0a || Made by Dennis || Press CTRL+\\ or click <a id=${closeId}>here</a> to exit`,
        },
        elements: {},
        updateLoadName: () => {
            let output = "";
            for (let x of JSON.parse(localStorage.getItem(etherealConsole.saveName))) {
                output += `<option value = "${x.name}">${x.name}</option>`;
            }
            document.getElementById(loadNameId).innerHTML = output;
        },
        compile: () => etherealConsole.elements.div.innerHTML.replace(/<div>/g, "").replace(/<\/div>/g, "").replace(/<br>/g, "").replace(/<\/br>/g, "").replace(/\n/g, ""),
        getName: () => prompt("Enter Name Here:"),
        save: () => {
            if (localStorage.getItem(etherealConsole.config.saveName)) { //save is already
                localStorage.setItem(etherealConsole.config.saveName, JSON.stringify(JSON.parse(localStorage.getItem(etherealConsole.config.saveName)).push({
                    name: etherealConsole.getName(),
                    value: etherealConsole.compile()
                })));
            } else { //not save
                localStorage.setItem(etherealConsole.config.saveName, JSON.stringify([{
                    name: etherealConsole.getName(),
                    value: etherealConsole.compile()
                }]));
            }
            etherealConsole.updateLoadName();
        },
        getSaveData: (name) => {
            const data = JSON.parse(localStorage.getItem(etherealConsole.saveName));
            if (name != undefined) {
                data.forEach(function(dataIndex) {
                    if(dataIndex == name) {
                        return dataIndex.value;
                    }
                });
            } else {
                return data;
            }
        },
        load: (name) => {
            etherealConsole.elements.div.innerHTML = getSaveData(name);
        },
        run: () => {
            console.log(etherealConsole.compile());
            Function(etherealConsole.compile())();
        },
        close: () => {
            for (let key in etherealConsole.elements) {
                etherealConsole.elements[key].remove();
            }
            console.everything = undefined;
            clearInterval(etherealConsole.update);
        },
    };
    if (console.everything === undefined) {
        console.everything = [];
        function TS(){
          return (new Date).toLocaleString("sv", { timeZone: 'UTC' }) + "Z";
        };
        window.onerror = function (error, url, line) {
            let output = {};
            etherealConsole.config.type ? output["type"] = "exception": undefined;
            etherealConsole.config.timeStamp ? output["timestamp"] = TS(): undefined;
            etherealConsole.config.value ? output["value"] = { error, url, line }: undefined;
            console.everything.push(output);
            return false;
        };
        window.onunhandledrejection = function (e) {
            let output = {};
            etherealConsole.config.type ? output["type"] = "promiseRejection": undefined;
            etherealConsole.config.timeStamp ? output["timestamp"] = TS(): undefined;
            etherealConsole.config.value ? output["value"] = e.reason: undefined;
            console.everything.push(output);
        };
      
        function hookLogType(logType) {
          const original= console[logType].bind(console);
          return function(){
            let output = {};
            etherealConsole.config.type ? output["type"] = logType: undefined;
            etherealConsole.config.timeStamp ? output["timestamp"] = TS(): undefined;
            etherealConsole.config.value ? output["value"] = Array.from(arguments): undefined;
            console.everything.push(output);
            original.apply(console, arguments);
          };
        };
      
        ['log', 'error', 'warn', 'debug'].forEach(logType=>{
          console[logType] = hookLogType(logType)
        })
      };
    etherealConsole.elements.div = document.createElement("div");
    document.body.appendChild(etherealConsole.elements.div);
    etherealConsole.elements.div.contentEditable = "true";
    etherealConsole.elements.div.style = `
        height: ${etherealConsole.config.sizeCode}px; /* Full-height: remove this if you want "auto" height */
        width: 100%; /* Set the width of the sidebar */
        position: fixed; /* Fixed Sidebar (stay in place on scroll) */
        bottom: 0; /* Stay at the top */
        background-color: #222; /* Black */
        resize: vertical;
        overflow: auto;
        border: 10px soild #FFFFFF;
        order: 1;

        /*text*/
        color: #FFFFFF;
        text-align: left;

    `;
    
    etherealConsole.elements.output = document.createElement("div");
    document.body.appendChild(etherealConsole.elements.output);
    etherealConsole.elements.output.style = `
        height: ${etherealConsole.config.sizeOutput}px; /* Full-height: remove this if you want "auto" height */
        width: 100%; /* Set the width of the sidebar */
        position: fixed; /* Fixed Sidebar (stay in place on scroll) */
        bottom: ${etherealConsole.config.sizeCode}px; /* Stay at the top */
        background-color: #111; /* Black */
        resize: vertical;
        overflow: auto;
        order: 1;

        /*text*/
        color: #FFFFFF;
        text-align: left;

    `;

    etherealConsole.elements.runButton = document.createElement("button");
    document.body.appendChild(etherealConsole.elements.runButton);
    etherealConsole.elements.runButton.style = `
        height: 50px;
        width: 100px;
        position: fixed;
        background-color: #FFFFFF;
        bottom: 0;
        right: 0;
        border-radius: 10px;
        order: 0;
    `;

    etherealConsole.elements.watermark = document.createElement("div");
    document.body.appendChild(etherealConsole.elements.watermark);
    etherealConsole.elements.watermark.style = `
        height: 20px;
        width: 100%;
        position: fixed;
        bottom: ${etherealConsole.config.sizeCode + etherealConsole.config.sizeOutput}px;
        background-color: #111; /* Black */
        overflow: none;
        order: 0;
        
        /*text*/
        color: #FFFFFF;
        text-decoration: underline;
        font-size: 20;
    `;
    etherealConsole.elements.watermark.innerHTML = `<strong>${etherealConsole.config.watermark} || <button id="${saveId}">Save</button> || <button id="${loadId}">Load:</button><form><select id = "${loadId}"></select></form></strong>`;
    document.getElementById(saveId).addEventListener("click", etherealConsole.save);
    etherealConsole.elements.runButton.addEventListener("click", function(event){etherealConsole.run()});
    etherealConsole.elements.runButton.contentEditable = "false";
    etherealConsole.elements.runButton.innerHTML = "Run";

    document.getElementById(closeId).addEventListener("click", etherealConsole.close);
    etherealConsole.elements.div.addEventListener("keypress", function(event) {
        if (event.code == "Backslash" && event.ctrlKey == true) {
            etherealConsole.close();
        }
    });
    /*update*/
    etherealConsole.update = setInterval(function() {
        let output = ``;
        for (let x of console.everything) {
            output += `${JSON.stringify(x)}
            <br>`
        }
        etherealConsole.elements.output.innerHTML = output;
    }, 1000 / etherealConsole.config.framerate);
})()
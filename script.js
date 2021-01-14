// Set your API key here
const APIKEY = 'ckey_4d5b231f1a584413ae6c3715bcf';
let req = false;

function getData(req) {
  console.log(req);
  console.log(typeof(req));
    // Get key HTML elements and reset table content
    // const ul = document.getElementById('metadata');
    const tableRef = document.getElementById('tokenTable').getElementsByTagName('tbody')[0];
    tableRef.innerHTML = "";

    // Covalent API request setup
    const topic = document.getElementById('topic').value;
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    const url = new URL(`https://api.covalenthq.com/v1/1/events/topics/${topic}`);
    url.search = new URLSearchParams({
        "starting-block": start,
        "ending-block": end,
        key: APIKEY
    })

    // Use Fetch API to get Covalent data
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        let events = data.data.items;
        // Update wallet metadata
        // ul.innerHTML = 
        //     `<li> Wallet address: ${data.data.address} </li>` +
        //     `<li> Last update: ${data.data.updated_at} </li>` +
        //     `<li> Fiat currency: ${data.data.quote_currency} </li>`;
        events.forEach(function(event){
          let time = event.block_signed_at;
          if (!req){ //not recent
          console.log("should not go here");  
          console.log(time);
          let txn = event.tx_hash;
          console.log(txn);
          let sign = event.decoded.signature;
          console.log(sign);
          // let name_t = "";
          // let value_t = "";
          let total = "";          event.decoded.params.forEach(function(param){
            let name = param.name;
            let value = param.value;
            let t = name + "," + value + ";" + "\n";
            total = total + t;
          })
          tableRef.insertRow().innerHTML = 
          `<td> ${time}</td>`+
          `<td> ${txn}</td>`+
          `<td> ${sign}</td>`+
          `<td> ${total}</td>`;

          }
          else{
             console.log("whattt");
             let duration = Date.now() - Date.parse(time.toString());
             console.log(duration);
             if (duration <7*24*60*60*1000){
               txn = event.tx_hash;
               sign = event.decoded.signature;
               console.log("okokoko");
                let total = "";          event.decoded.params.forEach(function(param){
                let name = param.name;
                let value = param.value;
                let t = name + ":" + value + ";" + "\n";
                total = total + t;
                 })
          tableRef.insertRow().innerHTML = 
          `<td> ${time}</td>`+
          `<td> ${txn}</td>`+
          `<td> ${sign}</td>`+
          `<td> ${total}</td>`;

          }
            

        }
         


        })

      
    })
}

function recent(){
  getData(true);
}



const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.startech.com.bd/component/processor/amd-processor';

axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const full_scrap_body = $('body');

        let cpu_list_array = [];
        let processor_name = [];
        let processor_price = [];
        let processor_status = [];

        full_scrap_body.each(function () {
            
            $(this).find('.product-name > a').map((item, e) => {
                // console.log(e.children[0].data)
                if(e.children[0].type === 'text'){
                    processor_name.push({name: e.children[0].data})
                }
               
            });

            $(this).find('.price.space-between > span').map((item, e) => {
                if(e.children[0].data !== undefined){
                    processor_price.push({name: e.children[0].data})
                }
            });
            
            $(this).find('.cart-btn > span').map((item, e) => {
               if(e.children[0].type=== 'tag'){
                    processor_status.push({name: 'Buy Now'})
                } else {
                    processor_status.push({name: e.children[0].data})
                }
               
            });
            // console.log({
            //     processor_name,
            //     processor_price,
            //     processor_status
            // })
        });

        processor_name.forEach( (item, index) => {
            cpu_list_array.push({
                name: item.name,
                price: processor_price.find((_,i) => i === index).name,
                status: processor_status.find((_,i) => i === index).name,
            })
        })
  
          console.log(cpu_list_array);

    }).catch(console.error);
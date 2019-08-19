/**
 * Job Scheduler
 * Scraper work every 1 hour
 */


const scraper_startec = require('./process/scraper_startec');
const schedule = require('node-schedule');
const email_sender = require('./lib/email')
const run_time_value = 1;


var rule = new schedule.RecurrenceRule();

rule.hour = run_time_value;

let job_runs = 0

console.log("Scraper Job Started. It will run every: " + run_time_value + "Hour")


schedule.scheduleJob(rule, function(){
    
    console.log('Job Starting');
    
    scraper_startec.scrap('https://www.startech.com.bd/component/processor/amd-processor',  ( async return_data => { 
        console.log(return_data) 
        const message = JSON.stringify(return_data)
        await email_sender.send('arnobxtreme@gmail.com', 'startech Processor Update', '', message)
    }))


    job_runs++;
    console.log("Job Runs", job_runs)
})
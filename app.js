/**
 * Job Scheduler
 * Scraper work every 1 hour
 */


const scraper_startec = require('./process/scraper_startec');
const schedule = require('node-schedule');
const email_sender = require('./lib/email')

var rule = new schedule.RecurrenceRule();

rule.hour = 1;

let job_runs = 0

console.log("Scraper Job Started")


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
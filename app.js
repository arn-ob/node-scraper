/**
 * Job Scheduler
 * Scraper work every 1 hour
 */


const scrap = require('./scrap_func');
const schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();

rule.second = 1;

let job_runs = 0

console.log("Scraper Job Started")

schedule.scheduleJob(rule, function(){
    
    console.log('Job Starting');
    
    scrap.scrap('https://www.startech.com.bd/component/processor/amd-processor', ( return_data => { 
        
        console.log(return_data) 
    
    }))


    job_runs++;
    console.log("Job Runs", job_runs)
})
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import * as matchesWorkerPath from "file-loader?name=[name].js!./matches.worker";
import * as deliveriesWorkerPath from "file-loader?name=[name].js!./deliveries.worker";
import { Match } from '../model/match';
import { RunRate } from '../model/RunRate';
import { PieChart } from '../model/PieChart';

@Injectable()
export class HomeService {

    matchesWorker: Worker = new Worker(matchesWorkerPath);
    deliveryWorker: Worker = new Worker(deliveriesWorkerPath);

    constructor(private http: Http) { };

    populateData(details): Promise<String> {
        return new Promise((resolve, reject) => {
            this.http.get(details.path)
                .map(response => response.text())
                .subscribe(csvDetails => {
                    var worker = this.matchesWorker;

                    function eventHandler(response) {
                        worker.removeEventListener('message', eventHandler);

                        if (response.data.status === 'Y') {
                            resolve(response.data.message);
                        }
                        else {
                            reject(response.data.message);
                        }
                    };

                    worker.addEventListener('message', eventHandler);

                    worker.postMessage({
                        type: 'save',
                        rows: csvDetails,
                        dbDetails: {
                            name: details.dbName,
                            collection: details.collection,
                            id: details.id
                        }
                    });

                })
        });
    }

    getRecords(details): Promise<Match[]> {
        return new Promise((resolve, reject) => {
            var worker = this.matchesWorker;

            function eventHandler(response) {
                worker.removeEventListener('message', eventHandler);
                if (response.data.status === 'Y') {
                    resolve(response.data.message);
                }
                else {
                    reject(response.data.message);
                }
            };

            worker.addEventListener('message', eventHandler);

            worker.postMessage({
                type: 'readAll',
                dbDetails: details
            });
        });

    }

    initialiseDeliveryWorker(path): Promise<String>{
        return new Promise((resolve, reject)=> {
            let worker = this.deliveryWorker;

            function eventHandler(response){
                worker.removeEventListener('message', eventHandler);
                if(response.data){
                    resolve();
                }
                else{
                    reject();
                }
            }
            worker.addEventListener('message', eventHandler);
            this.http.get(path)
                .map(response => response.text())
                    .subscribe(csv => {
                        worker.postMessage({
                            type: 'setData',
                            csv: csv
                        })
                    })
        })
    }

    preparePieChart(matches: Match[]): PieChart[]{
        let piechartdata = [];
        let value = [];
        
       matches.forEach(i => {
           if(isNaN(value[<string>i.winner])){
               value[<string>i.winner] = 1;
           }
           else{
               value[<string>i.winner]++;
           }
       })
       for(var key in value){
           piechartdata.push({
               key: key,
               value: value[key]
           });
       }
        return piechartdata;
    }

    calculateRunRate(matchId): Promise<RunRate[]>{
        return new Promise((resolve, reject) => {
            let worker = this.deliveryWorker;

            function eventHandler(response){
                worker.removeEventListener('message', eventHandler);
                resolve(response.data);
            }
            worker.addEventListener('message', eventHandler);
            worker.postMessage({
                type: 'runrate',
                matchId: matchId
            })
        })
    }

  }
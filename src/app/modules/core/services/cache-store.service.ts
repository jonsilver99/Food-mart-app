import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';

type CacheRecord = {
    EntryDate: number,
    HttpResponse: any
}

@Injectable()
export class CacheStoreService {

    private Cache: any = {}

    constructor() { }

    get(urlKey:string) {
        let record: CacheRecord = this.Cache[urlKey];
        if (!record) return null

        if (this.isExpired(record)) {
            // if 10 minutes elapsed since record entered the cache - delete that record
            delete this.Cache[urlKey]
            return null;
        }
        return record.HttpResponse;
    }

    set(urlKey:string, response) {
        let record: CacheRecord = {
            EntryDate: Date.now(),
            HttpResponse: response
        }
        this.Cache[urlKey] = record;  
        // console.log('current cache state', this.Cache)        
    }

    isExpired(record: CacheRecord) {
        let nowMinutes = (Date.now() / 1000) / 60
        let entryDateMinutes = (record.EntryDate / 1000) / 60
        if (nowMinutes - entryDateMinutes > 10) return true
        else return false
    }

}
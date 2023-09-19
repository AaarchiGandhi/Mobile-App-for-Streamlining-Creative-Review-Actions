import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CREATIVE_DATA, refresh } from '../data';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

    creativeList: any;
    isAlertOpen = false;
    isreject = false;

    constructor(private router: Router) {
        let localStorageData = localStorage.getItem('creativeList');
        this.creativeList = localStorageData ? JSON.parse(localStorageData) : CREATIVE_DATA;
    }

    ionViewWillEnter() {
        console.log("tab3 enter called");
        let localStorageData = localStorage.getItem('creativeList');
        this.creativeList = localStorageData ? JSON.parse(localStorageData) : CREATIVE_DATA;
    }

    ionViewWillLeave() {
        console.log("tab3 leave called");
    }

    openDetailsWithState(creativeObj: any) {
        console.log('Creative', creativeObj);
        if (creativeObj) {
            let navigationExtras: NavigationExtras = {
                state: {
                    creative: creativeObj,
                    tab: 'tab3'
                }
            };
            this.router.navigate(['viewDetails'], navigationExtras);
        }
    }

    setTimer(reject = false) {
        this.isreject = reject;
        this.isAlertOpen = true;
        setTimeout(() => {
            this.isAlertOpen = false;
            this.isreject = false;
        }, 1500);
    }

    approve(creative: any) {
        let creativeIndex = this.creativeList?.rejected.findIndex((item: any) => item.id === creative?.id);
        console.log('creativeIndex', creativeIndex);
        if (creativeIndex !== -1) {
            this.creativeList?.rejected.splice(creativeIndex, 1);
        }
        creative.status = 1;
        this.creativeList.approved = [creative, ...this.creativeList?.approved];
        console.log('Updated Creative List', this.creativeList);
        localStorage.setItem('creativeList', JSON.stringify(this.creativeList));
        refresh.next(true);
        this.setTimer();
    }


}

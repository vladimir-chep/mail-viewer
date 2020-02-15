import Vue from 'vue';
import moment from 'moment';

Vue.filter('formatDate', value => {
    if (value){
        return moment(value).format('YYYY/MM/DD');
    }
});

Vue.filter('formatDateShort', value => {
    return moment(value).calendar(null, {
        sameDay: 'h:mm',
        nextDay: 'MMM DD',
        nextWeek: 'MMM DD',
        lastDay: 'MMM DD',
        lastWeek: 'MMM DD',
        sameElse: 'YYYY/MM/DD',
    });
});
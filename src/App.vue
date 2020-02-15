<template>
  <div
    id="app"
    class="container"
  >
    <div class="searchBar">
      <DateRangePicker
        ref="picker"
        v-model="dateRange"
        :show-dropdowns="true"
        opens="right"
        :ranges="false"
        :auto-apply="true"
      >
        <template v-slot:input="picker">
          {{ picker.startDate | formatDate }}
          <span
            v-if="picker.endDate"
            class="h"
          >-</span>
          {{ picker.endDate | formatDate }}
        </template>
      </DateRangePicker>
      <button
        class="searchBar__button"
        @click="showResults"
      >
        <img
          src="./assets/icon_search.svg"
          alt=""
        >
      </button>
    </div>

    <p class="resultStats">
      Results: <span>{{ rangedList.length }}</span>mail(s)
    </p>

    <MailList :mails="rangedList" />
  </div>
</template>

<script>
import axios from 'axios';
import MailList from '@/components/MailList';
import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';
import dummyData from './utils/dummyMailList';

export default {
    name: 'App',
    components: {
        MailList,
        DateRangePicker,
    },
    data() {
        return {
            dateRange: {},
            mailList: [],
            rangedList: [],
        };
    },
    mounted() {
        // axios.get('//localhost:5000/mails')
        //     .then(res => this.mailList = this.formatDate(res.data.mails))
        //     .catch(error => console.log(error));

        // or

        this.mailList = this.formatDate(dummyData);
    },
    methods: {
        showResults() {
            if (this.dateRange.startDate && this.dateRange.endDate) {
                const fromDate = this.dateRange.startDate;
                const toDate = this.dateRange.endDate;
                const sortedActivities = this.mailList.filter(item =>
                    item.date.getTime() >= fromDate.getTime() && item.date.getTime() <= toDate.getTime()
                );
                this.rangedList = sortedActivities;
            }
        },
        formatDate(arr){
            let mails = arr;
            for (const i in mails) {
                mails[i].date = new Date(mails[i].date);
            }
            return mails;
        },
    },
};
</script>

<style lang="scss" scoped>
.container {
    max-width: 1180px;
    width: 100%;
    margin: 30px auto;
}

.resultStats {
    font-weight: bold;
    color: #666;
    margin: 20px 16px 10px;

    span {
        font-size: 1.8rem;
    }
}
</style>

<style lang="scss">
// Data Picker quick fix
.daterangepicker .calendar-table {
    th.prev,
    th.next {
        display: none;
    }
}

.calendars-container {
    display: flex;

    @media (max-width: 539px) {
        flex-wrap: wrap
    }
}

.searchBar {
    display: inline-flex;
    padding: 0 16px;

    .vue-daterange-picker {
        display: flex;
        align-items: center;
        min-width: 250px;
        height: 100%;

        .form-control {
            display: flex;
            height: 100%;
            padding: 8px 14px;
            align-items: center;
            border: 1px solid #ced4da;
            border-radius: 6px 0 0 6px;
            box-shadow: inset 0 0px 4px 0px rgba(#000, .14);

            &:before {
                content: '';
                background: url('~@/assets/icon_calender.svg') center center no-repeat;
                width: 20px;
                height: 26px;
                display: block;
                margin-right: 14px;
            }
        }
    }

    &__button {
        cursor: pointer;
        border: 1px solid #ced4da;
        border-left-width: 0;
        border-radius: 0 6px 6px 0;
        background: #eee;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 45px;

        &:hover {
            background: #e2e2e2;
        }

        img {
            width: 18px;
            height: auto;
        }
    }
}

.h {
    padding: 0 5px;
}
</style>

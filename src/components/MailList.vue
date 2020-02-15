<template>
  <div
    v-if="mails.length === 0"
    class="displayEmpty"
  >
    <img
      src="@/assets/logo.png"
      alt=""
    >
  </div>

  <div
    v-else
    class="mailDisplay"
  >
    <!-- Desktop -->
    <table class="mailDisplay__table">
      <thead>
        <tr class="listHeader">
          <th class="listHeader__col listHeader__col--from">
            From
          </th>
          <th class="listHeader__col listHeader__col--to">
            To
          </th>
          <th class="listHeader__col listHeader__col--subject">
            Subject
          </th>
          <th
            :class="['listHeader__col', 'listHeader__col--date', 'sorted', {'sortedUp': dateSorted} ]"
            @click="toggleSortingDate"
          >
            Date
          </th>
        </tr>
      </thead>
      <tbody>
        <MailListItem
          v-for="(mail, index, key) in listSortedByDate"
          :key="key"
          :mail-data="mail"
          @selected="showModal"
        />
      </tbody>
    </table>

    <!-- Mobile -->
    <div class="mailDisplay__list">
      <p class="listHeaderSp">
        <span
          :class="['listHeaderSp__col', 'sorted', {'sortedUp': fromSorted} ]"
          @click="toggleSortingFrom"
        >
          From
        </span>
        |
        <span class="listHeaderSp__col">
          To
        </span>
        |
        <span class="listHeaderSp__col">
          Subject
        </span>
        |
        <span class="listHeaderSp__col">
          Date
        </span>
      </p>

      <ul class="listSp">
        <MailListItemSp
          v-for="(mail, index, key) in listSortedByName"
          :key="key"
          :mail-data="mail"
          @selected="showModal"
        />
      </ul>
    </div>

    <MailListModal
      :visible="modalVisible"
      :content="modalContent"
      @close="modalVisible = false"
    />
  </div>
</template>

<script>
import MailListItem from '@/components/MailListItem';
import MailListItemSp from '@/components/MailListItemSp';
import MailListModal from '@/components/MailListModal';

export default {
    name: 'MailList',
    components: {
        MailListItem,
        MailListItemSp,
        MailListModal,
    },
    props: {
        mails: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            fromSorted: false,
            dateSorted: false,
            modalVisible: false,
            modalContent: null,
        };
    },
    computed: {
        listSortedByDate() {
            let list = this.mails;
            let sortedByDate = list.slice().sort((a, b) => b.date - a.date);
            return this.dateSorted ? sortedByDate : sortedByDate.reverse();
        },
        listSortedByName() {
            let list = this.mails;
            let sortedByName = list.sort(this.dynamicSort('from'));
            return this.fromSorted ? sortedByName : sortedByName.reverse();
        },
    },
    methods: {
        toggleSortingFrom() {
            this.fromSorted = !this.fromSorted;
        },
        toggleSortingDate() {
            this.dateSorted = !this.dateSorted;
        },
        showModal(obj) {
            this.modalContent = obj;
            this.modalVisible = true;
        },
        dynamicSort(property) {
            var sortOrder = 1;

            if (property[0] === '-') {
                sortOrder = -1;
                property = property.substr(1);
            }

            return (a, b) => {
                if (sortOrder == -1) {
                    return b[property].localeCompare(a[property]);
                } else {
                    return a[property].localeCompare(b[property]);
                }
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.displayEmpty {
    display: flex;
    min-height: 400px;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #dee2e6;

    @media (min-width: 760px) {
        margin: 0 16px;
    }
}

.mailDisplay {
    @media (min-width: 760px) {
        margin: 0 16px;
    }

    &__table {
        width: 100%;
        table-layout: fixed;
        @media (max-width: 760px) {
          display: none;
        }
    }
    &__list {
      @media (min-width: 760px) {
        display: none;
      }
    }
}

.listHeader {
    display: flex;
    align-items: center;
    padding: 12px;
    border-top: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
    background: #f5f5f5;

    &__col {
        display: inline-flex;
        flex: 0 0 auto;
        color: #666;
        font-weight: bold;

        &--from {
            max-width: 196px;
            flex-basis: 196px;
            padding-right: 14px;
        }

        &--to {
            max-width: 196px;
            flex-basis: 196px;
            justify-content: space-between;
            align-items: flex-start;
            padding-right: 14px;
        }

        &--subject {
            display: flex;
            min-width: 0;
            height: auto;
            flex: 1 1 auto;
            justify-content: space-between;
            padding-right: 14px;
        }

        &--date {
            flex-basis: 86px;
            font-weight: bold;
        }
    }
}

.listHeaderSp {
    padding: 0 8px;
    border-color: #dee2e6;
    border-style: solid;
    border-top-width: 1px;
    border-bottom-width: 1px;
    background: #f5f5f5;

    @media (min-width: 760px) {
        display: none;
    }

    &__col {
        display: inline-block;
        padding: 12px 8px;
        color: #666;
        font-weight: bold;
    }
}

.sorted {
    display: inline-flex;
    align-items: center;
    color: #000;
    cursor: pointer;

    &:hover {
        opacity: .6;
    }

    &:after {
        display: inline-block;
        width: 12px;
        height: 8px;
        margin-left: 6px;
        background: url(~@/assets/icon_arrow01.svg) center center no-repeat;
        content: '';
    }

    &.sortedUp:after {
        transform: rotateZ(180deg);
    }
}

ul.listSp {
    margin: 0;
    padding: 0;
}
</style>

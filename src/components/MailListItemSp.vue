<template>
  <li
    class="item"
    @click="showMail"
  >
    <div class="header">
      <img
        src="../assets/icon_mail_sp.svg"
        alt=""
        class="header__icon"
      >
      <div class="header__content">
        <div class="header__content__row">
          <div class="info">
            <p class="info__txt info__txt--from">
              {{ mailData.from }}
            </p>
            <img
              v-if="mailData.isAttached"
              src="@/assets/icon_clip.svg"
              class="info__clip"
            >
          </div>
          <div class="date">
            {{ mailData.date | formatDateShort }}
          </div>
        </div>
        <div class="header__content__row">
          <p class="info">
            <span class="info__txt">{{ to }}</span>
          </p>
          <p
            v-if="mailData.to.length > 2"
            class="info__label"
          >
            +{{ mailData.to.length - 2 }}
          </p>
        </div>
      </div>
    </div>
    <p class="subject">
      {{ mailData.subject }}
    </p>
  </li>
</template>

<script>

export default {
    name: 'MailListItemSp',
    props: {
        mailData: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {

        };
    },
    computed: {
        to() {
            if (this.mailData.to.length > 2) {
                return `${this.mailData.to[0]}, ${this.mailData.to[1]}, ...`;
            } else if (this.mailData.to.length === 2) {
                return `${this.mailData.to[0]}, ${this.mailData.to[1]}`;
            } else {
                return this.mailData.to[0];
            }
        },
    },
    methods: {
        showMail() {
            this.$emit('selected', this.mailData);
        },
    },
};
</script>

<style lang="scss" scoped>
.item {
    display: flex;
    flex-direction: column;
    padding: 12px 16px;
    border-bottom: 1px solid #dee2e6;
    cursor: pointer;

    &:hover {
        color: blue;
        background: #f9f9f9;
    }
}

.header {
    display: flex;
    padding-bottom: 5px;

    &__icon {
        width: 14px;
        height: auto;
        margin-right: 8px;
    }

    &__content {
        min-width: 0;
        flex: 1 1 auto;

        &__row {
            display: flex;
            justify-content: space-between;
        }
    }
}

.info {
    display: flex;
    min-width: 0;
    flex: 1 1 auto;
    justify-content: space-between;
    align-items: center;
    margin-right: 14px;

    &__txt {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &--from {
            font-weight: bold;
        }
    }

    &__clip {
        width: 18px;
        height: auto;
        padding-left: 10px;
    }

    &__label {
        display: inline-block;
        flex: 0 0 auto;
        margin-left: 10px;
        padding: 0 6px;
        border-radius: 4px;
        color: #fff;
        background: #999;
        font-weight: bold;
    }
}

.date {
    flex: 0 0 auto;

    &:after {
        display: inline-block;
        width: 10px;
        height: 10px;
        background: url(~@/assets/icon_arrow02.svg) center center no-repeat;
        content: '';
    }
}

.subject {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
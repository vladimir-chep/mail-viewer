<template>
  <tr
    class="item"
    @click="showMail"
  >
    <td class="item__col item__col--from">
      <p class="item__col__txt">
        {{ mailData.from }}
      </p>
    </td>
    <td class="item__col item__col--to">
      <p class="item__col__txt">
        {{ to }}
      </p>
      <p
        v-if="mailData.to.length > 1"
        class="item__col__label"
      >
        +{{ mailData.to.length - 1 }}
      </p>
    </td>
    <td class="item__col item__col--subject">
      <p class="item__col__txt">
        {{ mailData.subject }}
      </p>
      <img
        v-if="mailData.isAttached"
        src="@/assets/icon_clip.svg"
        class="item__col__clip"
      >
    </td>
    <td class="item__col item__col--date">
      <p class="item__col__txt">
        {{ mailData.date | formatDateShort }}
      </p>
    </td>
  </tr>
</template>

<script>
export default {
    name: 'MailListItem',
    props: {
        mailData: {
            type: Object,
            required: true,
        },
    },
    computed: {
        to() {
            return this.mailData.to.length > 1 ? `${this.mailData.to[0]}, ...` : this.mailData.to[0];
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
    padding: 12px;
    border-bottom: 1px solid #dee2e6;
    cursor: pointer;

    &:hover {
        color: blue;
        background: #f9f9f9;
    }

    &__col {
        display: inline-flex;
        flex: 0 0 auto;

        &__txt {
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: inherit;
            white-space: nowrap;
        }

        &__label {
            display: inline-block;
            margin-left: 10px;
            padding: 0 6px;
            border-radius: 4px;
            color: #fff;
            background: #999;
            font-weight: bold;
        }

        &__clip {
            width: 18px;
            height: auto;
            padding-left: 10px;
        }

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

            .ttl {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        &--date {
            flex-basis: 86px;
            color: #000;
            font-weight: bold;
        }
    }
}
</style>

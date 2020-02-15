<template>
  <transition name="modal">
    <div
      v-if="visible"
      class="mask"
    >
      <div
        class="mask__wrapper"
        @click="$emit('close')"
      >
        <div
          class="modal"
          @click.stop
        >
          <button
            class="closeButton"
            @click="$emit('close')"
          >
            X
          </button>
          <dl class="modal__header">
            <dt class="modal__header__ttl">
              Date:
            </dt>
            <dd class="modal__header__txt">
              {{ content.date | formatDateShort }}
            </dd>
            <dt class="modal__header__ttl">
              From:
            </dt>
            <dd class="modal__header__txt">
              {{ content.from }}
            </dd>
            <dt class="modal__header__ttl">
              To:
            </dt>
            <dd class="modal__header__txt">
              {{ content.to.join(', ') }}
            </dd>
            <dt class="modal__header__ttl">
              Subject:
            </dt>
            <dd class="modal__header__txt">
              {{ content.subject }}
            </dd>
          </dl>

          <div class="modal__body">
            <p>{{ content.body }}</p>
          </div>

          <div class="modal__footer">
            <button
              v-if="content.isAttached"
              class="downloadLink"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
    name: 'MailListModal',
    props: {
        content: {
            type: Object,
            default () {
                return {
                    message: 'content',
                };
            },
        },
        visible: {
            type: Boolean,
            required: true,
        },
    },

};
</script>

<style lang="scss" scoped>
.mask {
    display: table;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9998;
    width: 100vw;
    height: 100vh;
    background-color: rgba(#000, .5);
    transition: opacity .3s ease;

    &__wrapper {
        display: table-cell;
        vertical-align: middle;
        padding: 20px;
    }
}

.downloadLink {
    color: blue;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
        opacity: .6;
    }
}

.modal {
    max-width: 760px;
    margin: 0 auto;
    padding: 14px 14px;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(#000, .33);
    background-color: #fff;

    &__header {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;

        &__ttl {
            width: 85px;
            font-weight: bold;
        }

        &__txt {
            width: calc(100% - 85px);
            margin: 0;
            color: #666;
        }
    }

    &__body {
        max-height: 20vh;
        overflow-y: auto;
        margin: 10px 0;
        padding: 10px;
        background: #eee;
    }
}

.closeButton {
    display: block;
    margin-left: auto;
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity .25s ease-in-out;
}

.modal-enter,
.modal-leave-active {
    opacity: 0;
}
</style>

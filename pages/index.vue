<template>
  <section class="container">
    <h1>Todoリスト</h1>
    <div class="addArea">
      <input
        id="addName"
        v-model="content"
        type="text"
        name="addName"
        placeholder="タスクを入力してください"
      />
      <button id="addButton" class="button button--green" @click="insert">
        追加
      </button>
    </div>
    <div class="Filter">
      <button
        class="button button--gray"
        v-bind:class="{ 'is-active': !find_flag }"
        @click="flag_reset"
      >
        全て
      </button>
      <button
        class="button button--gray"
        v-bind:class="{ 'is-active': find_flag && find_state == '作業前' }"
        @click="find('作業前')"
      >
        作業前
      </button>
      <button
        class="button button--gray"
        v-bind:class="{ 'is-active': find_flag && find_state == '作業中' }"
        @click="find('作業中')"
      >
        作業中
      </button>
      <button
        class="button button--gray"
        v-bind:class="{ 'is-active': find_flag && find_state == '完了' }"
        @click="find('完了')"
      >
        完了
      </button>
    </div>
    <table class="Lists">
      <thead>
        <tr>
          <th>タスク</th>
          <th>登録日時</th>
          <th>状態</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in display_todos" :key="index">
          <td>{{ item.content }}</td>
          <td>{{ item.created }}</td>
          <td>
            <button
              class="button"
              v-bind:class="{
                'button--yet': item.state == '作業前',
                'button--progress': item.state == '作業中',
                'button--done': item.state == '完了'
              }"
              @click="changeState(item)"
            >
              {{ item.state }}
            </button>
          </td>
          <td>
            <button class="button button--delete" @click="remove(item)">
              削除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: function() {
    return {
      content: "",
      find_state: "",
      find_flag: false
    };
  },
  computed: {
    ...mapState(["todos"]),
    display_todos: function() {
      if (this.find_flag) {
        let array = [];
        let data = this.todos;
        data.forEach(element => {
          if (element.state == this.find_state) {
            array.push(element);
          }
        });
        return array;
      } else {
        return this.todos;
      }
    }
  },
  methods: {
    insert: function() {
      if (this.content != "") {
        this.$store.commit("insert", { content: this.content });
        this.content = "";
      }
    },
    remove: function(todo) {
      this.$store.commit("remove", todo);
    },
    changeState: function(todo) {
      this.$store.commit("changeState", todo);
    },
    find: function(findState) {
      this.find_flag = true;
      this.find_state = findState;
    },
    flag_reset: function() {
      this.find_flag = false;
    }
  }
};
</script>

<style></style>

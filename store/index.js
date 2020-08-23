import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      todos: [
        {
          content: "テスト",
          createdAt: "2020-04-30 17:00",
          state: "作業前"
        },
        {
          content: "コーディング",
          createdAt: "2020-04-30 18:00",
          state: "作業中"
        },
        {
          content: "環境構築",
          createdAt: "2020-04-30 19:00",
          state: "完了"
        }
      ],
      options: [
        {
          id: 0,
          label: "作業前"
        },
        {
          id: 1,
          label: "作業中"
        },
        {
          id: 2,
          label: "完了"
        }
      ]
    }),
    mutations: {
      insert: function(state, obj) {
        var d = new Date();
        var fmt =
          d.getFullYear() +
          "-" +
          ("00" + (d.getMonth() + 1)).slice(-2) +
          "-" +
          ("00" + d.getDate()).slice(-2) +
          " " +
          ("00" + d.getHours()).slice(-2) +
          ":" +
          ("00" + d.getMinutes()).slice(-2);
        state.todos.unshift({
          content: obj.content,
          createdAt: fmt,
          state: "作業前"
        });
      },
      remove: function(state, obj) {
        for (let i = 0; i < state.todos.length; i++) {
          const ob = state.todos[i];
          if (ob.content == obj.content && ob.createdAt == obj.createdAt) {
            if (confirm('"' + ob.content + '"を削除しますか？')) {
              state.todos.splice(i, 1);
              return;
            }
          }
        }
      },
      changeState: function(state, obj) {
        for (let i = 0; i < state.todos.length; i++) {
          const ob = state.todos[i];
          if (
            ob.content == obj.content &&
            ob.createdAt == obj.createdAt &&
            ob.state == obj.state
          ) {
            let nowState;
            for (let j = 0; j < state.options.length; j++) {
              console.log(state.options[j].label);
              console.log(ob.state);

              if (state.options[j].label == ob.state) {
                nowState = state.options[j].id;
                nowState++;

                if (nowState >= state.options.length) {
                  nowState = 0;
                }

                obj.state = state.options[nowState].label;

                return;
              }
            }
          }
        }
      }
    }
  });
};

export default createStore;

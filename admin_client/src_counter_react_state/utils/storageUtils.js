import store from "store";
export default {
  saveUser(user) {
    store.set("user", user);
  },
  getUser() {
    return store.get("user");
  },
  removeUser() {
    store.remove("user");
  },
};

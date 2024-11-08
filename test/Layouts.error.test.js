import Vue from "vue";
import App from "@/layouts/default";

describe("Layouts.default.test.js", () => {
  let cmp, vm;

  beforeEach(() => {
    cmp = Vue.extend(App); // Create a copy of the original component
    vm = new cmp({
      data: {
        // Replace data value with this fake data
        jest: 'Error'
      }
    }).$mount(); // Instances and mounts the component
  });

  it('equals messages to Error', () => {
    expect(vm.jest).toEqual('Error');
  });
});
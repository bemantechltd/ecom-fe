import Vue from "vue";
import App from "@/components/Logo";

describe("Logo.test.js", () => {
  let cmp, vm;

  beforeEach(() => {
    cmp = Vue.extend(App); // Create a copy of the original component
    vm = new cmp({
      data: {
        // Replace data value with this fake data
        jest: 'Logo'
      }
    }).$mount(); // Instances and mounts the component
  });

  it('equals messages to Logo', () => {
    expect(vm.jest).toEqual('Logo');
  });
});
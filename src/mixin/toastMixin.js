import { default as config } from '../config';
var mixin = {
    methods: {
        makeToast(variant = null) {
          this.$bvToast.toast('Toast body content', {
            title: `Variant ${variant || 'default'}`,
            variant: variant,
            solid: true
          })
        }
};

export default filters;
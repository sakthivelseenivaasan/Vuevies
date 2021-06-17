import Vue from "vue";
    Vue.filter('DateFormat', function (date) {
        if (!date) return ''
        date = new Date(date)
        var ms = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${date.getDate()} ${ms[date.getMonth()]} ${date.getFullYear()}`;
      })


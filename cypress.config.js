const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.akveo.com/ngx-admin/pages'
  },
});

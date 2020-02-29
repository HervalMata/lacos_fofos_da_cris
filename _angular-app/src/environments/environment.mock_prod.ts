export const environment = {
  production: true,
  api: {
    protocol: 'http',
    host: '192.168.0.8:8000',
    get url() {
      return `${this.protocol}://${this.host}/api`
    }
  }
};

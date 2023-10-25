module.exports = {
  app: [{
    name: 'finIntegrator',
    script: './index.js',
    instances: 1,
    exec_mode: 'cluster',
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    error_file: '/nodeApps/logs/finIntegrator/err.log',
    out_file: '/nodeApps/logs/finIntegrator/out.log',
    watch: false,
    env: {
      "PORT":9053,
      FI_URL:"https://m1hades1043.hbng.com:8443/fiwebservice/services/FIPWebService",
      TOKEN_URL:'http://10.0.33.12:9050/token/verify',
      FI_VERSION_V10:"10.2",
      FI_VERSION_V11:"11.13"
    }
  }]
}
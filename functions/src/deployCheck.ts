import config from './config'

if(!config.prod) {
    console.error('PLEASE ENABLE PROD TO DEPLOY')
    process.exit(1)
}
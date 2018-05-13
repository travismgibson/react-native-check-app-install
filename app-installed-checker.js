import { Linking, Platform } from 'react-native';
import { APP_LIST } from './app-list';
import CheckPackageInstallation from './android';

class AppInstalledChecker {

    static getAppList() {
        return Object.keys(APP_LIST);
    }

    static checkPackageName(packagename) {
        return new Promise((resolve, reject) => {
            CheckPackageInstallation.isPackageInstalled(packagename, (isInstalled) => {
                resolve(isInstalled);
            });
        });
    }

    static checkURLScheme(proto, query) {
        return new Promise((resolve, reject) => {
            Linking
                //.canOpenURL(proto + '://' + query || '')
                //.canOpenURL(query + '://')
                .canOpenURL(query)
                .then((isInstalled) => {
                    //console.log(proto + ' isInstalled', isInstalled);
                    console.log(query + ' isInstalled', isInstalled);
                    resolve(isInstalled);
                })
                .catch((err) => {
                    console.log('erroer', err);
                    reject(err);
                });
        });
    }

    static isAppInstalled(key) {
        return Platform.select({
            ios: () => { return this.isAppInstalledIOS(key); },
            android: () => { return this.isAppInstalledAndroid(key); }
        })();
    }

    static isAppInstalledAndroid(key) {
        //return this.checkPackageName(APP_LIST[key].pkgName);
        return this.checkPackageName(key);
    }

    static isAppInstalledIOS(key) {
        //return this.checkURLScheme(APP_LIST[key].urlScheme, APP_LIST[key].urlParams);
        return this.checkURLScheme("",key);
    }
}

export default AppInstalledChecker;

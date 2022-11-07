import AliCloudDriveService from './lib/aliCloudDriveService';

const ali = new AliCloudDriveService('');

ali.getList('root').then((res) => {
    console.log(res);
});

// ali.getUser();

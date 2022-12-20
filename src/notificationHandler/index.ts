import VrcApi from '../VrcApi';
import * as Config from '../var/config'

const processNotifications = ( api: VrcApi ) => {
    api.notification.getAll().then(( notifications ) => {
        notifications.forEach(notification=>{
            if( notification.seen ) {
                api.notification.delete(notification.id);
                return;
            }
            if( notification.type == 'friendRequest' ) {
                console.log('Processing incoming Friend Request');
                api.user.acceptFriend(notification.id).then(()=>{
                    console.info(`Accepted friendRequest from: ${notification.senderUsername}`);
                })
                .catch(err=>{
                    console.error(`Error Accepting friendRequest from: ${notification.senderUsername}`);
                    console.error(err);
                });
            }
            else if( notification.type == 'requestInvite') {
                console.info('Processing incoming requestInvite');
                api.notification.send.invite(notification.senderUserId, api.instance, "Welcome to my world. Don't be a jerk." ).then(()=>{
                    console.info(`Accepted Invite Request from: ${notification.senderUsername}`);
                })
                .catch(err=>{
                    console.error(`Error Accepting invite request from: ${notification.senderUsername}`);
                    console.error(err);
                });
            }
            // Even if it failed, we only try once. Else we might infinitely invite off of a scuff request.
            api.notification.markAsRead(notification.id);
        })
    });

}

const main = async () => {

    // all methods return Promise
    const vrc = new VrcApi();
    return vrc.login(Config.VRCHAT_USERNAME, Config.VRCHAT_PASSWORD)
    .then(()=>setInterval(() => {
        processNotifications( vrc );
    },
    parseInt(Config.REQUEST_DELAY)))
    .catch(err=>{

    });

};

export default main;

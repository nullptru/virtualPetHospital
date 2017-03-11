/**
 * Created by Burgess on 2017/3/11.
 */
import {browserHistory} from 'react-router';
export default {
    componentDidMount : function () {
        if (sessionStorage.getItem('userType') === '-1') {
            browserHistory.push('/error');
        }
    }
}
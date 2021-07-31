import {
    useRecoilValue,
  } from 'recoil';
  import { userData, isLoggedIn } from '../atoms';

const Dashboard = () => {
    const user = useRecoilValue(userData)
    const log = useRecoilValue(isLoggedIn)
    console.log(user);
    console.log(log);
    return (
        <h1>{JSON.stringify(user, null, 4)}</h1>
    );
}
 
export default Dashboard;